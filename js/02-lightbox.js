import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');

const createGalleryItem = ({ preview, original, description }) => {
  const galleryItem = document.createElement('li');
  galleryItem.classList.add('gallery__item');

  const galleryLink = document.createElement('a');
  galleryLink.classList.add('gallery__link');
  galleryLink.href = original;

  const galleryImage = document.createElement('img');
  galleryImage.classList.add('gallery__image');
  galleryImage.src = preview;
  galleryImage.alt = description;
  galleryImage.dataset.source = original;

  galleryLink.appendChild(galleryImage);
  galleryItem.appendChild(galleryLink);

  return galleryItem;
};

const galleryItemsMarkup = galleryItems.map(createGalleryItem);
gallery.append(...galleryItemsMarkup);

gallery.addEventListener('click', handleGalleryClick);

function handleGalleryClick(event) {
  event.preventDefault();

  const { target } = event;
  if (target.nodeName !== 'IMG') {
    return;
  }

  const largeImageUrl = target.dataset.source;
  const currentIndex = galleryItems.findIndex(
    (item) => item.original === largeImageUrl
  );

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    elementsSelector: 'img',
    onElementClick: (instance) => {
      instance.close();
    },
    onNext: (instance) => {
      navigate('right', instance);
    },
    onPrevious: (instance) => {
      navigate('left', instance);
    },
  });

  lightbox.on('show.simplelightbox', () => {
    window.addEventListener('keydown', handleKeyPress);
  });

  lightbox.on('close.simplelightbox', () => {
    window.removeEventListener('keydown', handleKeyPress);
  });

  lightbox.show();

  function handleKeyPress(event) {
    if (event.code === 'ArrowLeft') {
      navigate('left', lightbox);
    } else if (event.code === 'ArrowRight') {
      navigate('right', lightbox);
    } else if (event.code === 'Escape') {
      lightbox.close();
    }
  }

  function navigate(direction, instance) {
    const newIndex =
      direction === 'left'
        ? currentIndex - 1 < 0
          ? galleryItems.length - 1
          : currentIndex - 1
        : (currentIndex + 1) % galleryItems.length;

    const newImage = galleryItems[newIndex];
    instance.load(newImage.original);
  }
}
