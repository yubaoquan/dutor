/** 前端向后端发送的消息 */
export const enum RendererMessage {
  AddBlog = 'add-blog',
  AddTag = 'AddTag',
  AddUser = 'add-user',
  CheckUserExists = 'check-user-exists',
  DeleteBlog = 'DeleteBlog',
  DeleteFiles = 'delete-files',
  DeleteTag = 'DeleteTag',
  GetBlogDetail = 'GetBlogDetail',
  GetBlogs = 'get-blogs',
  GetIsDark = 'get-is-dark',
  GetLanguage = 'get-language',
  GetTags = 'get-tags',
  GetUsers = 'get-users',
  Login = 'login',
  OpenDevTools = 'open-dev-tools',
  OpenFolder = 'open-folder',
  ScanDuplicatedFiles = 'scan-duplicated-files',
  SelectFolder = 'select-folder',
  SetLanguage = 'set-language',
  ThemeToggle = 'theme-toggle',
  UpdateBlog = 'UpdateBlog',
}

/** 后端向前端发送的消息 */
export const enum MainMessage {
  AfterHash = 'after-hash',
  BeforeAllHash = 'before-all-hash',
  BeforeHash = 'before-hash',
}
