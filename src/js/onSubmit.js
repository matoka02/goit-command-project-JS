import ApiService from './API';
import { refs } from '../index';
import { renderCards } from './renderCards';
import { failure, secondRequest, spinner, spinnerRemove, success, warning } from './notifications';

const apiService = new ApiService();

let value = null;

function onSubmit(evt) {
  const searchValue = evt.target.elements[0].value.trim();
  evt.preventDefault();
  if (value === searchValue) {
    secondRequest(searchValue);
    return;
  };

  if (searchValue === '') {
    warning();
    return;
  };

  apiService.query = searchValue;
  apiService.resetPage();
  spinner();
  apiService.fetch().then(data => {
    if (data.data.results.length === 0) {
      failure();
      spinnerRemove();
      return;
    } else {
      success(data.data.total_results, searchValue);
      renderCards(data);
      spinnerRemove();
    }
  });

  value = searchValue;

  if (searchValue) return;

  onSubmitScroll();
  apiService.query = searchValue;

  apiService.fetch().then(data => {
    refs.cardHolder.innerHTML = '';
    renderCards(data);
  })

};

function onSubmitScroll() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

export { onSubmit, onSubmitScroll };