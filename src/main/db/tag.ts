import { getDb } from '.';
import { TableName } from './constants';

export const createTag = (name: string) => {
  getDb().table(TableName.Tags).insert({ name });
};

export const getTags = () => getDb().table(TableName.Tags).select('name');

export const deleteTag = (name: string) => getDb().table(TableName.Tags).where({ name }).del();
