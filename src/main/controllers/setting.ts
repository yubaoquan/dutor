import { RendererMessage } from '@/common/message';
import { SettingKey } from '@main/constants';
import { getSetting, setSetting } from '@main/db/user-settings';

const handleSetLanguage = ({ ipcMain }) => {
  ipcMain.handle(RendererMessage.SetLanguage, (_event, language: string) => {
    setSetting(SettingKey.Language, language);
    return language;
  });
};

const handleGetLanguage = ({ ipcMain }) => {
  ipcMain.handle(RendererMessage.GetLanguage, () => {
    const languageFromSettings = getSetting(SettingKey.Language, 'en');
    return languageFromSettings;
  });
};

export default [handleGetLanguage, handleSetLanguage];
