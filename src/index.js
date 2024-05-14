import './pages/index.css';
import { initialCards } from './scripts/cards';
import { createCard } from './scripts/card';
import { openModal, closeModal } from './scripts/modal';

const popups = document.querySelectorAll('.popup'); //все попапы

const popupTypeEdit = document.querySelector('.popup_type_edit'); //попап редактирования профиля
const editButton = document.querySelector('.profile__edit-button'); //кнопка редактирования
const formEditProfile = document.forms['edit-profile']; //форма редактирования профиля
const nameInput = document.querySelector('.popup__input_type_name'); //имя ввод
const jobInput = document.querySelector('.popup__input_type_description'); //профессия ввод
const displayedName = document.querySelector('.profile__title'); //имя в профиле
const displayedJob = document.querySelector('.profile__description'); //профессия в профиле

const popupNewCard = document.querySelector('.popup_type_new-card'); //попап добавления карточки
const addButton = document.querySelector('.profile__add-button'); //кнопка добавления карточки
const formNewCard = document.forms['new-place']; //форма добавления карточки
const placeInput = document.querySelector('.popup__input_type_card-name'); //место ввод
const linkInput = document.querySelector('.popup__input_type_url'); //ссылка ввод

const cardList = document.querySelector('.places__list'); //список карточек

const popupImage = document.querySelector('.popup_type_image'); //попап картинки
const image = document.querySelector('.popup__image'); //картинка в попапе
const captionImage = document.querySelector('.popup__caption'); //подпись картинки

initialCards.forEach(function (cardData) {
  cardList.append(createCard(cardData));
});

//добавление информации в профиль
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  displayedName.textContent = nameInput.value;
  displayedJob.textContent = jobInput.value;
  closeModal(popupTypeEdit);
}

//добавление карточки через форму
function handleFormSubmitNewCard(evt) {
  evt.preventDefault();
  const newItem = {
    name: placeInput.value,
    link: linkInput.value,
  };
  cardList.prepend(createCard(newItem));
  closeModal(popupNewCard);
  evt.target.reset();
}

//функция открытия попапа картинки
export function handleImageClick(evt) {
  if (evt.target.classList.contains('card__image')) {
    openModal(popupImage);
    image.src = evt.target.src;
    image.alt = evt.target.alt;
    captionImage.textContent = evt.target.alt;
  }
}

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

//слушатель обработки формы редактирования профиля
formEditProfile.addEventListener('submit', handleFormSubmitProfile);

//слушатель обработки формы добавления карточки
formNewCard.addEventListener('submit', handleFormSubmitNewCard);
