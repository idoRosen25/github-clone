import React from 'react';
import ContributorItem from './ContributorItem';
import type { Contributor } from '../types/github';

interface ContributorsListProps {
  contributors: Contributor[];
}

const ContributorsList: React.FC<ContributorsListProps> = ({ contributors }) => {
  if (!contributors.length) return null;

  return (
    <div className="repository-page-contributors">
      <h2>Top Contributors</h2>
      <div className="contributors-list">
        {contributors.map(contributor => (
          <ContributorItem 
            key={contributor.login} 
            contributor={contributor} 
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(ContributorsList); 