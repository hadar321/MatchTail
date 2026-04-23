import axios from "axios";
import type { Comment } from "../types/comment";

const API_BASE = import.meta.env.VITE_API_BASE ?? "";

export async function getComments(params?: Record<string, string>) {
  const res = await axios.get<Comment[]>(`${API_BASE}/comments`, { params });
  return res.data;
}

export async function getCommentById(id: string) {
  const res = await axios.get<Comment>(`${API_BASE}/comments/${id}`);
  return res.data;
}

export async function createComment(payload: { content: string; postId?: string }) {
  const res = await axios.post<Comment>(`${API_BASE}/comments`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
}

export async function updateComment(id: string, payload: { content: string }) {
  const res = await axios.put<Comment>(`${API_BASE}/comments/${id}`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
}

export async function deleteComment(id: string) {
  const res = await axios.delete<Comment>(`${API_BASE}/comments/${id}`);
  return res.data;
}
