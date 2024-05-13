import './pages/index.css';
import { initialCards } from './scripts/cards';
import { createCard, deleteCard, likeCard } from './scripts/card';
import { openModal, closeModal } from './scripts/modal';

const popups = document.querySelectorAll('.popup'); //все попапы

const popupTypeEdit = document.querySelector('.popup_type_edit'); //попап редактирования профиля
const editButton = document.querySelector('.profile__edit-button'); //кнопка редактирования
const formElement = document.forms['edit-profile']; //форма редактирования профиля
const nameInput = document.querySelector('.popup__input_type_name'); //имя ввод
const jobInput = document.querySelector('.popup__input_type_description'); //профессия ввод
const displayedName = document.querySelector('.profile__title'); //имя в профиле
const displayedJob = document.querySelector('.profile__description'); //профессия в профиле

const popupNewCard = document.querySelector('.popup_type_new-card'); //попап добавления карточки
const addButton = document.querySelector('.profile__add-button'); //кнопка добавления карточки
const formNewCard = document.forms['new-place']; //форма добавления карточки

const cardList = document.querySelector('.places__list'); //список карточек

const popupImage = document.querySelector('.popup_type_image'); //попап картинки
const image = document.querySelector('.popup__image'); //картинка в попапе
const captionImage = document.querySelector('.popup__caption'); //подпись картинки

//слушатель открытия попапа редактирования профиля
editButton.addEventListener('click', () => {
  openModal(popupTypeEdit);
  nameInput.value = displayedName.textContent;
  jobInput.value = displayedJob.textContent;
});

//слушатель закрытия попапа
popups.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closeModal(item);
    } else if (evt.target.classList.contains('popup__close')) {
      closeModal(item);
    }
  });
});

//слушатель открытия попапа добавления карточки
addButton.addEventListener('click', () => {
  openModal(popupNewCard);
});

//добавление информации в профиль
function handleFormSubmit(evt) {
  evt.preventDefault();
  displayedName.textContent = nameInput.value;
  displayedJob.textContent = jobInput.value;
  closeModal(popupTypeEdit);
}

formElement.addEventListener('submit', handleFormSubmit);

initialCards.forEach(function (item) {
  cardList.append(
    createCard(item.name, item.link, deleteCard, likeCard, handleImageClick)
  );
});

//добавление карточки через форму
function handleFormSubmitNewCard(evt) {
  evt.preventDefault();
  const placeInput = document.querySelector('.popup__input_type_card-name').value; //место ввод
  const linkInput = document.querySelector('.popup__input_type_url').value; //ссылка ввод
  const newItem = {
    name: placeInput,
    link: linkInput,
  };
  cardList.prepend(
    createCard(
      newItem.name,
      newItem.link,
      deleteCard,
      likeCard,
      handleImageClick
    )
  );
  closeModal(popupNewCard);
  evt.target.reset();
}

formNewCard.addEventListener('submit', handleFormSubmitNewCard);

//функция открытия попапа картинки
function handleImageClick(evt) {
  if (evt.target.classList.contains('card__image')) {
    openModal(popupImage);
    image.src = evt.target.src;
    image.alt = evt.target.alt;
    captionImage.textContent = evt.target.alt;
  }
}
