let num = '';
let level = 1;

function startGame() {
    // Initialize global variables
    num = String(Math.floor(Math.random() * 10));
    level = 1;
    document.getElementById('hb-btn').innerText = 'Submit';

    showNumbers();
}

function showNumbers() {
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
        display.textContent = 'Enter the numbers in order!';
    }, 3000);
}
