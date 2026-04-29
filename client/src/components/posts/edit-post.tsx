import { Stack, Button, Card, Title, FileInput, Text, Textarea, Group } from "@mantine/core";
import { useState } from "react";
import { updatePost } from "../../api/posts";
import { useLocation, useNavigate } from "react-router-dom";
import { Image } from "@mantine/core";
import image from "../../assets/image.png";
import { Post as PostType } from "../../types/post";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:3000";

const UpdatePost: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, postImage, content } = (location.state as PostType) || {};

  const [title] = useState("");
  const [postImageFile, setPostImage] = useState<File | null>(postImage ? new File([], postImage) : null);
  const [postContent, setContent] = useState(content || "");

  return (
    <Stack justify={"center"} align={"center"} style={{ minHeight: "80vh", padding: "2rem" }}>
      <Card shadow="md" padding="xl" radius="lg" w={{ base: '90vw', sm: '28vw' }} withBorder>
        <Stack gap="md">
          <Title order={2} ta="center" mb="sm" fw={700} c="blue.7">Update Post</Title>
          
          <div>
            <Text fw={500} size="sm" mb={4}>Post Content</Text>
            <Textarea 
              placeholder="What's on your mind?" 
              value={postContent} 
              onChange={(e) => setContent(e.currentTarget.value)} 
              minRows={4}
              radius="md"
            />
          </div>

          <div>
            <Text fw={500} size="sm" mb={4}>Post Image</Text>
            <Card withBorder radius="md" p="xs" mb="sm">
              <Image 
                src={postImageFile ? (postImageFile.size > 0 ? URL.createObjectURL(postImageFile) : `${API_BASE}/${postImageFile.name}`) : image} 
                alt="Post image preview" 
                radius="md"
                style={{ width: "100%", height: "200px", objectFit: "cover" }} 
              />
            </Card>
            <FileInput 
              placeholder="Upload a new image" 
              radius="md"
              onChange={(file) => setPostImage(file || null)} 
            />
          </div>

          <Group grow mt="xl">
            <Button variant="light" color="gray" radius="md" onClick={() => navigate('/profile')}>
              Cancel
            </Button>
            <Button radius="md" color="blue" onClick={async () => {
              try {
                await updatePost(id, { title, content: postContent, postImage: postImageFile || null });
                navigate('/profile');
              } catch (e: unknown) {
                const error = e as { response?: { data?: string; status?: number }; message?: string };
                const msg = error?.response?.data || error?.message || "Failed to update post";
                alert(msg);
                if (error?.response?.status === 401) navigate('/');
              }
            }}>
              Save Changes
            </Button>
          </Group>
        </Stack>
      </Card>
    </Stack>
  );
};

export { UpdatePost };