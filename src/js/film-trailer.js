import { noTrailer, spinner, spinnerRemove } from './notifications';
import ApiService from './API.js';
import { closeBackdrop, showBackdrop } from './backdrop';

const api = new ApiService();
const BASE_TRAILER_URL = 'https://www.youtube.com/embed/';
const trailerBackdrop = document.querySelector('.js-movie-modal-mask');

async function showTrailer(id) {
  let trailer = null;

  // get data
  try {
    spinner();
    api.movieId = id;
    trailer = await api.fetchOnMovie();
  } catch (error) {
    return renderPlayer();
  } finally {
    spinnerRemove();
  };

  let officialTrailer = [];

  // filtering by keyword
  if (trailer?.data?.results?.length) {
    officialTrailer = trailer.data.results.filter(item=>item.name.toLowerCase().includes('trailer'));
  };

  // trailer render depending on its availability
  if (officialTrailer.length && officialTrailer[0].key) {
    return renderPlayer(officialTrailer[0].key);
  };

  // render any found video
  if (trailer?.data?.results?.[0]?.key) {
    return renderPlayer(trailer.data.results[0].key);
  };  

  // checks didn't work, render error
  renderPlayer();
};

function renderPlayer(link = '') {
  if (link) {
    trailerBackdrop.innerHTML = `
    <div class="container trailer__container">
      <iframe class="trailer__player" src="${BASE_TRAILER_URL}${link}" width="100%" height="100%"></iframe>
    </div>`;

    showBackdrop();
    trailerBackdrop.addEventListener('click', closeTrailer);
    window.addEventListener('keydown', closeTrailer);
  } else {
    noTrailer();
  }
};

function closeTrailer(evt) {
  // const { target, code } = evt;
  if (evt.target.classList.contains('js-movie-modal-mask') || evt.target.classList.contains('container') || evt.code === 'Escape') {
    closeBackdrop();
    trailerBackdrop.removeEventListener('click', closeTrailer);
    window.removeEventListener('keydown', closeTrailer);
  }; 
};

export default { showTrailer };