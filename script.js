// создаем экземпляр класса Card (карточку с номером)
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
      console.log(number);
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

let cardsCount = 6;
cardsNumberArrey = [];
cardsArrey = [];
firstCard = null;
secondCard = null;

// создаем массив карт
function createCardNumber(cardsCount) {
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
}
// function flip (card) {
//     if (firstCard!== null && secondCard !== null) {
//       if (firstCard.number !== secondCard.number) {
//         firstCard.open = false;
//         secondCard.open = false;
//         firstCard = null;
//         secondCard = null;
//       };
//     };
//     if (firstCard == null) {
//       firstCard = card
//     } else {
//         if (secondCard == null){
//             secondCard = card
//         };
//       };
//     if (firstCard!== null && secondCard !== null) {
//         if (firstCard.number == secondCard.number) {
//           firstCard.success = true;
//           secondCard.success = true;
//           firstCard = null;
//           secondCard = null;
//         };
//     };
// }
// сравниваем и переворачиваем карты
function flip(card) {
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
    firstCard.success = true;
    secondCard.success = true;
    firstCard = null;
    secondCard = null;
  }

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
}

createCardNumber(cardsCount);

console.log(newArrey);
