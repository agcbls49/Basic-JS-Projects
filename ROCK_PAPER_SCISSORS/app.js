const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');
const possibleChoices = document.querySelectorAll('button');
const counter = document.getElementById('counter-display');

let userChoice;
let computerChoice;
let result;
let count = 0;

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
  userChoice = e.target.id;
  userChoiceDisplay.innerHTML = userChoice;
  generateComputerChoice();
  getResult();
}))

function getResult() {
  if (computerChoice === userChoice) {
    result = 'DRAW!';
    backgroundCounter();
  } else if (
    (computerChoice === 'rock' && userChoice === 'paper') ||
    (computerChoice === 'paper' && userChoice === 'scissors') ||
    (computerChoice === 'scissors' && userChoice === 'rock')
  ) {
    result = 'YOU WIN!';
    count += 1;
    backgroundCounter();
  } else {
    result = 'YOU LOSE!';
    backgroundCounter();
  }

  resultDisplay.innerHTML = result;
  counter.innerHTML = count;
}

function backgroundCounter() {
  if (result === 'YOU WIN!') {
    document.body.style.background = "#8ab57e";
  }
  if(result === "YOU LOSE!"){
    document.body.style.background = "#f96666";
  }
  if(result === "DRAW!"){
    document.body.style.background = "#ffec80";
  }
}

function generateComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  
  if (randomNumber === 1){
    computerChoice = 'rock';
  }
  if (randomNumber === 2){
    computerChoice = 'paper';
  }
  if (randomNumber === 3){
    computerChoice = 'scissors';
  }
  computerChoiceDisplay.innerHTML = computerChoice;
}
