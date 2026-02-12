# AI Internship Recommendation Engine Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern educational platforms like Coursera and LinkedIn Learning, combined with government portal aesthetics to maintain familiarity with the official PM Internship Scheme portal.

## Core Design Elements

### Color Palette
**Light Mode:**
- Primary: 220 85% 25% (Deep government blue)
- Secondary: 35 85% 55% (Warm orange for CTAs)
- Background: 0 0% 98% (Soft white)
- Surface: 0 0% 100% (Pure white for cards)

**Dark Mode:**
- Primary: 220 70% 65% (Lighter blue)
- Secondary: 35 80% 60% (Bright orange)
- Background: 220 15% 8% (Deep navy)
- Surface: 220 10% 12% (Card surfaces)

### Typography
- **Primary Font**: Inter (Google Fonts) - Clean, readable for UI text
- **Display Font**: Poppins (Google Fonts) - For headings and hero text
- **Sizes**: Text-sm (14px), text-base (16px), text-lg (18px), text-xl (20px), text-2xl (24px)

### Layout System
**Spacing Units**: Tailwind units of 2, 4, 6, 8, 12, 16
- Micro spacing: p-2, m-2 (8px)
- Component spacing: p-4, m-4 (16px)
- Section spacing: p-8, m-8 (32px)
- Large spacing: p-12, m-12 (48px)

### Component Library

**Navigation & Headers:**
- Sticky header with glassmorphism effect
- Animated hamburger menu for mobile
- Language switcher with flag icons
- Theme toggle with sun/moon icons

**Forms & Inputs:**
- Multi-step form with progress indicator
- Animated input fields with floating labels
- Skill chips with spring animations
- Card-based selection interfaces

**Data Display:**
- Horizontal internship cards with hover animations
- Profile completion progress rings
- Interactive location selection maps
- Recommendation confidence indicators

**Interactive Elements:**
- Glassmorphism modals with backdrop blur
- Staggered card animations on page load
- Bouncy skill chip interactions
- Smooth page transitions with Framer Motion

**Animations:**
- Page transitions: Slide and fade (300ms)
- Card hover: Scale 1.02 with shadow increase
- Button interactions: Scale 0.98 on press
- Modal animations: Scale from center with backdrop fade
- Skill chips: Spring-based pop animations

### Accessibility Features
- High contrast ratios (4.5:1 minimum)
- Touch-friendly targets (44px minimum)
- Clear focus indicators
- Screen reader optimized labels
- Keyboard navigation support

### Mobile Optimization
- Touch-first interaction design
- Swipeable card interfaces
- Bottom sheet modals for mobile
- Thumb-friendly navigation zones
- Optimized keyboard layouts

### Images
**Hero Section:**
- Large banner image showcasing diverse young professionals in tech/business settings
- Overlay with subtle gradient for text readability
- Animated SVG illustrations of career paths

**Profile Setup:**
- Icon-based illustrations for each step
- Animated mascot character guiding users
- Industry-specific imagery for skill categories

**Background Elements:**
- Subtle geometric patterns
- Glassmorphism elements throughout
- Government scheme branding integration

This design system prioritizes visual engagement over text-heavy interfaces, ensuring accessibility for users with varying digital literacy levels while maintaining the professional credibility expected from a government scheme portal.