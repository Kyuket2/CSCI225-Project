
// Function that allows the background to scale to the user's display
function resizeBackground() {
  const bg = document.querySelector(".povs")
  bg.style.width = window.innerWidth + 'px';
  bg.style.height = window.innerHeight + 'px';
}
window.addEventListener('resize', resizeBackground);
resizeBackground(); 