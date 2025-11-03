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
});

function onChange(input) {
    document.querySelector(".input").value = input;
    // console.log("Input changed", input);
}

function onKeyPress(button) {
    // console.log("Button pressed", button);
    if (button.match(/^[a-z]$/)) {
        console.log(`You entered a valid letter: ${button}`);
        youWon.play();
    } else {
        console.log(`You entered an invalid character: ${button}`);
        lost.play();
    }
}

// TEST listener

/* audio sources */
const correct = document.querySelector('#letterCorrect')
// correct.play();
const wrong = document.querySelector('#letterWrong')
// wrong.play();
const youWon = document.querySelector('#youWon')
// youWon.play();
const lost = document.querySelector('#youLost')
// lost.play();

/**
 * To select the keys using the physical keyboard
 */

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

// window.addEventListener("keydown", function (event) {
//     let key = event.key.toLowerCase();
//     // Only process alphabetic letters (ignore Shift, Enter, etc.)
//     if (key.match(/^[a-z]$/)) {
//         startGame(key);
//     } else {
//         console.log("Please press a valid letter (A–Z).");
//     }
// });