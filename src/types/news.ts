export interface NewsContentBlock {
    image?: string;
    paragraph?: string;
    caption?: string;
    type?: string;
    text?: {
        id: string;
        en: string;
    };
    src?: string;
}

export interface News {
    id: number;
    title: {
        id: string;
        en: string;
    };
    slug: string;
    headerImage: string;
    date: string;
    author: string;
    content: NewsContentBlock[];
    location: string;
}
