import { pick } from 'radash';
import { getDb } from './index';
import { TableName } from './constants';

type BlogQuery = {
  author?: string;
  content?: string;
  id?: number;
  public?: boolean;
  tags?: string[];
  title?: string;
};

export const addBlog = (blog: any) => {
  console.info(`toInsert`, blog);
  return getDb().table(TableName.Blogs).insert(blog);
};
export const updateBlog = (blog: any) =>
  getDb().table(TableName.Blogs).where({ id: blog.id }).update(blog);

export const getBlogs = (query: BlogQuery = {}) => {
  const pickedQuery: any = pick(query, ['author', 'title', 'public']);
  if (query.content) {
    pickedQuery.content = { $like: `%${query.content}%` };
  }
  if (query.tags) {
    pickedQuery.tags = { $in: query.tags };
  }

  return getDb().table(TableName.Blogs).select().where(pickedQuery);
};

export const getBlogById = (id: number) =>
  getDb().table(TableName.Blogs).select('*').where({ id }).first();

export const deleteBlogById = (id: number) => getDb().table(TableName.Blogs).where({ id }).del();
