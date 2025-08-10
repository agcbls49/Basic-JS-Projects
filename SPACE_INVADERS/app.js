document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let currentShooterIndex = 202;

    let width = 15;
    let direction = 1;
    let invadersId;
    let goingRight = true;

    const resultDisplay = document.querySelector('.results');
    let aliensRemoved = [];
    let results = 0;

    for(let i  = 0; i < 225; i++) {
        const square = document.createElement('div');
        grid.appendChild(square);
    }

    const squares = Array.from(document.querySelectorAll('.grid div'));

    const alienInvaders = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39
    ]

    function draw() {
        for (let i = 0; i < alienInvaders.length; i++) {
            if (!aliensRemoved.includes(i) && alienInvaders[i] < squares.length) {
                squares[alienInvaders[i]].classList.add('invader');
            }
        }
    }

    function remove() {
        for (let i = 0; i < alienInvaders.length; i++) {
            if (alienInvaders[i] < squares.length) {
                squares[alienInvaders[i]].classList.remove('invader');
            }
        }
    }

    // show aliens
    draw();

    // show the shooter
    squares[currentShooterIndex].classList.add('shooter');

    function moveShooter(e) {
        squares[currentShooterIndex].classList.remove('shooter');

        const shooterColumn = currentShooterIndex % width;
        const invaderInColumn = alienInvaders.some(
            (pos, i) => !aliensRemoved.includes(i) && pos % width === shooterColumn && pos >= currentShooterIndex - width
        );

        switch(e.key) {
            case 'ArrowLeft':
                if(currentShooterIndex % width !== 0 && !invaderInColumn) {
                    currentShooterIndex -= 1;
                }
                break;
            case 'ArrowRight':
                if(currentShooterIndex % width < width - 1 && !invaderInColumn) {
                    currentShooterIndex += 1;
                }
                break;
        }

        squares[currentShooterIndex].classList.add('shooter');
    }


    function moveInvaders() {
        const leftEdge = alienInvaders[0] % width === 0;
        const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
        remove();

        // when left and right edges are met then change the direction of the invaders
        if(rightEdge && goingRight) {
            for(let i = 0; i < alienInvaders.length; i++) {
                alienInvaders[i] += width - 1;
                direction = -1;
                goingRight = false;
            }
        }
        if(leftEdge && !goingRight) {
            for(let i = 0; i < alienInvaders.length; i++) {
                alienInvaders[i] += width - 1;
                direction = + 1;
                goingRight = true;
            }
        }

        for(let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += direction;
        }

        draw();

        // invader and shooter collision logic
        if(squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
            resultDisplay.innerHTML = "GAME OVER!";
            clearInterval(invadersId);
        }
        // collision for when the invaders hit the bottom of the grid
        for(let i = 0; i < alienInvaders.length; i++) {
            if(alienInvaders[i] >= squares.length - width) {
                resultDisplay.innerHTML = "GAME OVER!";
                clearInterval(invadersId);
            }
        }

        // check for a win
        if (aliensRemoved.length === alienInvaders.length) {
            resultDisplay.innerHTML = "YOU WIN!";
            clearInterval(invadersId);
        }
    }

    function shoot(e) {
        let laserId; 
        let currentLaserIndex = currentShooterIndex;

        function moveLaser() {     
    squares[currentLaserIndex].classList.remove('laser');
    currentLaserIndex -= width;

    // if the laser goes off the top of the grid, stop it
    if (currentLaserIndex < 0) {
        clearInterval(laserId);
        return;
    }

    squares[currentLaserIndex].classList.add('laser');

        // collision check
        if (squares[currentLaserIndex].classList.contains('invader')) {
            squares[currentLaserIndex].classList.remove('laser');
            squares[currentLaserIndex].classList.remove('invader');
            squares[currentLaserIndex].classList.add('boom');

            setTimeout(() => {
                squares[currentLaserIndex].classList.remove('boom');
            }, 300);
            clearInterval(laserId);

                const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
                if (alienRemoved !== -1) {
                    aliensRemoved.push(alienRemoved);
                }

                results++;
                resultDisplay.innerHTML = results;
            }
        }

        switch(e.key) {
            case 'ArrowUp': laserId = setInterval(moveLaser, 100); break;
        }
    }

    document.addEventListener('keyup', shoot);
    invadersId = setInterval(moveInvaders, 800);
    document.addEventListener('keydown', moveShooter);
});