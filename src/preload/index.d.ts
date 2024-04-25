import { ElectronAPI } from '@electron-toolkit/preload'

type API = {
  openDevTools: (open: boolean) => void
  listenFromMain: (channel: string, listener: (...args: any[]) => void) => void
  toggleTheme: () => Promise<boolean>
  getIsDark: () => Promise<boolean>
  dutor: {
    getFolders: (dir?: string) => Promise<any[]>
    scanDuplicatedFiles: (dir: string[]) => Promise<any[]>
    deleteFiles: (files: string[]) => Promise<boolean>
    selectFolder: () => Promise<string[]>
    openFolder: (folder: string) => void
  },
  user: {
    getUsers: () => Promise<any[]>
    addUser: (user: any) => Promise<boolean>
  }
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: API
  }
}
