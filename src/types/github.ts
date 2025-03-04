export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface GitHubApiResponse {
  items: GitHubRepo[];
  total_count: number;
}

export type SortOrder = 'desc' | 'asc' | null;

export interface SearchParams {
  username: string;
  page: number;
  per_page?: number;
  sortByStars?: SortOrder;
}

export interface GitHubError {
  response?: {
    status: number;
    data?: {
      message: string;
    };
  };
  message?: string;
}

export interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  contributions: number;
  html_url: string;
} 