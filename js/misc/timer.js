function initializeTimer() {
    let interval;
    let incrementSpeed = 200;
    let stopwatch;
    let running = false;

    function parseTime() {
        const timer = document.getElementById('timer');
        const times = timer.value.split(':').map(t => parseInt(t));
        let time = times[0] * 3600 + times[1] * 60 + times[2];
        return isNaN(time) ? 0 : time;
    }

    function incrementTimer(increment) {
        let time = parseTime() + (increment ?? -1);
        if (time < 0) {
            // Sound alarm if timer ends.
            if (increment === undefined) {
                document.getElementById('alarm').play();
                clearInterval(stopwatch);
            }

            running = false;
            return;
        }

        // Get new time
        const hours = Math.floor(time / 3600).toString().padStart(2, '0');
        time %= 3600;
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        time = (time % 60).toString().padStart(2, '0')
        document.getElementById('timer').value = `${hours}:${minutes}:${time}`;
    }

    window.startIncrement = function(increment) {
        incrementTimer(increment);
        clearInterval(interval);
        interval = setTimeout(function() {
            incrementSpeed = Math.max(incrementSpeed - 5, 10);
            window.startIncrement(increment);
        }, incrementSpeed);
    }

    window.stopIncrement = function(increment) {
        clearInterval(interval);
        incrementSpeed = 200;
    }

    window.toggleTimer = function() {
        if (running) {
            clearInterval(stopwatch);
            document.getElementById('toggle-btn').textContent = 'Start';
        } else {
            stopwatch = setInterval(incrementTimer, 1000);
            document.getElementById('toggle-btn').textContent = 'Stop';
        }
        running = !running;
    }

    /**
     * Function to reset the stopwatch.
     */
    window.resetTimer = function() {
        clearInterval(stopwatch);
        running = false;
        document.getElementById('toggle-btn').textContent = 'Start';
        document.getElementById('timer').value = '00:00:00';
    }
}
initializeTimer();
