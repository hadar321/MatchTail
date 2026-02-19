import { Card } from "@mantine/core";
import { PostHeader } from "./post-header";
import { Post as PostType } from "../../types/post";
import { getUserById } from "../../services/user-service";

const Post: React.FC<PostType> = ({userId}) => {
  const user = getUserById(userId);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <PostHeader
        username={user.username}
        avatarURL={user.avatarURL}
      ></PostHeader>
    </Card>
  );
};

export { Post };