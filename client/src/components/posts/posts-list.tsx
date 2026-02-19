import { Post } from "./post";
import { Post as PostType } from "../../types/post";
import { fetchPosts } from "../../services/post-service";

const PostsList: React.FC = () => {
  const posts: PostType[] = fetchPosts();

  return posts.map((post) => (
    <Post
      id={post.id}
      userId={post.userId}
      content={post.content}
      animalId={post.animalId}
      imageUrl={post.imageUrl}
      lastUpdated={post.lastUpdated}
    />
  ));
};

export { PostsList };