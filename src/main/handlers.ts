import {
  getAllDrives,
  getDirs,
  scanDuplicatedFiles,
  batchDeleteFiles,
  selectFolder,
} from './fs-utils';
import { RendererMessage, MainMessage } from '../common/message';

const handleGetFolders = async (ipcMain) => {
  ipcMain.handle(RendererMessage.GetFolders, async (_event, folder) => {
    const folders = folder ? await getDirs(folder) : getAllDrives();

    return folders;
  });
};

const handleDuplicatedScanFiles = async ({ ipcMain, mainWindow }) => {
  ipcMain.handle(RendererMessage.ScanDuplicatedFiles, async (_event, folderPath) => {
    const result = await scanDuplicatedFiles({
      dir: folderPath,
      beforeAll(nodes) {
        mainWindow.webContents.send(MainMessage.BeforeAllHash, nodes);
      },
      afterHash(node, hash) {
        mainWindow.webContents.send(MainMessage.AfterHash, node, hash);
      },
    });
    console.info(result);
    return result;
  });
};

const handlePing = async (ipcMain) => {
  ipcMain.handle(
    RendererMessage.Ping,
    async () =>
      new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve('pongx');
        }, 1000);
      }),
  );
};

const handleBatchDeleteFiles = async (ipcMain) => {
  ipcMain.handle(RendererMessage.DeleteFiles, async (_event, filePaths: string[]) =>
    batchDeleteFiles(filePaths),
  );
};

const handleOpenDevTools = ({ ipcMain, mainWindow }) => {
  ipcMain.handle(RendererMessage.OpenDevTools, (_event, open: boolean) =>
    open ? mainWindow.webContents.openDevTools() : mainWindow.webContents.closeDevTools(),
  );
};

const handleSelectFolder = async (ipcMain) => {
  ipcMain.handle(RendererMessage.SelectFolder, () => selectFolder());
};

export const registerHandlers = ({ ipcMain, mainWindow }) => {
  handleGetFolders(ipcMain);
  handleDuplicatedScanFiles({ ipcMain, mainWindow });
  handlePing(ipcMain);
  handleBatchDeleteFiles(ipcMain);
  handleOpenDevTools({ ipcMain, mainWindow });
  handleSelectFolder(ipcMain);
};
