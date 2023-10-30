import React from 'react';
import {
  StyledSearchbar,
  StyledForm,
  StyledSearchBtn,
  StyledFormInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useState } from 'react';

export const Searchbar = ({ globalQuery, onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (globalQuery === query) {
      toast.warning('Такий запит вже є');
      return;
    }
    onSubmit(query.trim());
    setQuery('');
  };

  return (
    <StyledSearchbar className="searchbar">
      <StyledForm onSubmit={handleSubmit} className="form">
        <StyledSearchBtn type="submit" className="button">
          <span className="button-label">Search</span>
        </StyledSearchBtn>
        <StyledFormInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </StyledForm>
    </StyledSearchbar>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  globalQuery: PropTypes.string.isRequired,
};
