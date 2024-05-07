import { TableName } from './constants';

const FIELD_AUTHOR_ANONYMOUS = 'author_anonymous';
const FIELD_USER_TAGS = 'tags';
const TAB_FIELD_PUBLIC = 'is_public';
const BLOG_FIELD_IS_PUBLIC = 'is_public';
const isTableExists = async (tableName: TableName, db) => db.schema.hasTable(tableName);

/** 用户表 */
const createUsersTable = async (db) =>
  db.schema.createTable(TableName.Users, (table) => {
    table.bigIncrements('id', { primaryKey: true });
    table.string('name');
    table.string('hash');
    table.json('tags').defaultTo('[]');
  });

/** 博客表 */
const createBlogsTable = async (db) =>
  db.schema.createTable(TableName.Blogs, (table) => {
    table.bigIncrements('id', { primaryKey: true });
    table.string('title');
    table.bigint('author');
    table.boolean(FIELD_AUTHOR_ANONYMOUS).nullable().defaultTo(null);
    table.json('tags').defaultTo('[]');
    table.string('content');
    table.boolean(BLOG_FIELD_IS_PUBLIC);
    table.timestamps(true, true);
  });

/** 标签表 */
const createTagsTable = async (db) =>
  db.schema.createTable(TableName.Tags, (table) => {
    table.bigIncrements('id', { primaryKey: true });
    table.string('name');
    table.timestamp('created_at').defaultTo(db.fn.now());
    table.boolean(TAB_FIELD_PUBLIC).nullable().defaultTo(true);
  });

/** 创建表 */
const tableDefinitions: [TableName, (db) => Promise<any>][] = [
  [TableName.Users, createUsersTable],
  [TableName.Blogs, createBlogsTable],
  [TableName.Tags, createTagsTable],
];

const modifyBlogsTable = async (db) => {
  const hasAuthorType = await db.schema.hasColumn(TableName.Blogs, FIELD_AUTHOR_ANONYMOUS);
  const tasks: Promise<any>[] = [];
  if (!hasAuthorType) {
    tasks.push(
      db.schema.alterTable(TableName.Blogs, (table) => {
        table.boolean(FIELD_AUTHOR_ANONYMOUS).nullable().defaultTo(null);
      }),
    );
  }
  const hasIsPublic = await db.schema.hasColumn(TableName.Blogs, BLOG_FIELD_IS_PUBLIC);
  if (!hasIsPublic) {
    tasks.push(
      db.schema.alterTable(TableName.Blogs, (table) => {
        table.boolean(BLOG_FIELD_IS_PUBLIC);
      }),
    );
  }

  return Promise.all(tasks);
};

const modifyUsersTable = async (db) => {
  const hasUserTags = await db.schema.hasColumn(TableName.Users, FIELD_USER_TAGS);
  if (!hasUserTags) {
    return db.schema.alterTable(TableName.Users, (table) => {
      table.json(FIELD_USER_TAGS).defaultTo('[]');
    });
  }
};

const modifyTagsTable = async (db) => {
  const hasPublic = await db.schema.hasColumn(TableName.Tags, TAB_FIELD_PUBLIC);
  if (!hasPublic) {
    return db.schema.alterTable(TableName.Tags, (table) => {
      table.boolean(TAB_FIELD_PUBLIC).nullable().defaultTo(true);
    });
  }
};

/** 修改表 */
const tableModifications: ((db) => Promise<any>)[] = [
  modifyBlogsTable,
  modifyUsersTable,
  modifyTagsTable,
];

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
