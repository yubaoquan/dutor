import { toSnakeObject, toCamelObject } from '@main/utils/index';
import * as db from '../db/blog';

const convertBlog = (input: any) => {
  const blog = toCamelObject(input);
  blog.public = Boolean(blog.public);
  blog.authorAnonymous = Boolean(blog.authorAnonymous);
  try {
    blog.tags = JSON.parse(blog.tags as string);
  } catch (e) {
    console.warn(`tags 解析失败, 设置为空数组`);
    blog.tags = [];
  }
  return blog;
};

const convertBlogs = (blogs: any[]) => blogs.map(convertBlog);

export const addBlog = async (blog: any) => {
  const toAdd = toSnakeObject(blog);
  toAdd.tags = JSON.stringify(blog.tags);
  const newBlog = await db.addBlog(toAdd);
  console.info(`newBlog`, newBlog);
  return newBlog;
};

export const updateBlog = async (blog: any) => {
  const newBlog = await db.updateBlog(blog);
  return newBlog;
};

export const deleteBlogById = async (id: number) => {
  const success = await db.deleteBlogById(id);
  return success;
};

export const getBlogs = async (query: any) => {
  const blogs = await db.getBlogs(query);
  console.info(`blogs`, blogs);
  return convertBlogs(blogs);
};

export const getBlogById = async (id: number) => {
  const blog = await db.getBlogById(id);
  return blog;
};
