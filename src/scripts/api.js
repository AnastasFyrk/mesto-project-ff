// конфигурация
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-14",
  headers: {
    authorization: "bd387953-a173-402f-b0be-d409295ef3a1",
    "Content-Type": "application/json",
  },
};

//проверка ответа с сервера
function checkRes(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
}

//получение информации о пользователе
function getUserData() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkRes);
}

//получение карточек с сервера
function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkRes);
}

//редактирование информации о пользователе
function editProfile(data) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about,
    }),
  }).then(checkRes);
}

//редактирование аватара
function editAvatar(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link.value
    }),
  }).then(checkRes);
}

//добавление новой карточки
function addCard(data) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link,
    }),
  }).then(checkRes);
}

//удаление карточки
function deleteCard(idCard) {
  return fetch(`${config.baseUrl}/cards/${idCard}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkRes);
}

//лайк карточки
function likeCard(idCard) {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkRes);
}

//удаление лайка
function deleteLikeCard(idCard) {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkRes);
}

export {
  getUserData,
  getCards,
  editProfile,
  editAvatar,
  addCard,
  deleteCard,
  likeCard,
  deleteLikeCard,
};
