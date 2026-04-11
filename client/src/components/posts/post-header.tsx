import { Flex, Avatar, Text } from "@mantine/core";

import { User } from "../../types/user";

const PostHeader: React.FC<Pick<User, "username" | "avatarURL">> = ({
  username,
  avatarURL,
}) => {
  return (
    <Flex align={"center"} h={80} ml={"sm"} gap={"sm"}>
      <Avatar radius={"xl"} size={60} src={avatarURL} />
      <Text size={"xl"}>{username}</Text>
    </Flex>
  );
};

export { PostHeader };