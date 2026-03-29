# So Nigerian — Podcast Website

Website for the **So Nigerian Podcast** hosted by Dami Aros & Isaac Aigbadumah.

## Stack
- React (single codebase, route-guarded admin)
- Supabase / Firebase (database, auth, media storage)
- Responsive design (desktop, tablet, mobile)

## Site Structure (Hybrid)
- **Homepage** `/` — sectional scroll (hero, marquee, featured episode, episodes teaser, about, dilemma preview, contact, footer)
- **Episodes** `/episodes` — full catalogue with search + tag filters
- **Episode Detail** `/episodes/:slug` — show notes, player, platform links
- **Dilemma** `/dilemma` — active poll + archive
- **Admin** `/admin` — route-guarded CMS (episodes CRUD, dilemma mgmt, content, messages)

## Design
- Color palette: Deep Green `#1F6B3A`, Bright Green `#3FAE5A`, Warm Sand `#BFA27A`, Steel Blue `#5E6F73`, Off-White `#F4EFE7`, Charcoal `#2E2A28`
- Typography: Cormorant Garamond (display) + Outfit (body)
- Navbar: Center-expand underline hover + shrink/glassmorphism on scroll
- Mobile: Slide-in panel from right

## Mockups
- `mockups/v1-skeleton.html` — initial skeleton
- `mockups/v2-navbar.html` — navbar with scroll behavior
- `mockups/v3-hero-luxury.html` — luxury hero section

## Status
🔲 Mockup phase (in progress)
