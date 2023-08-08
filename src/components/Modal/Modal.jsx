import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

export const Modal = ([imageURL, tag]) => {
  const [closeModal, setCloseModal] = useState(false);

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      setCloseModal(true);
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      return document.removeEventListener('keydown', handleKeyDown);
    };
  });
  return (
    <div className="Overlay" onClick={closeModal}>
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
