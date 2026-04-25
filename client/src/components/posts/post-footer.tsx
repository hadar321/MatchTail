import { ThemeIcon } from "@mantine/core";
import { Group, Stack } from "@mantine/core";
import { IconPawFilled } from "@tabler/icons-react";
import { useState } from "react";

import { Post } from "../../types/post";
import { gray, orange } from "../../consts";
import { updatePost } from "../../api/posts";

type Props = Pick<Post, "id" | "userId" | "likedBy"> & {
  username?: string;
  commentCount?: number;
  setCommentCount?: (count: number) => void;
};

const PostFooter: React.FC<Props> = ({ id, userId, likedBy }) => {
  const [isLiked, setIsLiked] = useState<boolean>(likedBy.includes(userId));
  const [likesCount, setLikesCount] = useState<number>(likedBy.length);

  const handlePawClick = async () => {
    // optimistic toggle locally
    setIsLiked((prev) => !prev);
    setLikesCount((c) => (isLiked ? c - 1 : c + 1));
    try {
      // attempt to persist like change to backend if supported
      const newLikedBy = isLiked
        ? likedBy.filter((u) => u !== userId)
        : [...likedBy, userId];
      if (id) {
        await updatePost(id, { likedBy: newLikedBy });
      }
    } catch (e) {
      console.error("Failed to update like status on server", e);
      // revert optimistic change on failure
      setIsLiked((prev) => !prev);
      setLikesCount((c) => (isLiked ? c + 1 : c - 1));
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
        <div style={{ fontWeight: 700, fontSize: 14 }}>{likesCount}</div>
      </Group>
    </Stack>
  );
};

export { PostFooter };
