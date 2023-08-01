import './List.css';
import PropTypes from 'prop-types';

export const ContactList = ({ contacts, removeContact }) => {
  return (
    <ul className="contact-list">
      {contacts.map(contact => (
        <li key={contact.id} className="contact-item">
          {contact.name
            .split(' ')
            .map(n => n.charAt(0).toUpperCase() + n.slice(1))
            .join(' ')}{' '}
          : {contact.number}
          <button
            className="button"
            type="button"
            onClick={() => {
              removeContact(contact.id);
            }}
          >
            {' '}
            Delete{' '}
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  removeContact: PropTypes.func.isRequired,
};
