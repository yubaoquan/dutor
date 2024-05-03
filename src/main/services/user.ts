import md5 from 'md5';
import type { User } from '@/common/types';
import * as db from '../db/user';

const SALT = 'dutor-dutor-user';

const getPasswordHash = (password: string) => md5(password + SALT);

export const getUsers = async (conditions?: { name: string }) => {
  console.info(`getUsers conditions: ${conditions}`);

  const users: User[] = await db.getUsers();
  return users;
};

export const addUser = async (user: User) => {
  if (!user.name || !user.password) {
    return {
      success: false,
      message: 'Name and password are required',
    };
  }

  const users: User[] = await db.getUsers({ name: user.name });

  if (users.length) {
    return {
      success: false,
      message: 'User already exists',
    };
  }

  const passwordHash = getPasswordHash(user.password);
  const newUser = await db.addUser({
    name: user.name,
    hash: passwordHash,
  });

  return {
    success: !!newUser,
    user: newUser,
  };
};

export const login = async (name: string, password: string) => {
  const hash = getPasswordHash(password);
  const users = await db.getUsers({ name, hash });
  return !!users.length;
};
