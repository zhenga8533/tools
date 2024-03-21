function initializeGame() {
    let times = ['...', '...', '...', '...'];
    let lastTime = 0;
    let cycle = 0;
    let nextCycle = undefined;

    /**
     * Runs through a single cycle of game, updates to wait button and then updates to click button after 3-10 seconds.
     */
    function playCycle() {
        // Update buttons and info
        document.getElementById('click-btn').style.display = 'none';
        document.getElementById('wait-btn').style.display = '';
        document.getElementById('info').innerText = `Times: [${times.join(', ')}]`;

        nextCycle = setTimeout(() => {
            lastTime = new Date().getTime();
            document.getElementById('click-btn').style.display = '';
            document.getElementById('wait-btn').style.display = 'none';
        }, Math.random() * 7000 + 3000);
    }

    /**
     * Ends game by updating info to display average time, checking for highscore, and resetting buttons.
     */
    function endGame() {
        // Check for high score;
        const display = document.getElementById('info');
        const current = getCookie('rt-highscore') ?? 8533;
        const score = times.reduce((total, num) => total + parseFloat(num), 0) / 4;
        display.textContent = `Average: ${score}ms`;

        // Set if new personal best
        if (!isNaN(score) && score < current) {
            const expires = new Date();
            expires.setFullYear(expires.getFullYear() + 1);
            document.cookie = `rt-highscore=${score}; expires=${expires.toUTCString()};`;
            display.textContent += ', Highscore!';
            display.style.color = 'green';
        }

        // Reset Game
        document.getElementById('click-btn').style.display = 'none';
        document.getElementById('wait-btn').style.display = 'none';
        document.getElementById('start-btn').textContent = 'Restart';
        document.getElementById('start-btn').style.display = '';
    }

    /**
     * Starts game by resetting global variables and HTML elements.
     */
    window.startGame = function() {
        // Reset global variables
        times = ['...', '...', '...', '...'];
        cycle = 0;
        document.getElementById('start-btn').style.display = 'none';
        document.getElementById('info').style.color = 'black';

        playCycle();
    }

    /**
     * Checks if all 4 cycles has been completed to end game or run another cycle.
     */
    window.cycleGame = function() {
        // Update game details
        times[cycle] = new Date().getTime() - lastTime;
        cycle += 1;

        // Determine if game has ended (4 cycles).
        if (cycle < 4) playCycle();
        else endGame();
    }

    /**
     * Occurs when player clicks on wait button, which automatically ends the game.
     */
    window.failGame = function() {
        // Update stats info
        document.getElementById('info').style.color = 'red';

        clearTimeout(nextCycle);
        nextCycle = undefined;
        endGame();
        document.getElementById('info').textContent = 'You Failed!';
    }
}
initializeGame();
