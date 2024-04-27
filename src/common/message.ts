/** 前端向后端发送的消息 */
export const enum RendererMessage {
  Ping = 'ping',
  GetFolders = 'get-folders',
  ScanDuplicatedFiles = 'scan-duplicated-files',
  DeleteFiles = 'delete-files',
  OpenDevTools = 'open-dev-tools',
  SelectFolder = 'select-folder',
  OpenFolder = 'open-folder',
  ThemeToggle = 'theme-toggle',
  GetIsDark = 'get-is-dark',
  GetUsers = 'get-users',
  AddUser = 'add-user',
  CheckUserExists = 'check-user-exists',
}

/** 后端向前端发送的消息 */
export const enum MainMessage {
  BeforeHash = 'before-hash',
  AfterHash = 'after-hash',
  BeforeAllHash = 'before-all-hash',
}
