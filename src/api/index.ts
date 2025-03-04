import axios from 'axios';
import type { GitHubRepo, SearchParams, Contributor } from '../types/github';

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});

export const searchUserRepositories = async ({ 
  username, 
  page = 1, 
  per_page = 10,
  sortByStars = null
}: SearchParams): Promise<{ items: GitHubRepo[]; total_count: number }> => {
  try {
    if (!username.trim()) {
      return { items: [], total_count: 0 };
    }

    const response = await githubApi.get<GitHubRepo[]>(`/users/${username}/repos`, {
      params: {
        page,
        per_page,
        sort: 'updated',
        direction: 'desc',
      },
    });

    let repos = response.data;
    
    // Handle star sorting client-side since the API doesn't support it directly
    if (sortByStars) {
      repos = [...repos].sort((a, b) => {
        if (sortByStars === 'desc') {
          return b.stargazers_count - a.stargazers_count;
        }
        return a.stargazers_count - b.stargazers_count;
      });
    }

    return {
      items: repos,
      total_count: repos.length
    };
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
};

export const getRepositoryDetails = async (owner: string, repo: string): Promise<GitHubRepo> => {
  try {
    const response = await githubApi.get<GitHubRepo>(`/repos/${owner}/${repo}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching repository details:', error);
    throw error;
  }
};

export const getRepositoryContributors = async (owner: string, repo: string): Promise<Contributor[]> => {
  try {
    const response = await githubApi.get<Contributor[]>(`/repos/${owner}/${repo}/contributors`);
    return response.data;
  } catch (error) {
    console.error('Error fetching repository contributors:', error);
    throw error;
  }
}; 