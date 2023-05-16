import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ images, switchModal }) => {
    return (
        <>
            <Gallery>
                <ImageGalleryItem images={images} switchModal={switchModal} />
            </Gallery>
        </>
    )
};

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.object
    ).isRequired,
    switchModal: PropTypes.func.isRequired,
};