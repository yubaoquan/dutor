import { RendererMessage } from '@/common/message';
import { nativeTheme } from 'electron/main';
import { SettingKey, Theme } from '@main/constants';
import { setSetting, getSetting } from '@main/db/user-settings';

const handleThemeToggle = ({ ipcMain }) => {
  ipcMain.handle(RendererMessage.ThemeToggle, () => {
    const themeFromSettings = getSetting(SettingKey.Theme);
    let newTheme;
    if (themeFromSettings) {
      newTheme = themeFromSettings === Theme.Light ? Theme.Dark : Theme.Light;
    } else {
      newTheme = nativeTheme.shouldUseDarkColors ? Theme.Light : Theme.Dark;
    }
    setSetting(SettingKey.Theme, newTheme);
    nativeTheme.themeSource = newTheme;

    return nativeTheme.shouldUseDarkColors;
  });
};

const handleGetIsDark = ({ ipcMain }) => {
  ipcMain.handle(RendererMessage.GetIsDark, () => {
    const themeFromSettings = getSetting(SettingKey.Theme);
    return themeFromSettings ? themeFromSettings === Theme.Dark : nativeTheme.shouldUseDarkColors;
  });
};

export default [handleThemeToggle, handleGetIsDark];
