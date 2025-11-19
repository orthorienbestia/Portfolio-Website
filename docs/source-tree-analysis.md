# Portfolio-Website - Source Tree Analysis

**Date:** 2025-11-19

## Overview

This is a static website project with a simple, flat structure. The project follows a traditional web development pattern with separate folders for stylesheets, JavaScript, and assets. All functionality is client-side with no build process or server-side components.

## Complete Directory Structure

```
Portfolio-Website/
├── index.html                    # Main HTML entry point
├── CNAME                         # GitHub Pages custom domain configuration
├── css/
│   ├── style.css                # Main stylesheet with all component styles
│   └── animations.css           # Animation-specific CSS rules
├── js/
│   ├── main.js                  # Main JavaScript logic and interactivity
│   ├── particles.min.js         # Particles.js library (legacy, partially used)
│   ├── particles.json           # Particles.js configuration file
│   └── gsap.min.js              # GSAP animation library (local copy)
├── assets/
│   ├── icons/
│   │   └── favicon.ico          # Site favicon
│   └── images/
│       ├── profile-picture.JPG  # Profile photo used in hero and about sections
│       ├── profile-placeholder.png
│       ├── carousal/
│       │   ├── Little_Angel.webp  # Kiddopia project image
│       │   ├── Timpy.webp         # Timpy project image
│       │   └── Tizi.webp          # Tizi project image
│       └── logo/
│           ├── Kiddopia_Logo.png
│           ├── Timpy_Logo.png
│           └── Tizi_Logo.png
├── cv/
│   └── CV_Akshay_Khandizod.pdf  # Resume/CV document
├── fonts/                        # Custom fonts directory (if any)
├── docs/                         # Documentation folder
│   ├── sprint-artifacts/         # Sprint-related documentation
│   ├── project-overview.md       # Project overview document
│   ├── source-tree-analysis.md   # This file
│   └── project-scan-report.json  # Workflow state file
└── lila-games/                   # External assignment folder
    ├── AKSHAY_KHANDIZOD_ASSIGNMENT.pdf
    └── PlayerInventory_CodeReview_Candidate.cs
```

## Critical Directories

### `index.html`

**Purpose:** Main entry point and single-page application structure  
**Contains:** Complete HTML structure with all sections (hero, about, projects, experience, skills, certifications)  
**Entry Points:** This is the primary entry point - opened directly in browser or served via web server

### `css/`

**Purpose:** All stylesheet files for the website  
**Contains:**
- `style.css`: Main stylesheet with component styles, layout, responsive design, color variables
- `animations.css`: Animation-specific CSS rules and keyframes

**Integration:** Linked in `<head>` of index.html

### `js/`

**Purpose:** JavaScript functionality and external libraries  
**Contains:**
- `main.js`: Core JavaScript logic including navigation, carousel, animations, particle effects
- `particles.min.js`: Legacy particles.js library (partially replaced by Three.js)
- `particles.json`: Configuration for particles.js
- `gsap.min.js`: GSAP animation library (local copy, also loaded via CDN)

**Integration:** Scripts loaded at end of `<body>` in index.html

### `assets/`

**Purpose:** Static media files (images, icons)  
**Contains:**
- `images/`: All image assets including profile photos, project images, logos
- `icons/`: Favicon and icon files

**Integration:** Referenced via relative paths in HTML and CSS

### `cv/`

**Purpose:** Resume/CV document storage  
**Contains:** PDF version of resume for download

**Integration:** Linked in hero section download button

## Entry Points

- **Main Entry:** `index.html`
  - Single-page application structure
  - All content loaded in one HTML file
  - Sections accessed via anchor links and smooth scrolling

## File Organization Patterns

- **Separation of Concerns**: HTML (structure), CSS (presentation), JS (behavior) in separate folders
- **Asset Organization**: Images organized by purpose (carousal, logo, profile)
- **Flat Structure**: No nested component folders (simple static site)
- **External Dependencies**: Libraries loaded via CDN (Three.js, Font Awesome, AOS, ScrollTrigger) with some local copies

## Key File Types

### HTML

- **Pattern:** `*.html`
- **Purpose:** Markup and structure
- **Examples:** `index.html`

### CSS

- **Pattern:** `*.css`
- **Purpose:** Styling and layout
- **Examples:** `css/style.css`, `css/animations.css`

### JavaScript

- **Pattern:** `*.js`
- **Purpose:** Interactivity and animations
- **Examples:** `js/main.js`, `js/gsap.min.js`

### Images

- **Pattern:** `*.webp`, `*.png`, `*.jpg`, `*.JPG`
- **Purpose:** Visual assets
- **Examples:** Profile pictures, project images, logos

### Configuration

- **Pattern:** `*.json`, `CNAME`
- **Purpose:** Configuration and deployment settings
- **Examples:** `js/particles.json`, `CNAME`

## Asset Locations

- **Images**: `assets/images/` (9 files: profile photos, carousel images, logos)
- **Icons**: `assets/icons/` (1 file: favicon.ico)
- **Fonts**: `fonts/` (directory exists, may contain custom fonts)
- **Documents**: `cv/` (1 PDF: resume)

## Configuration Files

- **`CNAME`**: GitHub Pages custom domain configuration (www.akshaykhandizod.com)
- **`js/particles.json`**: Particles.js configuration (legacy, partially used)

## Notes for Development

- **No Build Process**: This is a pure static site - edit files directly and refresh browser
- **CDN Dependencies**: External libraries (Three.js, Font Awesome, AOS) loaded via CDN in HTML
- **Local Libraries**: Some libraries (GSAP) have both CDN and local copies
- **Responsive Design**: CSS uses media queries for mobile responsiveness
- **Browser Compatibility**: Uses modern JavaScript (ES6+) - ensure target browsers support it
- **Performance**: Consider optimizing images (WebP format already used for carousel)
- **GitHub Pages**: Configured for deployment via GitHub Pages with custom domain

---

_Generated using BMAD Method `document-project` workflow_

