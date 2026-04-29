import { Card, Flex, Image, Text, TextInput, Group, Divider, Stack, ActionIcon, Collapse } from "@mantine/core";
import { PostHeader } from "./post-header";
import { Post as PostType } from "../../types/post";
import { getUserById } from "../../services/user-service";
import { PostFooter } from "./post-footer";
import { isNil } from "lodash";
import { useEffect, useState } from "react"
import { User } from "../../types/user";
import { getComments, createComment } from "../../api/comments";
import type { Comment } from "../../types/comment";
import image from "../../assets/image.png";
import { IconSend } from "@tabler/icons-react";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:3000";

const Post: React.FC<PostType> = ({ id, userId, postImage, content, likedBy, senderInfo }) => {
  const [user, setUser] = useState<User>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentUsernames, setCommentUsernames] = useState<Record<string, string>>({});
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function loadUser() {
      // If we already have senderInfo from populate, use it!
      if (senderInfo) {
        setUser({
          _id: senderInfo._id,
          username: senderInfo.username,
          profileImage: senderInfo.profileImage || "",
          email: "", 
          password: "",
          lastUpdate: new Date()
        });
        return;
      }

      try {
        const u = await getUserById(userId);
        if (mounted && u) setUser(u);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Failed to load user", e);
      }
    }
    loadUser();
    return () => {
      mounted = false;
    };
  }, [userId]);

  useEffect(() => {
    let mounted = true;
    async function loadComments() {
      if (!id) return;
      try {
        const data = await getComments({ postId: id });
        if (mounted) setComments(data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Failed to load comments for post", e);
      }
    }
    loadComments();
    return () => {
      mounted = false;
    };
  }, [id]);

  useEffect(() => {
    let mounted = true;
    async function loadCommentUsernames() {
      const ids = Array.from(new Set(comments.map((c) => c.sender).filter(Boolean)));
      const missing = ids.filter((id) => !commentUsernames[id]);
      if (missing.length === 0) return;
      try {
        const results = await Promise.all(
          missing.map((id) => getUserById(id).catch(() => undefined))
        );
        if (!mounted) return;
        setCommentUsernames((prev) => {
          const next = { ...prev };
          missing.forEach((id, idx) => {
            const u = results[idx];
            next[id] = u ? u.username : id;
          });
          return next;
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Failed to load comment senders", e);
      }
    }
    loadCommentUsernames();
    return () => {
      mounted = false;
    };
  }, [comments]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !id) return;
    try {
      const created = await createComment({ content: newComment.trim(), postId: id });
      setComments((prev) => [...prev, created]);
      // ensure we have the sender username cached
      const senderId = created.sender;
      if (senderId && !commentUsernames[senderId]) {
        try {
          const u = await getUserById(senderId);
          setCommentUsernames((prev) => ({ ...prev, [senderId]: u ? u.username : senderId }));
        } catch {
          setCommentUsernames((prev) => ({ ...prev, [senderId]: senderId }));
        }
      }
      setNewComment("");
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Failed to add comment", e);
      alert("Failed to add comment");
    }
  };

  const getImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http") || url.startsWith("data:")) return url;
    const cleanBase = API_BASE.endsWith("/") ? API_BASE.slice(0, -1) : API_BASE;
    const cleanUrl = url.startsWith("/") ? url : `/${url}`;
    return `${cleanBase}${cleanUrl}`;
  };

  return (
    !isNil(user) && (
      <Card shadow="md" padding="0" radius="lg" w="100%" style={{ overflow: "hidden" }} withBorder>
        <Card.Section inheritPadding py="sm">
          <PostHeader username={user.username} profileImage={getImageUrl(user.profileImage)}></PostHeader>
        </Card.Section>

        <Card.Section>
          <Image
            src={postImage ? getImageUrl(postImage) : image}
            height={500}
            fit="cover"
            fallbackSrc={image}
          />
        </Card.Section>

        <Card.Section inheritPadding py="sm">
          <PostFooter id={id} userId={userId} likedBy={likedBy} />
        </Card.Section>

        <Flex align="flex-start" gap="sm" px="md" pb="sm">
          <Text fw={700} size="sm">{user.username}</Text>
          <Text size="sm">{content}</Text>
        </Flex>

        <Divider color="gray.2" />

        <div style={{ padding: '16px' }}>
          {comments.length > 0 && (
            <Text 
              fw={700} 
              size="sm" 
              mb="xs" 
              c="dimmed" 
              style={{ cursor: "pointer", userSelect: "none" }}
              onClick={() => setShowComments((prev) => !prev)}
            >
              {showComments ? "Hide comments" : `View all ${comments.length} comments`}
            </Text>
          )}
          
          <Collapse in={showComments}>
            <Stack gap="xs" mb="md" mt="sm">
              {comments.map((c) => (
                <Group key={c._id} wrap="nowrap" align="flex-start" gap="xs">
                  <Text size="sm" fw={600}>{commentUsernames[c.sender] ?? c.sender}</Text>
                  <Text size="sm">{c.content}</Text>
                </Group>
              ))}
            </Stack>
          </Collapse>

          <Group wrap="nowrap" mt="md" align="center" gap="sm">
            <TextInput
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.currentTarget.value)}
              radius="xl"
              style={{ flex: 1 }}
              onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
            />
            <ActionIcon 
              variant="light" 
              color="blue" 
              size="lg" 
              radius="xl" 
              onClick={handleAddComment}
              disabled={!newComment.trim()}
            >
              <IconSend size={18} />
            </ActionIcon>
          </Group>
        </div>
      </Card>
    )
  );
};

export { Post };