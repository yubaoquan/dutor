import Store from 'electron-store';
import type { User } from '@/common/types';

const store = new Store();

export const getUsers = async (conditions) => {
  console.info(`getUsers: ${conditions}`);
  const users = store.get('users', []);
  return users;
};

export const addUser = async (user: User) => {
  const users: User[] = store.get('users', []) as User[];
  if (!user.name || !user.password) {
    return {
      success: false,
      message: 'Name and password are required',
    };
  }

  if (users.some((u) => u.name === user.name)) {
    return {
      success: false,
      message: 'User already exists',
    };
  }

  store.set('users', users.concat(user));

  return {
    success: true,
  };
};
