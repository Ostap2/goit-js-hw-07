
  import { galleryItems } from './gallery-items.js';




  import { galleryItems } from './gallery-items.js';

  document.addEventListener("DOMContentLoaded", function () {
    // Функція для створення елемента галереї
    function createGalleryItem(item) {
      var listItem = document.createElement("li");
      listItem.classList.add("gallery__item");
  
      var link = document.createElement("a");
      link.classList.add("gallery__link");
      link.href = item.large;
  
      var image = document.createElement("img");
      image.classList.add("gallery__image");
      image.src = item.small;
      image.alt = item.alt;
  
      link.appendChild(image);
      listItem.appendChild(link);
  
      return listItem;
    }
  
    // Отримання посилання на ul.gallery
    var gallery = document.querySelector(".gallery");
  
    // Додавання елементів галереї
    galleryItems.forEach(function (item) {
      var galleryItem = createGalleryItem(item);
      gallery.appendChild(galleryItem);
    });
  
    // Підключення бібліотеки SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
  });
  });
  