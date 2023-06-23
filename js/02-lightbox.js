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

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

gallery.addEventListener('click', (event) => {
  event.preventDefault();
  lightbox.open();
});

lightbox.on('show.simplelightbox', function (e) {
  const caption = document.createElement('div');
  caption.classList.add('caption');
  caption.innerText = e.caption;
  e.element.appendChild(caption);

  // Enable image switching with on-screen controls and mouse clicks
  const nextButton = document.querySelector('.sl-next');
  const prevButton = document.querySelector('.sl-prev');

  nextButton.addEventListener('click', lightbox.next);
  prevButton.addEventListener('click', lightbox.prev);
});

lightbox.on('close.simplelightbox', function () {
  const captions = document.querySelectorAll('.caption');
  captions.forEach((caption) => caption.remove());

  // Disable image switching with on-screen controls and mouse clicks
  const nextButton = document.querySelector('.sl-next');
  const prevButton = document.querySelector('.sl-prev');

  nextButton.removeEventListener('click', lightbox.next);
  prevButton.removeEventListener('click', lightbox.prev);
});
