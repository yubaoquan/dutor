import knex from 'knex';
import getDbConfig from './db-config';
import { initTables } from './tables';

let db;

export const initDb = (app) => {
  try {
    db = knex(getDbConfig(app));
    return initTables(db);
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getDb = () => db;
