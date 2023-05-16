import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ images, switchModal }) => {
    return (
        <>
            {
                images.map(item => (
                    <GalleryItem
                        key={item.id}
                        onClick={() => switchModal(item.largeImageURL, item.tags) }
                    >
                        <GalleryImage
                            loading="lazy"
                            src={item.webformatURL}
                            alt={item.tags}
                        />
                    </GalleryItem>
                ))
            }
        </>
    )
};

ImageGalleryItem.propTypes = {
    images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired,
  ),
    switchModal: PropTypes.func.isRequired,
};