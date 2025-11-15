
function resizeBackground() {
  const bg = document.getElementById('stage');
  bg.style.width = window.innerWidth + 'px';
  bg.style.height = window.innerHeight + 'px';
}
window.addEventListener('resize', resizeBackground);
resizeBackground(); 

