import type { TagsQuery } from '@/common/types';
import * as db from '../db/tag';

const convertTag = (tag: any) => ({
  name: tag.name,
  isPublic: tag.is_public,
});

const convertTags = (tags: any[]) => tags.map(convertTag);

export const getTags = async (query: TagsQuery) => {
  console.info(`tag service, query`, query);
  const tags = await db.getTags(query);
  return convertTags(tags);
};

export const addTag = async (tagToAdd: { isPublic: boolean; name: string }) =>
  db.createTag(tagToAdd);

export const deleteTag = async (name: string) => {
  const tag = await db.deleteTag(name);
  return tag;
};

export const addTagsIfNotExists = async (tagsNames: string[], isPublic: boolean): Promise<any> => {
  const dbTags = await getTags({ names: tagsNames });
  console.info(`dbTags`, dbTags);
  if (isPublic) {
    const privateTags = dbTags.filter((tag) => !tag.isPublic);
    console.info(`privateTags`, privateTags);
    if (privateTags.length) {
      await db.updateTags({ names: privateTags.map((tag) => tag.name) }, { isPublic });
    }
  }
  const dbTagNames = dbTags.map((tag) => tag.name);
  console.info(`dbTagNames`, dbTagNames);
  const newTags = tagsNames.filter((tag) => !dbTagNames.includes(tag));
  if (newTags.length) {
    console.info(`newTags`, newTags);
    return Promise.all(newTags.map((tag) => addTag({ name: tag, isPublic })));
  }
};
