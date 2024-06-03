const template = document.querySelector("#card-template");

function createCard(
  cardData,
  handleImageClick,
  handleButtonDeleteClick,
  likeButtonClick,
  userId
) {
  const cardElement = template.content.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardTitle.textContent = cardData.name;
  cardImage.alt = cardData.name;
  cardImage.src = cardData.link;

  if (cardData.owner._id === userId) {
    deleteButton.removeAttribute("style", "display: none");
  } else {
    deleteButton.setAttribute("style", "display: none");
  }

  if (cardData.likes.length > 0) {
    likeCounter.textContent = cardData.likes.length;
  } else {
    likeCounter.textContent = "";
  }

  if (cardData.likes.some((elem) => elem._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
    likeCounter.textContent = cardData.likes.length;
  }

  deleteButton.addEventListener("click", (event) =>
    handleButtonDeleteClick(cardData, event)
  );
  likeButton.addEventListener("click", (event) =>
    likeButtonClick(cardData._id, likeCounter, event, likeButton)
  );
  cardImage.addEventListener("click", handleImageClick);

  return cardElement;
}

function like(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

export { createCard, like };
