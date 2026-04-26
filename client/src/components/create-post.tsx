import { Stack, Button, TextInput } from "@mantine/core";
import { useState } from "react";
import { createPost } from "../api/posts";
import { useNavigate } from "react-router-dom";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postImage, setPostImage] = useState("");
  const navigate = useNavigate();

  return (
    <Stack justify={"center"} align={"center"} style={{ minHeight: "50vh" }}>
      <div style={{ width: "36vw" }}>
        <TextInput placeholder="Title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
        <TextInput placeholder="Content" value={content} onChange={(e) => setContent(e.currentTarget.value)} />
        <TextInput placeholder="Image URL" value={postImage} onChange={(e) => setPostImage(e.currentTarget.value)} />
        <Button mt={8} onClick={async () => {
          try {
            await createPost({ title, content, postImage });
            setTitle("");
            setContent("");
            setPostImage("");
            navigate('/postsList');
          } catch (e: unknown) {
            const error = e as { response?: { data?: string; status?: number }; message?: string };
            const msg = error?.response?.data || error?.message || "Failed to create post";
            alert(msg);
            if (error?.response?.status === 401) navigate('/');
          }
        }}>Create Post</Button>
      </div>
    </Stack>
  );
};

export { CreatePost };