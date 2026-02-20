interface User {
  _id: string;
  email: string;
  username: string;
  password: string;
  avatarURL: string;
  lastUpdate: Date;
}

export type { User };
