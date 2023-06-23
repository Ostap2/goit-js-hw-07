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

lightbox.on('show.simplelightbox', function (e) {
  const caption = document.createElement('div');
  caption.classList.add('caption');
  caption.innerText = e.caption;
  e.element.appendChild(caption);
});

lightbox.on('close.simplelightbox', function () {
  const captions = document.querySelectorAll('.caption');
  captions.forEach((caption) => caption.remove());
});

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
  const { key } = event;
  if (key === 'ArrowLeft') {
    lightbox.element().querySelector('.sl-prev').click();
  } else if (key === 'ArrowRight') {
    lightbox.element().querySelector('.sl-next').click();
  }
}
