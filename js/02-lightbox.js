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
