import React from 'react';
import SearchInput from '../components/SearchInput';
import RepositoriesList from '../components/RepositoriesList';
import { getErrorMessage } from '../utils';
import { useHomePage } from '../hooks/useHomePage';
import '../styles/HomePage.css';
import type { SortOrder } from '../types/github';

const getSortButtonText = (sortByStars: Exclude<SortOrder, null>) => {
  return `Sort by Stars (${sortByStars === 'desc' ? 'Descending' : 'Ascending'})`;
};

const HomePage: React.FC = () => {
  const {
    repositories,
    observerRef,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    sortByStars,
    toggleSort
  } = useHomePage();

  return (
    <div className="home-container">
      <div className="header-container">
        <h1 className="page-title">
          <span role="img" aria-label="search">🔍</span>
          GitHub Repo Explorer
        </h1>
        <p className="page-description">
          Enter a GitHub username to explore repositories.
        </p>
      </div>
      <div className="search-section">
        <SearchInput />
        <button 
          onClick={toggleSort}
          className="sort-button"
          title={getSortButtonText(sortByStars)}
        >
          {getSortButtonText(sortByStars)}
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      {isError && <p className="error-message">{getErrorMessage(error)}</p>}
      {repositories.length > 0 && (
        <RepositoriesList
          repositories={repositories}
          observerRef={observerRef}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </div>
  );
};

export default HomePage; 