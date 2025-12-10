// Total time
let timeLeft = 5 * 60;    // total time given to the player
let timerId = null;
let gameFinished = false; // prevents the case where the player could win more than once

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

// Score based on how much time the player had left
function calculateFinalScore() {
  // 10 points per second remaining
  const timeScore = timeLeft * 10;

  // 500 points per coin collected
  const coinScore = coinsCollected * 500;

  return timeScore + coinScore;
}

// Function to win the game overall
function handleGameWin() {
  if (gameFinished) return;   // already won, do nothing..
  gameFinished = true;

  // Stop timer
  if (typeof timerId !== "undefined" && timerId !== null) {
    clearInterval(timerId);
  }
  const winScreen = document.getElementById("winscreen");
  winScreen.style.visibility = "visible";

  const finalScore = calculateFinalScore(); // uses timeLeft + coinsCollected

  // Ask player for their 3-letter initials
  let initials = prompt("Enter your 3-letter initials for the leaderboard:", "AAA") || "???";
  initials = initials.toUpperCase().slice(0, 3);

  // Save to Firebase
  if (window.saveScoreToFirebase) {
    window.saveScoreToFirebase(initials, finalScore, coinsCollected, timeLeft);
  } else {
    console.warn("saveScoreToFirebase is not defined – check main.html script order.");
  }

  // Show final score and message
  showTextbox(`I grab the handle and step out into freedom. Break time, finally.\nScore: ${finalScore}`);
  
  setTimeout(() => {
    window.location.href = 'menu.html';
  }, 10000);
}

// Function to lose the game, and send the player back to the menu
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