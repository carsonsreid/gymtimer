let countdown;
let isPaused = false;
let timeLeft = 5 * 60; // 5 minutes in seconds

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    document.getElementById('timer').textContent = minutes + ':' + seconds;
}

function showButtons(...buttonsToShow) {
    const allButtons = ['startButton', 'pauseButton', 'resumeButton', 'resetButton'];
    allButtons.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (buttonsToShow.includes(buttonId)) {
            button.style.display = 'inline-block';
        } else {
            button.style.display = 'none';
        }
    });
}

function adjustButtonWidth() {
    const timerWidth = document.getElementById('timer-container').offsetWidth;
    const buttons = document.querySelectorAll('.control-button');
    buttons.forEach(button => {
        button.style.width = `${timerWidth * 0.6}px`;
    });
}

function startTimer() {
    if (!countdown) {
        countdown = setInterval(() => {
            if (!isPaused && timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            }
            if (timeLeft <= 0) {
                clearInterval(countdown);
                showButtons('resetButton');
            }
        }, 1000);
    }
    isPaused = false;
    showButtons('pauseButton');
    adjustButtonWidth();
}

function pauseTimer() {
    isPaused = true;
    showButtons('resumeButton', 'resetButton');
    adjustButtonWidth();
}

function resumeTimer() {
    isPaused = false;
    showButtons('pauseButton');
    adjustButtonWidth();
}

function resetTimer() {
    clearInterval(countdown);
    countdown = null;
    timeLeft = 5 * 60; // Reset to 5 minutes
    updateTimerDisplay();
    showButtons('startButton');
    adjustButtonWidth();
}

document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('pauseButton').addEventListener('click', pauseTimer);
document.getElementById('resumeButton').addEventListener('click', resumeTimer);
document.getElementById('resetButton').addEventListener('click', resetTimer);

window.addEventListener('resize', adjustButtonWidth);

// Initial display setup
updateTimerDisplay();
showButtons('startButton');
adjustButtonWidth();
