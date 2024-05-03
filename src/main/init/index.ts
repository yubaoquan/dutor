import { nativeTheme } from 'electron/main';
import { SettingKey, Theme } from '@main/constants';
import { setSetting, getSetting } from '@main/db/user-settings';

export const initTheme = () => {
  const themeFromSettings = getSetting(SettingKey.Theme);
  if (!themeFromSettings) {
    setSetting(SettingKey.Theme, nativeTheme.shouldUseDarkColors ? Theme.Dark : Theme.Light);
    return;
  }

  const case1 = nativeTheme.shouldUseDarkColors && themeFromSettings === Theme.Light;
  const case2 = !nativeTheme.shouldUseDarkColors && themeFromSettings === Theme.Dark;

  if (case1 || case2) {
    nativeTheme.themeSource = themeFromSettings;
  }
};
