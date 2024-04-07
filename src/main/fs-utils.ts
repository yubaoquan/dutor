import fs from 'fs/promises';
import path from 'path';
import dirTree from 'directory-tree';
import md5 from 'md5-file';

export const getAllDrives = () => {
  const drives = [];
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
    const files = await fs.readdir(rootDir, { withFileTypes: true });
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

export const scanDuplicatedFiles = async (dir) => {
  if (!dir) return [];
  const tasks = [];
  const tree = dirTree(dir, { attributes: ['size', 'type'] });

  const ret = {};

  const walk = (nodes) => {
    nodes.forEach((node) => {
      if (node.type === 'file') {
        tasks.push(
          new Promise(async (resolve) => {
            try {
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

  console.info(`tree`, tree);
  console.info(`ret`, ret);

  return tree;
};
