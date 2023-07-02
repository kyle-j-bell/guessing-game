//Imports Node's readline module for handling and interpreting user input.
const readline = require('node:readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

//Globally declares variables for the answer, secretNumber, and the number of attempts, numAttempts, for later use.
let secretNumber;
let numAttempts;

//Generates a random number between min and max.
function randomInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Asks player for a minimum number and a maximum number to create a range of possible answers, and also asks for a number of attempts to play the game.
function askRange() {
    rl.question("Enter a minimum number: ", (min) => {
        rl.question("Enter a maximum number: ", (max) => {
            rl.question("Enter a number of attempts: ", (attempts) => {
                console.log(`I'm thinking of a number between ${min} and ${max}...`);
                //Calls randomInRange to generate a random number between min and max, which will be the correct answer for the game.
                secretNumber = randomInRange(Number(min), Number(max));
                //Number of attempts player has to guess the answer.
                numAttempts = Number(attempts);
                //Calls askGuess to begin player guessing round.
                askGuess();
            })
        })
    })
}

function askGuess() {
    rl.question("Enter your guess: ", (answer) => {
        //Assigns input to playerGuess and calls checkGuess to check if it is correct.
        const playerGuess = checkGuess(Number(answer));
        //Ends the game if the player guesses incorrectly and has no more attempts.
        if (playerGuess === false && numAttempts === 0) {
            console.log("You are out of attempts!");
            console.log("You lose!");
            rl.close();
        }
        //Calls askGuess again if the player guesses incorrectly and still has attempts.
        if (playerGuess === false) {
            numAttempts--;
            console.log("Try again.");
            askGuess();
        }
        else {
        //Ends the game if playerGuess is equal to secretNumber, thus winning the game.
            console.log("You win!")
            rl.close();
        }
    })
}

//Checks whether playerGuess is more than, less than, or equal to secretNumber, and informs the player accordingly.
function checkGuess(num) {
    if (num > secretNumber) {
        console.log("Too high.");
    }
    if (num < secretNumber) {
        console.log("Too low.");
    }
    if (num === secretNumber) {
        console.log("Correct!");
    }
    return num === secretNumber;
}

//Calls askRange to start the game.
askRange();
