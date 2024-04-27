import { RendererMessage } from '@/common/message';
import { addUser, getUsers } from '../services/user';

const handleGetUsers = ({ ipcMain }) => {
  ipcMain.handle(RendererMessage.GetUsers, (_event, conditions) => getUsers(conditions));
};

const handleAddUser = ({ ipcMain }) => {
  ipcMain.handle(RendererMessage.AddUser, (_event, user) => addUser(user));
};

const handleCheckUserExists = ({ ipcMain }) => {
  ipcMain.handle(RendererMessage.CheckUserExists, (_event, name) => {
    const users = getUsers({ name });
    return users.length > 0;
  });
};

export default [handleAddUser, handleGetUsers, handleCheckUserExists];
