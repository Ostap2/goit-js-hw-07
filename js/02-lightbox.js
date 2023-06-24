

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
  });
// 02-lightbox.js

import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');

// Create and render gallery markup based on galleryItems
function renderGallery() {
  const galleryMarkup = galleryItems
    .map(
      (item) =>
        `<li class="gallery__item">
           <a class="gallery__link" href="${item.original}">
              <img class="gallery__image" src="${item.preview}" alt="${item.description}" />
           </a>
         </li>`
    )
    .join('');

  gallery.innerHTML = galleryMarkup;
}

// Initialize SimpleLightbox
function initLightbox() {
  new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom',
  });
}

renderGallery();
initLightbox();
