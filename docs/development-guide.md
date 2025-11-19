# Portfolio-Website - Development Guide

**Date:** 2025-11-19

## Prerequisites

- **Modern Web Browser**: Chrome, Firefox, Safari, or Edge (latest versions)
- **Text Editor or IDE**: VS Code, Sublime Text, Atom, or any code editor
- **Local Web Server** (optional): For testing with proper CORS and local file serving
  - Python 3 (built-in)
  - Node.js with http-server
  - PHP (built-in)
  - VS Code Live Server extension

## Environment Setup

### No Installation Required

This is a static website with no dependencies to install. All external libraries are loaded via CDN.

### Optional: Local Development Server

While you can open `index.html` directly in a browser, using a local server is recommended for:
- Proper CORS handling
- Testing relative paths
- Simulating production environment

**Option 1: Python 3**
```bash
# Navigate to project root
cd /path/to/Portfolio-Website

# Start server on port 8000
python3 -m http.server 8000

# Access at http://localhost:8000
```

**Option 2: Node.js (http-server)**
```bash
# Install http-server globally (one-time)
npm install -g http-server

# Navigate to project root
cd /path/to/Portfolio-Website

# Start server
http-server -p 8000

# Access at http://localhost:8000
```

**Option 3: PHP**
```bash
# Navigate to project root
cd /path/to/Portfolio-Website

# Start server
php -S localhost:8000

# Access at http://localhost:8000
```

**Option 4: VS Code Live Server**
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Local Development

### File Structure

```
Portfolio-Website/
├── index.html          # Main HTML file - edit content here
├── css/
│   ├── style.css      # Main styles - edit styles here
│   └── animations.css # Animation styles
├── js/
│   └── main.js        # JavaScript logic - edit functionality here
└── assets/            # Images and icons
```

### Making Changes

1. **Edit HTML Content**: Modify `index.html` directly
2. **Update Styles**: Edit `css/style.css` or `css/animations.css`
3. **Modify Functionality**: Update `js/main.js`
4. **Add Assets**: Place images in `assets/images/`, icons in `assets/icons/`
5. **Refresh Browser**: Reload page to see changes (or use Live Server for auto-reload)

### Development Workflow

1. Open project in code editor
2. Start local server (optional but recommended)
3. Open `index.html` in browser (or navigate to local server URL)
4. Make changes to files
5. Refresh browser to see changes
6. Test in multiple browsers
7. Test responsive design using browser dev tools

## Build Process

**No Build Process Required**: This is a static site with no compilation, bundling, or build steps needed.

Files are served directly as-is.

## Run Commands

### Development

```bash
# Option 1: Direct file access
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows

# Option 2: Local server
python3 -m http.server 8000
# Then open http://localhost:8000 in browser
```

### Production Deployment

```bash
# No build commands needed
# Simply push to GitHub repository
git add .
git commit -m "Update portfolio"
git push origin main
```

## Test Commands

### Manual Testing

**No automated test suite** - manual testing is the primary method:

1. **Cross-Browser Testing**
   - Test in Chrome, Firefox, Safari, Edge
   - Verify all features work correctly

2. **Responsive Design Testing**
   - Use browser dev tools (F12)
   - Test mobile (375px, 768px), tablet (1024px), desktop (1920px) viewports
   - Verify hamburger menu works on mobile
   - Check all sections are readable on small screens

3. **Functionality Testing**
   - Test navigation links (smooth scroll)
   - Verify carousel auto-rotation and manual controls
   - Test scroll-to-top button
   - Verify all external links work
   - Check loading screen animation

4. **Performance Testing**
   - Use Chrome DevTools Lighthouse
   - Check page load time
   - Verify images load correctly
   - Test animation performance

5. **Accessibility Testing**
   - Use browser accessibility tools
   - Test keyboard navigation
   - Verify ARIA labels (if added)
   - Check color contrast

## Common Development Tasks

### Adding a New Section

1. Add HTML section in `index.html`:
```html
<section id="new-section" class="new-section">
  <h2>New Section</h2>
  <!-- Content here -->
</section>
```

2. Add navigation link in navbar:
```html
<li><a href="#new-section">New Section</a></li>
```

3. Add styles in `css/style.css`:
```css
.new-section {
  padding: 4rem 2rem;
  /* Your styles */
}
```

### Modifying Colors

Edit CSS variables in `css/style.css`:
```css
:root {
  --primary: #your-color;
  --secondary: #your-color;
  /* etc. */
}
```

### Adding New Images

1. Place image in `assets/images/` folder
2. Reference in HTML:
```html
<img src="assets/images/your-image.jpg" alt="Description">
```

### Updating Project Information

Edit content directly in `index.html`:
- Hero section: Update name, title, description
- About section: Update profile text
- Projects: Update project cards
- Experience: Update timeline items
- Skills: Update skill lists

## Debugging

### Browser DevTools

- **F12** or **Right-click → Inspect**: Open DevTools
- **Console Tab**: Check for JavaScript errors
- **Network Tab**: Verify all resources load correctly
- **Elements Tab**: Inspect HTML/CSS
- **Lighthouse Tab**: Performance and accessibility audits

### Common Issues

1. **CDN Resources Not Loading**
   - Check internet connection
   - Verify CDN URLs in HTML are correct
   - Check browser console for errors

2. **Animations Not Working**
   - Verify GSAP/AOS libraries loaded
   - Check browser console for errors
   - Ensure scripts loaded in correct order

3. **Images Not Displaying**
   - Verify file paths are correct (relative to HTML)
   - Check file names match (case-sensitive)
   - Ensure images exist in assets folder

4. **Styles Not Applying**
   - Check CSS file linked correctly in HTML
   - Verify CSS syntax is correct
   - Check browser cache (hard refresh: Ctrl+Shift+R / Cmd+Shift+R)

## Code Style Guidelines

### HTML
- Use semantic HTML5 elements
- Include alt text for images
- Use consistent indentation (2 spaces)

### CSS
- Use CSS variables for colors
- Follow BEM-like naming for complex components
- Group related styles together
- Use rem units for spacing

### JavaScript
- Use modern ES6+ syntax
- Add comments for complex logic
- Keep functions focused and small
- Use const/let instead of var

## Deployment

### GitHub Pages

1. **Push to GitHub**:
```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Navigate to Pages section
   - Select source branch (main or gh-pages)
   - Save

3. **Custom Domain** (already configured):
   - `CNAME` file contains: `www.akshaykhandizod.com`
   - DNS configured to point to GitHub Pages
   - Site accessible at custom domain

### Deployment Checklist

- [ ] All changes committed and pushed
- [ ] Test site locally before deploying
- [ ] Verify all external links work
- [ ] Check responsive design on multiple devices
- [ ] Verify custom domain resolves correctly
- [ ] Test site after deployment

## Performance Optimization Tips

1. **Image Optimization**
   - Use WebP format where possible (already used for carousel)
   - Compress images before adding
   - Consider lazy loading for images

2. **CSS/JS Optimization**
   - Minify CSS/JS files (optional, not currently done)
   - Remove unused CSS
   - Consider bundling if site grows

3. **CDN Usage**
   - External libraries already loaded via CDN
   - Benefits from CDN caching

## Troubleshooting

### Site Not Loading After Deployment

- Check GitHub Pages settings
- Verify branch is correct
- Check CNAME file is present
- Verify DNS settings for custom domain

### Styles Broken

- Check CSS file paths
- Verify CSS file committed to repository
- Clear browser cache

### JavaScript Errors

- Check browser console
- Verify all script tags load correctly
- Check for syntax errors in `main.js`

---

_Generated using BMAD Method `document-project` workflow_

