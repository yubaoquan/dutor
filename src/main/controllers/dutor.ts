import { nativeTheme } from 'electron/main';
import { RendererMessage, MainMessage } from '@/common/message';
import {
  getAllDrives,
  getDirs,
  scanDuplicatedFiles,
  batchDeleteFiles,
  selectFolder,
  openFolder,
} from '../services/file';

const handleGetFolders = ({ ipcMain }) => {
  ipcMain.handle(RendererMessage.GetFolders, async (_event, folder) => {
    const folders = folder ? await getDirs(folder) : getAllDrives();

    return folders;
  });
};

const handleDuplicatedScanFiles = ({ ipcMain, mainWindow }) => {
  ipcMain.handle(RendererMessage.ScanDuplicatedFiles, async (_event, folderPaths) => {
    const result = await scanDuplicatedFiles({
      dirs: folderPaths,
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

const handleBatchDeleteFiles = ({ ipcMain }) => {
  ipcMain.handle(RendererMessage.DeleteFiles, async (_event, filePaths: string[]) =>
    batchDeleteFiles(filePaths),
  );
};

const handleOpenDevTools = ({ ipcMain, mainWindow }) => {
  ipcMain.handle(RendererMessage.OpenDevTools, (_event, open: boolean) =>
    open ? mainWindow.webContents.openDevTools() : mainWindow.webContents.closeDevTools(),
  );
};

const handleSelectFolder = ({ ipcMain }) => {
  ipcMain.handle(RendererMessage.SelectFolder, () => selectFolder());
};

const handleOpenFolder = ({ ipcMain }) => {
  ipcMain.handle(RendererMessage.OpenFolder, (_event, folderPath: string) =>
    openFolder(folderPath),
  );
};

const handleThemeToggle = ({ ipcMain }) => {
  ipcMain.handle(RendererMessage.ThemeToggle, async () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light';
    } else {
      nativeTheme.themeSource = 'dark';
    }
    return nativeTheme.shouldUseDarkColors;
  });
};

const handleGetIsDark = ({ ipcMain }) => {
  ipcMain.handle(RendererMessage.GetIsDark, async () => nativeTheme.shouldUseDarkColors);
};

export default [
  handleGetFolders,
  handleDuplicatedScanFiles,
  handleBatchDeleteFiles,
  handleOpenDevTools,
  handleSelectFolder,
  handleOpenFolder,
  handleThemeToggle,
  handleGetIsDark,
];
