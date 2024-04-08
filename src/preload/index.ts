import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { IPCMessage } from '../common/message';

// Custom APIs for renderer
const api = {
  ping: () => ipcRenderer.invoke(IPCMessage.Ping),
  getFolders: (folder: string) => ipcRenderer.invoke(IPCMessage.GetFolders, folder),
  scanDuplicatedFiles: (folder: string) =>
    ipcRenderer.invoke(IPCMessage.ScanDuplicatedFiles, folder),
  deleteFiles: (files: string[]) => ipcRenderer.invoke(IPCMessage.DeleteFiles, files),
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
