let num = '';
let level = 1;

function startGame() {
    // Initialize global variables
    num = String(Math.floor(Math.random() * 10));
    level = 1;

    // Update HTML elements
    let input = document.getElementById('hb-btn');
    input.innerText = 'Submit';
    input.onclick = submitNumber;
    document.getElementById('hb-input').value = '';
    document.getElementById('message').style.color = 'black';

    showNumber();
}

function showNumber() {
    let display = document.getElementById('message');
    let input = document.getElementById('hb-input');
    let btn = document.getElementById('hb-btn');
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

function submitNumber() {
    let input = document.getElementById('hb-input');

    if (input.value == num) {
        input.value = '';
        num += String(Math.floor(Math.random() * 10));
        level++;
        showNumber();
    } else endGame();
}

function endGame() {
    let display = document.getElementById('message');
    display.textContent = `${num} (Level ${level})`;
    display.style.color = 'red';

    // Reset hb-btn
    let input = document.getElementById('hb-btn');
    input.innerText = 'Start';
    input.onclick = startGame;
}
