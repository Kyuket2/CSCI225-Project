const numCoins = 6;

document.querySelectorAll('.coinPickup').forEach(item => {
  item.addEventListener('click', () => {
    if (!item) return;

    item.style.display = "none";
    increaseCoinCount();
  });
});

// Function to increase coin count and update display
function increaseCoinCount() {
  const coinCountEl = document.getElementById('coinCount');
  if (!coinCountEl) return;
    let currentCount = parseInt(coinCountEl.getAttribute('data-count')) || 0;
    currentCount += 1;
    coinCountEl.setAttribute('data-count', currentCount);
    coinCountEl.innerHTML = `<p><img src="sprites/items/coins/coin0.png" alt="empty coin stack"> ${currentCount}/${numCoins}</p>`;
}
