import { getAllDrives, getDirs, scanDuplicatedFiles } from './fs-utils.ts';

export const handleGetFolders = async (ipcMain) => {
  ipcMain.handle('get-folders', async (event, folder) => {
    const folders = folder ? await getDirs(folder) : getAllDrives();

    return folders;
  });
};

export const handleDuplicatedScanFiles = async (ipcMain) => {
  ipcMain.handle('scan-duplicated-files', async (event, folderPath) => {
    const result = await scanDuplicatedFiles(folderPath);
    console.info(result);
    return result;
  });
};

export const handlePing = async (ipcMain) => {
  ipcMain.handle(
    'ping',
    async () =>
      new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve('pongx');
        }, 1000);
      }),
  );
};
