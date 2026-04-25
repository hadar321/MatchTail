import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:3000";

export async function login(emailOrUsername: string, password: string) {
  const payload = {
    email: emailOrUsername,
    username: emailOrUsername,
    password,
  };

  const res = await axios.post(`${API_BASE}/auth/login`, payload, {
    headers: { "Content-Type": "application/json" },
  });

  return res.data; // expects { accessToken, refreshToken, _id }
}

export async function register(username: string, email: string, password: string, avatar?: string) {
  const payload = { username, email, password, profileImage: avatar };
  const res = await axios.post(`${API_BASE}/auth/register`, payload, {
    headers: { "Content-Type": "application/json" },
  });
    return res.data;
}

export async function logout(refreshToken: string) {
  const payload = { refreshToken };
  const res = await axios.post(`${API_BASE}/auth/logout`, payload, {
    headers: { "Content-Type": "application/json" },
  });
    return res.data;
}
