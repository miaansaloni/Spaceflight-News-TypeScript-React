export interface SpaceFlight {
  count: number;
  next: string;
  previous: null;
  results: Article[];
}

export interface Article {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
  featured: boolean;
  launches: Launch[];
  events: any[];
}

export interface Launch {
  launch_id: string;
  provider: string;
}
