
// Randomly pick a layout
function pickRandomLayout() {
  const layouts = [
    "css/layout1.css"
  ];

  const randomIndex = Math.floor(Math.random() * layouts.length);
  const chosen = layouts[randomIndex];

  const link = document.getElementById('layoutStylesheet');
  if (link) {
    link.href = chosen;
    console.log("Using layout:", chosen);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  pickRandomLayout();
});

