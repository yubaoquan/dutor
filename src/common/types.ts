export type FolderModel = {
  name: string;
  path: string;
};

export type User = {
  name: string;
  password?: string;
  hash?: string;
};
