
export interface NewsContentBlock {
    image?: string;
    paragraph?: string;
    caption?: {
        id: string;
        en: string;
    };
    type?: string;
    text?: {
        id: string;
        en: string;
    };
    src?: string;
}

export interface Projects {
    id: number;
    title: {
        id: string;
        en: string;
    };
    slug: string;
    headerImage: string;
    date: string;
    location: string;
    author: string;
    content: NewsContentBlock[];
}