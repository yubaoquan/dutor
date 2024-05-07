import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import type { Pagination, TagsQuery } from '@/common/types';
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
  getLanguage: () => ipcRenderer.invoke(RendererMessage.GetLanguage),
  setLanguage: (language: string) => ipcRenderer.invoke(RendererMessage.SetLanguage, language),
  dutor: {
    scanDuplicatedFiles: (folders: string[]) =>
      ipcRenderer.invoke(RendererMessage.ScanDuplicatedFiles, folders),
    deleteFiles: (files: string[]) => ipcRenderer.invoke(RendererMessage.DeleteFiles, files),
    selectFolder: () => ipcRenderer.invoke(RendererMessage.SelectFolder),
    openFolder: (folder: string) => ipcRenderer.invoke(RendererMessage.OpenFolder, folder),
  },
  user: {
    getUsers: (conditions: any) => ipcRenderer.invoke(RendererMessage.GetUsers, conditions),
    addUser: (user: any) => ipcRenderer.invoke(RendererMessage.AddUser, user),
    checkUserExists: (name: string) => ipcRenderer.invoke(RendererMessage.CheckUserExists, name),
    login: (name: string, password: string) =>
      ipcRenderer.invoke(RendererMessage.Login, name, password),
  },
  blog: {
    addBlog: (blog: any) => ipcRenderer.invoke(RendererMessage.AddBlog, blog),
    addTag: (tag: string) => ipcRenderer.invoke(RendererMessage.AddTag, tag),
    deleteBlogById: (id: number) => ipcRenderer.invoke(RendererMessage.DeleteBlog, id),
    deleteTag: (tag: string) => ipcRenderer.invoke(RendererMessage.DeleteTag, tag),
    getBlogs: (conditions: any, pagination?: Pagination) =>
      ipcRenderer.invoke(RendererMessage.GetBlogs, conditions, pagination),
    getTags: (query: TagsQuery) => ipcRenderer.invoke(RendererMessage.GetTags, query),
    updateBlog: (blog: any) => ipcRenderer.invoke(RendererMessage.UpdateBlog, blog),
    getDetail: (id: number) => ipcRenderer.invoke(RendererMessage.GetBlogDetail, id),
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
