import {getData, arrPets} from './getData.js';
import Card from './Card.js';

const prevPets = document.querySelector('.slider__button_left');
const nextPets = document.querySelector('.slider__button_right');
const carousel = document.querySelector('.carousel');
let countCard = 3;

let currentWidthWindow;
const currentPets = [];

const onResizeWindow = (sizeWindow) => {
  currentWidthWindow = document.body.clientWidth || sizeWindow;

  currentWidthWindow >= 1280
    ? (countCard = 3)
    : currentWidthWindow >= 768
    ? (countCard = 2)
    : (countCard = 1);

  carousel.innerHTML = '';
  currentPets.length = 0;
  loadCards();
};

const shuffle = (current) => {
  const shuffle = current.sort(() => Math.random() - 0.5);
  return shuffle;
};

const createCards = (arr, prepend) => {
  const parentsNode = document.querySelector('.carousel');
  return arr.forEach((card) => new Card(card, parentsNode).createCard(prepend));
};

const loadCards = () => {
  const randomPets = shuffle(arrPets);
  let cerPet = [];

  if (currentWidthWindow >= 1280) {
    cerPet = randomPets.slice(0, 3);
    countCard = 3;
  } else if (currentWidthWindow >= 768) {
    countCard = 2;
    cerPet = randomPets.slice(0, 2);
  } else if (window.innerWidth >= 300) {
    countCard = 1;
    cerPet = randomPets.slice(0, 1);
  }
  currentPets.length = [];
  cerPet.forEach((el) => currentPets.push(el.index));
  createCards(cerPet);
};

const prevPet = () => {
  const last = arrPets.filter((el) => !currentPets.includes(el.index));

  currentPets.length = [];

  const randomPets = shuffle(last).slice(0, countCard);
  randomPets.forEach((el) => currentPets.push(el.index));

  createCards(randomPets, 'prepend');

  carousel.classList.add('transition-left');

  prevPets.removeEventListener('click', prevPet);
  nextPets.removeEventListener('click', nextPet);
};

const nextPet = () => {
  const last = arrPets.filter((el) => !currentPets.includes(el.index));

  currentPets.length = [];

  const randomPets = shuffle(last).slice(0, countCard);
  randomPets.forEach((el) => currentPets.push(el.index));

  createCards(randomPets);

  carousel.classList.add('transition-right');

  prevPets.removeEventListener('click', prevPet);
  nextPets.removeEventListener('click', nextPet);
};

const slideSubscribe = async () => {
  await getData();

  onResizeWindow(window.screen.width);
  window.addEventListener('resize', onResizeWindow);

  prevPets.addEventListener('click', prevPet);

  carousel.addEventListener('animationend', (animationEvent) => {
    const {animationName} = animationEvent;

    const nodes = carousel.childNodes.length;

    if (animationName === 'move-left') {
      carousel.classList.remove('transition-left');
      for (let i = nodes - 1; i >= countCard; i--) {
        carousel.removeChild(carousel.childNodes[i]);
      }
    } else if (animationName === 'move-right') {
      carousel.classList.remove('transition-right');
      for (let i = countCard - 1; i >= 0; i--) {
        carousel.removeChild(carousel.childNodes[i]);
      }
    }
    if (carousel.childNodes.length === 0) {
      loadCards();
    }
    prevPets.addEventListener('click', prevPet);
    nextPets.addEventListener('click', nextPet);
  });

  nextPets.addEventListener('click', nextPet);
};

export default slideSubscribe;
