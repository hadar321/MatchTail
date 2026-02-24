interface Comment {
  id: string;
  content: string;
  postId: string;
  userId: string;
  timestamp: Date;
}

export type { Comment };