// из него должна экспортироваться функция createCard, которую вы создали раньше (у вас она может называться по-другому).
//Функции, обрабатывающие события лайка и удаления карточки, также должны находиться в этом файле и экспортироваться из него.

const template = document.querySelector('#card-template');

function createCard(name, link, deleteCard, likeCard, handleImageClick) {
  const cardElement = template.content.cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__image').src = link;

  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', likeCard);
  cardImage.addEventListener('click', handleImageClick);

  return cardElement;
}

function deleteCard(event) {
  const card = event.target.closest('.card');
  card.remove();
}

function likeCard(event) {
  event.target.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, likeCard };
