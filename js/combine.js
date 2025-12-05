
// Possible combinaitons within the game
const RECIPES = {
  "gum_unwrapped.png+pencil_broken.png": "pencil_repaired.png"
};


// The combine function for all of the items
function combineItems() {

  const count = selectedSlots.length;
  if (count < 2 || count > 3) {
    return;
  }
  
  const files = [];

  for (let slot of selectedSlots) {
    const img = slot.querySelector("img");
    if (!img) {
      showTextbox("Ah, something went wrong it seems...");
      clearSelection();
      return;
    }

    const filename = img.src.split("/").pop(); 
    files.push(filename);
  }

  files.sort();
  const key = files.join("+");

  const result = RECIPES[key];

  if (result) {
    selectedSlots.forEach(slot => {
      slot.innerHTML = "";
    });

    const firstSlot = selectedSlots[0];

    const newImg = document.createElement("img");
    newImg.src = "sprites/" + result;
    firstSlot.appendChild(newImg);

    showTextbox("You carefully combine the items... It might come in handy.");
    
  } else {
    showTextbox("Seems I can't do anything with these items.");
  }

  clearSelection();
}

// Function to clear the selection
function clearSelection() {
  selectedSlots.forEach(slot => slot.classList.remove("selected"));
  selectedSlots = [];
}

