import { ThemeIcon } from "@mantine/core";
import { Group, Stack } from "@mantine/core";
import { IconPawFilled } from "@tabler/icons-react";

import { Post } from "../../types/post";
import { gray, orange } from "../../consts";
import { useState } from "react";
import { updatePost } from "../../api/posts";

type Props = Pick<Post, "id" | "userId" | "likedBy">;

const PostFooter: React.FC<Props> = ({ id, userId, likedBy }) => {
  const [isLiked, setIsLiked] = useState<boolean>(likedBy.includes(userId));

  const handlePawClick = async () => {
    // optimistic toggle locally
    setIsLiked((prev) => !prev);
    try {
      // attempt to persist like change to backend if supported
      const newLikedBy = isLiked
        ? likedBy.filter((u) => u !== userId)
        : [...likedBy, userId];
      if (id) {
        await updatePost(id, { likedBy: newLikedBy });
      }
    } catch (e) {
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
      </Group>
    </Stack>
  );
};

export { PostFooter };
