

window.addEventListener('DOMContentLoaded', () => {
  let formNumberCard = document.createElement('form');
  let inputNumberCard = document.createElement('input');
  inputNumberCard.classList.add('input');
  inputNumberCard.setAttribute('type', 'number');
  inputNumberCard.placeholder = 'Количество карточек';
  formNumberCard.append(inputNumberCard);

  let btnStart = document.createElement('button');
  btnStart.classList.add('btn');
  btnStart.classList.add('btn-reset');
  btnStart.type = 'button';
  btnStart.textContent = 'Начать игру';
  formNumberCard.append(btnStart);

  document.querySelector('.game').prepend(formNumberCard);

  const cardListContainer = document.getElementById('card-list');

  let time;
  let timerID;
  let isRun = false;

// добавляем ввод карточек из input
  btnStart.addEventListener('click', (event) => {
    event.preventDefault();

    if (isRun) {
      return false;
    }

    const inputNumberCardValue = +inputNumberCard.value;

    if (
      isNaN(inputNumberCardValue) ||
      !inputNumberCardValue ||
      inputNumberCardValue % 2 !== 0
    ) {
      alert('Введите четное число от 2 до 10');
      return false;
    }

    cardListContainer.innerHTML = '';

    createCardNumber(inputNumberCardValue > 10 ? 8 : inputNumberCardValue);

// таймер
    time = 60;
    btnStart.textContent = time;
    isRun = true;

    timerID = setInterval(() => {
      time -= 1;
      btnStart.textContent = time;
      if (time === -1) {
        clearInterval(timerID);
        isRun = false;
        if (
          cardListContainer.querySelectorAll('.card__success').length <
          inputNumberCardValue
        ) {
          cardListContainer.innerHTML = '';
          btnStart.classList.add('btn-reset');
          btnStart.textContent = 'Сыграть еще раз';
          alert('Время вышло');
          // setTimeout(() => alert('время вышло'), 0);
        }
      }
    }, 1000);
  });

  // создаем экземпляр класса Card (карточку с номером)
  class Card {
    _open = false;
    _success = false;

    constructor(number, action) {
      this.card = document.createElement('li');
      this.card.classList.add('card');
      this.card.textContent = number;
      this.number = number;

      this.card.addEventListener('click', () => {
        if (this.open == false && this.success == false);
        //   вместо просто дбавления класса расписали сеттер и геттер для изменения свойства и его возврата
        //   this.card.classList.add("card__open");
        // вызываем сеттер и геттер для open
        this.open = true;
        //   в action передаем весь экземпляр класса this, не только this.card
        action(this);
        //   console.log(number);
      });

      cardListContainer.append(this.card);
    }

    set open(value) {
      this._open = value;
      if (value) {
        this.card.classList.add('card__open');
      } else {
        this.card.classList.remove('card__open');
      }
    }
    get open() {
      return this._open;
    }

    set success(value) {
      this._success = value;
      if (value) {
        this.card.classList.add('card__success');
      } else {
        this.card.classList.remove('card__success');
      }
    }
    get success() {
      return this._success;
    }
  }

  // создаем массив карт
  function createCardNumber(cardsCount) {
    let cardsNumberArrey = [];
    cardsArrey = [];
    firstCard = null;
    secondCard = null;

    for (let i = 1; i <= cardsCount / 2; i++) {
      cardsNumberArrey.push(i);
    }

    function dubleArr(arrey) {
      return (newArrey = arrey.concat(arrey));
    }
    dubleArr(cardsNumberArrey);

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    shuffle(newArrey);

    for (let cardNumber of newArrey) {
      cardsArrey.push(new Card(cardNumber, flip));
    }

    function flip(card) {
      if (
        firstCard !== null &&
        secondCard !== null &&
        firstCard.number !== secondCard.number
      ) {
        firstCard.open = false;
        secondCard.open = false;
        firstCard = null;
        secondCard = null;
      }
      if (firstCard == null) {
        firstCard = card;
      } else if (secondCard == null) {
        secondCard = card;
      }
      if (
        firstCard !== null &&
        secondCard !== null &&
        firstCard.number == secondCard.number
      ) {
        {
          firstCard.success = true;
          secondCard.success = true;
          firstCard = null;
          secondCard = null;
        }
      }

      if (
        document.querySelectorAll('.card__success').length === cardsArrey.length
      ) {
        btnStart.textContent = 'Cыграть еще раз';
        clearInterval(timerID);
        isRun = false;
      }
    }
  }
});


