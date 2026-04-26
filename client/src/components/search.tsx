import { TextInput, Stack, Text, Container, Title, Center } from "@mantine/core";
import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { getPostsBySearch } from "../api/posts";
import { Post as PostType } from "../types/post";
import { Post } from "./posts/post";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PostType[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (query.trim()) {
      const posts = await getPostsBySearch(query);
      setResults(posts);
      setSearched(true);
    }
  };

  return (
    <Container size="sm" mt={100} mb={80} style={{ minHeight: "80vh" }}>
      <Stack align="center" gap="xl">
        <Stack align="center" gap="xs">
          <Title order={2} c="blue.7" fw={700}>Search Posts</Title>
          <Text c="dimmed" size="sm">Find specific content across the network</Text>
        </Stack>

        <TextInput
          placeholder="What are you looking for?"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          leftSection={<IconSearch size="1.1rem" />}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          w={{ base: "90vw", sm: "60vw", md: "40vw" }}
          size="lg"
          radius="xl"
          autoFocus
        />

        {searched && (
          <Stack mt="lg" w="100%" gap="lg">
            <Text fw={600} size="lg" mb="sm">
              Search Results ({results.length})
            </Text>
            
            {results.length === 0 ? (
              <Center>
                <Text c="dimmed">No posts matched your query.</Text>
              </Center>
            ) : (
              <Stack gap="xl" align="center">
                {results.map((post) => (
                  <Post
                    key={post.id}
                    id={post.id}
                    userId={post.userId}
                    content={post.content}
                    animal={post.animal}
                    postImage={post.postImage}
                    lastUpdated={post.lastUpdated}
                    likedBy={post.likedBy}
                  />
                ))}
              </Stack>
            )}
          </Stack>
        )}
      </Stack>
    </Container>
  );
};

export { Search };