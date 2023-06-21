import { galleryItems } from './gallery-items.js';
import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.min.js';
import 'simplelightbox/dist/simplelightbox.min.css';

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

  galleryLink.appendChild(galleryImage);
  galleryItem.appendChild(galleryLink);

  return galleryItem;
};

const galleryItemsMarkup = galleryItems.map(createGalleryItem);
gallery.append(...galleryItemsMarkup);

const lightbox = new SimpleLightbox('.gallery__link', {
  captions: true,
  captionDelay: 250,
});

lightbox.on('show.simplelightbox', function (e) {
  const instance = this;

  window.addEventListener('keydown', handleKeyPress);

  function handleKeyPress(event) {
    if (event.code === 'ArrowLeft') {
      instance.prev();
    } else if (event.code === 'ArrowRight') {
      instance.next();
    } else if (event.code === 'Escape') {
      instance.close();
      window.removeEventListener('keydown', handleKeyPress);
    }
  }
});
