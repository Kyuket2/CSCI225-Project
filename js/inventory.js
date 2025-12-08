
// Array with every slot within it
const slots = document.querySelectorAll('#inventory .slot');

// Tracking what the player is doing
let selectedSlots = [];    // Array of which slots the player has clicked
let activeItemSlot = null; // To check if only one slot is selected
let activeItemFile = null; // To allow interactions with that selection


// Function to add the img to the hotbar
function addToInventory(imgSrc) {
  for (let slot of slots) {
    if (slot.childElementCount === 0) {
      const img = document.createElement('img');
      img.src = imgSrc;
      slot.appendChild(img);
      slot.classList.add("slotItem")
      return true;
    }
  }
  
  showTextbox("Getting a little full, seems I won't be able to carry anything else.");
  return false;
}


// When a item that is able to be picked up is clicked, get its image and trys adding it to the inventory
// If it's able to do so, remove the item from the scene
document.querySelectorAll('.officeItemPickup').forEach(item => {
  item.addEventListener('click', () => {
    const imgElement = item.querySelector('img');
    if (!imgElement) return;

    const imgSrc = imgElement.getAttribute('src');

    if (addToInventory(imgSrc)) {
      item.style.display = "none";
    }
  });
});


// Make slots clickable with a listener
slots.forEach(slot => {
  slot.addEventListener('click', () => {
    handleSlotClick(slot);
  });
});

// Function to handle empty slots, otherwise if it's empty do nothing
function handleSlotClick(slot) {
  // Ignore empty slots
  if (slot.childElementCount === 0) {
    return;
  }

  const isSelected = slot.classList.contains('selected');

  if (isSelected) {
    // If this slot was already selected, unselect it
    unselectSlot(slot);
  } else {
    // If two slots are already selected, clear them first
    if (selectedSlots.length === 2) {
      clearSelectedSlotsOnly();
    }
    // Then select this one
    selectSlot(slot);
  }

  // Update the active item info from what the player has currently selected
  updateActiveItemFromSelection();

  // If exactly 2 slots are selected, try to combine them
  if (selectedSlots.length === 2) {
    combineItems();
  }
}

// This function marks one slot as selected and track it
function selectSlot(slot) {
  slot.classList.add('selected');
  selectedSlots.push(slot);
}

// Function that unselects one slot and remove it from the selectedSlots array
function unselectSlot(slot) {
  slot.classList.remove('selected');

  for (let i = 0; i < selectedSlots.length; i++) {
    if (selectedSlots[i] === slot) {
      selectedSlots.splice(i, 1); // remove this slot from the array
      break;
    }
  }
}

// Function that clears only the visual selection / array 
function clearSelectedSlotsOnly() {
  selectedSlots.forEach(s => s.classList.remove('selected'));
  selectedSlots = [];
}

// Function that decides what the current item is based on how many slots are selected
function updateActiveItemFromSelection() {
  if (selectedSlots.length === 1) {
    // Holding exactly one item
    activeItemSlot = selectedSlots[0];
    const img = activeItemSlot.querySelector('img');
    activeItemFile = img ? img.src.split('/').pop() : null;
    document.body.classList.add('grabbing');  // change cursor
  } else {
    // if 0 or 2 (or more) are selected; otherwise, not holding a single specific item
    activeItemSlot = null;
    activeItemFile = null;
    document.body.classList.remove('grabbing');
  }
}

