import { answers } from "./answers.js";
import { validWords } from "./validWords.js";

//Get elements
const rows = document.querySelectorAll(".row");
const input = document.getElementById("input");
const button = document.getElementById("guessBtn");
const hintButton = document.getElementById("hintBtn");

// ####### TIMER #######

const startingTime = 1;
let time = startingTime * 60;

const countdown = document.getElementById("countdown");

setInterval(updateCountdown, 1000);

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;

    countdown.innerHTML = `${minutes}:${seconds}`;

    time--;
}

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

// Add an event listener to the hint button
hintButton.addEventListener("click", function () {
    // Check if hint has already been used for the current row
    if (!hintUsedRows.includes(currentRowIndex)) {
        // Create an array to store the available hint letters
        const availableHintLetters = [];

        // Loop through the secret word and add unique letters to the availableHintLetters array
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

//When the button is pressed, get the input and make if statements to start playing the game
button.addEventListener("click", function () {
    //Get the input value, make uppercase and split the word to create an array with each letter
    let guess = input.value.toUpperCase().split("");

    // Remove the blue class from the previously selected random tile
    const blueTile = rows[currentRowIndex].querySelector(".blue");
    if (blueTile) {
        blueTile.classList.remove("blue");
    }

    //if the player try more than 6 times, the game is over
    if (chances < 6) {
        //if the players has less than 6 tries, then compare the lenght of the guess word, and make sure its is = to 5
        if (guess.length === 5) {
            //if it is igual to 5, then display the guess on the tiles, clear the input and match the word with the right color
            //Check if the guessed word is a valid word
            if (validWords.includes(guess.join("").toLowerCase())) {
                displayGuess(guess);
                input.value = "";
                matchWord(guess);
            } else {
                alert("This word doesn't exist");
                input.value = "";
            }
        } else {
            //if less than 5 words, then show an alert to the user
            alert("Only 5 letters word");
        }
    } else {
        //try the game again, calling the reset function
        alert("Try again!");
        resetGame();
    }
});

//Create a display guess function that takes the guess input from the player
function displayGuess(guessArray) {
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

//Create a function to match the word with the colors
function matchWord(guessArray) {
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

    //Create a variable to check if all the tiles has the green class
    const isRowGreen = rowTiles.every((tile) =>
        tile.classList.contains("green")
    );
    //if all the letters has the green tiles then the player win
    if (isRowGreen) {
        alert("you win");
        resetGame();
    }

    chances++;
}

//Create a function to take a random word from answers array
function randomWord() {
    return answers[Math.floor(Math.random() * answers.length)];
}

function resetGame() {
    secretWord = randomWord();
    chances = 0;
    currentRowIndex = 0;
    currentLetterIndex = 0;

    rows.forEach((row) => {
        const rowArray = Array.from(row.children);
        rowArray.forEach((tile) => {
            tile.textContent = "";
            tile.classList.remove("green", "yellow");
        });
    });

    hintUsedRows = [];
    displayedHintLetters = [];
}

/*
NOTES:

1- When I reset my game, the next time the color class is starting at row index 1, not 0 

2- Implement a box display instead of alert 

3-Implement a timer

4-Implement the keyboard


*/
