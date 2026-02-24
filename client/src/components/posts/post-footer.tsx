import { Modal, ThemeIcon, Indicator } from "@mantine/core";
import { Group, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMessageCircle, IconPawFilled } from "@tabler/icons-react";

import { Post } from "../../types/post";
import { gray, orange } from "../../consts";
import { useState, useEffect } from "react";
import { CommentsList } from "./comments/comments-list";
import { getCommentsByPostId } from "../../services/comment-service";

const PostFooter: React.FC<Pick<Post, "id" | "userId" | "likedBy"> & { username: string }> =
    ({ id, userId, likedBy, username }) => {
        const [isLiked, setIsLiked] = useState<boolean>(likedBy.includes(userId));
        const [commentsOpened, { open, close }] = useDisclosure(false);
        const [commentsCount, setCommentsCount] = useState<number>(0);

    useEffect(() => {
        setCommentsCount(getCommentsByPostId(id).length);
    }, [id]);

  const handlePawClick = () => {
    setIsLiked((isLiked) => !isLiked);
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
                color={isLiked ? orange : gray} />
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
