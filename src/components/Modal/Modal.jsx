import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export class Modal extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleCloseKeyDown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', this.handleCloseKeyDown);
  }

  handleCloseKeyDown = e => {
    if (e.key === 'Escape') {
      this.props.close();
    }
  };

  handleClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      this.props.close();
    }
  };

  render() {
    return (
      <StyledOverlay onClick={this.handleClick}>
        <StyledModal>{this.props.children}</StyledModal>
      </StyledOverlay>
    );
  }
}

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
