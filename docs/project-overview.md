# Portfolio-Website - Project Overview

**Date:** 2025-11-19
**Type:** web
**Architecture:** static-site

## Executive Summary

Portfolio-Website is a static HTML/CSS/JavaScript portfolio website showcasing the professional profile, projects, experience, and skills of Akshay Khandizod, a Senior Game Developer & Project Lead. The site features a modern, responsive design with interactive animations, a hero section with particle effects, project carousels, and smooth scrolling navigation.

## Project Classification

- **Repository Type:** monolith
- **Project Type(s):** web
- **Primary Language(s):** HTML, CSS, JavaScript
- **Architecture Pattern:** static-site

## Technology Stack Summary

| Category | Technology | Version | Justification |
|----------|-----------|---------|---------------|
| Markup | HTML5 | - | Core structure and semantic markup |
| Styling | CSS3 | - | Modern styling with CSS variables and animations |
| Scripting | JavaScript (ES6+) | - | Client-side interactivity and animations |
| Animation Library | GSAP | 3.12.2 | Advanced animations and scroll-triggered effects |
| 3D Graphics | Three.js | 0.153.0 | 3D particle effects in hero section (loaded via CDN) |
| Particles | Particles.js | - | Background particle effects (legacy, partially replaced) |
| Icons | Font Awesome | 6.4.2 | Icon library for UI elements |
| Scroll Animations | AOS | 2.3.4 | Animate on scroll library |
| Deployment | GitHub Pages | - | Static site hosting (CNAME: www.akshaykhandizod.com) |

## Key Features

- **Responsive Design**: Mobile-first approach with hamburger menu navigation
- **Interactive Hero Section**: Animated profile with 3D particle effects using Three.js
- **Project Showcase**: Image carousel displaying featured projects (Kiddopia, Timpy, Tizi)
- **Experience Timeline**: Visual timeline of professional experience
- **Skills & Expertise**: Categorized display of technical skills and expertise areas
- **Certifications**: Grid layout showcasing certifications and achievements
- **Smooth Scrolling**: Enhanced navigation with smooth scroll behavior
- **Loading Screen**: Animated loading screen on page load
- **Scroll-to-Top Button**: Floating button for quick navigation to top

## Architecture Highlights

- **Pure Static Site**: No build process, framework, or server-side rendering
- **CDN Dependencies**: External libraries loaded via CDN (GSAP, Three.js, Font Awesome, AOS)
- **Modular CSS**: Separate stylesheets for main styles and animations
- **Vanilla JavaScript**: No framework dependencies, pure ES6+ JavaScript
- **Asset Organization**: Structured asset folders for images, icons, and fonts
- **GitHub Pages Ready**: Configured with CNAME for custom domain deployment

## Development Overview

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)
- Text editor or IDE

### Getting Started

This is a static website that can be opened directly in a browser or served via any static file server.

**Option 1: Direct File Access**
```bash
# Simply open index.html in a web browser
open index.html
```

**Option 2: Local Development Server**
```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (if http-server is installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

### Key Commands

- **View Locally**: Open `index.html` in browser or use local server
- **Deploy**: Push to GitHub repository with GitHub Pages enabled
- **Build**: No build process required (static site)

## Repository Structure

```
Portfolio-Website/
├── index.html              # Main HTML entry point
├── css/
│   ├── style.css          # Main stylesheet
│   └── animations.css     # Animation-specific styles
├── js/
│   ├── main.js            # Main JavaScript logic
│   ├── particles.min.js   # Particles.js library (legacy)
│   ├── particles.json     # Particles configuration
│   └── gsap.min.js        # GSAP animation library
├── assets/
│   ├── images/            # Project images and profile pictures
│   └── icons/             # Favicon and icons
├── cv/                    # Resume/CV PDF
├── fonts/                 # Custom fonts (if any)
├── docs/                  # Documentation (this folder)
└── CNAME                  # GitHub Pages custom domain config
```

## Documentation Map

For detailed information, see:

- [index.md](./index.md) - Master documentation index
- [architecture.md](./architecture.md) - Detailed technical architecture
- [source-tree-analysis.md](./source-tree-analysis.md) - Directory structure
- [development-guide.md](./development-guide.md) - Development workflow

---

_Generated using BMAD Method `document-project` workflow_

