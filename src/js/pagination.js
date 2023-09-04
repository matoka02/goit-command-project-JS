import ApiService from './API';
import { renderCards } from './renderCards';
import { SVG_PAGINATION_LEFT, SVG_PAGINATION_RIGHT } from './sprite-code';
import { spinner, spinnerRemove } from './notifications';

const apiService = new ApiService();

export const pagination = document.querySelector('.pagination__container');
let firstPage = null;
let endPage = null;

export function getPagination(currentPage, lastPage, isLib = false) {
  // console.log(pagination);
  if (!currentPage || lastPage === 1 || lastPage - currentPage < 0) {
    pagination.style = `margin: 0;`;
    pagination.innerHTML = '';
    return;
  };
  firstPage = currentPage;
  endPage = lastPage;
  let pages = getPagesArray(currentPage, lastPage);

  pagination.innerHTML = `
  <button class="pagination__left-btn on" type="button">
    ${SVG_PAGINATION_LEFT}
  </button>
  <ul class="pagination__list"></ul>
  <button class="pagination__right-btn on" type="button">
    ${SVG_PAGINATION_RIGHT}
  </button>`;

  if (window.screen.width <= 768) {
    pagination.style = `margin-bottom: 40px`
  } else {
    pagination.style = `margin-bottom: 60px`
  };

  const paginationLeftBtn = document.querySelector('.pagination__left-btn');
  const paginationRightBtn = document.querySelector('.pagination__right-btn');

  if (currentPage === 1) {
    paginationLeftBtn.classList.remove('on');
    paginationLeftBtn.disabled = true;
  } else if (lastPage === currentPage) {
    paginationRightBtn.classList.remove('on');
    paginationRightBtn.disabled = true;
  };

  const list = document.querySelector('.pagination__list');

  list.insertAdjacentHTML('beforeend', renderLi(pages));

  const itemList = list.children;

  for (let i = 0; i < itemList.length; i++) {
    if (Number(itemList[i].id) === currentPage) {
      itemList[i].classList.add('pagination__item--current');
    }

    if (!isLib) {
      pagination.addEventListener('click', clickPagination);
    }
  }
};

function renderLi(arr) {
  return arr.reduce((acc, item) => {
    if (item === '+') {
      return (acc + `<li class="pagination__item pagination__on" id='${item}'>...</li>`);
    } else if (item === '-') {
      return (acc + `<li class="pagination__item pagination__on" id='${item}'>...</li>`);
    } else {
      return (acc + `<li class="pagination__item pagination__on" id='${item}'>${item}</li>`)
    };
  }, '');
};

function getPagesArray(currentPage, lastPage) {
  let result = [];

  if (window.screen.width <= 768) {
    if (lastPage <= 5) {
      result = ['', ''];
      for (let m = 0; m < lastPage; m++) result.push(m + 1);
      result.push('');
      result.push('');
    } else if (currentPage >= 3 && lastPage - currentPage >= 2) {
      result = [
        '',
        '',
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
        '',
        '',
      ];
    } else if (currentPage <= 2) {
      result = ['', ''];
      for (let m = 0; m < 5; m++) result.push(m + 1);
      result.push('');
      result.push('');
    } else {
      result = ['', ''];
      for (let m = 4; m > 0; m--) result.push(lastPage - m);
      result.push(lastPage);
      result.push('');
      result.push('');
    };

    return result;
  };

  if (lastPage <= 9) {
    for (let i = 0; i < lastPage; i++) result.push(i + 1);
  } else if (lastPage - currentPage >= 5 && currentPage >= 6) {
    result = [
      1,
      '-',
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      '+',
      lastPage,
    ];
  } else if (lastPage - currentPage >= 5 && currentPage <= 5) {
    for (let j = 0; j < 7; j++) result.push(j + 1);
    result.push('+');
    result.push(lastPage);
  } else {
    result.push(1);
    result.push('-');
    for (let i = 6; i > 0; i--) result.push(lastPage - i);
    result.push(lastPage);
  };

  return result;
};

function clickPagination(evt) {
  // отслеживание нажиманий
  if (evt.target === evt.currentTarget || evt.target.nodeName === 'UL') return;

  let id = null;
  if (evt.target.nodeName === 'svg' || evt.target.nodeName === 'BUTTON' || evt.target.nodeName === 'path') {
    if (evt.target.closest('button').classList.contains('pagination__left-btn') && firstPage > 1) {
      id = firstPage - 1;
    } else if (evt.target.closest('button').classList.contains('pagination__right-btn') && firstPage < endPage) {
      id = firstPage + 1;
    } else return;
  } else {
    if (!isNaN(evt.target.closest('li').id)) {
      id = evt.target.closest('li').id;
    } else if (evt.target.closest('li').id === '+') {
      id = firstPage + 3;
    } else if (evt.target.closest('li').id === '-') {
      id = firstPage - 3;
    } else return;
  };

  spinner();
  apiService.fetchPagination(id).then(data => {
    // console.log(data);
    renderCards(data);
    spinnerRemove();
  });
};