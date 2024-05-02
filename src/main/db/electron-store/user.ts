import Store from 'electron-store';
import type { User } from '@/common/types';

const ENCRYPTION_KEY = 'dutor-dutor';

const store = new Store({
  encryptionKey: ENCRYPTION_KEY,
});

export const getUsers = async (conditions?: { name: string; hash?: string }) => {
  console.info(`getUsers conditions: ${conditions}`);

  const users = store.get('users', []) as User[];
  const { name, hash } = conditions || {};
  return conditions
    ? users.filter((usr) => (hash ? usr.hash === hash && usr.name === name : usr.name === name))
    : users;
};

export const addUser = async (user: User) => {
  const users: User[] = store.get('users', []) as User[];
  store.set('users', users.concat(user));
  return user;
};
