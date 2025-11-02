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
    console.log("Input changed", input);
}

function onKeyPress(button) {
    console.log("Button pressed", button);
}

/**
 * To select the keys using the physical keyboard
 */

document.addEventListener(
    "keydown",
    e => {
        if (e.key === "ArrowUp") keyboard.modules.keyNavigation.up();
        else if (e.key === "ArrowDown") keyboard.modules.keyNavigation.down();
        else if (e.key === "ArrowLeft") keyboard.modules.keyNavigation.left();
        else if (e.key === "ArrowRight") keyboard.modules.keyNavigation.right();
        else if (e.key === "Enter") keyboard.modules.keyNavigation.press();
    },
    false
);