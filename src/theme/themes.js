// Sunset-inspired design tokens.
// "dusk" is the deep evening variant (default), "dawn" is the soft morning variant.
// Both share the same warm, sunset-derived palette so the site feels like one
// continuous piece regardless of which mode the visitor lands on.

const shared = {
  fontHeading: "'Fraunces', 'Georgia', serif",
  fontBody: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  radiusSm: '10px',
  radiusMd: '16px',
  radiusLg: '26px',
  maxContentWidth: '1080px',
};

export const darkTheme = {
  ...shared,
  mode: 'dusk',
  background: '#12101a',
  backgroundElevated: '#181521',
  color: '#f4ece2',
  secondaryText: '#b9aec2',
  mutedText: '#8b8098',

  accentColor: '#ff8a5c',
  accentColorAlt: '#ffc178',
  accentColorDeep: '#c85c8e',
  accentGradient: 'linear-gradient(120deg, #ff8a5c 0%, #ff6f91 45%, #a3548c 100%)',

  skyTop: '#171225',
  skyMid: '#4a2545',
  skyGlowA: '#ff8a5c',
  skyGlowB: '#ff5f7e',
  skyGlowC: '#5b3a8c',
  horizon: '#0e0c16',

  cardBackground: 'rgba(255, 255, 255, 0.045)',
  cardBackgroundHover: 'rgba(255, 255, 255, 0.075)',
  cardBorderColor: 'rgba(255, 255, 255, 0.09)',
  cardFooterBackground: 'rgba(255, 255, 255, 0.03)',
  glassBlur: '18px',
  shadowColor: 'rgba(10, 6, 20, 0.55)',

  navBackground: 'rgba(18, 16, 26, 0.6)',
  navBorder: 'rgba(255, 255, 255, 0.08)',
  navbarTheme: {
    linkColor: '#d9cfe0',
    linkHoverColor: '#ffffff',
    linkActiveColor: '#ffffff',
  },

  timelineLineColor: 'rgba(255, 138, 92, 0.35)',
  socialIconBgColor: '#f4ece2',
  chipBackground: 'rgba(255, 138, 92, 0.14)',
  chipColor: '#ffcaa8',
  scrollbarTrack: '#1a1724',
  selectionBg: 'rgba(255, 138, 92, 0.35)',
};

export const lightTheme = {
  ...shared,
  mode: 'dawn',
  background: '#fff6ee',
  backgroundElevated: '#fffaf4',
  color: '#2c2130',
  secondaryText: '#6a5a68',
  mutedText: '#8c7c88',

  accentColor: '#e8683f',
  accentColorAlt: '#f0a04b',
  accentColorDeep: '#b8456e',
  accentGradient: 'linear-gradient(120deg, #f0a04b 0%, #e8683f 45%, #b8456e 100%)',

  skyTop: '#fef1e6',
  skyMid: '#ffd6c2',
  skyGlowA: '#ffb27a',
  skyGlowB: '#ff8fa3',
  skyGlowC: '#c893c9',
  horizon: '#fff6ee',

  cardBackground: 'rgba(255, 255, 255, 0.55)',
  cardBackgroundHover: 'rgba(255, 255, 255, 0.8)',
  cardBorderColor: 'rgba(44, 33, 48, 0.08)',
  cardFooterBackground: 'rgba(44, 33, 48, 0.03)',
  glassBlur: '18px',
  shadowColor: 'rgba(120, 70, 60, 0.16)',

  navBackground: 'rgba(255, 246, 238, 0.65)',
  navBorder: 'rgba(44, 33, 48, 0.08)',
  navbarTheme: {
    linkColor: '#5b4a56',
    linkHoverColor: '#2c2130',
    linkActiveColor: '#2c2130',
  },

  timelineLineColor: 'rgba(232, 104, 63, 0.35)',
  socialIconBgColor: '#2c2130',
  chipBackground: 'rgba(232, 104, 63, 0.1)',
  chipColor: '#b8452a',
  scrollbarTrack: '#ffe9d9',
  selectionBg: 'rgba(232, 104, 63, 0.25)',
};
