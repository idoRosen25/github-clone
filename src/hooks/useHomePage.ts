import { useCallback, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchStore } from '../store';
import { searchUserRepositories } from '../api';
import type { SortOrder } from '../types/github';

const PER_PAGE = 10;

export const useHomePage = () => {
  const { searchTerm } = useSearchStore();
  const [sortByStars, setSortByStars] = useState<Exclude<SortOrder, null>>('desc');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch
  } = useInfiniteQuery({
    queryKey: ['repositories', searchTerm, sortByStars],
    queryFn: ({ pageParam = 1 }) => 
      searchUserRepositories({ 
        username: searchTerm, 
        page: pageParam, 
        per_page: PER_PAGE,
        sortByStars
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.total_count || lastPage.items.length < PER_PAGE) {
        return undefined;
      }
      return allPages.length + 1;
    },
    enabled: Boolean(searchTerm),
    initialPageParam: 1,
  });

  const repositories = data?.pages.flatMap(page => page.items) ?? [];

  const toggleSort = useCallback(() => {
    setSortByStars(current => current === 'desc' ? 'asc' : 'desc');
  }, []);

  const observerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        },
        { rootMargin: '100px' }
      );

      observer.observe(node);
      return () => observer.disconnect();
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  return {
    repositories,
    observerRef,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    sortByStars,
    toggleSort
  };
}; 