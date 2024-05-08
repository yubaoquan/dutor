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

  const snakeQuery = toSnakeObject(pickedQuery);

  const db = getDb();

  const sql1 = db
    .table(TableName.Blogs)
    .select('*')
    .limit(query.limit, { skipBinding: true })
    .offset(query.offset)
    .where(snakeQuery);
  const sql2 = db.table(TableName.Blogs).count({ count: '*' }).first().where(snakeQuery);

  console.info('query', query);

  const performTagsIntersection = (tags: string[], sql) => {
    sql.where((builder) => {
      builder.where((qb) => {
        tags.forEach((tag) => {
          qb.orWhere((bd) => {
            bd.whereRaw('EXISTS (SELECT 1 FROM json_each(tags) WHERE value = ?)', tag);
          });
        });
      });
    });
  };

  if (query.tags?.length) {
    performTagsIntersection(query.tags, sql1);
    performTagsIntersection(query.tags, sql2);
  }
  const sqlText = sql1.toSQL();
  console.info(`sqlText`, sqlText);

  const [blogs, blogsCount] = await Promise.all([sql1, sql2]);

  return {
    data: blogs,
    total: blogsCount.count,
  };
};

export const getBlogById = (id: number) =>
  getDb().table(TableName.Blogs).select('*').where({ id }).first();

export const deleteBlogById = (id: number) => getDb().table(TableName.Blogs).where({ id }).del();
