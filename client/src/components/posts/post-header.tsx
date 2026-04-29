import { Flex, Avatar, Title } from "@mantine/core";
import { User } from "../../types/user";
import avatar from "../../assets/avatar.png";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:3000";

const PostHeader: React.FC<Pick<User, "username" | "profileImage">> = ({
  username,
  profileImage,
}) => {
  const getImageUrl = (url: string) => {
    if (!url) return avatar;
    if (url.startsWith("http") || url.startsWith("data:")) return url;
    const cleanBase = API_BASE.endsWith("/") ? API_BASE.slice(0, -1) : API_BASE;
    const cleanUrl = url.startsWith("/") ? url : `/${url}`;
    return `${cleanBase}${cleanUrl}`;
  };

  return (
    <Flex align={"center"} h={80} ml={"sm"} gap={"sm"}>
      <Avatar radius={"xl"} size={60} src={getImageUrl(profileImage || "")} />
      <Title size={"xl"}>{username}</Title>
    </Flex>
  );
};

export { PostHeader };