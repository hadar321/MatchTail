import { Flex, Avatar, Title } from "@mantine/core";
import { User } from "../../types/user";
import avatar from "../../assets/avatar.png";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:3000";

const PostHeader: React.FC<Pick<User, "username" | "profileImage">> = ({
  username,
  profileImage,
}) => {
  return (
    <Flex align={"center"} h={80} ml={"sm"} gap={"sm"}>
      <Avatar radius={"xl"} size={60} src={profileImage ? `${API_BASE}/${profileImage}` : avatar} />
      <Title size={"xl"}>{username}</Title>
    </Flex>
  );
};

export { PostHeader };