import axios from "axios";
import { User } from "../types/user";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:3000";

function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const getUserById = async (userId: string): Promise<User | undefined> => {
  try {
    const res = await axios.get<User>(`${API_BASE}/users/${userId}`, { headers: { ...authHeader() } });
    return res.data;
  } catch (e) {
    // fallback sample
    // eslint-disable-next-line no-console
    console.warn("getUserById: failed to fetch user", e);
    return {
      _id: userId,
      username: "Unknown",
      password: "",
      profileImage: "",
      email: "",
      lastUpdate: new Date(),
    } as User;
  }
};

const getUserByEmail = async (email: string): Promise<User | undefined> => {
  try {
    const res = await axios.get<User>(`${API_BASE}/users`, { params: { email }, headers: { ...authHeader() } });
    return res.data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn("getUserByEmail: failed to fetch user", e);
    return undefined;
  }
};

const updateUser = async (
  userId: string,
  payload: { username?: string; email?: string; password?: string; profileImage?: File | null }
): Promise<User> => {
  const formData = new FormData();
  if (payload.username) formData.append("username", payload.username);
  if (payload.email) formData.append("email", payload.email);
  if (payload.password) formData.append("password", payload.password);
  if (payload.profileImage) formData.append("profileImage", payload.profileImage);

  const res = await axios.put<User>(`${API_BASE}/users/${userId}`, formData, {
    headers: {
      ...authHeader(),
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export { getUserById, getUserByEmail, updateUser };
