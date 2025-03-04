import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { GitHubRepo } from '../types/github';
import '../styles/GitRepositoryItem.css';

interface GitRepositoryItemProps {
  repository: GitHubRepo;
}

const GitRepositoryItem: React.FC<GitRepositoryItemProps> = ({ repository }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    const [owner, repo] = repository.full_name.split('/');
    navigate(`/repository/${owner}/${repo}`);
  };

  return (
    <article className="repository-card" onClick={handleClick}>
      <h3 className="repository-title">{repository.name}</h3>
      <p className="repository-description">
        {repository.description || 'No description available'}
      </p>
      <div className="repository-stats">
        <div className="stat-group">
          <span className="stat-item">
            ⭐ {repository.stargazers_count}
          </span>
          <span className="stat-item">
            🔤 {repository.language || 'Unknown'}
          </span>
        </div>
      </div>
    </article>
  );
};

export default React.memo(GitRepositoryItem); 