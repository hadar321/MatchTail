import { Comment } from "../types/comment";

const getCommentsByPostId = (postId: string): Comment[] => {
  const comments: Comment[] = [
    {
      id: "1",
      postId: postId,
      userId: "1",
      content: "comment 1",
      timestamp: new Date(),
    },
    {
      id: "2",
      postId: postId,
      userId: "1",
      content: "comment 2",
      timestamp: new Date(),
    },
    {
      id: "3",
      postId: postId,
      userId: "1",
      content: "comment 3",
      timestamp: new Date(),
    },
    {
      id: "4",
      postId: postId,
      userId: "1",
      content: "comment 4",
      timestamp: new Date(),
    },
  ];
  return comments;
};

export { getCommentsByPostId };