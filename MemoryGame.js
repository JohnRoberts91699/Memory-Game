const gameContainer = document.getElementById('game');
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;


const colors = [
    'red',
    'blue',
    'green',
    'orange',
    'purple',
    'red',
    'blue',
    'green',
    'orange',
    'purple'
];

function shuffle(array) {
    let counter = array.length;
    while(counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

let shuffledColors = shuffle(colors);


function newDivsForColors(colorArray) {
    for(let color of colorArray) {
        const newDiv = document.createElement('div');
        newDiv.classList.add(color);
        newDiv.addEventListener('click', cardClick);
        gameContainer.append(newDiv);
    }
}

function cardClick(e) {
    if(noClicking) return;
    if(e.target.classList.contains('flipped')) return;

    const selectedCard = e.target;
    selectedCard.style.backgroundColor = selectedCard.classList[0];

    if(!card1 || !card2) {
        selectedCard.classList.add('flipped');
        card1 = card1 || selectedCard;
        card2 = selectedCard === card1 ? null : selectedCard;
    }

    if(card1 && card2) {
        noClicking = true;
        let gif1 = card1.className;
        let gif2 = card2.className;

        if(gif1 === gif2) {
            cardsFlipped += 2;
            card1.removeEventListener('click', cardClick);
            card2.removeEventListener('click', cardClick);
            card1 = null;
            card2 = null;
            noClicking = false;
        } else {
            setTimeout(function() {
                card1.style.backgroundColor = '';
                card2.style.backgroundColor = '';
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1 = null;
                card2 = null;
                noClicking = false;
            }, 1000);
        }
    }
    if(cardsFlipped === colors.length) alert('game over!')
}
newDivsForColors(shuffledColors);