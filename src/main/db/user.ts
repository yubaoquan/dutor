import { pick, shake } from 'radash';
import { getDb } from './index';
import { TableName } from './constants';

export const addUser = (user: { hash: string; name: string }) =>
  getDb().table(TableName.Users).insert(user);

export const getUsers = (conditions?: { hash?: string; name?: string }) => {
  const table = getDb().table(TableName.Users);
  const query = conditions ? shake(pick(conditions, ['name', 'hash']), (a) => !a) : null;
  return query ? table.select('*').where(query) : table.select();
};
