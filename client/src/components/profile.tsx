import { Text, Stack, Card, Button, Title, Group, Avatar, Container, Divider } from "@mantine/core";
import { useEffect, useState } from "react";
import { getUserById } from "../services/user-service";
import { Post as PostType } from "../types/post";
import { getPostsByUser } from "../api/posts";
import avatarImg from "../assets/avatar.png";
import { Post } from "./posts/post";
import { useNavigate } from "react-router-dom";
import { IconEdit } from "@tabler/icons-react";

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
    <Container size="sm" mt={100} mb={80}>
      <Card shadow="md" padding="xl" radius="lg" withBorder mb="xl">
        <Group wrap="nowrap" align="center" gap="lg">
          <Avatar 
            src={user?.profileImage ? `${API_BASE}/${user.profileImage}` : avatarImg} 
            size={120} 
            radius={120}
          />
          <Stack gap={4} style={{ flex: 1 }}>
            <Title order={2} fw={700}>{user?.username || 'Loading...'}</Title>
            <Text c="dimmed" size="md">{user?.email}</Text>
          </Stack>
          <Button 
            variant="light" 
            color="blue" 
            radius="md" 
            leftSection={<IconEdit size={16} />}
            onClick={() => navigate('/edit-profile', { state: user })}
          >
            Edit Profile
          </Button>
        </Group>
      </Card>

      <Divider my="xl" label={<Title order={3} c="gray.6">Your Posts</Title>} labelPosition="center" />
      
      <Stack gap="xl" align="center">
        {posts.map((post) => (
          <Stack key={post.id} gap="xs" align="flex-end" w={{ base: '90vw', md: '36vw' }}>
            <Post
              id={post.id}
              userId={post.userId}
              content={post.content}
              animal={post.animal}
              postImage={post.postImage}
              lastUpdated={post.lastUpdated}
              likedBy={post.likedBy}
            />
            <Button 
              variant="subtle" 
              color="gray" 
              size="sm"
              leftSection={<IconEdit size={14} />}
              onClick={() => navigate(`/edit-post`, { state: post })}
            >
              Edit Post
            </Button>
          </Stack>
        ))}
        {posts.length === 0 && (
          <Text c="dimmed" mt="md">You haven't made any posts yet.</Text>
        )}
      </Stack>
    </Container>
  );
};

export { Profile };