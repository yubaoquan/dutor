import { mapEntries, snake, camel } from 'radash';

export const toSnakeObject = (obj: any) =>
  mapEntries(obj, (key, value) => [snake(key as string), value]);

export const toCamelObject = (obj: any) =>
  mapEntries(obj, (key, value) => [camel(key as string), value]);
