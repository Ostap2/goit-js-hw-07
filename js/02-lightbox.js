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

  galleryLink.appendChild(galleryImage);
  galleryItem.appendChild(galleryLink);

  return galleryItem;
};

const galleryItemsMarkup = galleryItems.map(createGalleryItem);
gallery.append(...galleryItemsMarkup);

document.addEventListener('DOMContentLoaded', () => {
  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionDelay: 250,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionsDelayMultiplier: 1.5,
    elementsSelector: '.gallery__link', // Додали селектор елементів галереї
    docClose: false, // Вимкнули закриття модального вікна при кліку на документ
    nav: true, // Включили перемикачі вліво/вправо
    navText: ['&larr;', '&rarr;'], // Текст для кнопок перемикачів
    navClass: ['simple-lightbox__nav--prev', 'simple-lightbox__nav--next'], // Класи для кнопок перемикачів
  });
});




