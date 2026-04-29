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
    setRelatedPosts([]);
    onSearchResults(null);
    try {
      const data = await smartSearch(query);
      setAnswer(data.answer);
      setRelatedPosts(data.posts);
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
        <Button onClick={handleSearch} loading={loading}>
          חפש
        </Button>
        {answer && (
          <Button color="red" variant="light" onClick={() => {
            setQuery("");
            setAnswer(null);
            setRelatedPosts([]);
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
        <Stack mt="md" gap="md">
          <Card bg="blue.0" radius="md" padding="md" withBorder>
            <Text fw={600} mb="xs" c="blue.9">תשובת ה-AI:</Text>
            <Text size="sm" style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{answer}</Text>
          </Card>

          {relatedPosts.length > 0 && (
            <Stack gap="xs">
              <Text size="xs" fw={700} c="dimmed" tt="uppercase">מקורות המידע ששימשו לתשובה:</Text>
              <Group gap="xs">
                {relatedPosts.map((post, idx) => (
                  <Card key={post.id} padding="xs" radius="xs" withBorder style={{ flex: 1, minWidth: '150px' }}>
                    <Text size="xs" fw={500} truncate>מקור {idx + 1}: {post.content.substring(0, 30)}...</Text>
                  </Card>
                ))}
              </Group>
            </Stack>
          )}
        </Stack>
      )}
    </Card>
  );
};
