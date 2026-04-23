interface Comment {
    _id: string;
    content: string;
    postId: string;
    sender: string;
    timestamp: Date;
}

export type { Comment };
