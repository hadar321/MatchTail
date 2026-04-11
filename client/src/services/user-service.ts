import { User } from "../types/user";

const getUserById = (userId: string): User => {
  const user: User = {
    _id: userId,
    username: "Hadar",
    avatarURL: "url",
    email: "Hdara@gamil.com",
    lastUpdate: new Date(),
  };

  return user;
};

export { getUserById };