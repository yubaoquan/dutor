import blogController from './blog';
import dutorController from './dutor';
import settingController from './setting';
import themeController from './theme';
import userController from './user';
import tagController from './tag';

const controllers = [
  blogController,
  dutorController,
  userController,
  themeController,
  settingController,
  tagController,
];

export default ({ ipcMain, mainWindow }) => {
  controllers.forEach((handlers) =>
    handlers.forEach((handler) => handler({ ipcMain, mainWindow })),
  );
};
