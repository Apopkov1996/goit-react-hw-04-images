import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { Searchbar } from 'components/Searchbar/Searchbar';
import React from 'react';
import { fetchPhotos } from 'Services/api';
import { Loader } from 'components/Loader/Loader';
import { toast } from 'react-toastify';

export class App extends React.Component {
  state = {
    loading: false,
    error: null,
    images: [],
    page: 1,
    per_page: 12,
    q: '',
    isOpen: false,
    total: 0,
    first_load: false,
    imageModal: null,
  };

  componentDidMount() {
    const { per_page, page } = this.state;
    this.getImages({ per_page, page });
  }

  componentDidUpdate(_, prevState) {
    const { per_page, page, q } = this.state;
    if (this.state.q !== prevState.q || this.state.page !== prevState.page) {
      this.getImages({ per_page, page, q });
    }
  }

  getImages = async params => {
    this.setState({ loading: true });
    try {
      const data = await fetchPhotos(params);

      const { hits, totalHits } = data;

      if (hits.length === 0) {
        return toast.warning(
          `Sorry, we could not find any images matching your request`
        );
      } else {
        !this.state.total && toast.success(`We found ${totalHits} images`);
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        total: totalHits,
      }));

      // this.setState({ loading: false });
    } catch (error) {
      toast.warning(`Oops ${error}`);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleLoarMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleSubmit = query => {
    this.setState({
      q: query,
      images: [],
      currentPage: 1,
      total: 0,
    });
  };

  handleOpenModal = largeImageURL => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
      imageModal: largeImageURL,
    }));
  };

  render() {
    const { images, total, loading, imageModal, isOpen, q } = this.state;
    return (
      <div>
        <Searchbar globalQuery={q} onSubmit={this.handleSubmit} />
        {loading && !images.length ? (
          <Loader />
        ) : (
          <ImageGallery
            handleOpenModal={this.handleOpenModal}
            images={images}
          />
        )}

        {total > images.length && images.length > 0 ? (
          <Button onClick={this.handleLoarMore} />
        ) : null}
        {isOpen ? (
          <Modal close={this.handleOpenModal}>
            <img src={imageModal} alt="Large size of your chosen img" />
          </Modal>
        ) : null}
      </div>
    );
  }
}
