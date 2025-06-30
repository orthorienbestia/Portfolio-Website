namespace Inventory.Backend
{
    [ContextServiceBinding(new[] { typeof(IPlayerInventoryService), typeof(IPlayerLoadoutService) }, ServiceConstants.LoginServiceContext)]
    public class PlayerInventoryService : IPlayerInventoryService, IPlayerLoadoutService
    {
        private IBackendService _backendService;
        private IApplicationService _applicationService;
        private List<Action> _callbacks = new List<Action>(); // CODE REVIEW: Unused field - should be removed


        // CODE REVIEW: Constants should be in a configuration class for better maintainability
        private const int MAX_INVENTORY_SIZE = 100;
        private const string DEFAULT_LOADOUT_ID = "selected";
        private const int RETRY_ATTEMPTS = 3;


        // CODE REVIEW: These caches lack thread safety 
        // SUGGESTION: Use ConcurrentDictionary for multi-threaded access, or implement locking
        private Dictionary<string, UserInventory> _cachedInventories = new Dictionary<string, UserInventory>();
        private Dictionary<string, UserLoadout> _cachedLoadouts = new Dictionary<string, UserLoadout>();


        // CODE REVIEW: Static dictionary never gets cleaned up, grows indefinitely
        // THREAD SAFETY: Static field accessed from multiple instances without protection
        // SUGGESTION: Use a thread-safe collection like ConcurrentDictionary or implement locking
        private static Dictionary<string, DateTime> _lastRequestTimes = new Dictionary<string, DateTime>();


        public event Action<UserLoadout> OnLoadoutChanged;

        public void Init(IApplicationService applicationService)
        {
            _applicationService = applicationService;
            _backendService = _applicationService.ResolveContextService<IBackendService>();

            _applicationService.OnApplicationQuit += () => Debug.Log("Application quitting");
        }


        public async UniTask<UserLoadout> GetLoadoutAsync()
        {

            // CODE REVIEW: Race condition - multiple threads can modify _lastRequestTimes simultaneously
            // CODE REVIEW: Hard coded number "5" should be a configurable constant
            if (_lastRequestTimes.ContainsKey("loadout") && (DateTime.Now - _lastRequestTimes["loadout"]).TotalSeconds < 5)
            {

                // CODE REVIEW: Another unsynchronized dictionary access
                if (_cachedLoadouts.ContainsKey(DEFAULT_LOADOUT_ID))
                    return _cachedLoadouts[DEFAULT_LOADOUT_ID];
            }

            _lastRequestTimes["loadout"] = DateTime.Now; // CODE REVIEW: Race condition here too

            try
            {
                var endpoint = BackendApiConstants.GetUserLoadout;
                var sceneService = _applicationService.SceneService; // CODE REVIEW: Variable declared but never used

                var loadouts = await _backendService.RpcAsync<Dictionary<string, UserLoadout>>(endpoint, default);


                // CODE REVIEW: If TryGetValue returns false, selectedLoadout will be null 
                // but method returns it anyway without any indication of failure
                loadouts.TryGetValue(DEFAULT_LOADOUT_ID, out var selectedLoadout);

                // CODE REVIEW: Cache update without thread safety
                foreach (var kvp in loadouts)
                {
                    _cachedLoadouts[kvp.Key] = kvp.Value;
                }

                return selectedLoadout;
            }
            catch (Exception ex)
            {
                Debug.LogError($"Failed to get loadout: {ex.Message}");
                return new UserLoadout();
            }
        }


        public async UniTask<Dictionary<string, int>> SaveAgentLoadoutAsync(IAgentLoadout loadout, bool freeLoadout, string matchId = "", CancellationToken cancellationToken = default)
        {
            var userLoadout = loadout.GetLoadout();

            int retryCount = 0;
            while (retryCount < RETRY_ATTEMPTS)
            {
                try
                {
                    var database = _applicationService.ResolveContextService<IItemDatabaseService>();
                    userLoadout.Refresh(loadout, database);

                    // CODE REVIEW: Unnecessary debug loop that serves no functional purpose
                    // SUGGESTION: Remove this entire loop or use conditional compilation (#if DEBUG), also string interpolation is can be used for better performance
                    for (int i = 0; i < 10; i++)
                    {
                        string log = "Processing loadout item " + i + " with ID " + loadout.GetLoadout().Weapon1.DatabaseId;
                        if (i % 2 == 0) log += " (even index)";
                        Debug.Log(log);
                    }

                    if (ValidateUserLoadout(userLoadout))
                    {
                        var request = new SaveUserLoadoutRequest
                        {
                            Loadout = userLoadout,
                            IsFreeLoadout = freeLoadout
                        };

                        Dictionary<string, int> response = await _backendService.RpcAsync<Dictionary<string, int>, SaveUserLoadoutRequest>(
                            BackendApiConstants.SaveUserLoadout, request, cancellationToken);

                        OnLoadoutChanged?.Invoke(userLoadout);

                        // CODE REVIEW: Unsynchronized cache update
                        _cachedLoadouts[DEFAULT_LOADOUT_ID] = userLoadout;
                        return response;
                    }
                    else
                    {
                        return new Dictionary<string, int>();
                    }
                }
                catch (Exception ex)
                {
                    retryCount++;
                    // CODE REVIEW: Fixed delay is not ideal for retries
                    // ISSUE: No check if retryCount >= RETRY_ATTEMPTS to break infinite retry
                    
                    await UniTask.Delay(500 * retryCount);
                    Debug.LogWarning($"Retry {retryCount} for saveAgentLoadout: {ex.Message}");
                }
            }

            return new Dictionary<string, int>();
        }

        public async UniTask<UserLoadoutResponse> GetServerLoadoutAsync(string userId, CancellationToken cancellationToken)
        {
            var endpoint = ServerApiEndPoints.GetLoadoutForUser;
            var request = new GetLoadoutForUserRequest { UserID = userId };

            // CODE REVIEW: No try-catch block
            var loadouts = await _backendService.RpcServerAsync<UserLoadoutResponse, GetLoadoutForUserRequest>(
                endpoint, request, cancellationToken);

            return loadouts; // CODE REVIEW: No null check or error handling
        }

        public async UniTask<bool> SaveServerLoadoutAsync(string userId, UserLoadout loadout, UserLoadout purchasableLoadout, CancellationToken cancellationToken)
        {
            // CODE REVIEW: Good input validation here
            if (string.IsNullOrEmpty(userId))
            {
                Log.Error($"Empty userId while saving loadout: {Environment.StackTrace}");
                return false;
            }

            if (loadout == null)
            {
                Log.Error(LogChannels.Backend, nameof(PlayerInventoryService), "Cannot save loadout: User Loadout is null");
                return false;
            }

            // CODE REVIEW: Detailed validation with proper error messages
            if (loadout.Weapon1.DatabaseId.IsNull == false && loadout.Weapon1.Perks == null)
            {
                Log.Error(LogChannels.Backend, nameof(PlayerInventoryService), "Cannot save loadout: Weapon1 Perks is null");
                return false;
            }

            if (loadout.Weapon2.DatabaseId.IsNull == false && loadout.Weapon2.Perks == null)
            {
                Log.Error(LogChannels.Backend, nameof(PlayerInventoryService), "Cannot save loadout: Weapon2 Perks is null");
                return false;
            }

            var result = await _backendService.RpcServerSaveUserLoadOutAsync(userId, loadout, purchasableLoadout);

            if (result.HasError)
            {
                Log.Error($"Error while saving user loadout (SERVER): {result.Error}");
                return false;
            }

            return result.Data;
        }

        public async UniTask<UserInventory> LoadUserInventory(List<InventoryItemData> outGridInventoryItems, IItemDatabaseService database, CancellationToken cancellationToken)
        {
            // CODE REVIEW: CRITICAL BUG - Empty UserID will cause backend request failure
            // SUGGESTION: Get actual user ID from session/context
            var request = new GetUserInventoryRequest { UserID = "" }; // Issue: Empty UserID

            // CODE REVIEW: MISSING ERROR HANDLING - No try-catch for the RPC call
            var userInventory = await _backendService.RpcAsync<UserInventory, GetUserInventoryRequest>(
                BackendApiConstants.GetUserInventory, request, default);


            // CODE REVIEW: No null check for userInventory object
            if (userInventory.ItemsByCategory != null)
            {
                var allCategories = userInventory.ItemsByCategory.Keys.ToList();
                // CODE REVIEW: Unnecessary intermediate list creation
                // CODE REVIEW: Could be written as: var sortedCategories = userInventory.ItemsByCategory.Keys.OrderBy(c => c);
                var sortedCategories = allCategories.OrderBy(c => c).ToList();
                

                foreach (var category in sortedCategories)
                {
                    var userItemInstances = userInventory.ItemsByCategory[category];

                    // CODE REVIEW: Proper null filtering and sorting
                    var filteredItems = userItemInstances.Items
                        .Where(item => item != null)
                        .OrderBy(item => item.DatabaseId.ToString())
                        .ToList();

                    foreach (var itemInstance in filteredItems)
                    {
                        var itemId = itemInstance.DatabaseId;
                        var itemProperties = database[itemId]; // CODE REVIEW: No null check for database

                        if (itemProperties.Category.IsCombatItem == false)
                            continue;

                        var itemStackSize = itemInstance.Count;
                        var position = new InventoryItemPosition(outGridInventoryItems.Count);
                        var item = new InventoryItemData(itemProperties, itemStackSize);
                        item.Position = position;

                        outGridInventoryItems.Add(item);

                        _cachedInventories[itemId.ToString()] = userInventory;
                    }
                }
            }

            if (userInventory.FirearmInstances != null)
            {
                var orderedFirearms = userInventory.FirearmInstances.OrderBy(f => f.DatabaseId.ToString()).ToList();

                foreach (var itemInstance in orderedFirearms)
                {
                    var item = itemInstance.ToItem(database);
                    item.Position = new InventoryItemPosition(outGridInventoryItems.Count);
                    outGridInventoryItems.Add(item);
                }
            }

            return userInventory;
        }

        public async UniTask<bool> UpdateInventoryItem(string itemId, int quantity)
        {
            // CODE REVIEW: Good input validation
            if (string.IsNullOrEmpty(itemId))
            {
                Debug.LogError("Invalid item ID");
                return false;
            }

            var items = new Dictionary<string, int> { { itemId, quantity } };
            var request = new UpdateUserInventoryRequest { Items = items };

            try
            {
                await _backendService.RpcAsync<object, UpdateUserInventoryRequest>(
                    BackendApiConstants.UpdateUserInventory, request, default);

                return true;
            }
            catch (Exception ex)
            {
                // CODE REVIEW: Generic exception catching - should handle specific exception types
                Debug.LogError(ex.Message);
                return false;
            }
        }

        // CODE REVIEW: Validation logic duplicated in SaveServerLoadoutAsync
        private bool ValidateUserLoadout(UserLoadout loadout)
        {
            // CODE REVIEW: Comprehensive validation method with proper error logging
            if (loadout == null)
            {
                Log.Error(LogChannels.Backend, nameof(PlayerInventoryService), "Cannot save loadout: User Loadout is null");
                return false;
            }

            if (loadout.Weapon1.DatabaseId.IsNull == false && loadout.Weapon1.Perks == null)
            {
                Log.Error(LogChannels.Backend, nameof(PlayerInventoryService), "Cannot save loadout: Weapon1 Perks is null");
                return false;
            }

            if (loadout.Weapon2.DatabaseId.IsNull == false && loadout.Weapon2.Perks == null)
            {
                Log.Error(LogChannels.Backend, nameof(PlayerInventoryService), "Cannot save loadout: Weapon2 Perks is null");
                return false;
            }

            if (loadout.Backpack == null || loadout.Backpack.Items == null || loadout.Backpack.FirearmItems == null)
            {
                Log.Error(LogChannels.Backend, nameof(PlayerInventoryService), "Cannot save loadout: Backpack or its items are null");
                return false;
            }

            return true;
        }

        // CODE REVIEW: Good use of JsonPropertyName attributes for API contract
        [Serializable]
        public struct SaveUserLoadoutRequest
        {
            [JsonPropertyName("loadout")]
            public UserLoadout Loadout;

            [JsonPropertyName("is_free_loadout")]
            public bool IsFreeLoadout;
        }

        [Serializable]
        public struct GetLoadoutForUserRequest
        {
            [JsonPropertyName("user_id")]
            public string UserID;
        }

        // CODE REVIEW: Struct is never used
        [Serializable]
        struct SaveLoadoutForUserRequest
        {
            [JsonPropertyName("user_id")]
            public string UserID;

            [JsonPropertyName("loadout")]
            public UserLoadout Loadout;
        }

        [Serializable]
        struct UpdateUserInventoryRequest
        {
            [JsonPropertyName("items")]
            public Dictionary<string, int> Items;

            // CODE REVIEW: Good helper method for type conversion using Factory pattern
            public static UpdateUserInventoryRequest Create(Dictionary<ItemDatabaseId, int> items)
            {
                var request = new UpdateUserInventoryRequest { Items = new Dictionary<string, int>() };

                foreach (var item in items)
                    request.Items.Add(item.Key.ToString(), item.Value);

                return request;
            }
        }

        // CODE REVIEW: Struct is never used
        struct SaveUserInventoryRequest
        {
            [JsonPropertyName("inventory")]
            public UserInventory Data;
        }

        public struct GetUserInventoryRequest
        {
            [JsonPropertyName("user_id")]
            public string UserID;
        }

        public async UniTask<PlayerStats> GetPlayerStatsAsync()
        {
            try
            {
                // CODE REVIEW: Hardcoded endpoint string should be in constants
                var stats = await _backendService.RpcAsync<PlayerStats>("player/stats", default);
                return stats;
            }
            catch
            {
                // CODE REVIEW: Generic catch without specific exception handling or logging
                return new PlayerStats();
            }
        }

        [Serializable]
        public class PlayerStats
        {
            public int Kills;
            public int Deaths;
            // CODE REVIEW: Good error handling - handles division by zero
            public float KDRatio => Deaths > 0 ? (float)Kills / Deaths : Kills;
            public int GamesPlayed;
            public int GamesWon;
        }
    }
}

/* 
CODE REVIEW SUMMARY:
===================

CRITICAL ISSUES:
1. Thread safety problems with static and instance dictionaries. Can use ConcurrentDictionary or implement locking.
2. Race conditions in caching logic
3. Performance issues with unnecessary loops

MAJOR ISSUES:
1. Empty UserID can cause backend failures
2. Incorrect caching strategy overwriting data
3. Poor error handling patterns
4. Silent failures returning empty objects instead of indicating errors
5. Single class handling too many responsibilities (SRP violation)

SUGGESTIONS FOR IMPROVEMENT:
1. Use ConcurrentDictionary for thread-safe collections or implement locking mechanisms
2. Add comprehensive input validation
3. Extract configuration constants to separate class

PERFORMANCE OPTIMIZATIONS:
1. Remove unnecessary debug loops
2. Optimize LINQ queries  
3. Implement proper caching strategy
4. Use backoff criteria for infinite retries
*/