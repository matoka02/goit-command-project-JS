import ApiServiceLibrary from './js/API';
import { onQueueBtn, onWatchedBtn } from './js/btnWatchedQueue';
import { onSubmitScroll } from './js/onSubmit';
import { showModal } from './js/film-modal';
import trailer from './js/film-trailer';
import { switcher} from './js/switcher';
import { spinner, spinnerRemove } from './js/notifications';
import { onOpenTeamModal } from './js/team-modal';

export const refs = {
  topButton: document.querySelector('.btn_top'),
  body: document.querySelector('body'),
  cardHolderLibrary: document.querySelector('.card-holder'),
  footerLink: document.querySelector('.footer__link'),
  stickyHeaderMyLibrary: document.querySelector(
    '.js-my-library-header__sticky'
  ),
  watchedBtn: document.querySelector('.js-watched'),
  queuedBtn: document.querySelector('.js-queue'),
  //кнопки для свернутого хедера
  watchedBtnSticky: document.querySelector('.js-watched__sticky'),
  queuedBtnSticky: document.querySelector('.js-queue__sticky'),

  movieModal: document.querySelector('.js-movie-modal'),
  pagination: document.querySelector('.pagination__container'),
};

const stickyMyLibrary = (window.onscroll = function showHeaderMyLibrary() {
  if (window.pageYOffset > 200) {
    refs.stickyHeaderMyLibrary.classList.add('my-library-header__sticky');
  } else {
    refs.stickyHeaderMyLibrary.remove('my-library-header__sticky')
  }
});

const apiService = new ApiServiceLibrary();

refs.topButton.addEventListener('click', onSubmitScroll);
refs.cardHolderLibrary.addEventListener('click', onCardClick);
refs.watchedBtn.addEventListener('click', onWatched);
refs.queuedBtn.addEventListener('click', onQueued);
refs.movieModal.addEventListener('click', onModalClick);
//для свернутого хедера
refs.watchedBtnSticky.addEventListener('click', onWatched);
refs.queuedBtnSticky.addEventListener('click', onQueued);

refs.pagination.addEventListener('click', onPagination);
refs.footerLink.addEventListener('click', onOpenTeamModal);

// Початкове завантаження
onWatchedBtn();

function onWatched(evt) {
  console.log(evt.target);
  if (evt.target.classList.contains('my-library-header__button--current')) return;
  //для обычного хедера
  refs.watchedBtn.classList.add('my-library-header__button--current');
  refs.queuedBtn.classList.remove('my-library-header__button--current');
  //для свернутого хедера
  refs.watchedBtnSticky.classList.add('my-library-header__button--current');
  refs.queuedBtnSticky.classList.remove('my-library-header__button--current');

  refs.cardHolderLibrary.innerHTML = '';
  refs.pagination.innerHTML = '';
  onSubmitScroll();
  onWatchedBtn(1);
};

function onQueued(evt) {
  if (evt.target.classList.contains('my-library-header__button--current')) return;
  //для обычного хедера
  refs.queuedBtn.classList.add('my-library-header__button--current');
  refs.watchedBtn.classList.remove('my-library-header__button--current');
  //для свернутого хедера
  refs.queuedBtnSticky.classList.add('my-library-header__button--current');
  refs.watchedBtnSticky.classList.remove('my-library-header__button--current');

  refs.cardHolderLibrary.innerHTML = '';
  refs.pagination.innerHTML = '';
  onSubmitScroll();
  onQueueBtn(1);
};

function onCardClick(evt) {
  if (evt.target === evt.currentTarget) return;

  if (evt.target.classList.contains('film__trailer-btn')) {
    return trailer.showTrailer(evt.target.closest('li').id);
  };

  apiService.movieId = evt.target.closest('li').id;
  spinner();
  apiService.fetchById().then(data => {
    showModal(data.data);
    spinnerRemove();
  });
};

// Перезавантаження сторінки бібліотеки після видалення фільму
function onModalClick(evt) {
  const currentPagination = document.querySelector('.pagination__item--current');

  if (evt.target.classList.contains('add-watched') || refs.watchedBtn.classList.contains('my-library-header__button--current')) {
    const cards = refs.cardHolderLibrary.children.length;
    refs.cardHolderLibrary.innerHTML = '';
    onWatchedBtn(Number(currentPagination && cards === 1 ? currentPagination.id - 1 : 0));
  };

  if (evt.target.classList.contains('add-queue') || refs.queuedBtn.classList.contains('my-library-header__button--current')) {
    const cards = refs.cardHolderLibrary.children.length;
    refs.cardHolderLibrary.innerHTML = '';
    onQueueBtn(Number(currentPagination && cards === 1 ? currentPagination.id - 1 : 0));
  };

};

// Відстежування пагінації
function onPagination(evt) {
  if (evt.target === evt.currentTarget || evt.target.nodeName === 'UL') return;

  let id = null;

  if (evt.target.nodeName === 'svg' || evt.target.nodeName === 'BUTTON' || evt.target.nodeName === 'path') {

    // по левой/правой кнопке
    if (evt.target.closest('button').classList.contains('pagination__left-btn') && evt.target.closest('button').classList.contains('on')) {
      id = Number(currentPagination.id) - 1;
    } else if (evt.target.closest('button').classList.contains('pagination__right-btn') && evt.target.closest('button').classList.contains('on')) {
      id = Number(currentPagination.id) + 1;
    } else return;

  } else {

    // по количеству в списке
    if (!isNaN(evt.target.closest('li').id)) {
      id = Number(evt.target.closest('li').id);
    } else if (evt.target.closest('li').id === '+') {
      id = Number(currentPagination.id) + 3;
    } else if (evt.target.closest('li').id === '-') {
      id = Number(currentPagination.id) - 3;
    } else return;
  };

  if (refs.watchedBtn.classList.contains('my-library-header__button--current')) {
    onSubmitScroll();
    onWatchedBtn(id);
  } else {
    onSubmitScroll();
    onQueueBtn(id);
  };
}








