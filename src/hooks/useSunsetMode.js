import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'portfolio-sunset-mode';

function getInitialMode() {
  if (typeof window === 'undefined') return 'dusk';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'dusk' || stored === 'dawn') return stored;
  } catch (err) {
    // localStorage unavailable (private browsing, etc.) - fall through to default
  }
  return 'dusk';
}

export default function useSunsetMode() {
  const [mode, setMode] = useState(getInitialMode);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch (err) {
      // ignore write failures
    }
  }, [mode]);

  const toggle = useCallback(() => {
    setMode((current) => (current === 'dusk' ? 'dawn' : 'dusk'));
  }, []);

  return { mode, isDusk: mode === 'dusk', toggle };
}
