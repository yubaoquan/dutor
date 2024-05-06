import { RendererMessage } from '@/common/message';
import type { Blog } from '@/common/types';
import { defaultPagination } from '@/common/default';
import { addBlog, getBlogs, deleteBlogById, getBlogById } from '../services/blog';

const handleAddBlog = ({ ipcMain }) => {
  ipcMain.handle(RendererMessage.AddBlog, async (_event, blog: Blog) => addBlog(blog));
};

const handleGetBlogs = ({ ipcMain }) => {
  ipcMain.handle(
    RendererMessage.GetBlogs,
    async (_event, query, pagination = defaultPagination) => {
      const { blogs, total } = await getBlogs(query, pagination);
      return { data: { blogs, total }, success: true, code: 0 };
    },
  );
};

const handleDeleteBlog = ({ ipcMain }) => {
  ipcMain.handle(RendererMessage.DeleteBlog, async (_event, id: number) => {
    const result = await deleteBlogById(id);
    return result;
  });
};

const handleUpdateBlog = ({ ipcMain }) => {
  ipcMain.handle(RendererMessage.UpdateBlog, async (_event, blog: Blog) => addBlog(blog));
};

const handleGetBlogDetail = ({ ipcMain }) => {
  ipcMain.handle(RendererMessage.GetBlogDetail, async (_event, id: number) => {
    const blog = await getBlogById(id);
    return blog;
  });
};

export default [
  handleAddBlog,
  handleGetBlogs,
  handleDeleteBlog,
  handleUpdateBlog,
  handleGetBlogDetail,
];
