import * as db from '../db/blog';

export const addBlog = async (blog: any) => {
  const newBlog = await db.addBlog(blog);
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
  return blogs;
};

export const getBlogById = async (id: number) => {
  const blog = await db.getBlogById(id);
  return blog;
};
