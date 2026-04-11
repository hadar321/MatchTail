import { ThemeIcon } from "@mantine/core";
import { Group, Stack, Text } from "@mantine/core";
import { IconPawFilled } from "@tabler/icons-react";

import { Post } from "../../types/post";

const PostFooter: React.FC<Pick<Post, "content">> = ({ content }) => {
  return (
    <Stack>
      <Text>{content}</Text>
      <Group h={100}>
        <ThemeIcon variant="white" size={80} color={"dark"}>
          <IconPawFilled style={{ height: "50%", width: "50%" }} stroke={1.5} />
        </ThemeIcon>
      </Group>
    </Stack>
  );
};

export { PostFooter };
