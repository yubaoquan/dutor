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
    const user = await login(name, password);
    const loginSuccess = !!user;
    return {
      success: loginSuccess,
      message: loginSuccess ? '' : 'Login failed',
      user: loginSuccess ? { name, id: String(user.id) } : null,
    };
  });
};

export default [handleAddUser, handleGetUsers, handleCheckUserExists, handleLogin];
