const body = document.querySelector('.body');
const headerWrapper = document.querySelector('.header__wrapper');
const logo = document.querySelector('.logo');
const hamburger = document.querySelector('.hamburger');
const navigation = document.querySelector('.header__navigation');
const navigationLink = [...document.querySelectorAll('.navigation__link')];
const mask = document.querySelector('.mask-content');

const toggleMenu = () => {
  if (window.innerWidth >= 768) return;

  body.classList.toggle('open');
  hamburger.classList.toggle('open');
  navigation.classList.toggle('open');
  headerWrapper.classList.toggle('open');
  logo.classList.toggle('open');
  mask.classList.toggle('open');
};

const burgerSubscribe = () => {
  hamburger.addEventListener('click', toggleMenu);

  navigationLink.forEach((el) => el.addEventListener('click', toggleMenu));

  mask.addEventListener('click', toggleMenu);
};

export default burgerSubscribe;
