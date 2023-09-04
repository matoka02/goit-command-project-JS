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

