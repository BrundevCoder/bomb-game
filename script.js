const display = document.getElementById("display");

let squares = [
  {"1": true},
  {"2": false}
];

let currentSquares = 8
let bombIndex = 0;

function new_squares(quantity) {

  squares = [];

  bombIndex = Math.floor(Math.random() * quantity);

  for (let i = 0; i < quantity; i++) {
    let newSquare = {isBomb: false};

    if (i === bombIndex) {
      newSquare.isBomb = true;
    }

    squares.push(newSquare)
  }

  return;
}

function putSquaresInUI() {

  new_squares(currentSquares);

  display.innerText = "";

  for (let i = 0; i < currentSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.classList.add(`${i}`);

    display.appendChild(square);

    square.addEventListener("click", () => {
      if (i === bombIndex) {

        explode();
      }
      else {
        currentSquares--;
      }
    })
  }
}

function explode() {
  display.innerText = "You Exploded!";
}

putSquaresInUI()