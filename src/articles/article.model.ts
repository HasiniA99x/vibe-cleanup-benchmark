export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  ownerId: string;
  topics: string[];
  createdAt: Date;
}
