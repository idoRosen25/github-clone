import axios from 'axios';
import type { GitHubRepo, SearchParams, Contributor } from '../types/github';
import { CacheManager } from '../utils/cache';

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});

// Store ongoing requests
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pendingRequests: Map<string, Promise<any>> = new Map();

const makeRequest = async <T>(
  cacheKey: string,
  requestFn: () => Promise<T>,
  options: { 
    cacheDuration?: number;
    bypassCache?: boolean;
  } = {}
): Promise<T> => {
  const { cacheDuration, bypassCache = false } = options;

  // Check cache first
  if (!bypassCache) {
    const cachedData = CacheManager.get<T>(cacheKey);
    if (cachedData) return cachedData;
  }

  // Check for pending requests
  const pendingRequest = pendingRequests.get(cacheKey);
  if (pendingRequest) {
    return pendingRequest;
  }

  // Make new request
  const request = requestFn()
    .then(response => {
      CacheManager.set(cacheKey, response, cacheDuration);
      pendingRequests.delete(cacheKey);
      return response;
    })
    .catch(error => {
      pendingRequests.delete(cacheKey);
      throw error;
    });

  pendingRequests.set(cacheKey, request);
  return request;
};

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

    const cacheKey = CacheManager.createCacheKey('repos', username, page, per_page, sortByStars);

    return makeRequest(
      cacheKey,
      async () => {
        const response = await githubApi.get<GitHubRepo[]>(`/users/${username}/repos`, {
          params: {
            page,
            per_page,
            sort: 'updated',
            direction: 'desc',
          },
        });

        let repos = response.data;
        
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
      },
      { cacheDuration: 2 * 60 * 1000 } // 2 minutes cache
    );
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
};

export const getRepositoryDetails = async (owner: string, repo: string): Promise<GitHubRepo> => {
  try {
    const cacheKey = CacheManager.createCacheKey('repo_details', owner, repo);

    return makeRequest(
      cacheKey,
      () => githubApi.get<GitHubRepo>(`/repos/${owner}/${repo}`).then(res => res.data),
      { cacheDuration: 5 * 60 * 1000 } // 5 minutes cache
    );
  } catch (error) {
    console.error('Error fetching repository details:', error);
    throw error;
  }
};

export const getRepositoryContributors = async (owner: string, repo: string): Promise<Contributor[]> => {
  try {
    const cacheKey = CacheManager.createCacheKey('contributors', owner, repo);

    return makeRequest(
      cacheKey,
      () => githubApi.get<Contributor[]>(`/repos/${owner}/${repo}/contributors`).then(res => res.data),
      { cacheDuration: 5 * 60 * 1000 } // 5 minutes cache
    );
  } catch (error) {
    console.error('Error fetching repository contributors:', error);
    throw error;
  }
}; 