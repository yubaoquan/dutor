import fs from 'fs';
import path from 'path';
import dirTree from 'directory-tree';
import md5 from 'md5-file';
import { dialog } from 'electron';
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
  dir,
  beforeHash,
  afterHash,
  beforeAll,
}: {
  dir: string;
  beforeHash?: (node: any) => void;
  afterHash: (node: any, hash: string) => void;
  beforeAll: (nodes: any[]) => void;
}) => {
  if (!dir) return [];
  type Task = {
    node: any;
    start: () => Promise<void>;
  };
  const tasks: Task[] = [];
  const tree = dirTree(dir, { attributes: ['size', 'type'] });

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

  walk(tree.children);
  const allNodesToScan = tasks.map((task) => task.node);
  beforeAll(allNodesToScan);

  await Promise.all(tasks.map((task) => task.start()));

  console.info(`ret`, ret);
  console.info(`tree`, tree);

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
    properties: ['openDirectory'],
  });

  return folderPaths?.[0];
};
