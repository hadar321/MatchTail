import { User } from "../types/user";

const getUserById = (userId: string): User => {
  const user: User = {
    _id: userId,
    username: "Hadar",
    password: "123456",
    avatarURL: "url",
    email: "Hdara@gamil.com",
    lastUpdate: new Date(),
  };

  return user;
};

const getUserByEmail = (email: string): User => {
  const user: User = {
    _id: "1",
    username: "dog_lover",
    password: "123456",
    avatarURL: "url",
    email: email,
    lastUpdate: new Date(),
  };

  return user;
};

export { getUserById, getUserByEmail };
