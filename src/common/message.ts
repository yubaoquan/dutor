/** 前端向后端发送的消息 */
export const enum IPCMessage {
  Ping = 'ping',
  GetFolders = 'get-folders',
  ScanDuplicatedFiles = 'scan-duplicated-files',
  DeleteFiles = 'delete-files',
  OpenDevTools = 'open-dev-tools',
}

/** 后端向前端发送的消息 */
export const enum MainMessage {
  BeforeHash = 'before-hash',
  AfterHash = 'after-hash',
}
