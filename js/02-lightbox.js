// Масив даних галереї
const galleryItems = [
  {
    preview: 'small-image1.jpg',
    original: 'large-image1.jpg',
    description: 'Image 1',
  },
  {
    preview: 'small-image2.jpg',
    original: 'large-image2.jpg',
    description: 'Image 2',
  },
  {
    preview: 'small-image3.jpg',
    original: 'large-image3.jpg',
    description: 'Image 3',
  },
  // Додайте більше об'єктів зображень при потребі
];

// Отримати посилання на елемент галереї
const galleryContainer = document.querySelector('.gallery');

// Створення розмітки галереї
const galleryMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>
      </li>
    `;
  })
  .join('');

// Додавання розмітки до галереї
galleryContainer.innerHTML = galleryMarkup;

// Ініціалізація бібліотеки SimpleLightbox
const lightbox = new SimpleLightbox('.gallery__link', {
  captionsData: 'alt',
  captionDelay: 250,
});
document.addEventListener('DOMContentLoaded', function() {
  const lightbox = new SimpleLightbox('.gallery a');

  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');

  prevButton.addEventListener('click', function() {
    lightbox.prev();
  });

  nextButton.addEventListener('click', function() {
    lightbox.next();
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const lightbox = new SimpleLightbox('.gallery a');

  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');

  lightbox.on('show.simplelightbox', function() {
    prevButton.style.display = 'inline-block';
    nextButton.style.display = 'inline-block';
  });

  lightbox.on('close.simplelightbox', function() {
    prevButton.style.display = 'none';
    nextButton.style.display = 'none';
  });

  prevButton.addEventListener('click', function() {
    lightbox.prev();
  });

  nextButton.addEventListener('click', function() {
    lightbox.next();
  });
});