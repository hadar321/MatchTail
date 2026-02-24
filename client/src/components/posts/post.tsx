import { Card , Flex, Image, Text} from "@mantine/core";
import { PostHeader } from "./post-header";
import { Post as PostType } from "../../types/post";
import { getUserById } from "../../services/user-service";
import { PostFooter } from "./post-footer";
import { isNil } from "lodash";
import { useEffect, useState } from "react"
import { User } from "../../types/user";


const Post: React.FC<PostType> = ({ id, userId, imageUrl, content, likedBy }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setUser(getUserById(userId));
  }, [userId]);

  return (
     !isNil(user) && (
      <Card shadow={"sm"} padding={"lg"} radius={"md"} w={"36vw"} withBorder>
        <Card.Section>
          <PostHeader
            username={user.username}
            avatarURL={user.avatarURL}
          ></PostHeader>
        </Card.Section>
        <Card.Section>
          <Image src={imageUrl} height={500} />
        </Card.Section>
        <Card.Section>
          <PostFooter id={id} userId={userId} likedBy={likedBy} username={user.username} />
        </Card.Section>
        <Flex align={"center"} gap={"sm"} px={"sm"}>
          <Text style={{ fontWeight: "bold" }}>{user.username}</Text>
          <Text>{content}</Text>
        </Flex>
      </Card>
    )
  );
};

export { Post };