import { CometDarkMode } from './CometDarkMode';

export const CometDarkModeStateProvider = makeCometDarkModeStateProvider({
  getDarkModeSetting: CometDarkMode.getDarkModeSetting,
  saveDarkModeSetting: CometDarkMode.saveDarkModeSetting,
});
