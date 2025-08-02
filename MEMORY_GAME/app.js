// wait for dom content to load to prevent alert card match from triggering and giving a score immediately
document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        // objects for the cards or images
        {
        name: 'fries',
        img: 'images/fries.png'
        },
        {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
        },
        {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
        },
        {
        name: 'pizza',
        img: 'images/pizza.png'
        },
        {
        name: 'milkshake',
        img: 'images/milkshake.png'
        },
        {
        name: 'hotdog',
        img: 'images/hotdog.png'
        },
        {
        name: 'fries',
        img: 'images/fries.png'
        },
        {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
        },
        {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
        },
        {
        name: 'pizza',
        img: 'images/pizza.png'
        },
        {
        name: 'milkshake',
        img: 'images/milkshake.png'
        },
        {
        name: 'hotdog',
        img: 'images/hotdog.png'
        }
    ];

    /*
    Sort - This method sorts the elements of an array in place and returns the sorted array. 
    When provided with a comparison function, it uses the return value of that function to determine the order of elements.

    Random - This function returns a floating-point, pseudo-random number between 0 (inclusive) and 1 (exclusive).

    When Math.random() returns a value less than 0.5 (e.g., 0.2), 0.5 - 0.2 results in a positive value (0.3). 
    This suggests that the first element (a) should come after the second element (b) in the sort order.
    
    When Math.random() returns a value greater than 0.5 (e.g., 0.8), 0.5 - 0.8 results in a negative value (-0.3).
    This suggests that the first element (a) should come before the second element (b).

    Since Math.random() produces values randomly distributed between 0 and 1, the expression 0.5 - Math.random() will yield a positive or negative result with approximately equal probability. 
    This randomness in the comparison function effectively shuffles the array.
    */
    cardArray.sort(() => 0.5 - Math.random());

    const gridDisplay = document.querySelector('#grid');
    const resultDisplay = document.querySelector('#result')
    let cardsChosen = [];
    let cardsChosenIds = [];
    let cardsWon = [];

    function createBoard() {
        for(let i = 0; i < cardArray.length; i++){
            const card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            // call function when card is clicked
            card.addEventListener('click', flipCard);
            gridDisplay.append(card);
        }
    };

    createBoard();

    function checkMatch() {
        const cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenIds[0];
        const optionTwoId = cardsChosenIds[1];

        if(optionOneId == optionTwoId){
            alert("You have clicked the same card!");
            cards[optionOneId].setAttribute('src', 'images/blank.png');
            cards[optionTwoId].setAttribute('src', 'images/blank.png');
            // prevents adding a score when the same card is clicked twice
            cardsChosen = [];
            cardsChosenIds = [];
            return;
        }

        // if two cards match then assign it to white png
        if(cardsChosen[0] == cardsChosen[1]){
            alert('You found a Match!');
            cards[optionOneId].setAttribute('src', 'images/white.png');
            cards[optionTwoId].setAttribute('src', 'images/white.png');
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        }
        else {
            cards[optionOneId].setAttribute('src', 'images/blank.png');
            cards[optionTwoId].setAttribute('src', 'images/blank.png');
            alert('Sorry Try Again!');
        }
        // show the score
        resultDisplay.textContent = cardsWon.length;

        // reset the matched cards
        cardsChosen = [];
        cardsChosenIds = [];

        if(cardsWon.length == cardArray.length/2){
            resultDisplay.textContent = 'Congratulations! You found them all!';
        }
    };

    function flipCard() {
        const cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        this.setAttribute('src', cardArray[cardId].img);
        cardsChosenIds.push(cardId);
        if (cardsChosen.length === 2){
            // 500 ms delay for the card
            setTimeout(checkMatch, 500);
        }
    };
});