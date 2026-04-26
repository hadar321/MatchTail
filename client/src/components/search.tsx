import { TextInput, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { getPostsBySearch } from "../api/posts";
import { Post as PostType } from "../types/post";

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
    <Stack align="center" gap="md" style={{ minHeight: "50vh" }}>
      <TextInput
        placeholder="What would you like to search"
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
        leftSection={<IconSearch size="1rem" />}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        style={{ width: "36vw" }}
      />
      {searched && (
        <div>
          <Text>Search Results:</Text>
          {results.map((post) => (
            <div key={post.id}>
              <Text>{post.content}</Text>
            </div>
          ))}
        </div>
      )}
    </Stack>
  );
};

export { Search };