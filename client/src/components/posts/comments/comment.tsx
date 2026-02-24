import { Flex, Text } from "@mantine/core";

import { Comment as CommentType } from "../../../types/comment";

const Comment: React.FC<
  Pick<CommentType, "content"> & { username: string }
> = ({ content, username }) => {
  return (
    <Flex gap={"sm"}>
      <Text style={{ fontWeight: "bold" }}>{username}</Text>
      <Text>{content}</Text>
    </Flex>
  );
};

export { Comment };