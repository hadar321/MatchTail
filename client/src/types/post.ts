interface Post {
    id: string;
    userId: string;
    animal: string;
    content: string;
    postImage: string;
    lastUpdated: Date;
    likedBy: string[];
    senderInfo?: { _id: string; username: string; profileImage?: string };
}

export type { Post };