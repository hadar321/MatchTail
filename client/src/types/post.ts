interface Post {
    id: string;
    userId: string;
    animal: string;
    content: string;
    imageUrl: string;
    lastUpdated: Date;
    likedBy: string[];
}

export type { Post };