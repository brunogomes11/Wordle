let guesses = require("./guesses");
let answers = require("./answers");

let secretWord = randomWord();

function randomWord() {
    return guesses[Math.floor(Math.random() * guesses.length)];
}

function getUsersInput() {
    let input = document.getElementById("guess-input");
    let guess = input.value.toUpperCase();

    input.value = " ";
}

// let letterContainers = document.querySelectorAll(".letter-container");

/*
First I need to get the users input and validade 


*/
