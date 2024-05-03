import { TableName } from './constants';

const isTableExists = async (tableName: TableName, db) => db.schema.hasTable(tableName);

/** 用户表 */
const createUsersTable = async (db) =>
  db.schema.createTable(TableName.Users, (table) => {
    table.bigIncrements('id', { primaryKey: true });
    table.string('name');
    table.string('hash');
  });

/** 博客表 */
const createBlogsTable = async (db) =>
  db.schema.createTable(TableName.Blogs, (table) => {
    table.bigIncrements('id', { primaryKey: true });
    table.string('title');
    table.bigint('author');
    table.json('tags').defaultTo('[]');
    table.string('content');
    table.boolean('public');
    table.timestamps(true, true);
  });

/** 标签表 */
const createTagsTable = async (db) =>
  db.schema.createTable(TableName.Tags, (table) => {
    table.bigIncrements('id', { primaryKey: true });
    table.string('name');
    table.timestamp('created_at').defaultTo(db.fn.now());
  });

const tableDefinitions: [TableName, (db) => Promise<any>][] = [
  [TableName.Users, createUsersTable],
  [TableName.Blogs, createBlogsTable],
  [TableName.Tags, createTagsTable],
];

export const createTables = async (db) =>
  Promise.all(
    tableDefinitions.map(async ([tableName, createTable]) => {
      const tableExists = await isTableExists(tableName, db);
      if (tableExists) return;
      return createTable(db);
    }),
  );
