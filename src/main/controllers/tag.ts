import { RendererMessage } from '@/common/message';
import type { TagsQuery } from '@/common/types';
import { getTags, deleteTag } from '../services/tag';

const handleGetTags = ({ ipcMain }) => {
  ipcMain.handle(RendererMessage.GetTags, async (_event, query: TagsQuery) => {
    const tags = await getTags(query);
    return { data: tags, success: true, code: 0 };
  });
};

const handleDeleteTag = ({ ipcMain }) => {
  ipcMain.handle(RendererMessage.DeleteTag, async (_event, name: string) => deleteTag(name));
};

export default [handleGetTags, handleDeleteTag];
