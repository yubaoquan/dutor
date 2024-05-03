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

/** 创建表 */
const tableDefinitions: [TableName, (db) => Promise<any>][] = [
  [TableName.Users, createUsersTable],
  [TableName.Blogs, createBlogsTable],
  [TableName.Tags, createTagsTable],
];

const modifyBlogsTable = async (db) => {
  const columnKey = 'author_anonymous';
  const hasAuthorType = await db.schema.hasColumn(TableName.Blogs, columnKey);
  if (!hasAuthorType) {
    return db.schema.alterTable(TableName.Blogs, (table) => {
      table.boolean(columnKey).nullable().defaultTo(null);
    });
  }
};

/** 修改表 */
const tableModifications: ((db) => Promise<any>)[] = [modifyBlogsTable];

export const initTables = async (db) => {
  await Promise.all(
    tableDefinitions.map(async ([tableName, createTable]) => {
      const tableExists = await isTableExists(tableName, db);
      if (tableExists) return;
      return createTable(db);
    }),
  );

  await Promise.all(tableModifications.map((modifyTable) => modifyTable(db)));
};
