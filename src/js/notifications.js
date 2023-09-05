import Notiflix from 'notiflix';

// 1. Message functions (just import them where we want to use them and call them);
export function success(totalMovies, query) {
  Notiflix.Notify.success(`Hooray we found ${totalMovies} movies for "${query}`, { timeout: 4000 })
};

// 2. Function for pagination dots
export function successPages() {
  Notiflix.Notify.success(`Hooray, you clicked on the there dots!`)
};

// 3. Movie search functions
export function failure() {
  Notiflix.Notify.failure(`Sorry, no matches found for your search query!`, { timeout: 4000 })
};

// 4. Re-request feature
export function secondRequest(query) {
  Notiflix.Notify.warning(`You are trying to search "${query}" again, please enter a different search query`, { timeout: 4000 })
};

// 5. Warning function
export function warning() {
  Notiflix.Notify.warning(`Enter your search query in the search bar`, { timeout: 4000 })
};

// 6. Spinner launch function
export function spinner() {
  Notiflix.Loading.circle({ backgroundColor: 'rgba(0, 0, 0, 0.2)' })
};

// 7. Stop spinner function
export function spinnerRemove() {
  Notiflix.Loading.remove()
};

// 8. "No movie info found" function
export function noInfo() {
  Notiflix.Notify.failure(`Info about this movie not found`)
};

// 9. "Trailer not found" function
export function noTrailer() {
  Notiflix.Notify.failure(`Trailer not found`, { timeout: 4000 })
};

// 10. Feature "added movie to queue"
export function addToWatchQueue() {
  Notiflix.Notify.info(`The movie has been added to the queue`)
};

// 11. Function "removed movie from the queue"
export function infoRemoveFromQueue() {
  Notiflix.Report.info(`Removing the movie`, `You delete a movie from the queue`, `Okay`, removeFromQueue)
};

function removeFromQueue() {
  Notiflix.Notify.info(`The movie has been removed from the queue`)
};

// 12. Feature "added movie to watched"
export function addToWatched() {
  Notiflix.Notify.info(`The movie has been added to watched`)
};

// 13. Function "removed movie from watched"
export function infoRemoveFromWatched() {
  Notiflix.Report.info(`Removing the movie`, `You delete a movie from the watched`, `Okay`, removeFromWatched)
};

function removeFromWatched() {
  Notiflix.Notify.info(`The movie has been removed from watched`)
};
