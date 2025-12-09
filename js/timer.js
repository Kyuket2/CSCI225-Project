
// Total time
let timeLeft = 5 * 60;    
let timerId = null;


// Main timer function
function startGameTimer() {
  console.log("Started timer!");

  updateTimerDisplay();

  timerId = setInterval(() => {

    timeLeft -= 1;
    if (timeLeft < 0) {
      timeLeft = 0;
    }

    updateTimerDisplay();

    // If the timer hits 0, then the player will lose
    if (timeLeft === 0) {
      handleGameLose();
    }

  }, 1000);
}

// Start timer upon game loading
document.addEventListener('DOMContentLoaded', () => {
  startGameTimer();
});

// Function that updates the timer
function updateTimerDisplay() {
  const timerEl = document.getElementById('timer');
  if (!timerEl) return;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');

  timerEl.textContent = `${mm}:${ss}`;
}

let gameFinished = false;  // prevents the case where the player could win more than once

// Function to win the game overall
// TODO: Add more here, and at some point allow a player to input their name to be on the leaderboard
function handleGameWin() {
  if (gameFinished) return;   // already won, do nothing..
  gameFinished = true;

  // Stop timer
  if (timerId !== null) {
    clearInterval(timerId);
  }

  // Final win message
  showTextbox("I grab the handle and step out into freedom. Break time, finally.");
}

// Function to end the game, and send the player back to the menu
function handleGameLose() {
  if (gameFinished) return; 
  gameFinished = true;

  // Stop timer
  if (timerId !== null) {
    clearInterval(timerId);
  }

  showTextbox("Time's up... Guess I'm not getting that break after all.");

  // Send player back to menu after in about 2 seconds
  // TODO: Might change how this is, not quite sure but works for now
  setTimeout(() => {
    window.location.href = "menu.html";
  }, 2000);
}


