interface User {
  _id: string;
  email: string;
  password: string;
  username: string;
  avatarURL: string;
  timestamp: Date;
}

export type { User };

// export interface IUser {
//   username: string;
//   email: string;
//   password?: string; // לא קיים אם זה Google
//   image?: string;
//   provider: "local" | "google" | "facebook";
//   providerId?: string;
//   refreshToken?: string;
// }