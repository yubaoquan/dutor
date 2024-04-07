import { ElectronAPI } from '@electron-toolkit/preload'

type API = {
  ping: () => Promise<string>
  getFolders: (dir?: string) => Promise<any[]>
  scanDuplicatedFiles: (dir: string) => Promise<any[]>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: API
  }
}
