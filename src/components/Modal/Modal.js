import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { ModalOverlay } from "./Modal.styled";
import PropTypes from 'prop-types';

const modal = document.querySelector('#modal-root');

export const Modal = ({ children, onModalClose }) => {
  useEffect(() => {
    const keyDown = (e) => {
      if (e.code === 'Escape') {
        onModalClose();
      }
    };

    window.addEventListener('keydown', keyDown);
    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  }, [onModalClose]);

  const handleModalClose = useCallback(() => {
    onModalClose();
  }, [onModalClose]);

        return createPortal(
            <ModalOverlay onClick={handleModalClose}>
                <div >
                    {children}</div>
            </ModalOverlay>,
            modal)
};

Modal.propTypes = {
    children: PropTypes.object.isRequired,
    onModalClose: PropTypes.func.isRequired
}