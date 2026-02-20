import { ThemeIcon } from "@mantine/core";
import { Group, Stack } from "@mantine/core";
import { IconPawFilled } from "@tabler/icons-react";

import { Post } from "../../types/post";
import { gray, orange } from "../../consts";
import { useState } from "react";

const PostFooter: React.FC<Pick<Post, "userId" | "likedBy">> =
    ({ userId, likedBy }) => {
  const [isLiked, setIsLiked] = useState<boolean>(likedBy.includes(userId));

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
      </Group>
    </Stack>
  );
};

export { PostFooter };
