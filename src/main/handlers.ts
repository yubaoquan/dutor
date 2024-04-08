import { getAllDrives, getDirs, scanDuplicatedFiles } from './fs-utils';
import { IPCMessage } from '../common/message';

export const handleGetFolders = async (ipcMain) => {
  ipcMain.handle(IPCMessage.GetFolders, async (_event, folder) => {
    const folders = folder ? await getDirs(folder) : getAllDrives();

    return folders;
  });
};

export const handleDuplicatedScanFiles = async (ipcMain) => {
  ipcMain.handle(IPCMessage.ScanDuplicatedFiles, async (_event, folderPath) => {
    const result = await scanDuplicatedFiles(folderPath);
    console.info(result);
    return result;
  });
};

export const handlePing = async (ipcMain) => {
  ipcMain.handle(
    IPCMessage.Ping,
    async () =>
      new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve('pongx');
        }, 1000);
      }),
  );
};
