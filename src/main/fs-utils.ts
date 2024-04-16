import fs from 'fs';
import path from 'path';
import dirTree from 'directory-tree';
import md5 from 'md5-file';
import { dialog, shell } from 'electron';
import type { FolderModel } from '../common/types';

export const getAllDrives = () => {
  const drives: FolderModel[] = [];
  const isWindows = process.platform === 'win32';

  if (isWindows) {
    for (let i = 65; i <= 90; i++) {
      const driveLetter = `${String.fromCharCode(i)}:\\`;
      if (fs.existsSync(driveLetter)) {
        drives.push({ name: driveLetter, path: driveLetter });
      }
    }
  } else {
    drives.push({ name: '/', path: '/' });
  }

  return drives;
};

export const getDirs = async (rootDir = '/') => {
  try {
    const files = await fs.promises.readdir(rootDir, { withFileTypes: true });
    const directories = files
      .filter((file) => file.isDirectory())
      .map((dir) => ({
        name: dir.name,
        path: path.join(rootDir, dir.name),
      }));

    return directories;
  } catch (error) {
    console.error('无法读取根目录:', error);
    return [];
  }
};

export const scanDuplicatedFiles = async ({
  dirs,
  beforeHash,
  afterHash,
  beforeAll,
}: {
  dirs: string[];
  beforeHash?: (node: any) => void;
  afterHash: (node: any, hash: string) => void;
  beforeAll: (nodes: any[]) => void;
}) => {
  if (!dirs.length) return [];
  type Task = {
    node: any;
    start: () => Promise<void>;
  };

  const tasks: Task[] = [];
  const ret = {};

  const walk = (nodes) => {
    nodes.forEach((node) => {
      if (node.type === 'file') {
        tasks.push({
          node,
          start: () =>
            new Promise<void>(async (resolve) => {
              try {
                beforeHash?.(node);
                const hash = await md5(node.path);
                afterHash(node, hash);
                if (!ret[hash]) {
                  ret[hash] = [node];
                } else {
                  ret[hash].push(node);
                }
              } catch (e) {
                console.error(e);
              }
              resolve();
            }),
        });
      }

      if (node.type === 'directory') {
        walk(node.children);
      }
    });
  };

  // filter out subdirectories
  dirs
    .filter((dir) => dirs.every((d) => dir === d || !dir.startsWith(d)))
    .map((dir) => dirTree(dir, { attributes: ['size', 'type'] }))
    .forEach((tree) => walk(tree.children));

  const allNodesToScan = tasks.map((task) => task.node);
  beforeAll(allNodesToScan);

  await Promise.all(tasks.map((task) => task.start()));

  console.info(`ret`, ret);

  return ret;
};

export const batchDeleteFiles = async (filePaths: string[]) => {
  try {
    await Promise.all(filePaths.map((filePath) => fs.promises.rm(filePath)));
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const selectFolder = async () => {
  const folderPaths = dialog.showOpenDialogSync({
    properties: ['openDirectory', 'multiSelections'],
  });

  return folderPaths || [];
};

export const openFolder = (folderPath: string) => {
  try {
    // if folderPath is a file, open its parent folder
    return fs.lstatSync(folderPath).isFile()
      ? shell.openPath(path.dirname(folderPath))
      : shell.openPath(folderPath);
  } catch (error) {
    console.error('Failed to open folder:', error);
  }

  return undefined; // Add a return statement at the end of the function
};
