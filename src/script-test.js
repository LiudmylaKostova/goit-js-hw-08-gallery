import { default as gallery } from './gallery-items.js'

const galleryRef = document.querySelector(".js-gallery");
const modalRef = document.querySelector(".js-lightbox");
const buttonCloseRef = document.querySelector(".lightbox__button");
const largeImgRef = document.querySelector(".lightbox__image");


// Создание и рендер разметки по массиву данных и предоставленному шаблону.

function createItemsGallery(item) {
  return `<li class="gallery__item">
  <a class="gallery__link"
    href="${item.original}">
    <img class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"/>
  </a>
</li>`;
}

const galleryRefItems = gallery.map((item) => createItemsGallery(item)).join("");
galleryRef.insertAdjacentHTML('beforeend', galleryRefItems);
 
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
buttonCloseRef.addEventListener('click', closeModal);
