function initializeGame() {
    let times = ['...', '...', '...', '...'];
    let lastTime = 0;
    let cycle = 0;
    let nextCycle = undefined;

    function playCycle() {
        // Update game info
        document.getElementById('info').innerText = `Times: [${times.join(', ')}]`;

        // Update buttons
        document.getElementById('click-btn').style.display = 'none';
        document.getElementById('wait-btn').style.display = '';

        nextCycle = setTimeout(() => {
            lastTime = new Date().getTime();
            document.getElementById('click-btn').style.display = '';
            document.getElementById('wait-btn').style.display = 'none';
        }, Math.random() * 7000 + 3000);
    }

    function endGame() {
        document.getElementById('click-btn').style.display = 'none';
        document.getElementById('wait-btn').style.display = 'none';
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

        playCycle();
    }

    window.cycleGame = function() {
        // Update game details
        times[cycle] = new Date().getTime() - lastTime;
        cycle += 1;

        // Determine if game has ended (4 cycles).
        if (cycle < 4) playCycle();
        else endGame();
    }

    window.failGame = function() {
        clearTimeout(nextCycle);
        nextCycle = undefined;
        endGame();
    }
}
initializeGame();
