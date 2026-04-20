import { Comment } from "../types/comment";

const getCommentsByPostId = (postId: string): Comment[] => {
  const comments: Comment[] = [
    {
      _id: "1",
      postId: postId,
      sender: "1",
      content: "comment 1",
      timestamp: new Date(),
    },
    {
      _id: "2",
      postId: postId,
      sender: "1",
      content: "comment 2",
      timestamp: new Date(),
    },
    {
      _id: "3",
      postId: postId,
      sender: "1",
      content: "comment 3",
      timestamp: new Date(),
    },
    {
      _id: "4",
      postId: postId,
      sender: "1",
      content: "comment 4",
      timestamp: new Date(),
    },
  ];
  return comments;
};

export { getCommentsByPostId };