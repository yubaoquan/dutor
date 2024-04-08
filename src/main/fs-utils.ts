import fs from 'fs';
import path from 'path';
import dirTree from 'directory-tree';
import md5 from 'md5-file';
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

export const scanDuplicatedFiles = async (dir: string) => {
  if (!dir) return [];
  const tasks: Promise<void>[] = [];
  const tree = dirTree(dir, { attributes: ['size', 'type'] });

  const ret = {};

  const walk = (nodes) => {
    nodes.forEach((node) => {
      if (node.type === 'file') {
        tasks.push(
          new Promise<void>(async (resolve) => {
            try {
              console.info(`scan`, node.path);
              const hash = await md5(node.path);
              if (!ret[hash]) {
                ret[hash] = [node];
              } else {
                ret[hash].push(node);
              }
              console.info(`hash`, hash);
            } catch (e) {
              console.error(e);
            }
            resolve();
          }),
        );
      }

      if (node.type === 'directory') {
        walk(node.children);
      }
    });
  };

  walk(tree.children);

  await Promise.all(tasks);

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
