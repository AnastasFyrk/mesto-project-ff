import "./pages/index.css";

import { createCard, like } from "./scripts/card.js";
import { openModal, closeModal } from "./scripts/modal.js";
import { enabledValidation, clearValidation } from "./scripts/validation.js";

import {
  getUserData,
  getCards,
  editProfile,
  editAvatar,
  addCard,
  deleteCard,
  likeCard,
  deleteLikeCard,
} from "./scripts/api.js";

import { configValidation } from "./scripts/configValidation.js";

const popups = document.querySelectorAll(".popup"); //все попапы

const popupTypeEdit = document.querySelector(".popup_type_edit"); //попап редактирования профиля
const profileEditButton = document.querySelector(".profile__edit-button"); //кнопка редактирования
const formEditProfile = document.forms["edit-profile"]; //форма редактирования профиля
const nameInput = formEditProfile.querySelector(".popup__input_type_name"); //имя ввод
const jobInput = formEditProfile.querySelector(".popup__input_type_description"); //профессия ввод
const profileName = document.querySelector(".profile__title"); //имя в профиле
const profileDescription = document.querySelector(".profile__description"); //профессия в профиле

const popupNewCard = document.querySelector(".popup_type_new-card"); //попап добавления карточки
const addButton = document.querySelector(".profile__add-button"); //кнопка добавления карточки
const formNewCard = document.forms["new-place"]; //форма добавления карточки
const placeInput = formNewCard.querySelector(".popup__input_type_card-name"); //место ввод
const linkInput = formNewCard.querySelector(".popup__input_type_url"); //ссылка ввод

const cardList = document.querySelector(".places__list"); //список карточек

const popupImage = document.querySelector(".popup_type_image"); //попап картинки
const image = document.querySelector(".popup__image"); //картинка в попапе
const captionImage = document.querySelector(".popup__caption"); //подпись картинки

const popupTypeAvatar = document.querySelector(".popup_type_avatar"); //попап смены аватара
const profileAvatar = document.querySelector(".profile__image"); //аватар в профиле
const formAvatar = document.forms["update-avatar"]; //форма смены аватара
const avatarInput = popupTypeAvatar.querySelector(".popup__input_type_avatar"); //поле ввода аватара

const popupTypeDeleteCard = document.querySelector(".popup_type_delete-card"); //попап удаления карточки вопрос
const popupTypeDeleteCardButton =
  popupTypeDeleteCard.querySelector(".popup__button"); //кнопка удаления карточки вопрос

let userId;
let card;
let cardId;

//запрос информации
Promise.all([getCards(), getUserData()])
  .then(([cardsData, userData]) => {
    userId = userData._id;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style = `background-image: url(${userData.avatar})`;

    cardsData.forEach((cardData) => {
      renderCard(cardData);
    });
  })
  .catch((err) => {
    console.log(err);
  });

function renderCard(cardData) {
  cardList.prepend(
    createCard(
      cardData,
      handleImageClick,
      handleButtonDeleteClick,
      likeButtonClick,
      userId
    )
  );
}

//добавление информации в профиль
function handleFormSubmitProfile(evt) {
  evt.submitter.textContent = "Сохранение...";
  evt.preventDefault();

  editProfile({ name: nameInput.value, about: jobInput.value })
    .then(() => {
      profileName.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      evt.target.reset();
      closeModal(popupTypeEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
}

//добавление карточки через форму
function handleFormSubmitNewCard(evt) {
  evt.preventDefault();
  addCard({ name: placeInput.value, link: linkInput.value })
    .then((data) => {
      renderCard(data);
      evt.target.reset();
      closeModal(popupNewCard);
    })
    .catch((err) => {
      console.log(err);
    });
}

//функция открытия попапа картинки
function handleImageClick(evt) {
  //не совсем поняла как реализовать это замечание
  if (evt.target.classList.contains("card__image")) {
    openModal(popupImage);
    image.src = evt.target.src;
    image.alt = evt.target.alt;
    captionImage.textContent = evt.target.alt;
  }
}

//функция удаления карточки
function handleButtonDeleteClick(element, evt) {
  openModal(popupTypeDeleteCard);
  card = evt.target.closest(".card");
  cardId = element._id;
}

//обработка согласия удаления карточки
function handleFormSubmitQuestion() {
  deleteCard(cardId)
    .then(() => {
      card.remove();
      closeModal(popupTypeDeleteCard);
    })
    .catch((err) => {
      console.log(err);
    });
}

//обработка лайков
function likeButtonClick(id, likeCounter, event, likeButton) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    deleteLikeCard(id)
      .then((data) => {
        if (data.likes.length === 0) {
          likeCounter.textContent = "";
          likeButton.classList.remove("card__like-button_is-active");
        } else {
          likeCounter.textContent = data.likes.length;
          like(event);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    likeCard(id)
      .then((data) => {
        likeCounter.textContent = data.likes.length;
        like(event);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

//смена аватара
function handleFormSubmitAvatar(evt) {
  evt.submitter.textContent = "Сохранение...";
  evt.preventDefault();

  editAvatar(avatarInput)
    .then(() => {
      profileAvatar.style = `background-image: url(${avatarInput.value})`;
      closeModal(popupTypeAvatar);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
}

//слушатель открытия попапа редактирования профиля
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, configValidation);
  openModal(popupTypeEdit);
});

//слушатель обработки формы редактирования профиля
formEditProfile.addEventListener("submit", (evt) =>
  handleFormSubmitProfile(evt)
);

formAvatar.addEventListener("submit", handleFormSubmitAvatar);

//слушатель открытия попапа редактирования аватара
profileAvatar.addEventListener("click", () => {
  avatarInput.value = "";
  clearValidation(formAvatar, configValidation);
  openModal(popupTypeAvatar);
});

//слушатель открытия попапа добавления карточки
addButton.addEventListener("click", () => {
  clearValidation(formNewCard, configValidation);
  openModal(popupNewCard);

  placeInput.value = "";
  linkInput.value = "";
});

//слушатель обработки формы добавления карточки
formNewCard.addEventListener("submit", handleFormSubmitNewCard);

//слушатель открытия попапа удаления карточки
popupTypeDeleteCardButton.addEventListener("click", handleFormSubmitQuestion);

//слушатель закрытия попапа
popups.forEach((item) => {
  item.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closeModal(item);
    } else if (evt.target.classList.contains("popup__close")) {
      closeModal(item);
    }
  });
});

//включение валидации
enabledValidation(configValidation);