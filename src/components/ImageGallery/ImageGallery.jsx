import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const ImageGallery = ({ handleOpenModal, images }) => {
  return (
    <div>
      <StyledList>
        {images?.map(image => (
          <ImageGalleryItem
            handleOpenModal={handleOpenModal}
            key={image.id}
            {...image}
          />
        ))}
      </StyledList>
    </div>
  );
};

const StyledList = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  margin-top: 20px;
`;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  handleOpenModal: PropTypes.func.isRequired,
};
