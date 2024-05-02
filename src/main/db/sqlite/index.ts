import knex from 'knex';
import getDbConfig from './config';
import { createTables } from './tables';

let db;

export const initDb = (app) => {
  try {
    db = knex(getDbConfig(app));
    return createTables(db);
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getDb = () => db;
