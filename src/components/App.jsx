import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyle } from "./GlobalStyle";
import { Layout } from "./Layout/Layout";
import { SearchBar } from './SearchBar/SearchBar';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { getImages } from './API/getImages';
import { toast } from "react-toastify";

export const App = () => {
  const [searchedName, setSearchedName] = useState('');
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [empty, setEmpty] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(true);

  useEffect(() => {
    if (searchedName !== '' || page !== 1) {
      API(searchedName, page);
    }
  }, [searchedName, page]);

 const API = (name, page) => {
  setLoading(true);

  getImages(name, page)
    .then(r => r.json())
    .then(data => {
      if (data.hits.length === 0) {
        setEmpty(true);
         toast.error(`No images found for "${name}"`);
      } else {
         setImages((prevImages) => [...prevImages, ...data.hits]);
          setTotal(data.total);

          if (page === 1 && showSuccessToast) {
            toast.success(`${data.totalHits} images were found`);
            setShowSuccessToast(false);
          }
        }

        if (page >= Math.ceil(data.totalHits / 12) && page !== 1) {
          toast.warning("No more pictures left!");
        }
      })
    .catch(error => {
      setError(error.message);
    })
    .finally(() => {
      setLoading(false);
    });
};
  
  const onFormSubmit = searchedName => {
    setSearchedName(searchedName);
    setImages([]);
    setPage(1);
    setTotal(1);
    setLoading(false);
    setError(null);
    setShowModal(false);
    setEmpty(false);
  };

  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setShowSuccessToast(true);
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
  }

    return (
      <Layout>
        <ToastContainer autoClose={2000} />
        <SearchBar onSubmit={onFormSubmit} />
        <ImageGallery switchModal={onModalOpen} images={images} />
        {loading && <Loader />}
        {!empty && total / 12 > page && <Button onClick={onLoadMore} />}
        {showModal && (
        <Modal onModalClose={onModalClose}>
        <img src={largeImageURL} alt={alt} />
          </Modal>
          )}
        <GlobalStyle />
      </Layout>
    );
};

