import { Card , Flex, Image, Text, TextInput, Button } from "@mantine/core";
import { PostHeader } from "./post-header";
import { Post as PostType } from "../../types/post";
import { getUserById } from "../../services/user-service";
import { PostFooter } from "./post-footer";
import { isNil } from "lodash";
import { useEffect, useState } from "react"
import { User } from "../../types/user";
import { getComments, createComment } from "../../api/comments";
import type { Comment } from "../../types/comment";


const Post: React.FC<PostType> = ({ id, userId, imageUrl, content, likedBy }) => {
  const [user, setUser] = useState<User>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentUsernames, setCommentUsernames] = useState<Record<string, string>>({});
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    let mounted = true;
    async function loadUser() {
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

  

  return (
     !isNil(user) && (
      <Card shadow={"sm"} padding={"lg"} radius={"md"} w={"36vw"} withBorder>
        <Card.Section>
          <PostHeader
            username={user.username}
            avatarURL={user.avatarURL}
          ></PostHeader>
        </Card.Section>
        <Card.Section>
          <Image src={imageUrl} height={500} />
        </Card.Section>
        <Card.Section>
          <PostFooter id={id} userId={userId} likedBy={likedBy} />
        </Card.Section>
        <Flex align={"center"} gap={"sm"} px={"sm"}>
          <Text style={{ fontWeight: "bold" }}>{user.username}</Text>
          <Text>{content}</Text>
        </Flex>
        <div style={{ padding: 12 }}>
          <Text fw={700}>Comments ({comments.length})</Text>
          {comments.map((c) => (
            <div key={c._id} style={{ marginTop: 8 }}>
              <Text size="sm"><strong>{commentUsernames[c.sender] ?? c.sender}</strong>: {c.content}</Text>
            </div>
          ))}
          <div style={{ marginTop: 12 }}>
            <TextInput
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.currentTarget.value)}
            />
            <Button mt={8} onClick={handleAddComment}>Add Comment</Button>
          </div>
        </div>
      </Card>
    )
  );
};

export { Post };