import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

export const Modal = ({ imageURL, tag, closeModal }) => {
  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      return document.removeEventListener('keydown', handleKeyDown);
    };
  });
  return (
    <div className="Overlay" onClick={() => closeModal()}>
      <div className="Modal" onClick={e => e.stopPropagation()}>
        <img src={imageURL} alt={tag} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imageURL: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
