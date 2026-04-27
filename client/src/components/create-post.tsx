import { Stack, Button, TextInput, Card, Title, FileInput, Text } from "@mantine/core";
import { useState } from "react";
import { createPost } from "../api/posts";
import { useNavigate } from "react-router-dom";
import { Image } from "@mantine/core";
import image from "../assets/image.png";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postImage, setPostImage] = useState<File | null>(null);
  const navigate = useNavigate();

  return (
    <Stack justify={"center"} align={"center"} style={{ minHeight: "50vh" }}>
      <Card shadow={"sm"} padding="lg" radius="md" w={"24vw"} withBorder>
        <div >
          <Title order={2} align="center" mb="md">Create New Post</Title>
          <Text mt="md">post title:</Text>
          <TextInput placeholder="Title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
          <Text mt="md">post content:</Text>
          <TextInput placeholder="Content" value={content} onChange={(e) => setContent(e.currentTarget.value)} />
          <Text mt="md">post image:</Text>
          <Image mt={"sm"} src={postImage? URL.createObjectURL(postImage) : image} alt="Post image preview" style={{ width: "100%", height: "auto", marginBottom: 8 }}/>
          <FileInput placeholder="upload image" onChange={(file) => setPostImage(file || null)}/>
        <Button fullWidth mt={30} onClick={async () => {
          try {
            await createPost({ title, content, postImage: postImage || null });
            setTitle("");
            setContent("");
            setPostImage(null);
            navigate('/postsList');
          } catch (e: unknown) {
            const error = e as { response?: { data?: string; status?: number }; message?: string };
            const msg = error?.response?.data || error?.message || "Failed to create post";
            alert(msg);
            if (error?.response?.status === 401) navigate('/');
          }
        }}>Create Post</Button>
        </div>
        </Card>
    </Stack>
  );
};

export { CreatePost };