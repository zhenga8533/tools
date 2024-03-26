function initializeGame() {
    let clicks = 0;
    let time = 0;
    let interval = undefined;

    /**
     * Ends game by updating info to display cps, checking for highscore, and resetting buttons.
     */
    function endGame() {
        clearInterval(interval);

        // Check for high score;
        const display = document.getElementById('info');
        const current = getCookie('cs-highscore') ?? 0;
        const score = clicks / 5;
        display.textContent = `CPS: ${score}`;

        // Set if new personal best
        if (!isNaN(score) && score > current) {
            const expires = new Date();
            expires.setFullYear(expires.getFullYear() + 1);
            document.cookie = `cs-highscore=${score}; expires=${expires.toUTCString()};`;
            display.textContent += ', Highscore!';
            display.style.color = 'green';
        }

        // Reset Game
        const start = document.getElementById('start-btn');
        start.textContent = 'Restart';
        start.style.display = '';
        start.disabled = true;
        setTimeout(() => start.disabled = false, 2500);
        document.getElementById('click-btn').style.display = 'none';
    }

    /**
     * Starts game by resetting global variables and HTML elements.
     */
    window.startGame = function() {
        clicks = 0;
        time = 0;
        const info = document.getElementById('info');
        interval = setInterval(() => {
            time += 0.025;
            const cps = (clicks / time).toFixed(2)
            info.textContent = `CPS: ${cps}`;
        }, 25);

        document.getElementById('click-btn').style.display = '';
        document.getElementById('start-btn').style.display = 'none';
        document.getElementById('info').style.color = 'black';
        setTimeout(endGame, 5000);
    }

    /**
     * Add a click every time click button is pressed.
     */
    window.addClick = function() {
        clicks++;
    }
}
initializeGame();
