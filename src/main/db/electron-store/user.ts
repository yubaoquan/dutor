import Store from 'electron-store';
import type { User } from '@/common/types';

const ENCRYPTION_KEY = 'dutor-dutor';

const store = new Store({
  encryptionKey: ENCRYPTION_KEY,
});

export const getUsers = async (conditions?: { name: string }) => {
  console.info(`getUsers conditions: ${conditions}`);

  const users = store.get('users', []) as User[];
  return conditions ? users.filter((usr) => usr.name === conditions.name) : users;
};

export const addUser = async (user: User) => {
  const users: User[] = store.get('users', []) as User[];
  store.set('users', users.concat(user));
  return user;
};

export const login = async (name: string, hash: string) => {
  const users: User[] = store.get('users', []) as User[];
  const user = users.find((usr) => usr.name === name && usr.hash === hash);
  return user;
};
