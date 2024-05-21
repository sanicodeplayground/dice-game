"use strict";

// Setlecting elements
const player0El = document.querySelector(".player--0")!;
const player1El = document.querySelector(".player--1")!;
const score0El = document.querySelector("#score--0")!;
const score1El = document.querySelector("#score--1")!;
const currentScore0 = document.querySelector("#current--0")!;
const currentScore1 = document.querySelector("#current--1")!;
const diceEl = document.querySelector(".dice") as HTMLImageElement;
const btnNewGame = document.querySelector(".btn--new")!;
const btnRollDice = document.querySelector(".btn--roll")!;
const btnHoldScore = document.querySelector(".btn--hold")!;

// Starting conditions
let scores: [number, number];
let currentScore: number;
let activePlayer: number;
let playing: boolean;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Reset elements to 0
  score0El.textContent = "0";
  score1El.textContent = "0";
  currentScore0.textContent = "0";
  currentScore1.textContent = "0";
  diceEl.classList.add("hidden");

  // Remove winner class and active player class
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  // Reset current score to 0
  document.querySelector(`#current--${activePlayer}`)!.textContent = "0";
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  // Toggle active player class
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling dice functionality
btnRollDice.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a random dice roll
    const diceRandom = Math.floor(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${diceRandom}.png`;

    // 3. Check for rolled 1
    if (diceRandom !== 1) {
      // Add dice to current score
      currentScore += diceRandom;
      document.querySelector(`#current--${activePlayer}`)!.textContent =
        String(currentScore);
    } else {
      switchPlayer();
    }
  }
});

// Hold score button function
btnHoldScore.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`)!.textContent = String(
      scores[activePlayer]
    );

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
      // 3. Finish the game
      playing = false;
      diceEl.classList.add("hidden");
      const activePlayerEl = document.querySelector(
        `.player--${activePlayer}`
      )!;
      activePlayerEl.classList.add("player--winner");
      activePlayerEl.classList.remove("player--active");
    } else {
      // 4. Switch to next player
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener("click", init);
