import { Stack, Button, TextInput } from "@mantine/core";
import { Post } from "./post";
import { Post as PostType } from "../../types/post";
import { useEffect, useState, useRef, useCallback } from "react";
import { createPost, getPosts } from "../../api/posts";
import { useNavigate } from "react-router-dom";

const POSTS_PER_PAGE = 10;

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const observerRef = useRef<HTMLDivElement>(null);

  const loadPosts = useCallback(async (pageNum: number, append: boolean = false) => {
    try {
      const data = await getPosts({ page: pageNum.toString(), limit: POSTS_PER_PAGE.toString() });
      if (append) {
        setPosts(prev => [...prev, ...data]);
      } else {
        setPosts(data);
      }
      if (data.length < POSTS_PER_PAGE) {
        setHasMore(false);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Failed to load posts", e);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      await loadPosts(1, false);
      if (mounted) setLoading(false);
    }
    load();
    return () => {
      mounted = false;
    };
  }, [loadPosts]);

  const loadMorePosts = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    await loadPosts(nextPage, true);
    setPage(nextPage);
    setLoadingMore(false);
  }, [loadingMore, hasMore, page, loadPosts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      { threshold: 1.0 }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loadMorePosts]);

  if (loading) return <div>Loading posts…</div>;

  return (
    <Stack justify={"center"} align={"center"}>
      <div style={{ width: "36vw", marginBottom: 12 }}>
        <TextInput placeholder="Title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
        <TextInput placeholder="Content" value={content} onChange={(e) => setContent(e.currentTarget.value)} />
        <Button mt={8} onClick={async () => {
          try {
            const newPost = await createPost({ title, content ,postImage: ""});
            setPosts(prev => [newPost, ...prev]);
            setTitle("");
            setContent("");
          } catch (e: unknown) {
            const error = e as { response?: { data?: string; status?: number }; message?: string };
            const msg = error?.response?.data || error?.message || "Failed to create post";
            alert(msg);
            if (error?.response?.status === 401) navigate('/');
          }
        }}>Create Post</Button>
      </div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          userId={post.userId}
          content={post.content}
          animal={post.animal}
          imageUrl={post.imageUrl}
          lastUpdated={post.lastUpdated}
          likedBy={post.likedBy}
        />
      ))}
      {loadingMore && <div>Loading more posts…</div>}
      <div ref={observerRef} style={{ height: '20px' }} />
    </Stack>
  );
};

export { PostsList };