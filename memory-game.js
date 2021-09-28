const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);

    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.dataset.color = color;
    newDiv.dataset.flipped = "false";
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

let numberOfFlippedCards = 0;
let numberOfCurrentlyFlippedCards = 0;
let card1;
let card2;

function handleCardClick(event) {
  const element = event.target;
  const color = element.dataset.color;
  const flipped = element.dataset.flipped;
  
  if(flipped == "true" || numberOfCurrentlyFlippedCards == 2) {
    return;
  }
  
  if(card1){
    card2 = element;
    numberOfCurrentlyFlippedCards = 2;
  } else{
    card1 = element;
    numberOfCurrentlyFlippedCards = 1;
  }

  const currentBackgroundColor = element.style.backgroundColor;
  element.style.backgroundColor = color;
  element.dataset.flipped = "true";

  if (numberOfCurrentlyFlippedCards == 2) {
    setTimeout(function(){
      const color1 = card1.dataset.color;
      const color2 = card2.dataset.color;
      if(color1 == color2) {
        card1.dataset.flipped = "true";
        card2.dataset.flipped = "true";
        numberOfFlippedCards += 2;
      } else{
        card1.dataset.flipped = "false";
        card1.style.backgroundColor = "";
        card2.dataset.flipped = "false";
        card2.style.backgroundColor = "";
      }
      
      numberOfCurrentlyFlippedCards = 0;
      card1 = "";
      card2 = "";

      if(COLORS.length == numberOfFlippedCards) {
        alert("The Game is Over");
        window.location.reload();
      }
    }, 1000)
  }
}

createDivsForColors(shuffledColors);