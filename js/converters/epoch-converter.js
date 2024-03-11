/**
 * Function to set the default value of the datetime picker and epoch input to current local time.
 */
function setDefaultTime() {
    // Get the current local time
    const currentDateTime = new Date();
    
    // Format the current local time as required for the datetime picker
    const year = currentDateTime.getFullYear();
    const month = ('0' + (currentDateTime.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDateTime.getDate()).slice(-2);
    const hour = ('0' + currentDateTime.getHours()).slice(-2);
    const minute = ('0' + currentDateTime.getMinutes()).slice(-2);
    const formattedDateTime = year + '-' + month + '-' + day + 'T' + hour + ':' + minute;
    
    // Set the default value of the datetime picker to current local datetime
    document.getElementById('datetimePicker').value = formattedDateTime;
    
    // Set the default value of the epoch input to current epoch time
    const currentEpochTime = Math.floor(currentDateTime.getTime() / 1000); // Current time in seconds
    document.getElementById('epochInput').value = currentEpochTime;
    
    // Update the time difference relative to current time
    updateTimeDifference();
}
setDefaultTime();

/**
 * Function to set the default value of the datetime picker based on epoch time.
 */
function setDateTimeFromEpoch() {
    const epochTime = parseInt(document.getElementById('epochInput').value);
    if (!epochTime || isNaN(epochTime)) return; // If input is not a valid number, do nothing
    
    // Convert units
    const unit = document.getElementById('epochUnitSelector').value;
    if (unit === 'milliseconds') epochTime = Math.floor(epochTime / 1000);
    else if (unit === 'microseconds') epochTime = Math.floor(epochTime / 1000000);
    else if (unit === 'nanoseconds') epochTime = Math.floor(epochTime / 1000000000);
    
    const selectedTimezone = document.getElementById('timezoneSelector').value;
    let dateTime;
    
    if (selectedTimezone === 'local') {
        dateTime = new Date(epochTime * 1000); // Convert seconds to milliseconds
    } else if (selectedTimezone === 'gmt') {
        dateTime = new Date(epochTime * 1000); // Convert seconds to milliseconds
        const localOffset = dateTime.getTimezoneOffset() * 60000; // Get local offset in milliseconds
        dateTime = new Date(dateTime.getTime() + localOffset); // Convert to local time
    }
    
    const year = dateTime.getFullYear();
    const month = ('0' + (dateTime.getMonth() + 1)).slice(-2);
    const day = ('0' + dateTime.getDate()).slice(-2);
    const hour = ('0' + dateTime.getHours()).slice(-2);
    const minute = ('0' + dateTime.getMinutes()).slice(-2);
    
    // Format the date and time
    const formattedDateTime = year + '-' + month + '-' + day + 'T' + hour + ':' + minute;
    
    // Set the datetime picker value
    document.getElementById('datetimePicker').value = formattedDateTime;
    updateTimeDifference();
}

/**
 * Function to set the default value of the epoch input and datetime picker based on date-time.
 */
function setEpochFromDateTime() {
    const dateTime = document.getElementById('datetimePicker').value;
    if (!dateTime) return; // If no datetime is selected, do nothing
    
    const epochTime = Math.floor(new Date(dateTime).getTime() / 1000); // Convert milliseconds to seconds
    
    // Convert units
    const unit = document.getElementById('epochUnitSelector').value;
    if (unit === 'milliseconds') epochTime *= 1000;
    else if (unit === 'microseconds') epochTime *= 1000000;
    else if (unit === 'nanoseconds') epochTime *= 1000000000;
    
    // Set the epoch input value
    document.getElementById('epochInput').value = epochTime;
}

// Function to update the current UTC epoch time
function updateCurrentUtcEpochTime() {
    const currentUtcEpochTime = Math.floor(new Date().getTime() / 1000); // Get current time in seconds
    document.getElementById('currentUtcEpochTime').innerText = currentUtcEpochTime;
}

/**
 * Function to copy the current UTC epoch time to clipboard.
 */
function copyEpoch() {
    const currentUtcEpochTime = Math.floor(new Date().getTime() / 1000); // Get current time in seconds
    navigator.clipboard.writeText(currentUtcEpochTime.toString()).then(function() {
        alert("Epoch time copied to clipboard: " + currentUtcEpochTime);
    }, function(err) {
        console.error('Failed to copy: ', err);
    });
}

/**
 * Function to update the time difference relative to current time.
 */
function updateTimeDifference() {
    const epochTime = parseInt(document.getElementById('epochInput').value);
    if (!epochTime || isNaN(epochTime)) return; // If input is not a valid number, do nothing
    
    const currentTime = Math.floor(new Date().getTime() / 1000); // Current time in seconds
    let timeDifference = currentTime - epochTime;
    let timeAgo = '';
    
    // Calculate the difference in years
    const years = Math.floor(timeDifference / (365 * 24 * 60 * 60));
    if (years > 0) {
        timeAgo += years + (years === 1 ? ' year ' : ' years ');
        timeDifference -= years * (365 * 24 * 60 * 60);
    }
    
    // Calculate the difference in months
    const months = Math.floor(timeDifference / (30 * 24 * 60 * 60));
    if (months > 0) {
        timeAgo += months + (months === 1 ? ' month ' : ' months ');
        timeDifference -= months * (30 * 24 * 60 * 60);
    }
    
    // Calculate the difference in days
    const days = Math.floor(timeDifference / (24 * 60 * 60));
    if (days > 0) {
        timeAgo += days + (days === 1 ? ' day ' : ' days ');
        timeDifference -= days * (24 * 60 * 60);
    }
    
    // Calculate the difference in hours
    const hours = Math.floor(timeDifference / (60 * 60));
    if (hours > 0) {
        timeAgo += hours + (hours === 1 ? ' hour ' : ' hours ');
        timeDifference -= hours * (60 * 60);
    }
    
    // Calculate the difference in minutes
    const minutes = Math.floor(timeDifference / 60);
    if (minutes > 0) {
        timeAgo += minutes + (minutes === 1 ? ' minute ' : ' minutes ');
        timeDifference -= minutes * 60;
    }
    
    // Display seconds difference if less than a minute
    timeAgo += timeDifference + (timeDifference === 1 ? ' second ago' : ' seconds ago');
    document.getElementById('timeAgo').innerText = timeAgo;
}

// Add event listener to update time difference when epoch input changes
document.getElementById('epochInput').addEventListener('input', setDateTimeFromEpoch);
document.getElementById('datetimePicker').addEventListener('input', setEpochFromDateTime);
document.getElementById('timezoneSelector').addEventListener('change', setDateTimeFromEpoch);

// Update current UTC epoch time every second
setInterval(updateCurrentUtcEpochTime, 1000);
setInterval(updateTimeDifference, 1000);
