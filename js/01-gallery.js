import { galleryItems } from './gallery-items.js';
import * as basicLightbox from 'basiclightbox';

const gallery = document.querySelector('.gallery');

// Generate gallery items dynamically
const galleryItemsMarkup = galleryItems.map(({ preview, original, description }) => `
  <li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" />
    </a>
  </li>
`);

gallery.innerHTML = galleryItemsMarkup.join('');

// Open modal on gallery item click
gallery.addEventListener('click', handleGalleryClick);

function handleGalleryClick(event) {
  event.preventDefault();

  const { target } = event;
  if (target.nodeName !== 'IMG') {
    return;
  }

  const largeImageUrl = target.dataset.source;

  const instance = basicLightbox.create(`
    <img src="${largeImageUrl}" width="800" height="600">
  `);

  instance.show();

  window.addEventListener('keydown', handleKeyPress);

  function handleKeyPress(event) {
    if (event.code === 'Escape') {
      instance.close();
      window.removeEventListener('keydown', handleKeyPress);
    }
  }
}


export const galleryItems = [
  {
    preview: 'images/preview1.jpg',
    original: 'images/original1.jpg',
    description: 'Image 1',
  },
  {
    preview: 'images/preview2.jpg',
    original: 'images/original2.jpg',
    description: 'Image 2',
  },
  // Додайте інші елементи галереї тут
];
