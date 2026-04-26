import { Stack, Button, TextInput, Card, Title, FileInput, Text } from "@mantine/core";
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

  const [title, setTitle] = useState("");
  const [postImageFile, setPostImage] = useState<File | null>(postImage ? new File([], postImage) : null);
  const [postContent, setContent] = useState(content || "");

  return (
    <Stack justify={"center"} align={"center"} style={{ minHeight: "50vh" }}>
      <Card shadow={"sm"} padding="lg" radius="md" w={"24vw"} withBorder>
        <div >
          <Title order={2} align="center" mb="md">Update Post</Title>
          {/* <Text mt="md">post title:</Text>
          <TextInput placeholder="Title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} /> */}
          <Text mt="md">post content:</Text>
          <TextInput placeholder="Content" value={postContent} onChange={(e) => setContent(e.currentTarget.value)} />
          <Text mt="md">post image:</Text>
          <Image mt={"sm"} src={postImageFile ? (postImageFile.size > 0 ? URL.createObjectURL(postImageFile) : `${API_BASE}/${postImageFile.name}`) : image} alt="Post image preview" style={{ width: "100%", height: "auto", marginBottom: 8 }} />
          <FileInput placeholder="upload image" onChange={(file) => setPostImage(file || null)} />
          <Button fullWidth mt={30} onClick={async () => {
            try {
              await updatePost(id, { title, content, postImage: postImageFile || null });
              navigate('/profile');
            } catch (e: unknown) {
              const error = e as { response?: { data?: string; status?: number }; message?: string };
              const msg = error?.response?.data || error?.message || "Failed to update post";
              alert(msg);
              if (error?.response?.status === 401) navigate('/');
            }
          }}>Update Post</Button>
        </div>
      </Card>
    </Stack>
  );
};

export { UpdatePost };