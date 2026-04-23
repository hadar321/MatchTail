import { getPosts } from "../api/posts";
import { Post } from "../types/post";

const fetchPosts = async (): Promise<Post[]> => {
  try {
    const data = await getPosts();
    return data;
  } catch (e) {
    // fallback to local sample if server not available
    // eslint-disable-next-line no-console
    console.warn("fetchPosts: failed to fetch from server, returning sample posts", e);
    const posts: Post[] = [];
    posts.push({
      id: "1",
      userId: "1",
      content: "This is a sample post.",
      animal: "cat",
      imageUrl: "",
      lastUpdated: new Date(),
      likedBy: ["1"],
    });
    posts.push({
      id: "2",
      userId: "2",
      content: "This is another sample post.",
      animal: "dog",
      imageUrl: "",
      lastUpdated: new Date(),
      likedBy: [],
    });
    return posts;
  }
};

export { fetchPosts };