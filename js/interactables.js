
// Keeps track of which  puzzles have been solved by the player, starting false then becoming true as completed
const puzzleState = {
  computerUnlocked: false,
  ventOpened: false,
  doorUnlocked: false
};


// Makes the interactable items clickable
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".officeItemInteractable").forEach(obj => {
    obj.addEventListener("click", () => handleInteractable(obj));
  });
});


// Based on the object's ID, call the specific function that handles that object's logic
function handleInteractable(obj) {
  const id = obj.id;

  switch (id) {
    case "computer":
      handleComputer(obj);
      break;

    case "vent":
      handleVent(obj);
      break;

    case "keyhole":
      handleKeyhole(obj);
      break;

    default:
      // Not been added yet
      showTextbox("Nothing interesting here.");
  }
}


// Computer
function handleComputer(obj) {
  if (!puzzleState.computerUnlocked) {

    const code = prompt("Enter the 4-digit code:");
    
    if (code === "8957") {
      puzzleState.computerUnlocked = true;
      obj.querySelector("img").src = "sprites/interactables/computer/computer_code4.png";
      showTextbox("The computer unlocks. Nice.");
    } else {
      showTextbox("Wrong code. The computer stays locked.");
    }

  } else {
    showTextbox("The computer is already unlocked.");
  }
}


// Vent
function handleVent(obj) {
  if (!puzzleState.ventOpened) {

    if (activeItemFile === "") { // Need to add somethings to pry open the vent 
      puzzleState.ventOpened = true;

      obj.querySelector("img").src = "sprites/interactables/others/vent_selected";
      showTextbox("You the vent comes loose.");

      if (activeItemSlot) {
        activeItemSlot.innerHTML = "";
        activeItemSlot.classList.remove("slot-has-item");
      }

      activeItemSlot = null;
      activeItemFile = null;
      document.body.classList.remove("grabbing");

    } else if (activeItemFile) {
      showTextbox("That doesn't help with the vent.");

    } else {
      showTextbox("A screwed-in vent cover. Maybe I could remove it.");
    }

  } else {
    showTextbox("The vent is already open.");
  }
}


// Keyhole Interaction 
function handleKeyhole(obj) {
  if (!puzzleState.doorUnlocked) {

    if (activeItemFile === "") { // Need some type of masterkey? Or something like that
      puzzleState.doorUnlocked = true;

      obj.querySelector("img").src = "sprites/interactables/others/keyhole_selected.png";
      showTextbox("The key turns with a satisfying click.");

      // You can trigger game win here if you want? Not sure on this one

    } else if (activeItemFile) {
      showTextbox("Wrong key for this lock.");

    } else {
      showTextbox("A keyhole. Looks important.");
    }

  } else {
    showTextbox("The lock is already open.");
  }
}
