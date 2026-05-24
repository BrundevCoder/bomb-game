const display = document.getElementById("display");

let squares = [
  {isBomb: true},
  {isBomb: false}
];

let currentSquares = 8
let bombIndex = 0;

function new_squares(quantity) {

  if (quantity === 0 || quantity === 1) {
    display.innerText = "You Win!"
    return;
  }

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

  if (currentSquares === 1) {
    return;
  }

  display.innerText = "";

  for (let i = 0; i < currentSquares; i++) {
    const square = document.createElement("button");
    square.classList.add("square");
    square.classList.add(`${i}`);
    square.innerText = Number(square.classList[1]) + 1;

    display.appendChild(square);

    square.addEventListener("click", () => {
      if (i === bombIndex) {
        showSquaresType();

        setTimeout(() => {
          display.innerText = "You Exploded!"
        }, 1500);

        new Audio("sound/explosionSound.mp3").play()
      }
      else {
        showSquaresType();
        currentSquares--;
        new_squares(currentSquares);

        setTimeout(() => {
          putSquaresInUI();
        }, 1500);

        new Audio("sound/correct.mp3").play()
      }
    })
  }
}

function showSquaresType() {
  let allSquares = document.querySelectorAll(".square");

  allSquares.forEach((square) => {
    square.classList.add("green");
    square.disabled = true;
  })

  allSquares[bombIndex].classList.add("red");
}

putSquaresInUI()