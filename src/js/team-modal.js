// import { refs } from './refs';
import { showBackdrop } from './backdrop';

const refs = {
  openTeamModal: document.querySelector('[data-team-modal-open]'),
  closeTeamModal: document.querySelector('[data-team-modal-close]'),  
  teamModal: document.querySelector('[data-team-modal]'),
  teamBackDrop: document.querySelector('.js-movie-modal-mask'),
  body: document.querySelector('body'),
};

refs.openTeamModal.addEventListener('click', onOpenTeamModal);
refs.closeTeamModal.addEventListener('click', onCloseTeamModal);
refs.teamBackDrop.addEventListener('click', onBackdropClick);

function onEscKeyPress(evt) {
  if (evt.code === 'Escape') {
    onCloseTeamModal();
  }
};

function onCloseTeamModal() {
  refs.teamModal.classList.add('is-hidden');
  window.removeEventListener('keydown', onEscKeyPress);
  refs.closeTeamModal.removeEventListener('click', onCloseTeamModal);
};

function onBackdropClick(evt) {
  if (evt.currentTarget === evt.target) onCloseTeamModal(); 
};

export function onOpenTeamModal(evt) {
  window.addEventListener('keydown', onEscKeyPress);
  showBackdrop();
  refs.teamModal.classList.remove('is-hidden');
  refs.closeTeamModal.addEventListener('click', onCloseTeamModal);
};
