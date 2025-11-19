# Portfolio-Website - Architecture Documentation

**Date:** 2025-11-19  
**Project Type:** web  
**Architecture Pattern:** static-site

## Executive Summary

Portfolio-Website is a single-page static website built with vanilla HTML, CSS, and JavaScript. It follows a traditional client-side architecture with no build process, framework dependencies, or server-side components. The site leverages modern web APIs and third-party libraries (loaded via CDN) for enhanced interactivity and animations.

## Technology Stack

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Markup** | HTML5 | - | Semantic structure and content |
| **Styling** | CSS3 | - | Layout, responsive design, animations |
| **Scripting** | JavaScript (ES6+) | - | Client-side interactivity |
| **Animation** | GSAP | 3.12.2 | Advanced animations and scroll effects |
| **3D Graphics** | Three.js | 0.153.0 | 3D particle effects in hero section |
| **Icons** | Font Awesome | 6.4.2 | Icon library |
| **Scroll Animations** | AOS | 2.3.4 | Animate on scroll library |
| **Deployment** | GitHub Pages | - | Static hosting |

## Architecture Pattern

### Static Site Architecture

The project follows a **static site architecture** pattern:

- **No Build Process**: Files are served directly without compilation or bundling
- **No Framework**: Pure vanilla JavaScript, no React/Vue/Angular
- **Client-Side Only**: All logic executes in the browser
- **CDN Dependencies**: External libraries loaded via CDN for performance
- **Single Page**: All content in one HTML file with section navigation

### Component Structure

The site is organized into logical sections within a single HTML file:

1. **Header/Navigation** - Sticky navbar with smooth scroll links
2. **Hero Section** - Animated profile with 3D particle background
3. **About Section** - Profile information and photo
4. **Projects Section** - Image carousel and project cards
5. **Experience Section** - Timeline of professional experience
6. **Skills Section** - Categorized skill display
7. **Technical Expertise Section** - Detailed expertise areas
8. **Certifications Section** - Certifications and achievements grid
9. **Footer** - Social links and copyright

## Data Architecture

**No Data Layer**: This is a static site with no database, API, or data persistence. All content is embedded directly in HTML.

## API Design

**No APIs**: Static site with no backend services or API endpoints.

## Component Overview

### Core Components

1. **Navigation System**
   - Sticky header with responsive hamburger menu
   - Smooth scroll navigation to sections
   - Active link highlighting

2. **Hero Section**
   - Profile image with GSAP animations
   - Three.js 3D particle background
   - Call-to-action buttons
   - Social media links

3. **Image Carousel**
   - Auto-rotating project showcase
   - Manual navigation controls
   - Indicator dots
   - Pause on hover

4. **Timeline Component**
   - Vertical timeline for experience
   - AOS scroll animations
   - Responsive layout

5. **Skills Grid**
   - Categorized skill display
   - Icon-based organization
   - Responsive grid layout

## Source Tree

See [source-tree-analysis.md](./source-tree-analysis.md) for complete directory structure.

**Key Directories:**
- `css/` - Stylesheets (style.css, animations.css)
- `js/` - JavaScript files (main.js, libraries)
- `assets/` - Images, icons, media files
- `cv/` - Resume PDF

**Entry Point:** `index.html`

## Development Workflow

### Local Development

1. **No Installation Required**: Open `index.html` directly in browser
2. **Optional Local Server**: Use Python/Node/PHP simple server for CORS testing
3. **Live Reload**: Manual browser refresh after changes

### File Modification

- **HTML**: Edit `index.html` directly
- **CSS**: Modify `css/style.css` or `css/animations.css`
- **JavaScript**: Update `js/main.js`
- **Assets**: Add files to `assets/` folders

### Testing

- **Browser Testing**: Test in Chrome, Firefox, Safari, Edge
- **Responsive Testing**: Use browser dev tools for mobile/tablet views
- **Performance**: Use Lighthouse for performance audits

## Deployment Architecture

### GitHub Pages Deployment

- **Platform**: GitHub Pages (static hosting)
- **Custom Domain**: Configured via `CNAME` file (www.akshaykhandizod.com)
- **Deployment**: Automatic on push to main/gh-pages branch
- **HTTPS**: Automatically enabled by GitHub Pages

### Deployment Process

1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select branch (main or gh-pages)
4. Custom domain configured via CNAME file
5. Site accessible at custom domain

## Testing Strategy

### Manual Testing

- **Cross-Browser**: Test in major browsers
- **Responsive Design**: Test on mobile, tablet, desktop viewports
- **Functionality**: Verify all interactive elements work
- **Performance**: Check load times and animation smoothness

### No Automated Tests

Static site with no build process - manual testing is primary method.

## Security Considerations

- **No Server-Side Code**: No server vulnerabilities
- **CDN Dependencies**: Trust external CDN providers (jsdelivr, cdnjs)
- **HTTPS**: Enforced by GitHub Pages
- **No User Input**: No forms or user data collection

## Performance Optimizations

- **CDN Loading**: External libraries loaded via CDN for caching
- **Image Optimization**: WebP format used for carousel images
- **Lazy Loading**: Consider implementing for images if needed
- **Minification**: CSS/JS files could be minified for production (not currently done)

## Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **ES6+ Features**: Uses modern JavaScript (arrow functions, const/let, etc.)
- **CSS Variables**: Uses CSS custom properties
- **No Polyfills**: Assumes modern browser support

## Future Considerations

- **Build Process**: Could add build step for minification/optimization
- **Framework Migration**: Could migrate to React/Vue for better maintainability
- **CMS Integration**: Could integrate headless CMS for content management
- **Progressive Web App**: Could add PWA features for offline support

---

_Generated using BMAD Method `document-project` workflow_

