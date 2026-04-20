import { Modal, ThemeIcon, Indicator } from "@mantine/core";
import { Group, Stack } from "@mantine/core";
import { IconMessageCircle, IconPawFilled } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useState, useEffect } from "react";

import { Post } from "../../types/post";
import { gray, orange } from "../../consts";
// import { updatePost } from "../../api/posts";
import { CommentsList } from "./comments/comments-list";
import { getCommentsByPostId } from "../../services/comment-service";

type Props = Pick<Post, "id" | "userId" | "likedBy">;

const PostFooter: React.FC<Props & { username: string }> = ({ id, userId, likedBy, username }) => {
  const [isLiked, setIsLiked] = useState<boolean>(likedBy.includes(userId));
  const [commentsOpened, { open, close }] = useDisclosure(false);
  const [commentsCount, setCommentsCount] = useState<number>(0);

  useEffect(() => {
    setCommentsCount(getCommentsByPostId(id).length);
  }, [id]);  

  const handlePawClick = async () => {
    // optimistic toggle locally
    setIsLiked((prev) => !prev);
    try {
      // attempt to persist like change to backend if supported
      // const newLikedBy = isLiked
      //   ? likedBy.filter((u) => u !== userId)
      //   : [...likedBy, userId];
      // if (id) {
      //   await updatePost(id, { likedBy: newLikedBy });
      // }
    } catch (e) {
      console.error("Failed to update like status on server", e);
      // revert optimistic change on failure
      setIsLiked((prev) => !prev);
    }
  };

  return (
    <Stack>
      <Group h={100}>
        <ThemeIcon variant="white" size={80} color={"dark"}>
          <IconPawFilled
            style={{ height: "50%", width: "50%" }}
            stroke={1.5}
            onClick={handlePawClick}
            cursor={"pointer"}
            color={isLiked ? orange : gray}
          />
        </ThemeIcon>
        <Indicator label={commentsCount} size={18} color="orange" offset={-6}>
          <ThemeIcon variant={"white"} size={60}>
              <IconMessageCircle
                  stroke={1.5}
                  color={orange}
                  cursor={"pointer"}
                  onClick={open}
                  style={{ height: "70%", width: "70%" }}/>
          </ThemeIcon>
        </Indicator>
        <Modal opened={commentsOpened} onClose={close}>
          <CommentsList postId={id} username={username} />
        </Modal>
      </Group>
    </Stack>
  );
};

export { PostFooter };
