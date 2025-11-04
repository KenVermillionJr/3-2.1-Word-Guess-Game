// Starter Word Guess Game — Keyboard Input Ready

// Word bank
let words = ["array", "loop", "json", "linux", "html", "css", "javascript", "php", "angular", "react", "nodejs", "express", "bootstrap", "server", "api", "query", "git", "devops", "responsive", "script", "plugin", "browser", "routes", "assets", "layout", "form", "image", "theme", "cache", "style", "markup", "client", "logic", "media", "link", "ajax", "debug", "access", "async", "fetch", "cloud", "build", "tools", "test", "mongo", "yaml", "gulp", "npm", "jade", "token", "builds", "ejs", "slug", "cms", "scss", "less", "hooks", "rest", "ajax", "twig", "migrate", "auth", "uri", "json", "seo", "links", "iframe", "cms", "ping", "rest", "router", "reload", "graph", "static", "reset", "html5", "css3", "debugger", "server", "fetch", "query", "plugin", "widget", "frame", "api", "node", "ajax", "git", "rest", "form", "paths", "mark", "mongo", "stack", "view", "gitlab", "ts", "vue", "redux", "npm", "babel", "eslint", "cli", "koa", "vuex", "sass", "rest", "ejs", "twig", "jsdoc", "jinja", "grunt", "vscode", "rails", "query", "postcss", "npm", "push", "fetch", "react", "async", "router", "django", "flask", "debug", "oauth", "login", "token", "ajax", "port", "json", "cdn", "sql", "url", "login", "cloud", "twig", "blocks", "mongo", "rest", "sass", "scss", "webpack", "vue", "reset", "patch", "state", "filer", "log", "auth", "crud", "styles", "web", "grid", "data", "input", "meta", "node", "hash", "js", "jq", "html", "scss", "async", "d3", "sql", "yaml", "paths", "api", "dev", "test", "login", "crypto", "popups", "secrets", "transit", "query", "form", "url", "hooks", "push", "client", "build", "repo", "copy", "flow", "init", "links", "env", "trace", "login", "slug", "edit", "doc", "head", "scss", "html", "vue", "next", "lazy", "yaml", "icon", "page", "grid", "text", "push", "pull", "type", "smtp", "patch", "ajax", "ajax", "sass", "token", "site", "router", "docs", "zip", "api", "link", "views", "module", "filter", "paths", "call", "js", "prod", "tests", "login", "mongo", "stats", "count", "tags", "uuid", "cloud", "graph", "mysql", "node", "html", "css", "sass", "debug", "code", "block", "icon", "size", "style", "code", "root", "login", "email", "block", "auth", "path", "tools", "xhtml", "hook", "js", "test", "state", "parse", "next", "es6"];
// console.log(words);

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
// console.log("Chosen word:", chosenWord);

// DOM Elements
const maskedWordElm = document.getElementById("maskedWord");
const attemptsElm = document.getElementById("attempts");
const guessedLettersElm = document.getElementById("guessedLetters");
const message = document.getElementById("message");

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
  }
  /* add custom layout alpha lowercase */
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

  // begin game logic */
  // nested in onKeyPress()

  startGame(button);

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

  // end game logic
  // nested in onKeyPress()

}

// end virtual keyboard

document.addEventListener(
  "keydown",
  e => {
    let key = e.key.toLowerCase();
    if (e.key === "ArrowUp") keyboard.modules.keyNavigation.up();
    else if (e.key === "ArrowDown") keyboard.modules.keyNavigation.down();
    else if (e.key === "ArrowLeft") keyboard.modules.keyNavigation.left();
    else if (e.key === "ArrowRight") keyboard.modules.keyNavigation.right();
    else if (e.key === "Enter") keyboard.modules.keyNavigation.press();
  }, false
);
