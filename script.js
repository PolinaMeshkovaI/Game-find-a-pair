// создаем экземпляр класса Card (карточку с номером)

let formNumberCard = document.createElement("form");
let inputNumberCard = document.createElement("input");
inputNumberCard.classList.add("input");
inputNumberCard.setAttribute("type", "number");
inputNumberCard.placeholder = "Кол-во карточек по вертикали/горизонтали";
// let cardsCount;
cardsCount = parseInt(inputNumberCard.value);

document.getElementById("container").append(formNumberCard);
formNumberCard.append(inputNumberCard);

console.log(inputNumberCard.value);

// function cardsAll() {
//   if (
//     cardsCount = ''
//   ) {
//     console.log("введите четное число от 2 до 10");
//   } else if (
//     cardsCount % 2 == 0 &&
//     2 <= cardsCount <= 10
//   ) {
//    console.log(cardsCount)

//   } else (
//     console.log('enter number')
//   )
// }

// cardsAll();

// inputNumberCard.addEventListener('input', cardsAll);
console.log(cardsCount);
// таймер
let btnStart = document.createElement("button");
btnStart.classList.add("btn");
btnStart.classList.add("btn-reset");
btnStart.textContent = "Начать игру";
document.getElementById("container").append(btnStart);

let time;
let timerID;

btnStart.addEventListener("click", () => {
time = 10;
  btnStart.textContent = time;
  timerID = setInterval(() => {
    btnStart.textContent = time;
    time -= 1;
    if (time <= 0) {
      alert("время вышло");
      clearInterval(timerID);
      document.getElementById("card-list").innerHTML = "";
      btnStart.classList.add("btn-reset");
      btnStart.textContent = "Начать игру";
      time = 10;
    }
  }, 1000);
});

class Card {
  _open = false;
  _success = false;

  constructor(number, action) {
    this.card = document.createElement("li");
    this.card.classList.add("card");
    this.card.textContent = number;
    this.number = number;

    this.card.addEventListener("click", () => {
      if (this.open == false && this.success == false);
      //   вместо просто дбавления класса расписали сеттер и геттер для изменения свойства и его возврата
      //   this.card.classList.add("card__open");
      // вызываем сеттер и геттер для open
      this.open = true;
      //   в action передаем весь экземпляр класса this, не только this.card
      action(this);
      //   console.log(number);
    });

    document.getElementById("card-list").append(this.card);
  }

  set open(value) {
    this._open = value;
    if (value) {
      this.card.classList.add("card__open");
    } else {
      this.card.classList.remove("card__open");
    }
  }
  get open() {
    return this._open;
  }

  set success(value) {
    this._success = value;
    if (value) {
      this.card.classList.add("card__success");
    } else {
      this.card.classList.remove("card__success");
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
      document.querySelectorAll(".card__success").length == cardsArrey.length
    ) {
      let btnRestart = document.createElement("button");
      btnRestart.classList.add("btn");
      btnRestart.classList.add("btn-reset");
      btnRestart.textContent = "Cыграть еще раз";
      document.getElementById("container").append(btnRestart);
      clearInterval(timerID);

      document.getElementById("card-list").innerHTML = "";

      btnRestart.addEventListener("click", () => {
        btnRestart.remove(document.getElementById("container"));
        createCardNumber(cardsCount);
      });
    }
  }
}
createCardNumber(4);

console.log(cardsArrey.length);
console.log(document.querySelectorAll(".card__success").length);

console.log(newArrey);
