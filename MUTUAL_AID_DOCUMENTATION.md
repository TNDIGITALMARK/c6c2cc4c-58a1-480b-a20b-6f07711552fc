# Mutual Aid Landing Page - Documentation

## Overview

A modern, interactive single-page landing site for a mutual aid organization, built with Next.js 15, React 19, TypeScript, and Tailwind CSS. Features scroll-triggered animations, parallax effects, interactive elements, and a comprehensive quiz system.

## Design System

### Color Palette
- **Primary (Dark Blue)**: `#004467` - Used for headings, primary elements
- **Accent (Yellow)**: `#f6b025` - Used for CTAs, highlights, energy
- **Background**: White `#FFFFFF`
- **Text**: Black `#000000`
- **Light Blue-Grey**: `#e8f4f8` - Used for section backgrounds

### Typography
- **Headings**: Poppins (Bold, 700-900 weight)
- **Body Text**: Inter (Regular, 400-600 weight)
- **Base Size**: 16px with 1.6 line-height

### Spacing & Layout
- Sections maintain minimum 100vh height where appropriate
- Consistent padding: 4-8rem vertical, responsive horizontal
- Border radius: 0.75rem for modern, friendly feel

## Page Structure

### 1. Main Landing Page (`/`)
Complete single-page experience with:
- **Header**: Fixed navigation with 7 anchors + Quiz CTA button
- **Hero**: Parallax animations, mouse-follow effects, community stats
- **Timeline**: Historical journey (1800 → Today) with scroll animations
- **Our Mutual Aid**: Interactive cards explaining mutual aid types
- **Benefits**: 4 benefit cards with hover effects
- **Background Video Section**: Animated gradient with scroll effects
- **Testimonials**: Rotating carousel of community stories
- **Quiz**: Multi-step interactive questionnaire
- **Footer**: Contact info, links, newsletter signup

### 2. Quiz Results Page (`/quiz-results`)
- Personalized recommendations based on quiz responses
- Action plans tailored to user interests and availability
- Social sharing and PDF download options
- Email confirmation display

### 3. Community Impact Dashboard (`/dashboard`)
- Real-time metrics: volunteers, meals, resources, families housed
- Active initiatives with participant counts
- Success stories timeline
- Call-to-action to get involved

## Component Architecture

### Core Components (`/src/components/mutual-aid/`)

#### Header
- Sticky header with transparent → solid transition on scroll
- Active section highlighting
- Mobile hamburger menu
- Smooth scroll navigation

#### Hero
- Mouse-follow parallax effects on decorative elements
- Scroll-based opacity and position animations
- Community stats showcase
- Dual CTA buttons

#### Timeline
- Intersection Observer for scroll-triggered animations
- Alternating left/right layout on desktop
- Stacked mobile view
- Year markers with gradient backgrounds

#### MutualAidSection
- Hover-activated expandable cards
- Animated icon containers
- Color-coded categories
- Integrated CTA section

#### Benefits
- 4-column grid (responsive)
- Hover effects: scale, shadow, color transitions
- Icon-based visual hierarchy
- Staggered animation entrance

#### BackgroundVideo
- Animated gradient as video placeholder
- Scroll-progress-based opacity/scale
- Floating decorative elements
- Overlay content support

#### Testimonials
- Auto-rotating carousel (5s intervals)
- Manual navigation dots
- Secondary testimonial grid
- Quote styling with emoji avatars

#### Quiz
- Multi-step form with progress tracking
- Question types: multiple choice, checkbox, slider
- Email capture on completion
- localStorage for result persistence

#### Footer
- 4-column grid layout
- Social media links
- Contact information
- Newsletter signup form

## Key Features

### Animations & Interactions
1. **Scroll-Triggered Animations**: Elements fade/slide in as they enter viewport
2. **Parallax Effects**: Mouse-follow and scroll-based parallax on Hero
3. **Hover States**: Scale, shadow, color transitions on interactive elements
4. **Smooth Scrolling**: Anchor navigation with smooth behavior
5. **Progress Indicators**: Visual feedback for quiz completion

### Responsive Design
- Mobile-first approach
- Breakpoints: 480px, 768px, 1024px, 1280px
- Touch-friendly interactions (44px minimum targets)
- Reduced animations on mobile for performance
- Collapsible mobile menu

