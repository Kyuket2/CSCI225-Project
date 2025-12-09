const numCoins = 6;     // used for total
let coinsCollected = 0; // used for score

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

  coinsCollected++; // Score will look for this

  // Clamp to max so it never will go past 6
  if (coinsCollected > numCoins) {
    coinsCollected = numCoins;
  }

  // ----------------------------- Stacking coins -------------------------------------
  const imgIndex = Math.min(coinsCollected, numCoins);

  coinCountEl.setAttribute("data-count", coinsCollected);
  coinCountEl.innerHTML = `
    <p>
      <img src="sprites/items/coins/coin${imgIndex}.png" alt="coin stack">
      ${coinsCollected}/${numCoins}
    </p>
  `;
}
