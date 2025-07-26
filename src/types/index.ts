export interface Account {
  id: string;
  title: string;
  price: number;
  category: 'premium' | 'various';
  images: string[];
  details: AccountDetail[];
  featured: boolean;
  created_at: string;
}

export interface AccountDetail {
  id: string;
  label: string;
  value: string;
}

export interface BannerImage {
  id: string;
  url: string;
  alt: string;
  order: number;
}

export interface NewsItem {
  id: string;
  text: string;
  order: number;
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}