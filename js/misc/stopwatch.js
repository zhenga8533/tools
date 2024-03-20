function initializeStopwatch() {
    let timer;
    let milliseconds = 0;

    /**
     * Function to start the stopwatch.
     */
    window.startStopwatch = function() {
        timer = setInterval(updateTime, 25);
        document.getElementById('start-btn').style.display = 'none';
        document.getElementById('stop-btn').style.display = '';
    }

    /**
     * Function to stop the stopwatch.
     */
    window.stopStopwatch = function() {
        clearInterval(timer);
        document.getElementById('start-btn').style.display = '';
        document.getElementById('stop-btn').style.display = 'none';
    }

    /**
     * Function to reset the stopwatch.
     */
    window.resetStopwatch = function() {
        window.stopStopwatch();
        seconds = 0;
        milliseconds = 0;
        document.getElementById('timer').textContent = '00h 00m 00s 000';
    }

    /**
     * Function to update the time display.
     */
    function updateTime() {
        milliseconds += 25;
        const hours = Math.floor(milliseconds / (60 * 60 * 1000)).toString().padStart(2, '0');
        let remaining = milliseconds % (60 * 60 * 1000);

        const minutes = Math.floor(remaining / (60 * 1000)).toString().padStart(2, '0');
        remaining = remaining % (60 * 1000);

        const seconds = Math.floor(remaining / 1000).toString().padStart(2, '0');
        remaining = (remaining % 1000).toString().padStart(3, '0');

        const formattedTime = `${hours}h ${minutes}m ${seconds}s ${remaining}`;
        document.getElementById('timer').textContent = formattedTime;
    }
}
initializeStopwatch();
