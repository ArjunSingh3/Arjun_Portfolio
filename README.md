# Arjun Singh — Portfolio

A personal portfolio site with a "sunset" design system: a persistent animated
gradient-sky background, glassmorphism navigation, smooth page transitions,
and custom-built timelines — all still driven by simple JSON files so content
can be updated without touching any code.

Originally based on the [Dev Portfolio](https://github.com/mayankagarwal09/dev-portfolio)
template by Mayank Agarwal (MIT licensed, see `LICENSE.md`), since substantially
redesigned and rebuilt.

## Stack

- React 18 + `react-router-dom` v5
- `styled-components` for theming and component styles
- `framer-motion` for page transitions, scroll reveals, and micro-interactions
- Data-driven content: every section fetches its copy from `public/profile/*.json` at runtime

## Getting started

```bash
# Install dependencies
npm install

# Start the dev server
npm start
```

Then open `http://localhost:3000`.

```bash
# Production build
npm run build
```

---

## Customizing content

All content lives in `public/profile/*.json` — edit these and refresh, no
rebuild of components required. Images live in `public/images/`.

### Navbar — `public/profile/navbar.json`

| key | Description |
| --- | --- |
| `logo.source` | path to the logo image shown in the nav |
| `sections` | array of nav links |
| `sections[].title` | link label |
| `sections[].href` | route (must match a `path` in `routes.json`) or external URL |
| `sections[].type` | set to `"link"` for an external link (e.g. Resume) — opens in a new tab and renders as the filled CTA pill |

### Routes — `public/profile/routes.json`

| key | Description |
| --- | --- |
| `sections[].component` | name of the component in `src/components/` to render |
| `sections[].path` | URL path for that section |
| `sections[].headerTitle` | title shown at the top of the page |

### Home — `public/profile/home.json`

| key | Description |
| --- | --- |
| `name` | your name, shown large with the gradient treatment |
| `roles` | array of strings the typewriter cycles through |

### Social links — `public/profile/social.json`

Array of `{ "network": "...", "href": "..." }`. Network names must match
[react-social-icons](https://jaketrent.github.io/react-social-icons/).

### About — `public/profile/about.json`

| key | Description |
| --- | --- |
| `about` | markdown-supported bio text |
| `imageSource` | portrait image (portrait orientation works best, ~3:4) |

### Skills — `public/profile/skills.json`

Grouped into categories, each with an array of `{ icon, title }` chips. Many
existing icons are already in `public/images/skills/`.

### Education — `public/profile/education.json`

| key | Description |
| --- | --- |
| `title` | date range shown on the badge |
| `cardTitle` | degree / program |
| `cardSubtitle` | institution |
| `cardDetailedText` | extra detail (GPA, etc.) |
| `media.source.url` | thumbnail image on the card |
| `url` | optional link (e.g. "View certificate") |

Renders as an alternating vertical timeline on desktop, single column on mobile.

### Experience — `public/profile/experiences.json`

| key | Description |
| --- | --- |
| `title` | role title |
| `subtitle` | company/organization |
| `workType` | e.g. Full-time, Internship (optional) |
| `workDescription` | array of markdown bullet points |
| `dateText` | date range badge |
| `media.source.url` | logo/image shown on the card |

### Projects — `public/profile/projects.json`

| key | Description |
| --- | --- |
| `image` | project thumbnail (optional) |
| `title` | project name |
| `bodyText` | markdown description |
| `links[]` | optional buttons (e.g. GitHub, Live) |
| `tags[]` | pill tags shown in the card footer |

---

## Customizing the look

### Colors, fonts, and design tokens

Edit `src/theme/themes.js`. There are two variants — `darkTheme` ("dusk") and
`lightTheme` ("dawn") — sharing the same token shape:

```js
export const darkTheme = {
  background: '#12101a',
  color: '#f4ece2',
  accentColor: '#ff8a5c',
  accentGradient: 'linear-gradient(120deg, #ff8a5c 0%, #ff6f91 45%, #a3548c 100%)',
  skyTop: '#171225',
  skyMid: '#4a2545',
  // ...see the file for the full token list
};
```

The animated background gradient itself lives in
`src/components/SunsetBackground.jsx` and reads `skyTop` / `skyMid` /
`skyGlowA-C` / `horizon` from the active theme, so changing those tokens
re-colors the whole backdrop.

### Fonts

Loaded via Google Fonts in `public/index.html` (`Fraunces` for headings,
`Manrope` for body text) and referenced in `src/theme/themes.js`.

### Timelines

Education and Experience both build on the shared primitives in
`src/components/timeline/TimelineParts.jsx` (the gradient line, glowing dots,
glass card shell) rather than a third-party timeline library, so both stay
visually consistent and are easy to restyle in one place.

### Page title / favicon

Edit `public/index.html` (title, meta description) and swap
`public/images/logo.png` for the favicon/nav logo.

---

## Deployment

Any static host works (Vercel, Netlify, GitHub Pages). For GitHub Pages, the
existing `gh-pages` dev dependency is wired up:

```bash
npm run deploy
```

## License

MIT — see `LICENSE.md`. Original template © Mayank Agarwal.
