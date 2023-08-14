import createDomNode from './createDomNode.js';

class Card {
  constructor(card, parentsNode) {
    this.parentsNode = parentsNode;
    this.card = card;
  }

  createCard(prepend) {
    const card = document.createElement('div');
    card.classList.add('card');
    !prepend ? this.parentsNode.append(card) : this.parentsNode.prepend(card);

    const img = createDomNode(
      card,
      'card__image',
      'img',
      null,
      this.card.img,
      this.card.name
    );

    const cardContent = createDomNode(card, 'card__content');
    const cardTitle = createDomNode(
      cardContent,
      'card__title',
      'p',
      this.card.name
    );
    const button = createDomNode(
      cardContent,
      ['button', 'button_bordered'],
      'button',
      'Learn more'
    );
    card.addEventListener('click', () => this.createModal());
  }

  createModal() {
    const body = document.querySelector('body');
    body.classList.add('open');

    const modal = createDomNode(this.parentsNode, 'modal');
    const overlay = createDomNode(modal, 'overlay');
    const modalWindow = createDomNode(overlay, 'modal__window');

    const modalImage = createDomNode(modalWindow, 'modal__image', 'img');
    modalImage.src = this.card.img;
    modalImage.alt = this.card.name;

    const modalContent = createDomNode(modalWindow, 'modal__content');
    const modalTitle = createDomNode(
      modalContent,
      'modal__title',
      'h3',
      this.card.name
    );
    const modalType = createDomNode(
      modalContent,
      'modal__type',
      'span',
      this.card.type
    );
    const modalBreed = createDomNode(
      modalContent,
      'modal__breed',
      'span',
      this.card.breed
    );
    const modalDescription = createDomNode(
      modalContent,
      'modal__description',
      'p',
      this.card.description
    );
    const modalAttribute = createDomNode(modalContent, 'modal__attribute');
    const attributeFirst = createDomNode(modalAttribute, 'attribute', 'p');
    const attributeAge = createDomNode(attributeFirst, null, 'b', 'Age: ');
    const attributeAgeValue = createDomNode(
      attributeFirst,
      null,
      'span',
      this.card.age
    );
    const attributeSecond = createDomNode(modalAttribute, 'attribute', 'p');
    const attributeInoculations = createDomNode(
      attributeSecond,
      null,
      'b',
      'Inoculations: '
    );
    const attributeInoculationsValue = createDomNode(
      attributeSecond,
      null,
      'span',
      this.card.inoculations
    );
    const attributeThird = createDomNode(modalAttribute, 'attribute', 'p');
    const attributeDiseases = createDomNode(
      attributeThird,
      null,
      'b',
      'Diseases: '
    );
    const attributeDiseasesValue = createDomNode(
      attributeThird,
      null,
      'span',
      this.card.diseases
    );
    const attributeFourth = createDomNode(modalAttribute, 'attribute', 'p');
    const attributeParasites = createDomNode(
      attributeFourth,
      null,
      'b',
      'Parasites: '
    );
    const attributeParasitesValue = createDomNode(
      attributeFourth,
      null,
      'span',
      this.card.parasites
    );
    const modalButton = createDomNode(
      modalWindow,
      ['slider__button', 'slider__button_close'],
      'button'
    );
    modalButton.addEventListener('click', () => this.removeModal(modal));
    overlay.addEventListener('click', (e) => {
      if (e.target.classList.contains('overlay')) this.removeModal(modal);
    });
  }

  removeModal(element) {
    element.remove();
    const body = document.querySelector('body');
    body.classList.remove('open');
  }
}

export default Card;
