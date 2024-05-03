import blogController from './blog';
import dutorController from './dutor';
import settingController from './setting';
import themeController from './theme';
import userController from './user';

const controllers = [
  blogController,
  dutorController,
  userController,
  themeController,
  settingController,
];

export default ({ ipcMain, mainWindow }) => {
  controllers.forEach((handlers) =>
    handlers.forEach((handler) => handler({ ipcMain, mainWindow })),
  );
};
