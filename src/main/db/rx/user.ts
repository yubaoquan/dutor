import type { User } from '@/common/types';
import { nanoid } from 'nanoid';
import { db } from './index';

console.info(`add collections`);
await db.addCollections({
  users: {
    schema: {
      version: 0,
      primaryKey: 'id',
      type: 'object',
      properties: {
        id: {
          type: 'string',
          maxLength: 100, // <- the primary key must have set maxLength
        },
        name: {
          type: 'string',
        },
        hash: {
          type: 'string',
        },
      },
      required: ['id', 'name', 'hash'],
      encrypted: ['name', 'hash'],
    },
  },
});

export const addUser = async (user: User) => {
  try {
    const id = nanoid();
    const newUser = await db.users.insert({
      id,
      name: user.name,
      hash: user.hash,
    });
    return newUser;
  } catch (e) {
    console.error(e);
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.users.findOne(id);
    return user;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getUserByName = async (name: string) => {
  try {
    const user = await db.users.findOne({
      selector: {
        name: {
          $eq: name,
        },
      },
    });

    return user;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getUsers = async (condition?: { name?: string }) => {
  try {
    let users: User[] = [];
    if (condition?.name) {
      users = await db.users
        .find({
          selector: {
            name: { $eq: condition.name },
          },
        })
        .exec();
    } else {
      users = await db.users.find().exec();
    }
    return users;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const login = async (name: string, hash: string) => {
  try {
    const user = await db.users
      .findOne({
        selector: {
          name: { $eq: name },
          hash: { $eq: hash },
        },
      })
      .exec();
    return !!user;
  } catch (e) {
    console.error(e);
    return false;
  }
};
