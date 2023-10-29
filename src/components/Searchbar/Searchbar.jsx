import React from 'react';
import {
  StyledSearchbar,
  StyledForm,
  StyledSearchBtn,
  StyledFormInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

export class Searchbar extends React.Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.props.globalQuery === this.state.query) {
      toast.warning('Такий запит вже є');
      return;
    }
    this.props.onSubmit(this.state.query.trim());
    this.setState({ query: '' });
  };

  render() {
    return (
      <StyledSearchbar className="searchbar">
        <StyledForm onSubmit={this.handleSubmit} className="form">
          <StyledSearchBtn type="submit" className="button">
            <span className="button-label">Search</span>
          </StyledSearchBtn>
          <StyledFormInput
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </StyledForm>
      </StyledSearchbar>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  globalQuery: PropTypes.string.isRequired,
};
