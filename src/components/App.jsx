import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyle } from "./GlobalStyle";
import { Layout } from "./Layout/Layout";
import { SearchBar } from './SearchBar/SearchBar';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { getImages } from './API/getImages';

export const App = () => {
  const [searchedName, setSearchedName] = useState('');
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');

useEffect(() => {
  const fetchData = async (name, page) => {
    setLoading(true);

    try {
      const data = await getImages(name, page);

      if (data.hits.length === 0) {
        return toast.error(`No images found for "${name}"`);
      }

      setImages((prevImages) => [...prevImages, ...data.hits]);
      setTotal(data.totalHits);

      if (page === 1) {
        toast.success(`${data.totalHits} images were found`);
      }
      if (page >= Math.ceil(data.totalHits / 12) && page !== 1) {
        toast.warning("No more pictures left!");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching images.");
    } finally {
      setLoading(false);
    }
  };

  if (searchedName) {
    fetchData(searchedName, page);
  }
}, [searchedName, page]);

  const onFormSubmit = (searchedName) => {
    setSearchedName(searchedName);
    setImages([]);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onModalOpen = (largeImageURL, alt) => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
    setAlt(alt);
  };

  const onModalClose = () => {
    setShowModal(false);
    setLargeImageURL('');
    setAlt('');
  };

  const totalPage = total / images.length;

  return (
    <Layout>
      <ToastContainer autoClose={2000} />
      <SearchBar onSubmit={onFormSubmit} />
      <ImageGallery switchModal={onModalOpen} images={images} />
      {loading && <Loader />}
      {totalPage > 1 && !loading && images.length !== 0 &&
        (<Button onClick={onLoadMore} />)}
      {showModal && (
        <Modal onModalClose={onModalClose}>
          <img src={largeImageURL} alt={alt} />
        </Modal>
      )}
      <GlobalStyle />
    </Layout>
  );
};