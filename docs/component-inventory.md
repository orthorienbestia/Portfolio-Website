# Portfolio-Website - Component Inventory

**Date:** 2025-11-19

## Overview

This document catalogs all UI components and reusable elements in the Portfolio-Website project. As a static HTML/CSS/JavaScript site, components are implemented as HTML sections with associated CSS and JavaScript functionality.

## Component Categories

### Layout Components

#### Navigation Bar
- **Location**: `index.html` (header section)
- **Files**: `css/style.css` (`.navbar`, `.nav-links`), `js/main.js` (hamburger toggle)
- **Features**:
  - Sticky positioning
  - Responsive hamburger menu
  - Smooth scroll navigation
  - Active link highlighting
- **Dependencies**: None

#### Footer
- **Location**: `index.html` (footer section)
- **Files**: `css/style.css` (`.footer-content`, `.footer-social`)
- **Features**:
  - Social media links
  - Copyright information
- **Dependencies**: Font Awesome icons

### Hero Components

#### Hero Section
- **Location**: `index.html` (`.hero-section`)
- **Files**: `css/style.css`, `js/main.js` (animations)
- **Features**:
  - Profile image with GSAP animations
  - Animated headline text
  - Call-to-action buttons
  - Social media buttons
  - 3D particle background (Three.js)
- **Dependencies**: GSAP, Three.js (CDN), Font Awesome

#### Loading Screen
- **Location**: `index.html` (`#loading-screen`)
- **Files**: `css/style.css`, `js/main.js` (fade-out logic)
- **Features**:
  - Animated spinner
  - Fade-out on page load
- **Dependencies**: None

### Content Components

#### About Section
- **Location**: `index.html` (`#about`)
- **Files**: `css/style.css` (`.about-section`, `.about-container`)
- **Features**:
  - Profile photo
  - About text content
  - Responsive layout
- **Dependencies**: AOS (scroll animation)

#### Projects Carousel
- **Location**: `index.html` (`.image-carousel`)
- **Files**: `css/style.css`, `js/main.js` (carousel logic)
- **Features**:
  - Auto-rotating image carousel
  - Previous/Next navigation buttons
  - Indicator dots
  - Pause on hover
  - Responsive design
- **Dependencies**: GSAP (animations)

#### Project Cards
- **Location**: `index.html` (`.projects-carousel`)
- **Files**: `css/style.css` (`.project-card`)
- **Features**:
  - Project logo
  - Project title and role
  - External links (Play Store, App Store)
  - Hover effects
- **Dependencies**: AOS (scroll animation)

#### Experience Timeline
- **Location**: `index.html` (`#experience`)
- **Files**: `css/style.css` (`.timeline`, `.timeline-item`)
- **Features**:
  - Vertical timeline layout
  - Timeline dots
  - Experience entries with dates
  - Scroll animations
- **Dependencies**: AOS

#### Skills Grid
- **Location**: `index.html` (`#skills`)
- **Files**: `css/style.css` (`.skills-grid`, `.skill-category`)
- **Features**:
  - Categorized skill display
  - Icon headers
  - Responsive grid layout
- **Dependencies**: Font Awesome icons

#### Technical Expertise Grid
- **Location**: `index.html` (`#technical-expertise`)
- **Files**: `css/style.css` (`.expertise-grid`, `.expertise-category`)
- **Features**:
  - Detailed expertise categories
  - Icon-based organization
  - Scroll animations
  - Responsive grid
- **Dependencies**: Font Awesome icons, AOS

#### Certifications Grid
- **Location**: `index.html` (`#certifications`)
- **Files**: `css/style.css` (`.certifications-grid`, `.cert-card`)
- **Features**:
  - Clickable certification cards
  - External links to certificates
  - Scroll animations
  - Responsive grid
- **Dependencies**: AOS

### Interactive Components

#### Scroll-to-Top Button
- **Location**: `index.html` (`#scroll-to-top`)
- **Files**: `css/style.css`, `js/main.js` (visibility toggle, scroll logic)
- **Features**:
  - Appears after scrolling 300px
  - Smooth scroll to top
  - Fixed positioning
- **Dependencies**: None

#### Hamburger Menu
- **Location**: `index.html` (`.hamburger`)
- **Files**: `css/style.css`, `js/main.js` (toggle logic)
- **Features**:
  - Mobile navigation toggle
  - Animated hamburger icon
  - Responsive visibility
- **Dependencies**: None

## Reusable Patterns

### Button Styles
- **Classes**: `.btn`, `.btn-secondary`, `.btn-project`
- **Location**: `css/style.css`
- **Usage**: Used throughout site for CTAs and links
- **Features**: Hover effects, transitions, consistent styling

### Section Styling
- **Pattern**: All major sections follow consistent spacing and layout
- **Classes**: Section IDs with consistent padding/margin
- **Features**: Responsive design, scroll animations

### Card Pattern
- **Classes**: `.project-card`, `.cert-card`
- **Features**: Hover effects, shadow transitions, consistent padding

## Design System Elements

### Color Palette
- **Primary**: `#2e3192` (blue)
- **Secondary**: `#ffb400` (yellow/gold)
- **Background**: `#f7f8fa` (light gray)
- **Text**: `#22223b` (dark blue-gray)
- **Accent**: `#e0e7ff` (light blue)
- **Defined in**: `css/style.css` (CSS variables)

### Typography
- **Primary Font**: Poppins (Google Fonts)
- **Secondary Font**: Montserrat (Google Fonts)
- **Fallback**: Arial, sans-serif

### Spacing System
- Consistent padding/margin using rem units
- Section spacing: ~4-6rem
- Component padding: 1-2rem

### Shadows
- **Default**: `0 4px 24px rgba(46,49,146,0.08)`
- **Hover**: `0 8px 32px rgba(46,49,146,0.15)`
- **Large**: `0 20px 40px rgba(46,49,146,0.2)`

## Animation Patterns

### GSAP Animations
- Hero section entrance animations
- Scroll-triggered animations (if ScrollTrigger available)
- Scale and fade effects

### AOS (Animate On Scroll)
- Fade-up animations for sections
- Staggered animations for grid items
- Scroll-triggered visibility

### CSS Animations
- Loading spinner rotation
- Button hover transitions
- Card hover effects
- Smooth scroll behavior

## Component Dependencies

### External Libraries (CDN)
- **GSAP**: Animation library
- **Three.js**: 3D graphics for particles
- **Font Awesome**: Icon library
- **AOS**: Scroll animation library
- **ScrollTrigger**: GSAP plugin for scroll animations

### Local Files
- `js/main.js`: Core interactivity
- `css/style.css`: Main styles
- `css/animations.css`: Animation styles

## Notes for Development

- **No Component Framework**: Components are HTML/CSS/JS, not framework components
- **Reusability**: Styles can be reused via CSS classes
- **Maintainability**: Consider extracting components if site grows
- **Performance**: All animations use CSS transforms for GPU acceleration
- **Accessibility**: Ensure ARIA labels and keyboard navigation for interactive elements

---

_Generated using BMAD Method `document-project` workflow_

