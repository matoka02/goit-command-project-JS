const backdrop = document.querySelector('.js-movie-modal-mask');
const body = document.querySelector('body');

function showBackdrop() {
  backdrop.classList.remove('is-hidden');
  body.style = 'overflow-y: hidden';
};

function closeBackdrop() {
  backdrop.classList.add('is-hidden');
  backdrop.innerHTML = '';
  body.style = 'overflow-y: overlay';
};

export { showBackdrop, closeBackdrop}