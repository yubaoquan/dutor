import type { User, CommonResponse } from '@/common/types'
import { ElectronAPI } from '@electron-toolkit/preload'

type API = {
  openDevTools: (open: boolean) => void
  listenFromMain: (channel: string, listener: (...args: any[]) => void) => void
  toggleTheme: () => Promise<boolean>
  getIsDark: () => Promise<boolean>
  getLanguage: () => Promise<string>
  setLanguage: (language: string) => void
  dutor: {
    scanDuplicatedFiles: (dir: string[]) => Promise<any[]>
    deleteFiles: (files: string[]) => Promise<boolean>
    selectFolder: () => Promise<string[]>
    openFolder: (folder: string) => void
  },
  user: {
    getUsers: () => Promise<User[]>
    addUser: (user: User) => Promise<boolean>
    checkUserExists: (name: string) => Promise<boolean>
    login: (name: string, password: string) => Promise<{ success: boolean; message: string, user?: { name: string, id: string } }>
  },
  blog: {
    addBlog: (blog: Blog) => Promise<Blog>
    addTag: (tag: string) => Promise<string>
    deleteBlogById: (id: number) => Promise<boolean>
    deleteTag: (tag: string) => Promise<boolean>
    getBlogs: (query: BlogQuery, pagination?: Pagination) => Promise<CommonResponse<{blogs: Blog[], total: number}>>
    getTags: (query: TagsQuery) => Promise<CommonResponse<{name: string; isPublic: boolean}[]>>
    updateBlog: (blog: Blog) => Promise<Blog>
    getDetail: (id: number) => Promise<Blog>
  }
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: API
  }
}
