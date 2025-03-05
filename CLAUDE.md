# Personal Website Development Guidelines

## Project Overview
Personal website for Salmaan Nusrath at salmaannusrath.me featuring a resume and notes section with dark/light mode toggle.

## Build Commands
- No build tools required, plain HTML/CSS/JS
- Test locally by opening index.html in browser

## Code Style Guidelines
- HTML: Use indentation of 2 spaces
- CSS: Include vendor prefixes for cross-browser compatibility
- JavaScript:
  - Use camelCase for variables and functions
  - Use ES6 features like arrow functions and template literals
  - Document complex GSAP animations with comments

## File Structure
- index.html - Resume page
- notes.html - Book notes collection
- script.js - GSAP animations and dark mode functionality
- img/ - SVG and MP4 assets for the site

## Animations
- All animations use GSAP library
- Avoid markers in production (currently on line 26 in script.js)
- Keep delays under 1.5s for better user experience

## Dark Mode
- Implement using localStorage to persist user preference
- Use CSS variables for theming colors
- Include proper image/video switching for dark/light modes

## Responsive Design
- Support at least three breakpoints:
  - Desktop: > 1199px
  - Tablet: 800px-1199px
  - Mobile: < 799px

## Best Practices
- Verify accessibility: all interactive elements must be keyboard navigable
- Optimize image/video assets before adding to repo
- Keep animation performance in mind (use will-change property sparingly)
- Test dark mode toggle thoroughly