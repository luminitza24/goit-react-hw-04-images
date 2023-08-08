import { useState, useEffect } from 'react';
import './App.css';
import { searchImage } from './api/apiPixabay';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import Notiflix from 'notiflix';

export const App = () => {
  const [searchTerm, setSearch] = useState('');
  const [emptyInput, setEmptyInput] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState(null);

  useEffect(() => {
    const newSearch = '';
    if (newSearch !== setSearch(searchTerm)) {
      handleSearch(newSearch);
    }
  }, [searchTerm]);
  const handleSearch = async searchTerm => {
    if (searchTerm.trim().length === 0) {
      setEmptyInput(true);
      return;
    }
    setSearch(searchTerm);
    setEmptyInput(false);
    setPage(1);
    setImages([]);
    setIsLoading(true);
    setError(null);
    setTotal(1);

    try {
      const data = await searchImage(searchTerm, 1);
      setImages(data.hits);
      setTotal(data.total);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setIsLoading(true);
    setSearch(searchTerm);
    try {
      const data = await searchImage(searchTerm, nextPage);
      const newImages = [...images, ...data.hits];
      setImages(newImages);
      setPage(nextPage);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const openModal = id => {
    setModalIsVisible(true);
    setSelectedImages(id);
  };

  const closeModal = () => {
    setModalIsVisible(false);
    setSelectedImages(null);
  };

  return (
    <div className="App">
      <Searchbar onSearch={handleSearch} />
      {emptyInput && Notiflix.Notify.failure('Please insert search term!')}
      {error &&
        Notiflix.Notify.failure(
          'Ops something went wrong please try again later!'
        )}
      {isLoading && <Loader />}
      {images.length > 0 && (
        <ImageGallery openModal={openModal} images={images} />
      )}
      {total / 12 > page && <Button loadMore={handleLoadMore} />}
      {modalIsVisible && selectedImages && (
        <Modal
          openModal={openModal}
          imageURL={selectedImages.largeImageURL}
          tag={selectedImages.tags}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};
