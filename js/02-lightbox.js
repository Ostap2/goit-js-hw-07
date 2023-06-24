import { galleryItems } from './gallery-items.js';

const galleryItems = [
  // Gallery items data here
];

const gallery = document.querySelector('.gallery');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

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

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250
});

prevButton.addEventListener('click', () => {
  lightbox.prev();
});

nextButton.addEventListener('click', () => {
  lightbox.next();
});
