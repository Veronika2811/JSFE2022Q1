import { arrPets } from "./arrPets.js";
import { closeModalWindow, openModalWindow } from "./popup.js";

const sliderLeft = document.querySelector(".left");
const sliderRight = document.querySelector(".right");
const carousel = document.querySelector(".carousel");
const cardsLeft = document.querySelector(".pets__cards--left");
const cardsRight = document.querySelector(".pets__cards--right");
const cardsActive = document.querySelector(".pets__cards--active");

// Рандом
function randomPets(current) {
  const shuffle = arrPets.sort(() => Math.random() - 0.5);
  const randomPets = shuffle.filter((el) => !current.includes(el.name));
  return randomPets;
}

const moveLeft = () => {
  carousel.classList.add("transition-left");
  sliderLeft.removeEventListener("click", moveLeft);
  sliderRight.removeEventListener("click", moveRight);
};

const moveRight = () => {
  carousel.classList.add("transition-right");
  sliderLeft.removeEventListener("click", moveLeft);
  sliderRight.removeEventListener("click", moveRight);
};

sliderLeft.addEventListener("click", moveLeft);
sliderRight.addEventListener("click", moveRight);

function slideSubscribe() {
  carousel.addEventListener("animationend", (animationEvent) => {
    let changedCards;
    if (animationEvent.animationName === "move-left") {
      carousel.classList.remove("transition-left");
      changedCards = cardsLeft;
      cardsActive.innerHTML = cardsLeft.innerHTML;
    } else {
      carousel.classList.remove("transition-right");
      changedCards = cardsRight;
      cardsActive.innerHTML = cardsRight.innerHTML;
    }

    for (let i = 0; i < 1; i++) {
      const petsCards = changedCards.querySelectorAll(".card");
      const currentPets = Array.from(petsCards).map(
        (card) => card.childNodes[3].textContent
      ); // 3 предыдущих элемента
      const newPetsArr = randomPets(currentPets);

      petsCards.forEach((item, index) => {
        item.childNodes[1].src = newPetsArr[index].img;
        item.childNodes[1].alt = newPetsArr[index].name;
        item.childNodes[3].textContent = newPetsArr[index].name;
      });

      const petsCardActive = document.querySelectorAll(".card");
      const overlay = document.querySelector(".overlay");
      const closeModaBlock = document.querySelector(".btn__position");
      const closeModalBtn = document.querySelector(".btn__close");

      petsCardActive.forEach(function (card) {
        card.addEventListener("click", openModalWindow);
      });

      overlay.addEventListener("click", closeModalWindow);
      closeModaBlock.addEventListener("click", closeModalWindow);
      closeModalBtn.addEventListener("click", closeModalWindow);

      closeModaBlock.addEventListener("mouseenter", function (event) {
        closeModalBtn.style.backgroundColor = "#fddcc4";
        closeModalBtn.style.borderColor = "#fddcc4";
      });

      overlay.addEventListener("mouseenter", function (event) {
        closeModalBtn.style.backgroundColor = "#fddcc4";
        closeModalBtn.style.borderColor = "#fddcc4";
      });

      overlay.addEventListener("mouseleave", function (event) {
        closeModalBtn.style.backgroundColor = "transparent";
        closeModalBtn.style.borderColor = "#f1cdb3";
      });
      closeModaBlock.addEventListener("mouseleave", function (event) {
        closeModalBtn.style.backgroundColor = "transparent";
        closeModalBtn.style.borderColor = "##f1cdb3";
      });
    }

    sliderLeft.addEventListener("click", moveLeft);
    sliderRight.addEventListener("click", moveRight);
  });
}

export default slideSubscribe;
