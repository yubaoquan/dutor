import { TableName } from './constants';

const isTableExists = async (tableName: TableName, db) => db.schema.hasTable(tableName);
const createUsersTable = async (db) =>
  db.schema.createTable(TableName.Users, (table) => {
    table.bigIncrements('id', { primaryKey: true });
    table.string('name');
    table.string('hash');
  });

const tableDefinitions: [TableName, (db) => Promise<any>][] = [[TableName.Users, createUsersTable]];

export const createTables = async (db) =>
  Promise.all(
    tableDefinitions.map(async ([tableName, createTable]) => {
      const tableExists = await isTableExists(tableName, db);
      if (tableExists) return;
      return createTable(db);
    }),
  );
