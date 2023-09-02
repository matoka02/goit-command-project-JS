import Notiflix from 'notiflix';
import { refs } from '../index';
import { onSubmitScroll } from './onSubmit';
import { pagination } from './pagination';

// 1. Функції повідомлень (просто імпортуемо туди, де хочемо використати та викликаем);
export function success(totalMovies, query) {
  Notiflix.Notify.success(`Hooray we found ${totalMovies} movies for "${query}`, { timeout: 4000 })
};

// 2. Функція для крапок пагінації
export function successPages() {
  Notiflix.Notify.success(`Hooray, you clicked on the there dots!`)
};

// 3. Функції пошуку фільму
export function failure() {
  Notiflix.Notify.failure(`Sorry, no matches found for your search query!`, { timeout: 4000 })
};

// 4.
export function secondRequest(query) {
  Notiflix.Notify.warning(`You are trying to search "${query}" again, please enter a different search query`, { timeout: 4000 })
};

// 5. 
export function warning() {
  Notiflix.Notify.warning(`Enter your search query in the search bar`, { timeout: 4000 })
};

// 6. Функція запуску спінера
export function spinner() {
  Notiflix.Loading.circle({ backgroundColor: 'rgba(0, 0, 0, 0.2)' })
};

// 7. Функція припинення спінера
export function spinnerRemove() {
  Notiflix.Loading.remove()
};

// 8. Функція "інфи про фільм не знайдено"
export function noInfo() {
  Notiflix.Notify.failure(`Info about this movie not found`)
};

// 9. Функція "трейлер не знайдено"
export function noTrailer() {
  Notiflix.Notify.failure(`Trailer not found`, { timeout: 4000 })
};

// 10. Функція "додано фільм вчергу"
export function addToWatchQueue() {
  Notiflix.Notify.info(`The movie has been added to the queue`)
};

// 11. Функція "видалено фільм з черги"
export function infoRemoveFromQueue() {
  Notiflix.Report.info(`Removing the movie`, `You delete a movie from the queue`, `Okay`, removeFromQueue)
};

function removeFromQueue() {
  Notiflix.Notify.info(`The movie has been removed from the queue`)
};

// 12. Функція "додано фільм до перглянутих"
export function addToWatched() {
  Notiflix.Notify.info(`The movie has been added to watched`)
};

// 13. Функція "видалено фільм з переглянутих"
export function infoRemoveFromWatched() {
  Notiflix.Report.info(`Removing the movie`, `You delete a movie from the watched`, `Okay`, removeFromWatched)
};

function removeFromWatched() {
  Notiflix.Notify.info(`The movie has been removed from watched`)
};

// 14. Оповіщення про заборону перегляду в Україні
export function ruAlert() {
  Notiflix.Notify.failure(`This film is banned for showing in Ukraine`, { timeout: 4000 });
};

// 15. Оповіщення про видалення і блокування контенту
let timerId = null;

export function ruDelete() {
  Notiflix.Report.failure(
    'ТА ТИ, СІ КУРВА, ВСПОКОЇШ ЧИ НЄ?!!',
    'Вы не поняли спервого раза что данный контент заблокирован, значит вы - тупая РУСНЯ! Согласно закону Украины о русне вы получаете санкцию в виде страдания. Пожалуйста, для получения санкции подтвердите удаление всей информации с вашего девайса, иначе по истичению 15 минут запустится функция его самоуничтожения. Время пошло. (Ваш IP адрес, геолокация и персональные данные уже переданы СБУ. Даное действие вы можете оспорить в суде согласно Закону Украины) СЛАВА УКРАЇНІ!',
    'Удалить всю информацию',
    ruRemoveContent, {
    titleFontSize: '20px',
    messageFontSize: '16px',
    messageMaxLength: 600,
    buttonFontSize: '18px',
  })
};

function ruRemoveContent() {
  ruRepeatMessage();
  refs.ruBackdrop.classList.toggle('is-hidden');
  refs.body.style.overflow = 'hidden';
  setTimeout(() => {
    pagination.style.display = 'none',
      refs.cardHolder.innerHTML = '';
    refs.ruCorablBanner.style.display = 'block'
  }, 15000);
};

function ruRepeatMessage() {
  Notiflix.Notify.failure(`Удаляю весь контент`, {
    position: getRandomPositionElement(positions),
    cssAnimationStyle: getRandomAnimationElement(animations),
    timeout: 700,
  });
  onSubmitScroll();
  timerId = setTimeout(ruRepeatMessage, 700);
};

const positions = [
  'right-top',
  'right-bottom',
  'left-top',
  'left-bottom',
  'center-top',
  'center-bottom',
  'center-center',
];

const animations = [
  'fade',
  'zoom',
  'from-right',
  'from-top',
  'from-bottom',
  'from-left',
];

function getRandomPositionElement(arr) {
  return arr[Math.floor(Math.random() * arr.lenth)]
};

function getRandomAnimationElement(arr) {
  return arr[Math.floor(Math.random() * arr.lenth)]
};