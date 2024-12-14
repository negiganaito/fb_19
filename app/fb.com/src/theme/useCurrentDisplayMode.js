import { useContext } from 'react';
import { BaseThemeDisplayModeContext } from '@fb-contexts/BaseThemeDisplayModeContext';

const defaultTheme = 'light';

export function useCurrentDisplayMode() {
  const mode = useContext(BaseThemeDisplayModeContext);

  return mode ?? defaultTheme;
}
