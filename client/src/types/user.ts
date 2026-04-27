interface User {
  _id: string;
  email: string;
  username: string;
  password: string;
  profileImage: string;
  lastUpdate: Date;
}

export type { User };
