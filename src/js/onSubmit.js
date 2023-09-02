import ApiService from './API';
import { refs } from '../index';
import { renderCards } from './renderCards';
import { failure, secondRequest, spinner, spinnerRemove, success, warning } from './notifications';

const apiService = new ApiService();

let value = null;

export function onSubmit(evt) {
  // const { target } = evt;
  evt.preventDefault();
  if (value === evt.target.elements[0].value.trim()) {
    secondRequest(evt.target.elements[0].value.trim());
    return;
  };

  if (evt.target.elements[0].value.trim() === '') {
    warning();
    return;
  };

  apiService.query = evt.target.elements[0].value.trim();
  apiService.resetPage();
  spinner();
  apiService.fetch().then(data => {
    if (data.data.results.length === 0) {
      failure();
      spinnerRemove();
      return;
    } else {
      success(data.data.total_results, evt.target.elements[0].value.trim());
      renderCards(data);
      spinnerRemove();
    }
  });

  value = evt.target.elements[0].value.trim();

  if (evt.target.elements[0].value.trim()) return;

  onSubmitScroll();
  apiService.query = evt.target.elements[0].value.trim();

  apiService.fetch().then(data => {
    refs.cardHolder.innerHTML = '';
    renderCards(data);
  })

};

export function onSubmitScroll() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};