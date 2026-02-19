import { Flex, Avatar, Text } from "@mantine/core";

import { User } from "../../types/user";

const PostHeader: React.FC<Partial<User>> = ({ username, avatarURL }) => {
  return (
    <Flex>
       <Avatar radius="xl" src={avatarURL} />
      <Text size="md">{username}</Text>
    </Flex>
  );
};

export { PostHeader };