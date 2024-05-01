import { RendererMessage } from '@/common/message';
import { addUser, getUsers, login } from '../services/user';

const handleGetUsers = ({ ipcMain }) => {
  ipcMain.handle(RendererMessage.GetUsers, (_event, conditions) => getUsers(conditions));
};

const handleAddUser = ({ ipcMain }) => {
  ipcMain.handle(RendererMessage.AddUser, (_event, user) => addUser(user));
};

const handleCheckUserExists = ({ ipcMain }) => {
  ipcMain.handle(RendererMessage.CheckUserExists, async (_event, name) => {
    const users = await getUsers({ name });
    return users.length > 0;
  });
};

const handleLogin = ({ ipcMain }) => {
  ipcMain.handle(RendererMessage.Login, async (_event, name, password) => {
    const loginSuccess = await login(name, password);
    return { success: loginSuccess, message: loginSuccess ? '' : 'Login failed' };
  });
};

export default [handleAddUser, handleGetUsers, handleCheckUserExists, handleLogin];
