import {getData, arrPets} from './getData.js';
import Card from './Card.js';

const petsPage = document.querySelector('.pets-page__wrapper');
const firstPagePets = document.querySelector('.pagination__first-page');
const prevPage = document.querySelector('.pagination__previous_page');
const activePage = document.querySelector('.pagination__page-number');
const nextPage = document.querySelector('.pagination__next-page');
const lastPageBtn = document.querySelector('.pagination__last-page');
const paginationArrBtn = [firstPagePets, prevPage, nextPage, lastPageBtn];

let currentWidthWindow;
let arraysPage = [];
let page = 8;
let currentPage = 1;

const shuffle = (current) => {
  const shuffle = current.sort(() => Math.random() - 0.5);
  return shuffle;
};

const createCards = (arr) => {
  const parentsNode = document.querySelector('.pets-page__wrapper');
  return arr.forEach((card) => new Card(card, parentsNode).createCard());
};

const onResizeWindow = (sizeWindow) => {
  currentWidthWindow = document.body.clientWidth || sizeWindow;

  currentWidthWindow >= 1280
    ? (page = 6)
    : currentWidthWindow >= 768
    ? (page = 8)
    : (page = 16);

  if (typeof sizeWindow !== 'number') {
    petsPage.innerHTML = '';
    arraysPage.length = 0;
    loadCards();
  }
};

const arraySplit = (count, number) => {
  for (let i = 0; i < count; i++) {
    i % 2 !== 0
      ? arraysPage.push(Array.from(shuffle(arrPets.slice(0, number))))
      : arraysPage.push(Array.from(shuffle(arrPets.slice(-number))));
  }
};

const loadCards = () => {
  if (currentWidthWindow >= 1280) {
    for (let i = 0; i < 6; i++) {
      arraysPage.push(Array.from(shuffle(arrPets)));
    }
  } else if (currentWidthWindow >= 768) {
    arraySplit(8, 6);
  } else if (window.innerWidth >= 300) {
    arraySplit(16, 3);
  }
  createCards(arraysPage[0]);
};

const updatePets = (index) => {
  activePage.textContent = currentPage;

  petsPage.innerHTML = '';

  createCards(arraysPage[index]);
};

const paginationDisabled = (first) => {
  if (first) {
    [lastPageBtn, nextPage].forEach((btn) => btn.disabled = true);
    [firstPagePets, prevPage].forEach((btn) => btn.disabled = false);
  } else {
    [lastPageBtn, nextPage].forEach((btn) => btn.disabled = false);
    [firstPagePets, prevPage].forEach((btn) => btn.disabled = true);
  }
};

const loadLastPage = () => {
  paginationDisabled(true);
  currentPage = page;
  updatePets(arraysPage.length - 1);
};

const loadFirstPage = () => {
  paginationDisabled();
  currentPage = 1;
  updatePets(0);
};

const loadNextPage = () => {
  currentPage++;
  paginationArrBtn.forEach((btn) => (btn.disabled = false));

  if (currentPage === page) paginationDisabled(true);

  updatePets(currentPage - 1);
};

const loadPrevPage = () => {
  currentPage--;
  paginationArrBtn.forEach((btn) => (btn.disabled = false));

  if (currentPage === 1) paginationDisabled();

  updatePets(currentPage - 1);
};

const paginationSubscribe = async () => {
  await getData();

  onResizeWindow(window.screen.width);
  window.addEventListener('resize', onResizeWindow);

  loadCards();

  lastPageBtn.addEventListener('click', loadLastPage);
  firstPagePets.addEventListener('click', loadFirstPage);
  nextPage.addEventListener('click', loadNextPage);
  prevPage.addEventListener('click', loadPrevPage);
};

export default paginationSubscribe;
