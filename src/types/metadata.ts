export default interface MetadataFormValues {
    page_id: number;
    language_id: number;
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    og_image: FileList | null;
    og_type: string;
    twitter_card: string;
}
