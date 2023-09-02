// imports the local-storage function for the buttons in Movie Modal
import { locStorage } from './local-storage';
import { closeBackdrop, showBackdrop } from './backdrop';
import { SVG_CLOSE_BTN } from './sprite-code';

const filmModal = document.querySelector('.js-movie-modal');
const filmModalMask = document.querySelector('.js-movie-modal-mask');
const modalBody = document.querySelector('body');

filmModalMask.addEventListener('click', closeModal);

export function showModal(data) {
  renderModal(data);
  const closeBtn = document.querySelector('.js-movie-modal__close-btn');
  closeBtn.addEventListener('click', closeModal);
  filmModal.classList.remove('is-hidden');
  showBackdrop();
  window.addEventListener('keydown', onEscKeyPress);
  locStorage(data);
};

function closeModal(evt) {
  evt.preventDefault();
  filmModal.classList.add('is-hidden');
  closeBackdrop();
  window.removeEventListener('keydown', onEscKeyPress);
};

function onEscKeyPress(evt) {
  if (evt.code === 'Escape') {
    closeModal(evt);
  }
};

function getPosterImg(path, title) {
  if (!path) return;
  const posterPath = `https://www.themoviedb.org/t/p/w500${path}`;
  return `<img class = "js-movie-modal__img" src="${posterPath}" alt="${title}">`;
};

function renderModal(data) {
  // const { title, poster_path, vote_average, vote_count, popularity, original_title, genres, overview} = data;
  filmModal.innerHTML = `  
  <div class="js-movie-modal__content">
    <button class = "js-movie-modal__close-btn">
      ${SVG_CLOSE_BTN}           
    </button>
    <div class="js-movie-modal__poster">
      ${getPosterImg(data.poster_path, data.title)}
    </div>
    <div class="movie-modal__info-about">
      <h1 class="js-movie-modal__title">${data.title}</h1>
      <div class="movie-modal__info">
        <div class="movie-modal__info-name">
          <p class="info-name">Vote / Votes</p>
          <p class="info-name">Popularity</p>
          <p class="info-name">Original Title</p>
          <p class="info-name">Genre</p>
        </div>
        <div class="movie-modal__info-value">
          <p class="js-info-value">
            <span class="js-info-value__vote">${data.vote_average.toFixed(1)}</span>
            &ensp;/&ensp; 
            <span class="js-info-value__votes">${data.vote_count}</span>
          </p>
          <p class="js-info-value">${data.popularity}</p>
          <p class="js-info-value">${data.original_title}</p>
          <p class="js-info-value">${data.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>
      <h2 class="movie-modal__about">About </h2>
      <p class="js-movie-modal__about-text">${data.overview}</p>
      <ul class = "movie-modal__btn-list">
        <li class = "movie-modal__btn-list-item">
          <button class="js-movie-modal__btn add-watched" type = "button">add to Watched</button>
        </li>
        <li class = "movie-modal__btn-list-item">
          <button class="js-movie-modal__btn add-queue" type = "button">add to queue</button>
        </li>
      </ul>
    </div>
  </div>`
};