### Accessibility
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- `prefers-reduced-motion` support
- High contrast mode compatibility
- Proper heading hierarchy

### Performance Optimizations
- Component-level code splitting
- Intersection Observer for lazy animations
- CSS-based animations (GPU accelerated)
- Optimized font loading
- Responsive images support

## Technology Stack

- **Framework**: Next.js 15.5.2 (App Router)
- **React**: 19.1.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4 + Custom CSS
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Poppins, Inter)
- **State Management**: React hooks + localStorage

## File Structure

```
src/
├── app/
│   ├── (landing)/
│   │   └── page.tsx              # Main landing (duplicate of root)
│   ├── dashboard/
│   │   └── page.tsx              # Community impact dashboard
│   ├── quiz-results/
│   │   └── page.tsx              # Quiz results & recommendations
│   ├── page.tsx                  # Root landing page
│   ├── layout.tsx                # Root layout with providers
│   └── globals.css               # Global styles & design system
├── components/
│   └── mutual-aid/
│       ├── Header.tsx
│       ├── Hero.tsx
│       ├── Timeline.tsx
│       ├── MutualAidSection.tsx
│       ├── Benefits.tsx
│       ├── BackgroundVideo.tsx
│       ├── Testimonials.tsx
│       ├── Quiz.tsx
│       ├── Footer.tsx
│       └── index.ts              # Component exports
```

## Development Workflow

### Running Locally
```bash
npm run dev         # Start development server (port 4006)
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint checks
```

### Environment Variables
No external APIs or environment variables required for core functionality.

### Browser Support
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization Guide

### Changing Colors
Edit CSS variables in `src/app/globals.css`:
```css
:root {
  --primary: 199 100% 20%;      /* Dark Blue */
  --accent: 41 91% 56%;         /* Yellow */
  /* ...other colors */
}
```

### Adding New Sections
1. Create component in `/src/components/mutual-aid/`
2. Import and add to `page.tsx`
3. Update navigation in `Header.tsx`
4. Add scroll trigger logic if needed

### Modifying Quiz Questions
Edit the `questions` array in `Quiz.tsx`:
```typescript
const questions: Question[] = [
  {
    id: 'unique-id',
    question: 'Your question text',
    type: 'multiple' | 'checkbox' | 'slider',
    options: [...],  // for multiple/checkbox
  },
  // ... more questions
];
```

### Updating Content
All content is hardcoded in components. Key files:
- Timeline: `Timeline.tsx` → `timelineData`
- Testimonials: `Testimonials.tsx` → `testimonials`
- Benefits: `Benefits.tsx` → `benefits`
- Stats: `Hero.tsx` → stats array

## Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Other Platforms
- Build command: `npm run build`
- Output directory: `.next`
- Node version: 20.x or higher

## Future Enhancements

### Potential Additions
1. **Real Video Integration**: Replace BackgroundVideo gradient with actual video
2. **CMS Integration**: Connect to Strapi/Contentful for dynamic content
3. **Email Integration**: Connect quiz to Mailchimp/SendGrid
4. **Analytics**: Add Google Analytics or Plausible
5. **Internationalization**: i18n support for multiple languages
6. **User Accounts**: Allow users to save quiz results, track involvement
7. **Event Calendar**: Show upcoming mutual aid events
8. **Resource Library**: Downloadable guides and materials

### Performance Improvements
- Image optimization with next/image
- Route prefetching
- Service worker for offline support
- WebP image formats

## Troubleshooting

### Common Issues

**Animations not working**:
- Check if user has `prefers-reduced-motion` enabled
- Verify Intersection Observer browser support
- Check console for JavaScript errors

**Layout issues on mobile**:
- Clear browser cache
- Test on actual device (not just DevTools)
- Check for conflicting CSS

**Quiz not saving results**:
- Ensure localStorage is available
- Check browser privacy settings
- Verify results page route is correct

## License

This project is built as a demonstration of modern web development practices for mutual aid organizations.

## Contact

For questions or support regarding this implementation, refer to the documentation or create an issue in the project repository.

---

**Built with ❤️ for community empowerment**
