import { useState } from "react";
import { TextInput, Button, Card, Text, Stack, Loader, Group, Title } from "@mantine/core";
import { smartSearch } from "../../api/posts";
import { Post as PostType } from "../../types/post";

interface SmartSearchProps {
  onSearchResults: (posts: PostType[] | null) => void;
}

export const SmartSearch = ({ onSearchResults }: SmartSearchProps) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<PostType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setAnswer(null);
    onSearchResults(null);
    try {
      const data = await smartSearch(query);
      setAnswer(data.answer);
      onSearchResults(data.posts);
    } catch (e) {
      console.error(e);
      setError("חיפוש חכם נכשל. ודא שהגדרת מפתח GEMINI_API_KEY בשרת.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl" w="100%">
      <Title order={3} ta="center" mb="md" c="blue.7">חיפוש חכם (AI)</Title>
      <Group align="flex-end" mb="md">
        <TextInput
          placeholder="שאל שאלה חופשית... (לדוגמה: הכלב שלי לא אוכל, מה לעשות?)"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          style={{ flex: 1 }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <Button onClick={handleSearch} disabled={loading}>
          חפש
        </Button>
        {answer && (
          <Button color="red" variant="light" onClick={() => {
            setQuery("");
            setAnswer(null);
            onSearchResults(null);
          }} disabled={loading}>
            נקה חיפוש
          </Button>
        )}
      </Group>

      {loading && (
        <Stack align="center" mt="md">
          <Loader size="sm" />
          <Text size="sm" c="dimmed">ה-AI חושב ומחפש בתכנים...</Text>
        </Stack>
      )}

      {error && <Text c="red" size="sm">{error}</Text>}

      {answer && (
        <Stack mt="md">
          <Card bg="blue.0" radius="md" padding="md">
            <Text fw={500} mb="xs">תשובת ה-AI:</Text>
            <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>{answer}</Text>
          </Card>
        </Stack>
      )}
    </Card>
  );
};
