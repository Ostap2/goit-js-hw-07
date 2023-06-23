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
  const currentIndex = galleryItems.findIndex(
    (item) => item.original === largeImageUrl
  );

  const instance = basicLightbox.create(
    `<img src="${largeImageUrl}" width="800" height="600">`,
    {
      onShow: (instance) => {
        const imageElement = instance.element().querySelector('img');

        imageElement.addEventListener('click', handleImageClick);
        window.addEventListener('keydown', handleKeyPress);

        function handleImageClick() {
          instance.close();
        }

        function handleKeyPress(event) {
          if (event.code === 'ArrowLeft') {
            navigate('left');
          } else if (event.code === 'ArrowRight') {
            navigate('right');
          } else if (event.code === 'Escape') {
            instance.close();
          }
        }
      },
      onClose: (instance) => {
        const imageElement = instance.element().querySelector('img');

        imageElement.removeEventListener('click', handleImageClick);
        window.removeEventListener('keydown', handleKeyPress);
      },
    }
  );

  instance.show();

  function navigate(direction) {
    let newIndex;
    if (direction === 'left') {
      newIndex = currentIndex - 1;
      if (newIndex < 0) {
        newIndex = galleryItems.length - 1;
      }
    } else if (direction === 'right') {
      newIndex = currentIndex + 1;
      if (newIndex >= galleryItems.length) {
        newIndex = 0;
      }
    }

    const newImage = galleryItems[newIndex];
    instance.element().querySelector('img').src = newImage.original;
    instance.element().querySelector('.caption').textContent =
      newImage.description;
    instance.refresh();
  }
}
