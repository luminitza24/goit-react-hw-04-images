import './Search.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {
  state = {
    searchTerm: '',
  };

  handleChange = evt => {
    const { value } = evt.target;
    this.setState({ searchTerm: value });
    this.props.onFilter(value);
  };
  render = () => {
    return (
      <>
        <h3 className="info">Find contacts by name</h3>
        <label className="filter">
          <input autoComplete='off'
            type="text"
            className="input"
            value={this.state.searchTerm}
            onChange={this.handleChange}
          />
        </label>
      </>
    );
  };
}

Search.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
