import { galleryItems } from './gallery-items.js';



const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
  });

  document.addEventListener("DOMContentLoaded", function () {
    // Масив даних для галереї
    var galleryItems = [
      {
        small: "small-image-1.jpg",
        large: "large-image-1.jpg",
        alt: "Image description 1"
      },
      {
        small: "small-image-2.jpg",
        large: "large-image-2.jpg",
        alt: "Image description 2"
      },
      // Додайте решту елементів галереї
    ];
  
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
    var lightbox = new SimpleLightbox(".gallery a", {
      captions: true,               // Включити підписи
      captionsData: "alt",          // Використовувати атрибут alt для підписів
      captionPosition: "bottom",    // Позиція підпису: 'top', 'bottom', 'left', 'right'
      captionDelay: 250             // Затримка перед відображенням підпису (у мілісекундах)
    });
  });
  