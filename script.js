"use strict";
//selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1"); //don't write # or .
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn-new");
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");

let scores, currentScore, activePlayer, playing;

const newgame = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");

  player0El.classList.remove("player-winner");
  player1El.classList.remove("player-winner");

  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

//game starting conditions
newgame();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer == 1 ? 0 : 1;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1 generating random number bet 1-6
    const dice = Math.trunc(Math.random() * 6 + 1);

    //display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`; //dynamically loading image

    //check for rolled 1
    if (dice !== 1) {
      //add dice value to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //   switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1 add currentscore to active player's total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2 check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player-winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //3 switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", newgame);
