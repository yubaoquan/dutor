import { getAllDrives, getDirs, scanDuplicatedFiles, batchDeleteFiles } from './fs-utils';
import { IPCMessage, MainMessage } from '../common/message';

const handleGetFolders = async (ipcMain) => {
  ipcMain.handle(IPCMessage.GetFolders, async (_event, folder) => {
    const folders = folder ? await getDirs(folder) : getAllDrives();

    return folders;
  });
};

const handleDuplicatedScanFiles = async ({ ipcMain, mainWindow }) => {
  ipcMain.handle(IPCMessage.ScanDuplicatedFiles, async (_event, folderPath) => {
    const result = await scanDuplicatedFiles({
      dir: folderPath,
      beforeHash(node) {
        mainWindow.webContents.send(MainMessage.BeforeHash, node.name);
      },
      afterHash(node, hash) {
        mainWindow.webContents.send(MainMessage.AfterHash, node.name, hash);
      },
    });
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

const handleOpenDevTools = ({ ipcMain, mainWindow }) => {
  ipcMain.handle(IPCMessage.OpenDevTools, (_event, open: boolean) =>
    open ? mainWindow.webContents.openDevTools() : mainWindow.webContents.closeDevTools(),
  );
};

export const registerHandlers = ({ ipcMain, mainWindow }) => {
  handleGetFolders(ipcMain);
  handleDuplicatedScanFiles({ ipcMain, mainWindow });
  handlePing(ipcMain);
  handleBatchDeleteFiles(ipcMain);
  handleOpenDevTools({ ipcMain, mainWindow });
};
