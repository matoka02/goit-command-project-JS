import { spinner, spinnerRemove } from './notifications';
import renderCards from './renderCardsMyLibrary';
import { getPagination } from './pagination';

const WATCHED = 'movies-watched';
const QUEUE = 'movies-queue';

// Blank page stubs
const img = document.querySelector('.empty__page');
const text = document.querySelector('.empty__page-text');
let currentPage = 1;
const libPageSize = 18;

function onWatchedBtn(page = 0) {
  if (page) { currentPage = page };

  img.classList.add('is-hidden');
  text.classList.add('is-hidden');

  spinner();
  const obj = JSON.parse(localStorage.getItem(WATCHED));
  if (obj?.length) {
    calcLibSize(obj)
  } else {
    img.classList.remove('is-hidden');
    text.classList.remove('is-hidden');
    spinnerRemove();
  }
};

function onQueueBtn(page = 0) {
  if (page) { currentPage = page };

  img.classList.add('is-hidden');
  text.classList.add('is-hidden');

  spinner();
  const obj = JSON.parse(localStorage.getItem(QUEUE));
  if (obj?.length) {
    calcLibSize(obj)
  } else {
    img.classList.remove('is-hidden');
    text.classList.remove('is-hidden');
    spinnerRemove();
  }
};

function calcLibSize(arr) {
  let lastPage = null;

  if (arr.length <= libPageSize) {
    renderCards(arr);
    spinnerRemove();
  };

  // определение последней страницы
  if (arr.length % libPageSize) {
    lastPage = Math.floor(arr.length / libPageSize) + 1;
  } else {
    lastPage = arr.length / libPageSize;
  };

  // рендер соответсвующей страницы
  if (currentPage === lastPage) {
    renderCards(arr.slice(currentPage * libPageSize - libPageSize, arr.length));
    spinnerRemove();
  } else {
    renderCards(arr.slice(currentPage * libPageSize - libPageSize, currentPage * libPageSize));
    spinnerRemove();
  };

  getPagination(currentPage, lastPage, true)
};

export { onWatchedBtn, onQueueBtn };