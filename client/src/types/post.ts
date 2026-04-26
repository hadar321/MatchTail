interface Post {
    id: string;
    userId: string;
    animal: string;
    content: string;
    postImage: string;
    lastUpdated: Date;
    likedBy: string[];
}

export type { Post };