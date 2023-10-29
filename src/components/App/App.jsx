import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { Searchbar } from 'components/Searchbar/Searchbar';
import React from 'react';
import { fetchPhotos } from 'Services/api';
import { Loader } from 'components/Loader/Loader';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

export const App = () => {
  // state = {
  //   loading: false,
  //   error: null,
  //   images: [],
  //   page: 1,
  //   per_page: 12,
  //   q: '',
  //   isOpen: false,
  //   total: 0,
  //   imageModal: null,
  // };

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [per_page, setPer_page] = useState(12);
  const [q, setQ] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [imageModal, setImageModal] = useState(null);

  // componentDidMount() {
  //   const { per_page, page } = this.state;
  //   this.getImages({ per_page, page });
  // }

  useEffect(() => {
    getImages({ per_page, page });
  }, [per_page, page]);

  // componentDidUpdate(_, prevState) {
  //   const { per_page, page, q } = this.state;
  //   if (this.state.q !== prevState.q || this.state.page !== prevState.page) {
  //     this.getImages({ per_page, page, q });
  //   }
  // }

  useEffect(() => {
    if (!q || !page) {
      getImages({ per_page, page, q });
    }
  }, [per_page, page, q]);

  const getImages = async params => {
    setLoading(true);
    try {
      const data = await fetchPhotos(params);

      const { hits, totalHits } = data;

      if (hits.length === 0) {
        return toast.warning(
          `Sorry, we could not find any images matching your request`
        );
      } else {
        !total && toast.success(`We found ${totalHits} images`);
      }

      // this.setState(prevState => ({
      //   images: [...prevState.images, ...hits],
      // }));

      setImages(prevState => [...prevState, ...hits]);
      setTotal(totalHits);
    } catch (error) {
      toast.warning(`Oops ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLoarMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleSubmit = query => {
    // this.setState({
    //   q: query,
    //   images: [],
    //   Page: 1,
    //   total: 0,
    // });

    setQ(query);
    setImages([]);
    setPage(1);
    setTotal(0);
  };

  const handleOpenModal = largeImageURL => {
    // this.setState(prevState => ({
    //   isOpen: !prevState.isOpen,
    //   imageModal: largeImageURL,
    // }));

    setIsOpen(prevState => !prevState);
    setImageModal(largeImageURL);
  };

  return (
    <div>
      <Searchbar globalQuery={q} onSubmit={handleSubmit} />
      {loading && !images.length ? (
        <Loader />
      ) : (
        <ImageGallery handleOpenModal={handleOpenModal} images={images} />
      )}

      {total > images.length && images.length > 0 ? (
        <Button onClick={handleLoarMore} />
      ) : null}
      {isOpen ? (
        <Modal close={handleOpenModal}>
          <img src={imageModal} alt="Large size of your chosen img" />
        </Modal>
      ) : null}
    </div>
  );
};
