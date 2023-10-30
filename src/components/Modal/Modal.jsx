import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useCallback } from 'react';

export const Modal = ({ close, children }) => {
  const handleCloseKeyDown = useCallback(
    e => {
      if (e.key === 'Escape') {
        close();
      }
    },
    [close]
  );
  useEffect(() => {
    document.addEventListener('keydown', handleCloseKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleCloseKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [handleCloseKeyDown]);

  const handleClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      close();
    }
  };

  return (
    <StyledOverlay onClick={handleClick}>
      <StyledModal>{children}</StyledModal>
    </StyledOverlay>
  );
};

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

const StyledModal = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
  img {
    width: 100%;
    max-width: 600px;
    height: auto;
    margin: 10px;
    objectfit: cover;
  }
`;

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
