const galleryItems = [
    {
      smallImage: 'small-image1.jpg',
      largeImage: 'large-image1.jpg',
      description: 'Image 1'
    },
    {
      smallImage: 'small-image2.jpg',
      largeImage: 'large-image2.jpg',
      description: 'Image 2'
    },
    {
      smallImage: 'small-image3.jpg',
      largeImage: 'large-image3.jpg',
      description: 'Image 3'
    },
    // Add more gallery items as needed
  ];
  
  function createGalleryItem(item) {
    const galleryItem = document.createElement('li');
    galleryItem.classList.add('gallery__item');
  
    const link = document.createElement('a');
    link.classList.add('gallery__link');
    link.href = item.largeImage;
  
    const image = document.createElement('img');
    image.classList.add('gallery__image');
    image.src = item.smallImage;
    image.setAttribute('data-source', item.largeImage);
    image.alt = item.description;
  
    link.appendChild(image);
    galleryItem.appendChild(link);
  
    return galleryItem;
  }
  
  function openModal(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') return;
  
    const largeImageSrc = event.target.dataset.source;
    const instance = basicLightbox.create(`
      <img src="${largeImageSrc}" alt="Full Size Image" />
    `);
  
    instance.show();
  }
  
  const gallery = document.querySelector('.gallery');
  gallery.addEventListener('click', openModal);
  
  galleryItems.forEach(item => {
    const galleryItem = createGalleryItem(item);
    gallery.appendChild(galleryItem);
  });
  