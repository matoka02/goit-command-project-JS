import { refs } from './refs';
import { showBackdrop } from './backdrop';

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
