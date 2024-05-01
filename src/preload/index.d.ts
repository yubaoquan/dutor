import type { User } from '@/common/types'
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
    getUsers: () => Promise<User[]>
    addUser: (user: User) => Promise<boolean>
    checkUserExists: (name: string) => Promise<boolean>
    login: (name: string, password: string) => Promise<{ success: boolean; message: string }>
  }
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: API
  }
}
