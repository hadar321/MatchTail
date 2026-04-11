import { Post } from "../types/post";

const fetchPosts = (): Post[] => {
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
};

export { fetchPosts };