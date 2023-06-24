import { galleryItems } from './gallery-items.js';

// Отримати посилання на елементи, на які ви бажаєте додати переключення
var nextButton = document.querySelector('.next-button');
var prevButton = document.querySelector('.prev-button');

// Підключитись до екземпляра SimpleLightbox
var lightbox = new SimpleLightbox('.gallery');

// Додати обробник подій для наступної фотографії
nextButton.addEventListener('click', function() {
  lightbox.next();
});

// Додати обробник подій для попередньої фотографії
prevButton.addEventListener('click', function() {
  lightbox.prev();
});

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
