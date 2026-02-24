import { Stack, TextInput, ThemeIcon } from "@mantine/core";
import { useEffect, useState } from "react";

import { Comment } from "./comment";
import { Comment as CommentType } from "../../../types/comment";
import { getCommentsByPostId } from "../../../services/comment-service";
import { IconSend } from "@tabler/icons-react";

const CommentsList: React.FC<{ postId: string; username: string }> = ({
  postId,
  username,
}) => {
    const [comments, setComments] = useState<CommentType[]>([]);
    const [newCommentText, setCommentText] = useState("");
    const handleComment = () => {
        setCommentText('');
        //todo: send comment to server
    };

  useEffect(() => {
    setComments(getCommentsByPostId(postId));
  }, [postId]);

  return (
      <Stack justify={"center"}>
        {comments.map((comment) => (
        <Comment content={comment.content} username={username}/>
        ))}
          
        <TextInput
            value={newCommentText}
            style={{ position: "relative" }}
                placeholder="add a comment"
                rightSection={
                    <ThemeIcon size={36} variant={"transparent"}>
                        <IconSend
                        stroke={1.5}
                        cursor={"pointer"}
                        style={{ height: "70%", width: "70%" }}
                        onClick={handleComment}
                        />
                    </ThemeIcon>
                }
            onKeyDown={(event) => event.key === "Enter" && handleComment()}
            onChange={(event) => setCommentText(event.currentTarget.value)}
        />
    </Stack>
  );
};

export { CommentsList };