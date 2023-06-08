import { answers } from "./answers.js";
import { validWords } from "./validWords.js";

// ######## ELEMENTS #########
const rows = document.querySelectorAll(".row");
const input = document.getElementById("input");
const guessButton = document.getElementById("guessBtn");
const hintButton = document.getElementById("hintBtn");

//Create a variable to start the chances at 0, and then build it up as the players keeps trying different words
let chances = 0;
//Create a variable to keep track of the row
let currentRowIndex = 0;
//Create a variable to keep track of a letter
let currentLetterIndex = 0;

// Assign a variable to generate a random word
let secretWord = randomWord();
console.log(secretWord);

//Create an array to track one hint per row
let hintUsedRows = [];

// Add an array to track the letters that have already been displayed as hints
let displayedHintLetters = [];

// ######## HINT BUTTON #########
hintButton.addEventListener("click", function () {
    // Check if hint has already been used for the current row
    if (!hintUsedRows.includes(currentRowIndex)) {
        // Create an array to store the available hint letters
        const availableHintLetters = [];

        //Loop through the secret word and add unique letters to the availableHintLetters array
        for (let i = 0; i < secretWord.length; i++) {
            if (!displayedHintLetters.includes(secretWord[i])) {
                availableHintLetters.push(secretWord[i]);
            }
        }

        // Check if there are any available hint letters
        if (availableHintLetters.length > 0) {
            // Select a random available hint letter
            const randomIndex = Math.floor(
                Math.random() * availableHintLetters.length
            );
            const hintLetter = availableHintLetters[randomIndex];

            // Create a variable to select a random tile from the row
            const randomTileIndex = Math.floor(Math.random() * 5);

            // Insert the hint letter to a random tile and add blue class to it
            const randomTile = rows[currentRowIndex].children[randomTileIndex];
            randomTile.textContent = hintLetter;
            randomTile.classList.add("blue");

            // Add the current row to the array of hint used rows
            hintUsedRows.push(currentRowIndex);
            // Add the displayed hint letter to the array of displayed hint letters
            displayedHintLetters.push(hintLetter);
        }
    }
});

// ######## GUESS BUTTON #########
guessButton.addEventListener("click", function () {
    //When the button is pressed, get the input and make if statements to start playing the game
    //Get the input value, make uppercase and split the word to create an array with each letter
    let guess = input.value.toUpperCase().split("");

    //if the player try more than 6 times, the game is over
    if (chances < 6) {
        //if the players has less than 6 tries, then compare the lenght of the guess word, and make sure its is = to 5
        if (guess.length === 5) {
            //if it is igual to 5, then display the guess on the tiles, clear the input and match the word with the right color
            //Check if the guessed word is a valid word
            if (validWords.includes(guess.join("").toLowerCase())) {
                // Remove the blue class from the previously selected random tile
                const blueTile = rows[currentRowIndex].querySelector(".blue");
                if (blueTile) {
                    blueTile.classList.remove("blue");
                }
                displayGuess(guess);
                input.value = "";
                matchWord(guess);
            } else {
                modal("This word doesn't exist");
                input.value = "";
            }
        } else {
            //if less than 5 words, then show an alert to the user
            modal("Only 5 letters word");
        }
    } else {
        //try the game again, calling the reset function
        modal("Try again!");
        resetGame();
    }
});

// ######## DISPLAY GUESS ON TILES #########
function displayGuess(guessArray) {
    //Create a display guess function that takes the guess input from the player
    //Loop through the guess word, and for each letter, assign it to the tile, increment the tile index to jump to the next one each time of the loop
    guessArray.forEach((letter) => {
        //rows element, incrementing every time the loop runs, passing the children element (tile) and increment as well, and asign the letter
        rows[currentRowIndex].children[currentLetterIndex].textContent = letter;
        currentLetterIndex++;
    });
    //For the next guess, always start at index 0 and jump to the next row
    currentLetterIndex = 0;
    currentRowIndex++;
}

// ######## MATCH WORDS WITH COLORS #########
function matchWord(guessArray) {
    //Create a function to match the word with the colors
    //Create a variable to pass the secret word, make it upper case and split into an array
    const answerArray = secretWord.toUpperCase().split("");

    //Create a variable to store an array of the rows, passing the chances, to make sure where the row is and assing to children element (tile)
    const rowTiles = Array.from(rows[chances].children);

    //Loop through the guesses word array
    answerArray.forEach((answerLetter, i) => {
        //create a varialbe to assing the guess index
        const guessLetter = guessArray[i];
        //Create a variable to assign the right tile
        const tileElement = rowTiles[i];

        //Compare the secret word letters with the guessed letters
        if (answerLetter === guessLetter) {
            //If TRUE then assing the green class to the tile element
            tileElement.classList.add("green");
        } else if (answerArray.includes(guessLetter)) {
            //If the letter includes on somewhere on the secret word but its not on the rigth position, then assign the yellow class to the tile element
            tileElement.classList.add("yellow");
        }
    });

    chances++;

    //Create a variable to check if all the tiles has the green class
    const isRowGreen = rowTiles.every((tile) =>
        tile.classList.contains("green")
    );
    //if all the letters has the green tiles then the player win

    if (isRowGreen) {
        modal("YOU WIN!!!");
        resetGame();
    }
}

