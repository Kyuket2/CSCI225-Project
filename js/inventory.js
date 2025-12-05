
// Array with every slot within it
const slots = document.querySelectorAll('#inventory .slot');
let selectedSlots = [];


// Function to add the items to the hotbar
function addToInventory(imgSrc) {
  for (let slot of slots) {
    if (slot.childElementCount === 0) {
      const img = document.createElement('img');
      img.src = imgSrc;
      slot.appendChild(img);
      return true;
    }
  }
  
  showTextbox("Getting a little full, seems I won't be able to carry anything else.");
  return false;
}


// Make the items clickable
document.querySelectorAll('.officeItem').forEach(item => {
  item.addEventListener('click', () => {
    const imgElement = item.querySelector('img');
    if (!imgElement) return;

    const imgSrc = imgElement.getAttribute('src');

    if (addToInventory(imgSrc)) {
      item.style.display = "none";
    }
  });
});


// Make slots clickable
slots.forEach(slot => {
  slot.addEventListener('click', () => {
    if (slot.childElementCount === 0) return;

    if (slot.classList.contains('selected')) {
      slot.classList.remove('selected');

      const index = selectedSlots.indexOf(slot);
      if (index !== -1) {
        selectedSlots.splice(index, 1);
      }
      return;
    }

    if (selectedSlots.length === 2) {
      selectedSlots.forEach(s => s.classList.remove('selected'));
      selectedSlots = [];
    }

    slot.classList.add('selected');
    selectedSlots.push(slot);

    if (selectedSlots.length === 2 || selectedSlots.length === 3) {
      combineItems();
    }
  });
});
