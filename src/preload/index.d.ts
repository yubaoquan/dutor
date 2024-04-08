import { ElectronAPI } from '@electron-toolkit/preload'

type API = {
  ping: () => Promise<string>
  getFolders: (dir?: string) => Promise<any[]>
  scanDuplicatedFiles: (dir: string) => Promise<any[]>
  deleteFiles: (files: string[]) => Promise<boolean>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: API
  }
}