//DISPLAY THE DIALOG INSTRUCTION WHEN THE GAME IS RUN AND CREATE A BUTTON TO OPEN INSTRUCTIONS AT ANYTIME
const instructionButton = document.getElementById("instruction-button");

instructionButton.addEventListener("click", function () {
    const dialogInstructions = document.getElementById("instructions");
    const iconButton = document.getElementById("icon-close");

    dialogInstructions.showModal();
    iconButton.addEventListener("click", function () {
        dialogInstructions.close();
    });
});

// ######## DIALOG BOX #########
function modal(message) {
    //Create elements
    const dialog = document.createElement("dialog");
    const div = document.createElement("div");
    const closeBtn = document.createElement("button");

    //Give a message and a button to close
    div.textContent = message;
    closeBtn.textContent = "Close";

    //Add classes to elements for styling
    dialog.classList.add("dialog");
    closeBtn.classList.add("close-button");
    div.classList.add("dialog-text");

    //Append div and button to dialog and dialog to the document
    dialog.append(div);
    dialog.append(closeBtn);
    document.body.appendChild(dialog);

    //Display the dialog when function is called
    dialog.showModal();

    //Close the dialog box when the button close is clicked
    closeBtn.addEventListener("click", function () {
        dialog.close();
    });
}

// ######## GET RANDOM WORD FROM ARRAY #########
function randomWord() {
    return answers[Math.floor(Math.random() * answers.length)];
}

// ######## CREATE PLAY AGAIN BUTTON AFTER TIMER  #########
const dialogPlayAgain = document.getElementById("play-again");
function displayPlayAgainButton() {
    const playAgainButton = document.getElementById("play-again-button");
    playAgainButton.addEventListener("click", resetGame);

    dialogPlayAgain.showModal();
}

//######## DISABLE USER INPUT  #########
function disableInput() {
    // Disable any input elements or buttons to prevent further interaction
    input.style.display = "none";
    guessButton.style.display = "none";
    hintButton.style.display = "none";
}

//######## ANIMATED COUNTDOWN TIMER  #########
// Code from: https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
    info: {
        color: "green",
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD,
    },
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD,
    },
};

const TIME_LIMIT = 60;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
      timeLeft
  )}</span>
</div>
`;

startTimer();

function onTimesUp() {
    clearInterval(timerInterval);
}

function startTimer() {
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById("base-timer-label").innerHTML =
            formatTime(timeLeft);
        setCircleDasharray();
        setRemainingPathColor(timeLeft);

        if (timeLeft === 0) {
            onTimesUp();

            clearInterval(timerInterval);
            disableInput();
            displayPlayAgainButton();
        }
    }, 1000);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(warning.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(info.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(warning.color);
    }
}

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
    const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
}

//https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/

// ######## RESTART THE TIMER #########

function resetTimer() {
    clearInterval(timerInterval);
    timePassed = 0;
    timeLeft = TIME_LIMIT;
    remainingPathColor = COLOR_CODES.info.color;

    document.getElementById("base-timer-label").innerHTML =
        formatTime(timeLeft);
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    // Remove all color classes and add the info color class to reset the color
    const pathRemaining = document.getElementById("base-timer-path-remaining");
    pathRemaining.classList.remove(COLOR_CODES.warning.color);
    pathRemaining.classList.remove(COLOR_CODES.alert.color);
    pathRemaining.classList.add(COLOR_CODES.info.color);

    startTimer(); // Restart the timer
}

// ######## RESTART THE GAME #########
function resetGame() {
    dialogPlayAgain.close();
    secretWord = randomWord();
    chances = 0;
    currentRowIndex = 0;
    currentLetterIndex = 0;

    rows.forEach((row) => {
        const rowArray = Array.from(row.children);
        rowArray.forEach((tile) => {
            tile.textContent = "";
            tile.classList.remove("green", "yellow", "blue");
        });
    });

    hintUsedRows = [];
    displayedHintLetters = [];

    resetTimer();

    const playAgainButton = document.querySelector(".play-again");
    if (playAgainButton) {
        playAgainButton.remove();
    }

    input.style.display = "block";
    guessButton.style.display = "block";
    hintButton.style.display = "block";
}

/*
NOTES:

2-Implement the keyboard

4- if the letter is green or yellow, then do not show on Hint

6- When I try 6 times and the word doenst match the secret world, show try again message

*/
