import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ModalOverlay } from "./Modal.styled";
import PropTypes from 'prop-types';

const modal = document.querySelector('#modal-root');

export const Modal = ({ children, onModalClose }) => {

      const keyDown = e => {
        if (e.code === 'Escape') {
            onModalClose();
        }
    };

    const handleModalClose = e => {
        if (e.currentTarget === e.target) {
            onModalClose();
        }
    };

       useEffect(() => {
        window.addEventListener('keydown', keyDown);
        return () => {
            window.removeEventListener('keydown', keyDown)
        };
    }, [keyDown]);

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