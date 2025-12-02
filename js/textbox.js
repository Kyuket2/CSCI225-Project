
// Function that displays a textbox, and hides the textbox on click
function showTextbox(message) {
  const box = document.getElementById('textbox');
  if (!box) return;

  box.textContent = message;
  box.classList.add('show');

  setTimeout(() => {
    document.addEventListener('click', hideOnce);

    function hideOnce() {
      box.classList.remove('show');
      document.removeEventListener('click', hideOnce);
    }

  }, 0);
}
