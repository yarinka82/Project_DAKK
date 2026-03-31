export interface New {
  description: string;
  images?: string[];
  publishedAt?: string;
  slug: string;
  title: string;
  _createdAt: string;
  _id: string;
  _updatedAt: string;
}

export interface NewsStore {
  items: Publication[] | [];
  currentItem: number | null;
  isPublicationOpened: boolean;
  isLoading: boolean;
  getNews: () => [];
  setNews: ([]) => void;
}

export interface Publication {
  id: number;
  title: string;
  description: string;
  logoSm: string;
  logoXl: string;
}
