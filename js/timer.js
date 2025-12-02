
let timeLeft = 5 * 60;    
let timerId = null;

document.addEventListener('DOMContentLoaded', () => {
  startGameTimer();
});

// Timer function
function startGameTimer() {
  console.log("Started timer!");

  updateTimerDisplay();

  timerId = setInterval(() => {

    timeLeft -= 1;
    if (timeLeft < 0) {
      timeLeft = 0;
    }

    updateTimerDisplay();

  }, 1000);
}

// Update the timer
function updateTimerDisplay() {
  const timerEl = document.getElementById('timer');
  if (!timerEl) return;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');

  timerEl.textContent = `${mm}:${ss}`;
}
