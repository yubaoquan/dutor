import type { TagsQuery } from '@/common/types';
import { getDb } from '.';
import { TableName } from './constants';

export const createTag = (tag: { isPublic: boolean; name: string }) =>
  getDb().table(TableName.Tags).insert({ name: tag.name, is_public: tag.isPublic });

export const getTags = async (query: TagsQuery) => {
  const q: any = {};

  if (query.isPublic !== undefined) {
    q.is_public = query.isPublic;
  }

  console.info(`snakedQuery`, q);
  let sql = getDb().table(TableName.Tags).select().where(q);
  if (query.names) {
    sql = sql.whereIn('name', query.names);
  }
  const tags = await sql;

  console.info(`tags db`, tags);

  return tags;
};

export const updateTags = (query: { names: string[] }, newData: { isPublic: boolean }) =>
  getDb().table(TableName.Tags).whereIn('name', query.names).update({ isPublic: newData.isPublic });

export const deleteTag = (name: string) => getDb().table(TableName.Tags).where({ name }).del();
