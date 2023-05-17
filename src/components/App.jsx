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
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const API = (name, page) => {
        setLoading(true);

        getImages(name, page)
          .then((r) => r.json())
          .then((data) => {
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
          .catch((error) => {
            console.error(error);
            toast.error("An error occurred while fetching images.");
          })
          .finally(() => {
            setLoading(false);
          });
      };

      if (searchedName !== '' || page !== 1) {
        await API(searchedName, page);
      }
    };

    fetchData();
  }, [searchedName, page, showSuccessToast]);

  const onFormSubmit = (searchedName) => {
    setSearchedName(searchedName);
    setImages([]);
    setPage(1);
    setTotal(1);
    setLoading(false);
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
  };

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