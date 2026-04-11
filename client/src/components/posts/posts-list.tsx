import { Stack } from "@mantine/core";
import { Post } from "./post";
import { Post as PostType } from "../../types/post";
import { fetchPosts } from "../../services/post-service";

const PostsList: React.FC = () => {
  const posts: PostType[] = fetchPosts();

   return (
    <Stack justify={"center"} align={"center"}>
      {posts.map((post) => (
        <Post
          id={post.id}
          userId={post.userId}
          content={post.content}
          animal={post.animal}
          imageUrl={post.imageUrl}
          lastUpdated={post.lastUpdated}
        />
      ))}
    </Stack>
  );
};

export { PostsList };