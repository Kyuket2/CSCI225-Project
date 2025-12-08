
// Possible combinaitons within the game
const RECIPES = {
  "gum_unwrapped.png+pencil_broken.png": "pencil_repaired.png"
};


// The combine function for all of the items
function combineItems() {

  // If the items that were selected were less then, or great than 3, do nothing
  const count = selectedSlots.length;
  if (count < 2 || count > 3) {
    return;
  }
  
  // Get the file names needed
  const files = [];

  // Within the selected slots, grab the current img
  for (let slot of selectedSlots) {
    const img = slot.querySelector("img");
    if (!img) {
      showTextbox("It appears as though I've grabbed nothingness!");
      clearSelection();
      return;
    }

    // Within the loop, creates an array of the filepath, then pop out the last to filename
    const filename = img.src.split("/").pop(); 
    files.push(filename);
  }

  // Checks to see if the filename is wihtin recipies
  files.sort();
  const key = files.join("+");
  const result = RECIPES[key];

  // If it is, take out the img and remove the class
  if (result) {
    selectedSlots.forEach(slot => {
      slot.innerHTML = "";
      slot.classList.remove("slotItem")
    });

    // Create a new img for the slot
    const firstSlot = selectedSlots[0];
    const newImg = document.createElement("img");
    newImg.src = "sprites/items/" + result;
    firstSlot.appendChild(newImg);

    showTextbox("You carefully combine the items... It might come in handy.");
    
  } else {
    showTextbox("Seems I can't do anything with these items.");
  }

  clearSelection();
}

// Just a little helper function to unselect everything if needed
function clearSelection() {
  selectedSlots.forEach(slot => slot.classList.remove("selected"));
  selectedSlots = [];
}

