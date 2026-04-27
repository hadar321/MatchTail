import { Stack, Button, Card, Title, FileInput, Text, Container, Textarea, Group } from "@mantine/core";
import { useState } from "react";
import { createPost } from "../api/posts";
import { useNavigate } from "react-router-dom";
import { Image } from "@mantine/core";
import image from "../assets/image.png";

const CreatePost: React.FC = () => {
  const [content, setContent] = useState("");
  const [postImage, setPostImage] = useState<File | null>(null);
  const navigate = useNavigate();

  return (
    <Container size="sm" mt={100} mb={80}>
      <Card shadow="md" padding="xl" radius="lg" w={{ base: '90vw', sm: '28vw' }} style={{ margin: '0 auto' }} withBorder>
        <Stack gap="md">
          <Title order={2} align="center" mb="sm" fw={700} c="blue.7">Create New Post</Title>
          
          <div>
            <Text fw={500} size="sm" mb={4}>Post Content</Text>
            <Textarea 
              placeholder="What's on your mind?" 
              value={content} 
              onChange={(e) => setContent(e.currentTarget.value)} 
              minRows={4}
              radius="md"
            />
          </div>

          <div>
            <Text fw={500} size="sm" mb={4}>Post Image</Text>
            <Card withBorder radius="md" p="xs" mb="sm">
              <Image 
                src={postImage ? URL.createObjectURL(postImage) : image} 
                alt="Post image preview" 
                radius="md"
                style={{ width: "100%", height: "200px", objectFit: "cover" }} 
              />
            </Card>
            <FileInput 
              placeholder="Upload an image" 
              radius="md"
              onChange={(file) => setPostImage(file || null)} 
            />
          </div>

          <Group grow mt="xl">
            <Button variant="light" color="gray" radius="md" onClick={() => navigate('/postsList')}>
              Cancel
            </Button>
            <Button radius="md" color="blue" onClick={async () => {
              try {
                // Not sending 'title' anymore because it's not strictly used in display, or send empty string if required
                await createPost({ title: "", content, postImage: postImage || null });
                setContent("");
                setPostImage(null);
                navigate('/postsList');
              } catch (e: unknown) {
                const error = e as { response?: { data?: string; status?: number }; message?: string };
                const msg = error?.response?.data || error?.message || "Failed to create post";
                alert(msg);
                if (error?.response?.status === 401) navigate('/');
              }
            }}>
              Create Post
            </Button>
          </Group>
        </Stack>
      </Card>
    </Container>
  );
};

export { CreatePost };