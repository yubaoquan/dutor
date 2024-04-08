import { getAllDrives, getDirs, scanDuplicatedFiles, batchDeleteFiles } from './fs-utils';
import { IPCMessage } from '../common/message';

const handleGetFolders = async (ipcMain) => {
  ipcMain.handle(IPCMessage.GetFolders, async (_event, folder) => {
    const folders = folder ? await getDirs(folder) : getAllDrives();

    return folders;
  });
};

const handleDuplicatedScanFiles = async (ipcMain) => {
  ipcMain.handle(IPCMessage.ScanDuplicatedFiles, async (_event, folderPath) => {
    const result = await scanDuplicatedFiles(folderPath);
    console.info(result);
    return result;
  });
};

const handlePing = async (ipcMain) => {
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

const handleBatchDeleteFiles = async (ipcMain) => {
  ipcMain.handle(IPCMessage.DeleteFiles, async (_event, filePaths: string[]) =>
    batchDeleteFiles(filePaths),
  );
};

export const registerHandlers = (ipcMain) => {
  handleGetFolders(ipcMain);
  handleDuplicatedScanFiles(ipcMain);
  handlePing(ipcMain);
  handleBatchDeleteFiles(ipcMain);
};
