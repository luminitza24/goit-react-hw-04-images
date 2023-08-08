import { useState } from 'react';
import PropTypes from 'prop-types';
import './Searchbar.css';

export const Searchbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleChange = evt => {
    const { value } = evt.target;
    setSearchTerm(value);
  };
  const resetForm = () => {
    setSearchTerm('');
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    onSearch(searchTerm);
    resetForm();
  };

  return (
    <header className="Searchbar" onSubmit={handleSubmit}>
      <form className="SearchForm">
        <button type="submit" className="SearchForm_button"></button>
        <input
          className="SearchForm_input"
          type="text"
          placeholder="Search images and photos"
          value={searchTerm}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
