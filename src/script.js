import {default as gallery} from './gallery-items.js'

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

const createItemsGallery = (image) => {
  const item = document.createElement("li");
    item.classList.add("gallery__item");
    console.log(item);
    
    const link = document.createElement("a");
  link.classList.add("gallery__link");
    link.href = image.original;
    console.log(link);
    
    const img = document.createElement("img");
  img.classList.add("gallery__image");
  img.src = image.preview;
  img.dataSource = image.original;
  img.alt = image.description;
    
    console.log(img);
       
    item.appendChild(link);
    link.appendChild(img);
    return item;
    
};

const galleryRef = document.querySelector(".js-gallery");
const modalRef = document.querySelector(".js-lightbox");
const buttonCloseRef = document.querySelector(".lightbox__button");
const largeImgRef = document.querySelector(".lightbox__image");

const createGallery = gallery.map((image) => createItemsGallery(image));
galleryRef.append(...createGallery);

//Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.

const checkClick = function onImageClick (event) {
  event.preventDefault();
  if(event.target.nodeName !== 'IMG') {
    return;
  }
  const imgRef = event.target;
  const largeImgURL = imgRef.dataset.source;
    openModal(largeImgURL);
    console.log(largeImgURL);
}
//Открытие модального окна по клику на элементе галереи.

const openModal = function openModalWindowWithLargeImg(url) {
  modalRef.classList.add('is-open');
  window.addEventListener('keydown', closeModal);
  paintImg(url);  
}

const paintImg = function paintLargeImgInModalWindow(url) {
    largeImgRef.src = url;
}
//Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].

const closeModal = () => {
buttonCloseRef.addEventListener('click', (event) => {
    modalRef.classList.remove('is-open');
    largeImgRef.src = "";
    window.removeEventListener("keydown", closeModal);
});
}



galleryRef.addEventListener('click', checkClick);



