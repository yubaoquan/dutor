import * as db from '../db/tag';

export const getTags = async () => {
  const tags = await db.getTags();
  return tags;
};

export const addTag = async (name: string) => {
  const tag = await db.createTag(name);
  return tag;
};

export const deleteTag = async (name: string) => {
  const tag = await db.deleteTag(name);
  return tag;
};
