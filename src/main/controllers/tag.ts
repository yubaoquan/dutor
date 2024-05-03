import { RendererMessage } from '@/common/message';
import * as db from '../db/tag';

const handleAddTag = ({ ipcMain }) => {
  ipcMain.handle(RendererMessage.AddTag, async (_event, tag: string) => db.createTag(tag));
};

const handleGetTags = ({ ipcMain }) => {
  ipcMain.handle(RendererMessage.GetTags, async () => db.getTags());
};

const handleDeleteTag = ({ ipcMain }) => {
  ipcMain.handle(RendererMessage.DeleteTag, async (_event, name: string) => db.deleteTag(name));
};

export default [handleAddTag, handleGetTags, handleDeleteTag];
