// Keeps track of which  puzzles have been solved by the player, starting false then becoming true as completed
const puzzleState = {
  computerUnlocked: false,
  ventOpened: false,
  doorUnlocked: false,
  scannerCard: false,
  scannerCode: false,
  scannerForm: false,
  scannerCompleted: false,
  plantWatered: false
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

    case "scanner":
      handleScanner(obj);
      break;

    case "plant":
      handlePlant(obj);
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
      showTextbox("I forgot my code again? Great. The computer stays locked.");
    }

  } else {
    showTextbox("The computer is already unlocked.");
  }
}


// Vent
function handleVent(obj) {
  if (!puzzleState.ventOpened) {

    if (activeItemFile === "") { // Screwdriver
      puzzleState.ventOpened = true;

      obj.querySelector("img").src = "";
      showTextbox("You remove the vent cover. There is no vent behind it, but there is something taped to the inside.");

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

      obj.querySelector("img").style.transform = 'scaleX(-1)';
      showTextbox("The key turns with a satisfying click.");

      // Game win triggers on clicking door handle after unlocking

    } else if (activeItemFile) {
      showTextbox("Well, this is not going to work.");

    } else {
      showTextbox("A keyhole. Looks important.");
    }

  } else {
    showTextbox("The lock is already open.");
  }
}


// Scanner Interaction 
function handleScanner(obj) {
  puzzleState.scannerCompleted = puzzleState.scannerCard && puzzleState.scannerCode && puzzleState.scannerForm;
  if (!puzzleState.scannerCompleted) {
    if (activeItemFile === null) {
      const code = prompt("Enter the 4-digit code:");
      
      if (code === "1111") {
        puzzleState.scannerCode = true;
        obj.querySelector("img").src = "sprites/interactables/scanner/scanner_yes.png";
        showTextbox("Correct door code.");
        setTimeout(() => {
          obj.querySelector("img").src = "sprites/interactables/scanner/scanner.png";
        }, 2000);
      } else {
        obj.querySelector("img").src = "sprites/interactables/scanner/no.png";
        showTextbox("Wrong code. The scanner beeps red at you and stays locked.");
        setTimeout(() => {
          obj.querySelector("img").src = "sprites/interactables/scanner/scanner.png";
        }, 2000);
        
      }
    }

    if (activeItemFile === "") { // ID Card
      puzzleState.scannerCard = true;

      obj.querySelector("img").src = "sprites/interactables/scanner/scanner_yes.png";
      showTextbox("Your ID card scans successfully.");
      setTimeout(() => {
          obj.querySelector("img").src = "sprites/interactables/scanner/scanner.png";
        }, 2000);

    } else if (activeItemFile === "") { // Completed Form
      puzzleState.scannerForm = true;

      obj.querySelector("img").src = "sprites/interactables/scanner/scanner_yes.png";
      showTextbox("Your paperwork has been accepted.");
      setTimeout(() => {
          obj.querySelector("img").src = "sprites/interactables/scanner/scanner.png";
        }, 2000);

    } else if (activeItemFile) {
      showTextbox("Wrong item.");

    } else {
      showTextbox("The scanner keeps the door locked."); // displays for everything for some reason
    }

  } else {
    obj.querySelector("img").src = "sprites/interactables/scanner/scanner_yes.png";
    showTextbox("The scanner is already unlocked.");
  }
}


// Plant Interaction 
function handlePlant(obj) {
  if (!puzzleState.plantWatered) {

    if (activeItemFile === "") { // Water bottle
      puzzleState.plantWatered = true;

      obj.querySelector("img").src = "sprites/interactables/others/plant_watered.png";
      showTextbox("The plant looks healthier now. There is a key under one of the leaves.");

    } else if (activeItemFile) {
      showTextbox("That won't work here.");

    } else {
      showTextbox("A plant. I need to water that at some point.");
    }

  } else {
    showTextbox("The plant seems plenty watered.");
  }
}
