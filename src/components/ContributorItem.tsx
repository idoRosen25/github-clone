import React from 'react';
import type { Contributor } from '../types/github';

interface ContributorItemProps {
  contributor: Contributor;
}

const ContributorItem: React.FC<ContributorItemProps> = ({ contributor }) => {
  return (
    <a
      href={contributor.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="contributor-item"
    >
      <img 
        src={contributor.avatar_url} 
        alt={contributor.login} 
        className="contributor-avatar"
      />
      <div className="contributor-info">
        <span className="contributor-name">{contributor.login}</span>
        <span className="contributor-commits">- {contributor.contributions} commits</span>
      </div>
    </a>
  );
};

export default React.memo(ContributorItem); 