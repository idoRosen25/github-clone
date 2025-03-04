import React from 'react';
import type { GitHubRepo } from '../types/github';
import GitRepositoryItem from './GitRepositoryItem';
import '../styles/RepositoriesList.css';

interface RepositoriesListProps {
  repositories: GitHubRepo[];
  observerRef: (node: HTMLDivElement | null) => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

const RepositoriesList: React.FC<RepositoriesListProps> = ({
  repositories,
  observerRef,
  hasNextPage,
  isFetchingNextPage
}) => {
  return (
    <section className="repositories-grid">
      {repositories.map(repo => (
        <GitRepositoryItem key={repo.id} repository={repo} />
      ))}
      {(hasNextPage || isFetchingNextPage) && (
        <div ref={observerRef} className="load-more">
          {isFetchingNextPage && <p>Loading more...</p>}
        </div>
      )}
    </section>
  );
};

export default React.memo(RepositoriesList); 