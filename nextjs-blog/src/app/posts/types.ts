export interface PostType {
  id: number;
  title: string;
  description: string;
  author: string;
  slug: string;
  content: string;
  user_email: string;
  inserted_at: string;
  user_id: string;
  tag_id: string[];
}

export interface Tag {
  id: string;
  name: string;
  created_at: string;
}
