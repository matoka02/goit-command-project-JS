import { addToWatched, infoRemoveFromWatched } from './notifications';

const MOVIES_QUEUE = 'movies-queue';
const MOVIES_WATCHED = 'movies-watched';

// function launches when the movie modal opens functioin "showModal()" from film-modal.js
function locStorage(data) {
  // variables declaration for further local storage content
  const moviesWatched = JSON.parse(localStorage.getItem(MOVIES_WATCHED)) || [];
  const moviesQueue = JSON.parse(localStorage.getItem(MOVIES_QUEUE)) || [];

  // reaching "Add to Watched" and "Add to Queue" buttons
  const addWatchedRef = document.querySelector('.add-watched');
  const addQueueRef = document.querySelector('.add-queue');

  // adding listeners to "Add to Watched" and "Add to Queue" buttons
  addWatchedRef.addEventListener('click', onWatchedClick);
  addQueueRef.addEventListener('click', onQueueClick);

  // checker if the movie from the modal is already exists in local storage
  // and make the buttons "Add to Watched" and "Add to Queue" appear accordingly
  if (localStorage.length > 0) {
    if (moviesWatched.find(item => item.id === data.id)) {
      addWatchedRef.classList.add('js-remove-from');
      addWatchedRef.textContent = 'remove from watched';
    }
  };

  if (localStorage.length > 0) {
    if (moviesQueue.find(item => item.id === data.id)) {
      addQueueRef.classList.add('js-remove-from');
      addQueueRef.textContent = 'remove from queue';
    }
  };

  // function of adding to "Watched" to the local storage by clicking "Add to Watched"
  function onWatchedClick() {
    if (!moviesWatched.find(item => item.id === data.id)) {
      moviesWatched.push(data);
      localStorage.setItem(MOVIES_WATCHED, JSON.stringify(moviesWatched));

      const resp = addWatchedRef.classList.toggle('js-remove-from');
      addWatchedRef.textContent = `${resp ? 'remove from' : 'add to'} watched`;

      addToWatched();

      return;
    };

    let index = moviesWatched.findIndex(object => object.id === data.id);

    moviesWatched.splice(index, 1);
    localStorage.setItem(MOVIES_WATCHED, JSON.stringify(moviesWatched));

    const resp = addWatchedRef.classList.toggle('js-remove-from');
      addWatchedRef.textContent = `${resp ? 'remove from' : 'add to'} watched`;

    infoRemoveFromWatched();
  };

  // function of adding to "Queue" to the local storage by clicking "Add to Queue"
  function onQueueClick() {
    if (!moviesQueue.find(item => item.id === data.id)) {
      moviesQueue.push(data);
      localStorage.setItem(MOVIES_QUEUE, JSON.stringify(moviesQueue));

      const resp = addQueueRef.classList.toggle('js-remove-from');
      addQueueRef.textContent = `${resp ? 'remove from' : 'add to'} queue`;

      addToWatched();

      return;
    };

    let index = moviesQueue.findIndex(object => object.id === data.id);

    moviesQueue.splice(index, 1);
    localStorage.setItem(MOVIES_QUEUE, JSON.stringify(moviesQueue));

    const resp = addQueueRef.classList.toggle('js-remove-from');
      addQueueRef.textContent = `${resp ? 'remove from' : 'add to'} queue`;

    infoRemoveFromWatched();
  };
  
};

export default locStorage;