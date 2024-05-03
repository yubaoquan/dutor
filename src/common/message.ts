/** 前端向后端发送的消息 */
export const enum RendererMessage {
  AddUser = 'add-user',
  CheckUserExists = 'check-user-exists',
  DeleteFiles = 'delete-files',
  GetIsDark = 'get-is-dark',
  GetLanguage = 'get-language',
  GetUsers = 'get-users',
  Login = 'login',
  OpenDevTools = 'open-dev-tools',
  OpenFolder = 'open-folder',
  ScanDuplicatedFiles = 'scan-duplicated-files',
  SelectFolder = 'select-folder',
  SetLanguage = 'set-language',
  ThemeToggle = 'theme-toggle',
}

/** 后端向前端发送的消息 */
export const enum MainMessage {
  AfterHash = 'after-hash',
  BeforeAllHash = 'before-all-hash',
  BeforeHash = 'before-hash',
}
