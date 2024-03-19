function initializeTimer() {
    let interval;
    let incrementSpeed = 200;

    function incrementTimer(increment) {
        const timer = document.getElementById('timer');
        const times = timer.value.split(':').map(t => parseInt(t));
        let time = times[0] * 3600 + times[1] * 60 + times[2];
        time = isNaN(time) ? increment : time + increment;

        // Get new time
        const hours = Math.floor(time / 3600).toString().padStart(2, '0');
        time %= 3600;
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        time = (time % 60).toString().padStart(2, '0')
        timer.value = `${hours}:${minutes}:${time}`;
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
}
initializeTimer();
