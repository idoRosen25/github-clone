import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRepositoryDetails, getRepositoryContributors } from '../api';
import ContributorsList from '../components/ContributorsList';
import '../styles/RepositoryPage.css';

const RepositoryPage: React.FC = () => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();

  const { data: repository, isLoading: isRepoLoading } = useQuery({
    queryKey: ['repository', owner, repo],
    queryFn: () => getRepositoryDetails(owner!, repo!),
    enabled: Boolean(owner && repo),
  });

  const { data: contributors, isLoading: isContribLoading } = useQuery({
    queryKey: ['contributors', owner, repo],
    queryFn: () => getRepositoryContributors(owner!, repo!),
    enabled: Boolean(owner && repo),
  });

  if (isRepoLoading || isContribLoading) return <p>Loading...</p>;
  if (!repository) return null;

  return (
    <div className="repository-page">
      <h1 className="repository-page-title">{repository.name}</h1>
      <p className="repository-page-description">
        {repository.description || 'No description available'}
      </p>

      <div className="repository-page-stats">
        <div className="repository-page-stat">
          <span className="stat-value">⭐ {repository.stargazers_count}</span>
        </div>
        <div className="repository-page-stat">
          <span className="stat-value">🔤 {repository.language || 'Unknown'}</span>
        </div>
        <div className="repository-page-stat">
          <span className="stat-value">📅 Last Updated: {new Date(repository.updated_at).toLocaleDateString()}</span>
        </div>
      </div>

      <a 
        href={repository.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="repository-page-view-button"
      >
        View on GitHub
      </a>

      {contributors && <ContributorsList contributors={contributors} />}
    </div>
  );
};

export default RepositoryPage; 