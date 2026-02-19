import { Post } from "../types/post";

const fetchPosts = (): Post[] => {
    const posts: Post[] = [];
    posts.push({
      id: "1",
      userId: "1",
      content: "This is a sample post.",
      animalId: "1",
      imageUrl: "",
      lastUpdated: new Date(),
    });
  return posts;
};

export { fetchPosts };