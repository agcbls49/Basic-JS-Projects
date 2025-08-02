const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');
const restartBtn = document.querySelector('#restartBtn');
restartBtn.addEventListener('click', restartGame);

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;

function randomSquare(){
    squares.forEach(square => {
        square.classList.remove('mole')
    });

    let randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add('mole');

    hitPosition = randomSquare.id;
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if(square.id == hitPosition){
            result++;
            score.textContent = result;
            hitPosition = null;
        }
    })
})

function moveMole() {
    // show mole in random square every 500ms
    timerId = setInterval(randomSquare, 500);
}

moveMole();

function countDown(){
    currentTime--;
    timeLeft.textContent = currentTime;

    if(currentTime == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        alert('GAME OVER!. Your Final Score is: ' + result);
    }
}

function restartGame() {
    // Clear existing intervals
    clearInterval(timerId);
    clearInterval(countDownTimerId);

    // Reset values
    result = 0;
    currentTime = 60;
    hitPosition = null;
    score.textContent = result;
    timeLeft.textContent = currentTime;

    // Remove mole from all squares
    squares.forEach(square => {
        square.classList.remove('mole');
    });

    // Restart timers
    moveMole();
    countDownTimerId = setInterval(countDown, 1000);
}

let countDownTimerId = setInterval(countDown, 1000);