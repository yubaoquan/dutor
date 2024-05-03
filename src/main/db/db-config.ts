import path from 'path';
import { existsSync, mkdirSync } from 'fs';

const { join } = path;

export default (app) => {
  const dataDir = join(app.getPath('userData'), './data');
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir);
  }

  return {
    client: 'sqlite3',
    connection: {
      filename: join(dataDir, './db.db3'),
    },
    useNullAsDefault: true,
    migrations: {
      directory: join(dataDir, './migrations'),
    },
    seeds: {
      directory: join(dataDir, './seeds'),
    },
  };
};
