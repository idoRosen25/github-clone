import type { GitHubError } from '../types/github';

type DebouncedFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void;

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): DebouncedFunction<T> {
  let timeoutId: NodeJS.Timeout;

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const getErrorMessage = (error: unknown): string => {
  const gitHubError = error as GitHubError;
  if (gitHubError.response?.status === 422 || gitHubError.response?.status === 404) {
    return 'No repositories found. Try another search term';
  }
  return 'Failed to fetch repositories. Try again';
}; 