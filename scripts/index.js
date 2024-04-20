function createCard(name, link, deleteCard) {
    const template = document.querySelector('#card-template');
    const cardElement = template.content.cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__image').src = link;

    deleteButton.addEventListener('click', (event) => deleteCard(event));

    return cardElement;
}

function deleteCard () {
    const card = event.target.closest('.card');
    card.remove();
}

const cardList = document.querySelector('.places__list');

initialCards.forEach((item) => {
    cardList.append(createCard(item.name, item.link, deleteCard));
})