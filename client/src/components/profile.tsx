import { Text, Stack, Card, Button, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { getUserById } from "../services/user-service";
import { Post as PostType } from "../types/post";
import { getPostsByUser } from "../api/posts";
import avatarImg from "../assets/avatar.png";
import { Post } from "./posts/post";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:3000";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      getUserById(userId).then(async (u) => {
        setUser(u);

        try {
          const data = await getPostsByUser(userId);
          setPosts(data);
        } catch (e) {
        // eslint-disable-next-line no-console
          console.error("Failed to load posts by user", e);
        }
      });
    }
  }, []);

  return (
    <Stack align={"center"} justify={"center"} mt={100}>
      <Title>personal details:</Title>
      <Card shadow={"sm"} padding="lg" radius="md" w={"24vw"} withBorder>
            <Stack align="left">
            <img
              src={user?.profileImage ? `${API_BASE}/${user.profileImage}` : avatarImg}
              alt="Avatar preview"
              style={{ width: 100, height: 100, objectFit: "cover", borderRadius: "50%" ,alignSelf: "center"}}
            />
            <Text>username: {user?.username}</Text>
            <Text>email: {user?.email}</Text>

            <Button type="button">edit profile</Button>
              </Stack>
          </Card>
        <Title>your posts:</Title>
      {posts.map((post) => (
        <>
          <Post
            key={post.id}
            id={post.id}
            userId={post.userId}
            content={post.content}
            animal={post.animal}
            postImage={post.postImage}
            lastUpdated={post.lastUpdated}
            likedBy={post.likedBy}
          />
          <Button type="button" color="gray" onClick={() => navigate(`/edit-post`, { state: post })}>Edit Post</Button>
        </>
      ))}
      
    </Stack>
    );
     
};

export { Profile };