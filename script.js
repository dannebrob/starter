'use strict';

// 1. variables for all moving parts
let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');
const scoreP0El = document.querySelector('#score--0');
const scoreP1El = document.querySelector('#score--1');
const currentPointsP0El = document.querySelector('#current--0');
const currentPointsP1El = document.querySelector('#current--1');
const dice = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let activePlayer, scores, currentScore, playing;

const switchPlayer = function () {
  //swish player
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// 2.Reset game
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreP0El.textContent = 0;
  scoreP1El.textContent = 0;
  currentPointsP0El.textContent = 0;
  currentPointsP1El.textContent = 0;

  dice.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
//Set starting conditions
init();

// 3. Random dice roll *6

//4. Roll Dice event
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Dice roll
    let diceRoll = Math.floor(Math.random() * 6 + 1);

    //Display dice
    dice.classList.remove('hidden');
    dice.src = `dice-${diceRoll}.png`;

    //Check if dice is > 1
    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      currentScore = 0;
      //Switch player
      switchPlayer();
    }
  }
});

//Hold current scores
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      //avsluta
      playing = false;
      document.querySelector('.player--active').classList.add('player--winner');
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      currentScore = 0;
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
