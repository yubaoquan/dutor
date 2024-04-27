import Store from 'electron-store';
import type { User } from '@/common/types';

const store = new Store({
  encryptionKey: 'dutor-dutor',
});

export const getUsers = (conditions?: { name: string }) => {
  console.info(`getUsers conditions: ${conditions}`);
  const users = store.get('users', []) as User[];
  return conditions ? users.filter((usr) => usr.name === conditions.name) : users;
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
