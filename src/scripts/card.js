import { handleImageClick } from '../index.js';

const template = document.querySelector('#card-template');

function createCard(cardData) {
  const cardElement = template.content.cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;

  deleteButton.addEventListener('click', (cardData) => deleteCard(cardData));
  likeButton.addEventListener('click', (cardData) => likeCard(cardData));
  cardImage.addEventListener('click', (cardData) => handleImageClick(cardData));

  return cardElement;
}

function deleteCard(event) {
  const card = event.target.closest('.card');
  card.remove();
}

function likeCard(event) {
  event.target.classList.toggle('card__like-button_is-active');
}

export { createCard };
