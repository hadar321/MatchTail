import { Stack, Button, TextInput } from "@mantine/core";
import { Post } from "./post";
import { Post as PostType } from "../../types/post";
import { fetchPosts } from "../../services/post-service";
import { useEffect, useState } from "react";
import { createPost } from "../../api/posts";
import { useNavigate } from "react-router-dom";

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await fetchPosts();
        if (mounted) setPosts(data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Failed to load posts", e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div>Loading posts…</div>;

  return (
    <Stack justify={"center"} align={"center"}>
      <div style={{ width: "36vw", marginBottom: 12 }}>
        <TextInput placeholder="Title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
        <TextInput placeholder="Content" value={content} onChange={(e) => setContent(e.currentTarget.value)} />
        <Button mt={8} onClick={async () => {
          try {
            await createPost({ title, content });
            const data = await fetchPosts();
            setPosts(data as any);
            setTitle(""); setContent("");
          } catch (e: any) {
            const msg = e?.response?.data || e?.message || "Failed to create post";
            alert(msg);
            if (e?.response?.status === 401) navigate('/');
          }
        }}>Create Post</Button>
      </div>
      {posts.map((post) => (
        <Post
          id={post.id}
          userId={post.userId}
          content={post.content}
          animal={post.animal}
          imageUrl={post.imageUrl}
          lastUpdated={post.lastUpdated}
          likedBy={post.likedBy}
        />
      ))}
    </Stack>
  );
};

export { PostsList };