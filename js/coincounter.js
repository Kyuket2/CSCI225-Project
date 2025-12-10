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

  coinsCollected++; // Increase the coins collected by one

  // Clamp to max so it never will go past 6
  if (coinsCollected > numCoins) {
    coinsCollected = numCoins;
  }

  // Chooses which image to show in HUD for coins
  //  0 coins -> coins_empty.png
  //  1–6 coins -> coin1.png - coin6.png
  // Seems like the best way to go about this would be to combine the images
  // Make the red outline on all of the coin images so it appears to fill in as the player collects coins
  const imgIndex = Math.min(coinsCollected, numCoins);
  const hudImgFile =
    coinsCollected === 0
      ? "coins_empty.png"
      : `coin${imgIndex}.png`;

  coinCountEl.setAttribute("data-count", coinsCollected);
  coinCountEl.innerHTML = `
    <p>
      <img src="sprites/items/coins/${hudImgFile}" alt="coin stack">
      ${coinsCollected}/${numCoins}
    </p>
  `;
}