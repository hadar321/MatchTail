import { Stack } from "@mantine/core";
import { useEffect, useState } from "react";

import { Comment } from "./comment";
import { Comment as CommentType } from "../../../types/comment";
import { getCommentsByPostId } from "../../../services/comment-service";

const CommentsList: React.FC<{ postId: string; username: string }> = ({
  postId,
  username,
}) => {
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    setComments(getCommentsByPostId(postId));
  }, [postId]);

  return (
    <Stack justify={"center"}>
      {comments.map((comment) => (
        <Comment content={comment.content} username={username}/>
      ))}
    </Stack>
  );
};

export { CommentsList };