document.addEventListener('DOMContentLoaded', () => {
    const timeLeftDisplay = document.querySelector('#time-left');
    const resultDisplay = document.querySelector('#result');
    const startPauseButton = document.querySelector('#start-pause-button');
    const squares = document.querySelectorAll('.grid div');
    const logsLeft = document.querySelectorAll('.log-left');
    const logsRight = document.querySelectorAll('.log-right');
    const carsLeft = document.querySelectorAll('.car-left');
    const carsRight = document.querySelectorAll('.car-right');

    let currentIndex = 76;
    const width = 9;
    let timerId;
    let outcomeTimerId;
    let currentTime = 20;

    function moveFrog(e) {
        // prevent frog from leaving a trail it will only be one block when moving
        squares[currentIndex].classList.remove('frog');

        switch(e.key) {
            case 'ArrowLeft': 
                // prevent going out of bounds of the border
                if(currentIndex % width !== 0) {
                    currentIndex -= 1; 
                }
                break;
            case 'ArrowRight': 
                if (currentIndex % width < width - 1) {
                    currentIndex += 1;
                } 
                break;
            case 'ArrowUp': 
                if (currentIndex - width >= 0) {
                    currentIndex -= width;
                }
                break;
            case 'ArrowDown': 
                if (currentIndex + width < width * width) {
                    currentIndex += width;
                } 
                break;
        }
        squares[currentIndex].classList.add('frog');
    }

    // call all functions related to element movement
    function autoMoveElements() {
        currentTime--;
        timeLeftDisplay.textContent = currentTime;

        logsLeft.forEach(logLeft => moveLogLeft(logLeft))
        logsRight.forEach(logRight => moveLogRight(logRight));
        carsLeft.forEach(carLeft => moveCarLeft(carLeft));
        carsRight.forEach(carRight => moveCarRight(carRight));
    }

    function checkOutcomes() {
        // each time something moves check for game lose logic
        lose();
        win();
    }

    // movement for logs going left
    function moveLogLeft(logLeft) {
        switch(true) {
            case logLeft.classList.contains('l1'): 
                logLeft.classList.remove('l1'); 
                logLeft.classList.add('l2'); 
                break;
            case logLeft.classList.contains('l2'): 
                logLeft.classList.remove('l2'); 
                logLeft.classList.add('l3'); 
                break;
            case logLeft.classList.contains('l3'): 
                logLeft.classList.remove('l3'); 
                logLeft.classList.add('l4'); 
                break;
            case logLeft.classList.contains('l4'): 
                logLeft.classList.remove('l4'); 
                logLeft.classList.add('l5'); 
                break;
            case logLeft.classList.contains('l5'): 
                logLeft.classList.remove('l5'); 
                logLeft.classList.add('l1'); 
                break;
        }
    }

    // movement for logs going right
    function moveLogRight(logRight) {
        switch(true) {
            case logRight.classList.contains('l1'): 
                logRight.classList.remove('l1'); 
                logRight.classList.add('l5'); 
                break;
            case logRight.classList.contains('l2'): 
                logRight.classList.remove('l2'); 
                logRight.classList.add('l1'); 
                break;
            case logRight.classList.contains('l3'): 
                logRight.classList.remove('l3'); 
                logRight.classList.add('l2'); 
                break;
            case logRight.classList.contains('l4'): 
                logRight.classList.remove('l4'); 
                logRight.classList.add('l3'); 
                break;
            case logRight.classList.contains('l5'): 
                logRight.classList.remove('l5'); 
                logRight.classList.add('l4'); 
                break;
        }
    }

    // movement for cars going left
    function moveCarLeft(carLeft) {
        switch(true) {
            case carLeft.classList.contains('c1'): 
                carLeft.classList.remove('c1'); 
                carLeft.classList.add('c2'); 
                break;
            case carLeft.classList.contains('c2'): 
                carLeft.classList.remove('c2'); 
                carLeft.classList.add('c3'); 
                break;
            case carLeft.classList.contains('c3'): 
                carLeft.classList.remove('c3'); 
                carLeft.classList.add('c1'); 
                break;
        }
    }

    // movement for cars going right
    function moveCarRight(carRight) {
        switch(true) {
            case carRight.classList.contains('c1'): 
                carRight.classList.remove('c1'); 
                carRight.classList.add('c3'); 
                break;
            case carRight.classList.contains('c2'): 
                carRight.classList.remove('c2'); 
                carRight.classList.add('c1'); 
                break;
            case carRight.classList.contains('c3'): 
                carRight.classList.remove('c3'); 
                carRight.classList.add('c2'); 
                break;
        }
    }

    // game over logic
    function lose() {
        // if frog hits car or water
        if (squares[currentIndex].classList.contains('c1') || 
            squares[currentIndex].classList.contains('l4') ||
            squares[currentIndex].classList.contains('l5') ||
            currentTime <= 0) 
            {
            resultDisplay.textContent = "GAME OVER!";
            clearInterval(timerId);
            clearInterval(outcomeTimerId);
            // prevent frog from moving after game over
            squares[currentIndex].classList.remove('frog');
            document.removeEventListener('keyup', moveFrog);
        }
    }

    function win() {
        if (squares[currentIndex].classList.contains('ending-block')) {
            resultDisplay.textContent = "YOU WIN!";
            clearInterval(timerId);
            clearInterval(outcomeTimerId);
            document.removeEventListener('keyup', moveFrog);
        }
    }

    startPauseButton.addEventListener('click', () => {
        if (timerId) {
            // pause
            clearInterval(timerId);
            clearInterval(outcomeTimerId);
            timerId = null;
            outcomeTimerId = null;
            document.removeEventListener('keyup', moveFrog);
        } else {
            // if game is over, reset first
            if (resultDisplay.textContent === "GAME OVER!" || 
                resultDisplay.textContent === "YOU WIN!") {
                resetGame();
            }

            // start timers
            timerId = setInterval(autoMoveElements, 1000);
            outcomeTimerId = setInterval(checkOutcomes, 50);
            document.addEventListener('keyup', moveFrog);
        }
    });

    function resetGame() {
        // clear frog
        squares[currentIndex].classList.remove('frog');

        // reset position and time
        currentIndex = 76; 
        currentTime = 20;
        timeLeftDisplay.textContent = currentTime;
        resultDisplay.textContent = "";

        // put frog back at start
        squares[currentIndex].classList.add('frog');

        // make sure movement is possible again
        document.addEventListener('keyup', moveFrog);
    }
});