import React, { useState, useCallback } from 'react';
import { useSearchStore } from '../store';
import '../styles/SearchInput.css';

const SearchInput: React.FC = () => {
  const { searchTerm, setSearchTerm } = useSearchStore();
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(inputValue.trim());
  }, [inputValue, setSearchTerm]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setInputValue('');
    setSearchTerm('');
  }, [setSearchTerm]);

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Enter GitHub username"
        value={inputValue}
        onChange={handleChange}
      />
      {inputValue && (
        <button
          type="button"
          className="clear-button"
          onClick={handleClear}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </form>
  );
};

export default React.memo(SearchInput); 