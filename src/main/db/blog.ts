import { pick } from 'radash';
import { toSnakeObject } from '@main/utils';
import { getDb } from './index';
import { TableName } from './constants';

type BlogQuery = {
  author?: string;
  content?: string;
  id?: number;
  isPublic?: boolean;
  limit: number;
  offset: number;
  tags?: string[];
  title?: string;
};

export const addBlog = (blog: any) => {
  console.info(`toInsert`, blog);
  return getDb().table(TableName.Blogs).insert(blog);
};
export const updateBlog = (blog: any) =>
  getDb().table(TableName.Blogs).where({ id: blog.id }).update(blog);

export const getBlogs = async (query: BlogQuery = { limit: 10, offset: 0 }) => {
  const pickedQuery: any = pick(query, ['author', 'title', 'isPublic']);
  if (query.content) {
    pickedQuery.content = { $like: `%${query.content}%` };
  }
  if (query.tags) {
    pickedQuery.tags = { $in: query.tags };
  }

  const snakeQuery = toSnakeObject(pickedQuery);

  const db = getDb();

  const [blogs, blogsCount] = await Promise.all([
    db
      .table(TableName.Blogs)
      .select('*')
      .where(snakeQuery)
      .limit(query.limit, { skipBinding: true })
      .offset(query.offset),
    db.table(TableName.Blogs).count({ count: '*' }).where(snakeQuery).first(),
  ]);

  return {
    data: blogs,
    total: blogsCount.count,
  };
};

export const getBlogById = (id: number) =>
  getDb().table(TableName.Blogs).select('*').where({ id }).first();

export const deleteBlogById = (id: number) => getDb().table(TableName.Blogs).where({ id }).del();
