import ApiService from './API';
import { refs } from '../index';
import { renderCards } from './renderCards';

const apiService = new ApiService();

export function onScroll() {
  const position = document.documentElement.getBoundingClientRect();
  const userPort = document.documentElement.clientHeight + 2000;

  if (apiService.query === '') {
    apiService.fetchDefault().then(data=>{ renderCards(data) });
  } else {
    return
  };

  if (position.bottom < userPort) {
    apiService.query = refs.searchForm.elements[0].value.trim();
    apiService.fetch().then(data=>{ renderCards(data) });
  };
};