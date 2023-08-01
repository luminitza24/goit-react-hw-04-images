import { Component } from 'react';
import './Form.css';
import PropTypes from 'prop-types';

export class Form extends Component {
  state = {
    name: '',
    number: '',
  };
  handleChange = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value });
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    this.props.onSubmit({ ...this.state });
    this.reset();
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} className="form">
          <label className="label">
            {' '}
            Name
            <input
              autoComplete="off"
              className="input"
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          </label>
          <label htmlFor="number" className="label">
            {' '}
            Number
            <input
              autoComplete="off"
              className="input"
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              value={this.state.number}
              onChange={this.handleChange}
              required
            />
          </label>
          <button type="submit" className="button">
            {' '}
            Add contact{' '}
          </button>
        </form>
      </>
    );
  }
}
Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
