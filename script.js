"use strict";
// Setlecting elements
var player0El = document.querySelector(".player--0");
var player1El = document.querySelector(".player--1");
var score0El = document.querySelector("#score--0");
var score1El = document.querySelector("#score--1");
var currentScore0 = document.querySelector("#current--0");
var currentScore1 = document.querySelector("#current--1");
var diceEl = document.querySelector(".dice");
var btnNewGame = document.querySelector(".btn--new");
var btnRollDice = document.querySelector(".btn--roll");
var btnHoldScore = document.querySelector(".btn--hold");
// Starting conditions
var scores;
var currentScore;
var activePlayer;
var playing;
var init = function () {
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
var switchPlayer = function () {
    // Reset current score to 0
    document.querySelector("#current--".concat(activePlayer)).textContent = "0";
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
        var diceRandom = Math.floor(Math.random() * 6) + 1;
        // 2. Display dice
        diceEl.classList.remove("hidden");
        diceEl.src = "dice-".concat(diceRandom, ".png");
        // 3. Check for rolled 1
        if (diceRandom !== 1) {
            // Add dice to current score
            currentScore += diceRandom;
            document.querySelector("#current--".concat(activePlayer)).textContent =
                String(currentScore);
        }
        else {
            switchPlayer();
        }
    }
});
// Hold score button function
btnHoldScore.addEventListener("click", function () {
    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.querySelector("#score--".concat(activePlayer)).textContent = String(scores[activePlayer]);
        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 20) {
            // 3. Finish the game
            playing = false;
            diceEl.classList.add("hidden");
            var activePlayerEl = document.querySelector(".player--".concat(activePlayer));
            activePlayerEl.classList.add("player--winner");
            activePlayerEl.classList.remove("player--active");
        }
        else {
            // 4. Switch to next player
            switchPlayer();
        }
    }
});
btnNewGame.addEventListener("click", init);
