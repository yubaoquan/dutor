import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { RendererMessage } from '../common/message';

// Custom APIs for renderer
const api = {
  openDevTools: (open: boolean) => ipcRenderer.invoke(RendererMessage.OpenDevTools, open),
  listenFromMain: (channel: string, listener: (...args: any[]) => void) => {
    ipcRenderer.on(channel, (_, ...args) => {
      listener(...args);
    });
  },
  toggleTheme: () => ipcRenderer.invoke(RendererMessage.ThemeToggle),
  getIsDark: () => ipcRenderer.invoke(RendererMessage.GetIsDark),
  dutor: {
    getFolders: (folder: string) => ipcRenderer.invoke(RendererMessage.GetFolders, folder),
    scanDuplicatedFiles: (folders: string[]) =>
      ipcRenderer.invoke(RendererMessage.ScanDuplicatedFiles, folders),
    deleteFiles: (files: string[]) => ipcRenderer.invoke(RendererMessage.DeleteFiles, files),
    selectFolder: () => ipcRenderer.invoke(RendererMessage.SelectFolder),
    openFolder: (folder: string) => ipcRenderer.invoke(RendererMessage.OpenFolder, folder),
  },
  user: {
    getUsers: (conditions: any) => ipcRenderer.invoke(RendererMessage.GetUsers, conditions),
    addUser: (user: any) => ipcRenderer.invoke(RendererMessage.AddUser, user),
  },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;

  // @ts-ignore (define in dts)
  window.api = api;
}
