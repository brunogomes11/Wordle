# Tick Tock Wordle

## Wordle Game adaptation created by Bruno Gomes

Welcome to our captivating web-based game where players embark on an exciting journey of guessing a secret 5-letter word. Prepare yourself for a thrilling experience as you immerse in our interactive interface, providing a seamless gameplay environment.

In this intriguing game, you can crack the hidden word by strategically making guesses. Each guess will be evaluated, and the coloured tiles accompanying each letter will provide valuable feedback on the accuracy of your guess. Pay close attention to the colours, which are crucial to unravelling the mystery.

Feeling stuck? Don't worry! We've got you covered with a handy hint button. Whenever you face a challenging hurdle, simply click the hint button to receive a clue that will nudge you in the right direction. Keep your wits about you as you apply logic and deduction to decipher the sequence within the given time limit.

Start playing now and see if you can unveil the secret word that awaits your discovery! :smiley:

## Technologies Used

1. HTML <img src="img/html-5.png" width="30" height="30">
2. CSS <img src="img/css-3.png" width="30" height="30">
3. Javascript <img src="img/js.png" width="30" height="30">

## How To Play

1. **Launch the game by clicking** [here](https://brunogomes11.github.io/Wordle/)
2. **Familiarize yourself with the interface**: Take a moment to explore the game interface and read the instructions
3. **Start guessing**: Click on the input box and start typing a 5 letters word
4. **Receive feedback**: After making a guess, observe the coloured tiles accompanying each letter. The colour of the tiles provides feedback on the correctness of your guess. A green tile indicates a correct letter in the proper position, and a yellow tile shows a correct letter in the wrong place.
5. **Utilize the hint button**: If you find yourself struggling to guess the word, click on the hint button for assistance, and a random letter in a random position will appear to help you narrow down the possibilities.
6. **Solve the word**: Continue guessing and receiving feedback until you successfully guessed the entire secret word or until you run out of guesses.
7. **Play again**: After completing a game or the time runs out, you can play again and challenge yourself to improve your performance and solve the word more efficiently.

## Approach Taken

1. **Design the User Interface**: The first step was to create a grid of 6 rows with 5 tiles using **HTML** to represent the letters guessed by the player, along with the input and buttons for making guesses
2. **Implementing the Game Logic**: The game logic was implement using **Javascript**. The code included functionalities such as:
   * **Random Word Generation**: The game generates a random 5-letter word from a predefined list of words. This is done using the `randomWord()` function, which selects a random index from the word list and returns the corresponding word.
   * **Handles player's guesses and performs the necessary validations, comparisons, and feedback**: The JavaScript handles the event when the guess button is clicked in the game.
   It first retrieves the input value. If the player has made exactly 5 previous attempts (chances equal to 5), the code checks if the current guess matches the secret word. If they match, the `matchWord()` function compares the guess with the secret word and provides the appropriate colour feedback. The `displayGuess()` function also displays the current guess on the tiles. If the guess is incorrect, it shows a "YOU LOSE!!" message.
   If the player has less than 5 attempts, the code validates the length of the guess. If it is exactly 5 letters, the guess is considered valid. It displays the guess on the tiles and compares it with the secret word to provide colour feedback. Suppose the guess is not a proper word (not present in the `validWords` array) or has an invalid length. The code displays an appropriate error message using a modal in that case.
   Overall, this part of the code handles the player's guesses, validates them, and provides feedback to progress the game accordingly.
   * **The `displayGuess()` function** displays the player's guess on the game tiles. It takes an array of letters as input.
   The function loops through each letter in the guess array and assigns it to the corresponding tile on the game board. It applies a transition effect to create a visually appealing display. The timing of the transitions is staggered, with each letter displayed after a certain delay.
   After displaying all the letters, the function resets the current letter index. It moves to the next row of tiles for subsequent guesses. It also removes the transition effect from the tiles after a specified duration.
   In summary, the `displayGuess()` function handles the visual rendering of the player's guess on the game board, ensuring a smooth and animated display of the letters.
   * **Feedback and Tile Colors**: Based on the comparison, the `matchWord()` function assigns a colour to each letter tile to provide feedback to the player. If a letter in the guess matches the corresponding letter in the word and is in the correct position, the tile colour is set to green. If the letter is in the word but in the wrong place, the tile colour is set to yellow. The tile colour remains the default if the letter is not in the word.
   * **Hint Button**: The game provides a hint button that the player can click to receive a hint. The code checks if the hint has not been used for the current row selects a random available hint letter, assigns it to a random tile, and marks the current row as a used hint row.
   * **Timer Functionality**: The game incorporates a countdown timer to limit the time for the player to make guesses. The countdown timer was created by [https://css-tricks.com/](https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/) 
   * **Error Handling**: The code includes error handling to handle incorrect inputs or edge cases. This ensures the game functions properly even if the player makes invalid guesses or encounters unexpected situations.
3. **CSS Styling**: The CSS code includes styles for various elements such as buttons, tiles, countdown timer, and dialog boxes that display messages, instructions, and the play again button. It defines classes like "green", "yellow", and "blue" to apply different colours to the tiles based on the correctness of the guessed letters and apply animations and transitions.
    - Colours used from [https://coolors.co/](https://coolors.co/306b34-222e50-573112-bfd7ea-ff5a5f) :
        - ![#573112](https://placehold.co/15x15/573112/573112.png) `#573112`
        - ![#306B34](https://placehold.co/15x15/306B34/306B34.png) `#306B34`
        - ![#222E50](https://placehold.co/15x15/222E50/222E50.png) `#222E50`
        - ![#BFD7EA](https://placehold.co/15x15/BFD7EA/BFD7EA.png) `#BFD7EA`
        - ![#FF5A5F](https://placehold.co/15x15/FF5A5F/FF5A5F.png) `#FF5A5F`
        - ![#C5C51D](https://placehold.co/15x15/C5C51D/C5C51D.png) `#C5C51D`
    - Font Family from [FontSpace](https://www.fontspace.com/):
        - [Game Played](https://www.fontspace.com/game-played-font-f31380)
        - [Nintendo](https://www.fontspace.com/snes-font-f26537)

## Unsolved Problems

1. The player can guess the same word as many times as he wants, which I found to be an issue. Still, in the end, it's the user's problem, and in the original [Wordle game](https://www.nytimes.com/games/wordle/index.html), you can guess the same word as many times as you want.
2. The hint button can show a letter the player already knows, so it will fail to help a few times:grimacing:. I tried implementing that functionality, but getting hold of the exact letter on a tile was an issue.
3. Continue with the problem above; I found getting hold of a specific tile element on a row challenging.
   I got confused by how the ` const  rows  =  document.querySelectorAll(".row");` method returns a collection of the `NodeList` object, which is an array-like object which it does not have the array methods. Still, we can access individual elements using the bracket notation `nodeList[index]`, and then we can convert it to an array with `Array.from()` method. A [reddit](https://www.reddit.com/r/learnjavascript/comments/s67qq9/why_does_queryselectorall_return_a_nodelist/) question help me get through this.
4. **Improve variables and functions names**
5. **CSS**: The dialog box is hidden by default, and you have to call the `show()` or `showModal()` function to make it visible, and when I was styling, I set the `display: flex`, so the dialog box was getting visible at all times. I changed the Javascript to `dialog.style.display  =  "flex"` to make it work; then back to `"none"`, but I think I could just create a div inside the dialog and manipulate the div instead of the dialog itself.

## Future Improviments

1. Implement a virtual keyboard, and make the keys have the same classes as the tile so the user has better feedback.
2. Improve the win counter for keeping track of multiple game rounds
3. Create levels to make it easier or more challenging by manipulating the countdown timer.
4. Store the data locally so the player can continue to play even if the page is closed
5. Implement sounds for each interaction
