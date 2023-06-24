import { galleryItems } from './gallery-items.js';
// Масив даних галереї
var galleryItems = [
  {
    preview: 'small-image-1.jpg',
    original: 'large-image-1.jpg',
    description: 'Image 1'
  },
  {
    preview: 'small-image-2.jpg',
    original: 'large-image-2.jpg',
    description: 'Image 2'
  },
  {
    preview: 'small-image-3.jpg',
    original: 'large-image-3.jpg',
    description: 'Image 3'
  }
];

// Отримати посилання на елемент галереї
var gallery = document.querySelector('.gallery');

// Створити розмітку галереї на підставі даних
function createGalleryMarkup(items) {
  return items.map(function(item) {
    return `
      <li class="gallery__item">
        <a class="gallery__link" href="${item.original}">
          <img class="gallery__image" src="${item.preview}" alt="${item.description}" />
        </a>
      </li>
    `;
  }).join('');
}

// Додати розмітку галереї до елементу галереї
function renderGallery(items) {
  var galleryMarkup = createGalleryMarkup(items);
  gallery.innerHTML = galleryMarkup;
}

// Ініціалізувати бібліотеку SimpleLightbox
function initializeLightbox() {
  var lightbox = new SimpleLightbox('.gallery__link', {
    captions: true,
    captionDelay: 250,
    captionPosition: 'bottom',
    captionsData: 'alt'
  });
}

// Рендер галереї та ініціалізація бібліотеки після завантаження сторінки
window.addEventListener('DOMContentLoaded', function() {
  renderGallery(galleryItems);
  initializeLightbox();
});
