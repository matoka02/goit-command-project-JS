import ApiService from './js/API';
import { onSubmit, onSubmitScroll } from './js/onSubmit';
import { onScroll } from './js/onScroll';
// import { switcher } from './js/switcher';
import { stickyHeader } from './js/sticky-header';
import { renderCards } from './js/renderCards';
import trailer from './js/film-trailer';
import { showModal } from './js/film-modal';
import { noInfo, ruAlert, ruDelete, spinner, spinnerRemove } from './js/notifications';
import { onOpenTeamModal } from './js/team-modal';

export const refs = {
  topButton: document.querySelector('.btn_top'),
  body: document.querySelector('body'),
  searchForm: document.querySelector('.home-header__form'),
  stickyHeaderForm: document.querySelector('.home-header__form__sticky'),  
  cardHolder: document.querySelector('.card-holder'),
  // container: document.querySelector('.card-container.container'),
  stickyHeader: document.querySelector('.js-home-header__sticky'),
  footerLink: document.querySelector('.footer__link'),
};

export const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSubmit);
refs.stickyHeader.addEventListener('submit', onSubmit);
refs.cardHolder.addEventListener('click', onCardClick);
refs.topButton.addEventListener('click', onSubmitScroll);

refs.stickyHeaderForm.addEventListener('change', ()=>{
  refs.searchForm.elements[0].value = refs.stickyHeaderForm.elements[0].value;
});

refs.searchForm.addEventListener('change',()=>{
  refs.stickyHeaderForm.elements[0].value = refs.searchForm.elements[0].value;
});

spinner();
apiService.fetchDefault().then(data=>{
  renderCards(data)
});
spinnerRemove();

function onCardClick(evt) {
  if (evt.target===evt.currentTarget) return;
  if (evt.target.classList.contains('film__trailer-btn')) {
    return trailer.showTrailer(evt.target.closest('li').id)
  };

  apiService.movieId = evt.target.closest('li').id;
  spinner();
  apiService.fetchById().then(data=>{
    if(!data){
      noInfo();
      spinnerRemove();
      return;
    } else if (data.data.original_language==='ru') {
      ruAlert();
      evt.target.classList.add('ruContent');
      spinnerRemove();
    } else {
      showModal(data.data);
      spinnerRemove();
    }
  });

  if (evt.target.classList.contains('ruContent')) {
    ruDelete();
  }
};

refs.footerLink.addEventListener('click', onOpenTeamModal);