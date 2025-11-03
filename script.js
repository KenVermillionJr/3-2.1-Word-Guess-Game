// Starter Word Guess Game — Keyboard Input Ready

// begin virtual keyboard

const Keyboard = window.SimpleKeyboard.default;
const keyNavigation = window.SimpleKeyboardKeyNavigation.default;

const keyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),
  useMouseEvents: true,
  enableKeyNavigation: true,
  modules: [
    keyNavigation
  ],
  onModulesLoaded: keyboard => {
    /**
     * Optional: If keyboard.modules is not available below.
     * You can call module methods here
     * e.g: keyboard.modules.keyNavigation.up();
     * etc.
     */
  } /* add custom layout qwerty lowercase */
  , layout: {
    default: [
      "q w e r t y u i o p",
      "a s d f g h j k l",
      "z x c v b n m"]
  }
});

function onChange(input) {
  document.querySelector(".input").value = input;
  console.log("Input changed", input);
}

function onKeyPress(button) {
  console.log("Button pressed", button);
  return button;
}

// end virtual keyboard

// Word bank
const words = ["javascript", "array", "loop", "json", "linux"];

// Randomly select one word from the list
let chosenWord = words[Math.floor(Math.random() * words.length)];

// Track guessed letters and remaining attempts
let guessedLetters = [];
let attemptsLeft = 10;

/* audio sources */
const correct = document.querySelector('#letterCorrect')
// correct.play()
const wrong = document.querySelector('#letterWrong')
// wrong.play()
const youWon = document.querySelector('#youWon')
// youWon.play()
const lost = document.querySelector('#youLost')
// lost.play();

// Log the chosen word for debugging
console.log("Chosen word:", chosenWord);

// DOM Elements
const maskedWordElm = document.getElementById("maskedWord");
const attemptsElm = document.getElementById("attempts");
const guessedLettersElm = document.getElementById("guessedLetters");
const message = document.getElementById("message");

// 🎮 Function students will build next
function startGame(letter) {

  console.log(`You pressed: ${letter}`);

  if (guessedLetters.includes(letter)) {
    console.log(`You already guessed: ${letter}`);
    return;
  }

  // record guesses
  guessedLetters.push(letter);
  console.log(`Guessed so far: ${guessedLetters.join(',')}`);

  if (chosenWord.includes(letter)) {
    console.log(`Letter ${letter} is correct`);
    /* audio */
    correct.play();
  } else {
    attemptsLeft--;
    console.log(`Letter ${letter} is not found in our word.`);
    /* audio */
    wrong.play();
  }
  updateDisplay();
  checkWin();
} // end start -- main function

// Choose a New Word
function chooseNewWord() {
  chosenWord = words[Math.floor(Math.random() * words.length)];
  //resets
  guessedLetters = [];
  attemptsLeft = 10;
  // update display
  updateDisplay();
}

// Reveal guessed chars leaving unguessed masked "_"
function updateDisplay() {
  let masked = '';
  for (let char of chosenWord) {
    masked += guessedLetters.includes(char) ? char : '_';
    masked += ' ';
  } // end for .. of

  maskedWordElm.textContent = masked.trim();
  attemptsElm.textContent = attemptsLeft;
  guessedLettersElm.textContent = guessedLetters.join(', ') || 'not yet';

  // TEST
  console.log(`Updating guessed letters: ${guessedLetters.join(', ')}`)

} // end function

function checkWin() {
  const won = chosenWord.split('').every(letter => guessedLetters.includes(letter));
  if (won) {
    setTimeout(() => {
      alert(`You have won! The word was ${chosenWord}.`);
      /* audio -- you Won! */
      youWon.play();
      chooseNewWord();
    }, 2000);
    return;
  }
  if (attemptsLeft <= 0) {
    setTimeout(() => {
      alert(`Game Over! Your word was ${chosenWord}.`);
      /* audio -- you Lost! */
      lost.play();
      chooseNewWord();
    }, 2000);
  }
}

// ⌨️ Listen for keyboard input when the page loads
// window.addEventListener("keydown", function (event) {
//   let key = event.key.toLowerCase();

//   // Only process alphabetic letters (ignore Shift, Enter, etc.)
//   if (key.match(/^[a-z]$/)) {
//     startGame(key);
//   } else {
//     console.log("Please press a valid letter (A–Z).");
//   }
// });

// ⌨️ Listen for keyboard input when the page loads
window.addEventListener("keydown", function (event) {
  let key = event.key.toLowerCase();
  // Only process alphabetic letters (ignore Shift, Enter, etc.)
  if (key.match(/^[a-z]$/)) {
    startGame(key);
  } else {
    console.log("Please press a valid letter (A–Z).");
  }
});

//   if (event.key === "ArrowUp") keyboard.modules.keyNavigation.up();
//   else if (event.key === "ArrowDown") keyboard.modules.keyNavigation.down();
//   else if (event.key === "ArrowLeft") keyboard.modules.keyNavigation.left();
//   else if (event.key === "ArrowRight") keyboard.modules.keyNavigation.right();
//   else if (event.key === "Enter") keyboard.modules.keyNavigation.press();
// }, false);

