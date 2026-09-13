import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    color-scheme: ${({ theme }) => (theme.mode === 'dusk' ? 'dark' : 'light')};
  }

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    font-family: ${({ theme }) => theme.fontBody};
    transition: background 0.6s ease, color 0.6s ease;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fontHeading};
    font-weight: 600;
    letter-spacing: -0.01em;
    margin: 0;
  }

  p {
    line-height: 1.7;
  }

  a {
    color: inherit;
  }

  ::selection {
    background: ${({ theme }) => theme.selectionBg};
    color: ${({ theme }) => theme.color};
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.accentColor};
    outline-offset: 3px;
    border-radius: 4px;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.scrollbarTrack};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.accentGradient};
    border-radius: 999px;
    border: 2px solid ${({ theme }) => theme.scrollbarTrack};
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.accentColor} ${({ theme }) => theme.scrollbarTrack};
  }
`;

export default GlobalStyles;
