import axios from "axios";
import type { Post as ClientPost } from "../types/post";

const API_BASE = import.meta.env.VITE_API_BASE ?? "";

type BackendPost = { _id: string; title: string; content: string; sender: string; postImage?: string; likedBy?: string[] };

function mapBackend(b: BackendPost): ClientPost {
  return {
    id: b._id,
    userId: b.sender,
    animal: "",
    content: b.content || b.title,
    imageUrl: b.postImage || "",
    lastUpdated: new Date(),
    likedBy: b.likedBy ?? [],
  };
}

export async function getPosts(params?: Record<string, string>) {
  const res = await axios.get<BackendPost[]>(`${API_BASE}/posts`, { params });
  return res.data.map(mapBackend);
}

export async function getPostById(id: string) {
  const res = await axios.get<BackendPost>(`${API_BASE}/posts/${id}`);
  return mapBackend(res.data);
}

export async function createPost(payload: { title: string; content: string; postImage: string }) {
  const res = await axios.post<BackendPost>(`${API_BASE}/posts`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return mapBackend(res.data);
}

export async function updatePost(
  id: string,
  payload: { title?: string; content?: string; postImage?: string; likedBy?: string[] }
) {
  const res = await axios.put<BackendPost>(`${API_BASE}/posts/${id}`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return mapBackend(res.data);
}

export async function deletePost(id: string) {
  const res = await axios.delete<BackendPost>(`${API_BASE}/posts/${id}`);
  return mapBackend(res.data);
}

export async function getPostsByUser(userId: string) {
  return getPosts({ userId });
}

export async function getPostsBySearch(query: string) {
  return getPosts({ search: query });
}
