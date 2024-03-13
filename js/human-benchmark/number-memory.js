let num = '';
let level = 1;

/**
 * Reset bar timer and decrease it over 3 seconds.
 */
function decreaseBar() {
    const bar = document.getElementById('bar');
    let width = 100;
    const interval = setInterval(frame, 30);

    function frame() {
        if (width <= 0) {
            clearInterval(interval);
        } else {
            width -= 1;
            bar.style.width = width + 'px';
        }
    }
}

/**
 * Starts game by resetting global variables and HTML elements.
 */
function startGame() {
    // Initialize global variables
    num = String(Math.floor(Math.random() * 10));
    level = 1;

    // Update HTML elements
    const input = document.getElementById('hb-btn');
    input.innerText = 'Submit';
    input.onclick = submitNumber;
    document.getElementById('hb-input').value = '';
    document.getElementById('message').style.color = 'black';

    showNumber();
}

/**
 * Display number for 3 seconds before asking user to answer.
 */
function showNumber() {
    decreaseBar();
    const display = document.getElementById('message');
    const input = document.getElementById('hb-input');
    const btn = document.getElementById('hb-btn');
    display.textContent = num;
    input.disabled = true;
    btn.disabled = true;

    // Clear display after 3 seconds
    setTimeout(() => {
        input.disabled = false;
        btn.disabled = false;
        display.textContent = 'Level ' + level;
    }, 3000);
}

/**
 * Checks current user input for correct number to either advance level or end game.
 */
function submitNumber() {
    const input = document.getElementById('hb-input');

    if (input.value == num) {
        input.value = '';
        num += String(Math.floor(Math.random() * 10));
        level++;
        showNumber();
    } else endGame();
}

/**
 * Ends game by displaying final score and resetting to start button.
 */
function endGame() {
    // Reset message display
    const display = document.getElementById('message');
    display.textContent = `${num} (Level ${level})`;
    display.style.color = 'red';

    // Check for high score;
    const current = getCookie('nm-highscore') ?? 0;
    const score = level - 1;
    if (score > current) {
        const expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);
        document.cookie = `nm-highscore=${score}; expires=${expires.toUTCString()};`;
        display.textContent += ', Highscore!';
        display.style.color = 'green';
    }

    // Reset hb-btn
    const input = document.getElementById('hb-btn');
    input.innerText = 'Restart';
    input.onclick = startGame;
}
