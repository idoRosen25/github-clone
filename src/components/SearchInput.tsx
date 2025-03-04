import React, { useCallback, useState } from 'react';
import { useSearchStore } from '../store';
import { debounce } from '../utils';
import '../styles/SearchInput.css';

const SearchInput: React.FC = () => {
  const { searchTerm, setSearchTerm } = useSearchStore();
  const [inputValue, setInputValue] = useState(searchTerm);

  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value.trim());
    }, 500),
    [setSearchTerm]
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetSearch(value);
  }, [debouncedSetSearch]);

  const handleClear = useCallback(() => {
    setInputValue('');
    setSearchTerm('');
  }, [setSearchTerm]);

  return (
    <div className="search-container">
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
    </div>
  );
};

export default React.memo(SearchInput); 