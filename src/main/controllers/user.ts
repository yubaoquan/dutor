import { RendererMessage } from '@/common/message';
import { addUser, getUsers } from '../services/user';

const handleGetUsers = ({ ipcMain }) => {
  console.info(`register getUsers handler`);
  ipcMain.handle(RendererMessage.GetUsers, (_event, conditions) => getUsers(conditions));
};

const handleAddUser = ({ ipcMain }) => {
  ipcMain.handle(RendererMessage.AddUser, (_event, user) => addUser(user));
};

export default [handleAddUser, handleGetUsers];
