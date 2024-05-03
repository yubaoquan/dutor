import Store from 'electron-store';
import { SETTINGS_ENCRYPTION_KEY } from './constants';

const store = new Store({
  encryptionKey: SETTINGS_ENCRYPTION_KEY,
});

export const getSetting = (key: string, defaultValue?: any) => store.get(key, defaultValue);
export const setSetting = (key: string, value: any) => store.set(key, value);
