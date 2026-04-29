export type PostCategory = "PERSONAL" | "GIB" | "TURMOB";

export interface Post {
  id: string;
  title: string;
  content: string;
  category: PostCategory;
  createdAt: string;
  updatedAt: string;
}
