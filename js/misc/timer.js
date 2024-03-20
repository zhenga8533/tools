function initializeTimer() {
    let interval;
    let incrementSpeed = 200;
    let stopwatch;

    /**
     * Converts timer HTML timestamp into seconds.
     * 
     * @returns {Number} Total seconds of timer.
     */
    function parseTime() {
        const timer = document.getElementById('timer');
        const times = timer.value.split(':').map(t => parseInt(t));
        let time = times[0] * 3600 + times[1] * 60 + times[2];
        return isNaN(time) ? 0 : time;
    }

    /**
     * Increments timer by an inputted amount of seconds.
     * 
     * @param {Number} increment - Number of seconds to add.
     */
    function incrementTimer(increment) {
        let time = parseTime() + (increment ?? -1);
        if (time < 0) {
            // Sound alarm if timer ends.
            if (increment === undefined) {
                window.stopTimer();
                document.getElementById('alarm').play();
            }

            return;
        }

        // Get new time
        const hours = Math.floor(time / 3600).toString().padStart(2, '0');
        time %= 3600;
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        time = (time % 60).toString().padStart(2, '0')
        document.getElementById('timer').value = `${hours}:${minutes}:${time}`;
    }

    /**
     * Increments timer by given increment when holding button down.
     * 
     * @param {Number} increment  - Number of seconds to increment by.
     */
    window.startIncrement = function(increment) {
        incrementTimer(increment);
        clearInterval(interval);
        interval = setTimeout(function() {
            incrementSpeed = Math.max(incrementSpeed - 5, 10);
            window.startIncrement(increment);
        }, incrementSpeed);
    }

    /**
     * Stops the incrementations when button is lifted.
     */
    window.stopIncrement = function() {
        clearInterval(interval);
        incrementSpeed = 200;
    }

    /**
     * Function to start the timer.
     */
    window.startTimer = function() {
        stopwatch = setInterval(incrementTimer, 1000);
        document.getElementById('start-btn').style.display = 'none';
        document.getElementById('stop-btn').style.display = '';
    }

    /**
     * Function to stop the timer.
     */
    window.stopTimer = function() {
        clearInterval(stopwatch);
        document.getElementById('start-btn').style.display = '';
        document.getElementById('stop-btn').style.display = 'none';
    }

    /**
     * Function to reset the stopwatch.
     */
    window.resetTimer = function() {
        window.stopTimer();
        document.getElementById('timer').value = '00:00:00';
    }
}
initializeTimer();
