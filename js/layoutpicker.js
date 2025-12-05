
// Function that randomly picks a layout at the start of the game
function pickRandomLayout() {
  const layouts = [
    "css/layout1.css" // Took out the others for now to just focus on the main one
  ];

  const randomIndex = Math.floor(Math.random() * layouts.length);
  const chosen = layouts[randomIndex];

  const link = document.getElementById('layoutStylesheet');
  if (link) {
    link.href = chosen;
    console.log("Using layout:", chosen);
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  pickRandomLayout();
});

