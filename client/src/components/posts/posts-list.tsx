import { Stack } from "@mantine/core";
import { Post } from "./post";
import { Post as PostType } from "../../types/post";
import { useEffect, useState, useRef, useCallback } from "react";
import { getPosts } from "../../api/posts";

const POSTS_PER_PAGE = 10;

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
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