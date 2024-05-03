export type FolderModel = {
  name: string;
  path: string;
};

export type User = {
  hash?: string;
  name: string;
  password?: string;
};

export type Blog = {
  author?: string;
  content: string;
  created_at?: number;
  public: boolean;
  tags?: string[];
  title: string;
  updated_at?: number;
};
