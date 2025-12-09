// Keeps track of which puzzles have been solved by the player
// One the game has progressed and puzzles are solved, these become true
const puzzleState = {
  computerUnlocked: false,
  ventOpened: false,
  doorUnlocked: false,
  scannerCard: false,
  scannerCode: false,
  scannerForm: false,
  scannerCompleted: false,
  plantWatered: false,
  pictureScrewdriverTaken: false,
  ventGumTaken: false,
  binStripTaken: false,
  chestOpened: false,
  chestIdCardTaken: false

};


// Makes the interactable items clickable
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".officeItemInteractable").forEach(obj => {
    obj.addEventListener("click", () => handleInteractable(obj));
  });
});


// Based on the object's ID, call the function that handles that object's interaction
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

    case "picture":
      handlePicture(obj);
      break;

    case "doorknob":
      handleDoorknob(obj);
      break;

    case "bin":
      handleTrashcan(obj);
      break;

    case "chest":
      handleChest(obj);
      break

    default:
      // For anything and everything that has not been added
      showTextbox("Doesn't seem like I'm able to do anything with that...");
  }
}

// Picture
function handlePicture(obj) {
  if (!puzzleState.pictureScrewdriverTaken) {

    const gotTool = addToInventory("sprites/items/screwdriver.png");

    if (gotTool) {
      puzzleState.pictureScrewdriverTaken = true;
      showTextbox("There was a screwdriver taped behind the photo. Handy.");

      // TODO: change the photo sprite

      // uncomment the below here with the correct png name
      // obj.querySelector("img").src = "sprites/interactables/others/"Enter new png here".png";
    } else {
      showTextbox("Looks like there’s something behind the photo, but I can’t carry anything else.");
    }

  } else {
    showTextbox("Just an ordinary photo now. I already grabbed what was behind it.");
  }
}

// Vent
function handleVent(obj) {
  // if vent is still closed
  if (!puzzleState.ventOpened) {

    // Use screwdriver to open vent
    if (activeItemFile === "screwdriver.png") { // When screwdriver is the active item
      puzzleState.ventOpened = true;

      // TODO: change the photo sprite

      // uncomment the below here with the correct png name
      // obj.querySelector("img").src = "sprites/interactables/others/"Enter new png here".png";

      showTextbox("You remove the vent cover. There is no vent behind it, but there is something taped to the inside.");

      // Consume the screwdriver, and unselect the slot
      if (activeItemSlot) {
        unselectSlot(activeItemSlot);
        activeItemSlot.innerHTML = "";
        activeItemSlot.classList.remove("slot-has-item");
      }
      activeItemSlot = null;
      activeItemFile = null;
      document.body.classList.remove("grabbing");

      // Try to give the wrapped gum to the player
      const gotGum = addToInventory("sprites/items/gum_wrapped.png"); 

      if (gotGum) {
        puzzleState.ventGumTaken = true;
        showTextbox("You peel off the tape and grab a piece of gum. You think about questioning just how it ended up there.. But decide to let it go.");
      } else {
        showTextbox("It seems like there is gum taped inside, but I can’t carry anything else right now.");
      }

    } else if (activeItemFile) {
      showTextbox("This is not going to work.");
    } else {
      showTextbox("A screwed-in vent cover. I'm not sure what could be behind there, but I would need to somehow unscrew it first.");
    }

    return;
  }

  // if vent is already open
  if (!puzzleState.ventGumTaken) {
    // Player opened it earlier but inventory was full
    const gotGum = addToInventory("sprites/items/gum_wrapped.png");

    if (gotGum) {
      puzzleState.ventGumTaken = true;
      showTextbox("You grab the gum that was taped inside the vent.");
    } else {
      showTextbox("The gum is still there, but I can’t carry anything else.");
    }

  } else {
    showTextbox("Just an open vent. Nothing left inside.");
  }
}


// Computer
function handleComputer(obj) {
  if (!puzzleState.computerUnlocked) {

    const code = prompt("Enter the 4-digit code:");

    if (code === "1983") {
      puzzleState.computerUnlocked = true;
      obj.querySelector("img").src = "sprites/interactables/computer/computer_code3.png"; // Set this to code 3 as I didn't understand what was code 3 img was suggesting
      showTextbox("The computer unlocks. Nice.");                                         // TODO: change this if you like? But just remember to also change the affected lines
    } else {
      showTextbox("I forgot my code again? Great. I believe I had a copy of it somewhere...");
    }

  } else {
    showTextbox("The computer is already unlocked.");
  }
}


// Keyhole
function handleKeyhole(obj) {
  if (!puzzleState.doorUnlocked) {

    // Use the key on the lock
    if (activeItemFile === "keys.png") { // When keys are the active item
      puzzleState.doorUnlocked = true;

      obj.querySelector("img").style.transform = 'scaleX(-1)';
      showTextbox("The key turns with a satisfying click. The lock should be open now.");

      // Don't consume the keys, but deselect them
      if (activeItemSlot) {
        unselectSlot(activeItemSlot);
      }
      activeItemSlot = null;
      activeItemFile = null;
      document.body.classList.remove("grabbing");


    } else if (activeItemFile) {
      showTextbox("That key doesn't fit this lock.");

    } else {
      showTextbox("The door is locked.. Company policy.");
    }

  } else {
    showTextbox("The lock is already open.");
  }
}

// Doorknob
function handleDoorknob(obj) {
  // Need both the scanner AND the lock done to leave

  if (!puzzleState.scannerCompleted && !puzzleState.doorUnlocked) {
    showTextbox("The handle doesn’t budge. Looks like the lock and scanner are both still active.");
    return;
  }

  if (!puzzleState.scannerCompleted) {
    showTextbox("The lock might be open, but the scanner light is still red. I can’t leave yet.");
    return;
  }

  if (!puzzleState.doorUnlocked) {
    showTextbox("Scanner’s green, but the physical lock is still in place.");
    return;
  }

  showTextbox("I grab the handle and step out into freedom. Break time, finally.");

  // Calls the win function
  if (typeof handleGameWin === "function") {
    handleGameWin();
  }
}


// Scanner
function handleScanner(obj) {
  // Update completion
  puzzleState.scannerCompleted = puzzleState.scannerCard && puzzleState.scannerCode && puzzleState.scannerForm;

  // If it is fully done already, just say so 
  if (puzzleState.scannerCompleted) {
    obj.querySelector("img").src =
      "sprites/interactables/scanner/scanner_yes.png";
    showTextbox("The scanner is already unlocked.");
    return;
  }

  const imgEl = obj.querySelector("img");

  // If the player is holding an item to use on the scanner
  if (activeItemFile) {

    if (activeItemFile === "idcard.png") { // When the idcard is the active item
      puzzleState.scannerCard = true;

      imgEl.src = "sprites/interactables/scanner/scanner_yes.png";
      showTextbox("Your ID card scans successfully.");

      // Consume the card and clear selection
      if (activeItemSlot) {
        // remove  selected
        unselectSlot(activeItemSlot);

        // remove its contents
        activeItemSlot.innerHTML = "";
        activeItemSlot.classList.remove("slot-has-item");
      }

      activeItemSlot = null;
      activeItemFile = null;
      document.body.classList.remove("grabbing");

      // Update completion
      puzzleState.scannerCompleted =
      puzzleState.scannerCard &&
      puzzleState.scannerCode &&
      puzzleState.scannerForm;

      if (puzzleState.scannerCompleted) {
        showTextbox("I think.. I think that was it!. I can finally take that well needed break!");
      }

      setTimeout(() => {
        imgEl.src = "sprites/interactables/scanner/scanner.png";
      }, 2000);
      return;
    }

    if (activeItemFile === "form_complete.png") {
      puzzleState.scannerForm = true;

      imgEl.src = "sprites/interactables/scanner/scanner_yes.png";
      showTextbox("Your paperwork has been accepted.");

      // Consume the card and clear selection
      if (activeItemSlot) {
        // remove  selected
        unselectSlot(activeItemSlot);

        // remove its contents
        activeItemSlot.innerHTML = "";
        activeItemSlot.classList.remove("slot-has-item");
      }

      // Update completion
        puzzleState.scannerCompleted =
        puzzleState.scannerCard &&
        puzzleState.scannerCode &&
        puzzleState.scannerForm;

      if (puzzleState.scannerCompleted) {
        showTextbox("I think.. I think that was it!. I can finally take that well needed break!");
      }

      setTimeout(() => {
        imgEl.src = "sprites/interactables/scanner/scanner.png";
      }, 2000);
      return;
    }

    showTextbox("Wrong item.");
    return;
  }

  // If the player is not holding an item, then allow code entry prompt 
  const code = prompt("Enter the 4-digit code:");

  if (code === "3235") {
    puzzleState.scannerCode = true;
    imgEl.src = "sprites/interactables/scanner/scanner_yes.png";
    showTextbox("Correct door code.");

  } else {
    imgEl.src = "sprites/interactables/scanner/scanner_no.png";
    showTextbox("Wrong code. The scanner beeps red at you and stays locked.");
  }

  // Update completion
    puzzleState.scannerCompleted =
    puzzleState.scannerCard &&
    puzzleState.scannerCode &&
    puzzleState.scannerForm;

  if (puzzleState.scannerCompleted) {
    showTextbox("I think.. I think that was it!. I can finally take that well needed break!");
  }

  setTimeout(() => {
    imgEl.src = "sprites/interactables/scanner/scanner.png";
  }, 2000);
}


// Plant Interaction 
function handlePlant(obj) {
  if (!puzzleState.plantWatered) {

    if (activeItemFile === "bottle.png") { // When the active item is the waterbottle
      // Try to give the player the keys
      const gotKeys = addToInventory("sprites/items/keys.png");

      if (gotKeys) {
        // Mark as completed, the plant is now healthy and the keys taken
        puzzleState.plantWatered = true;

        // Change sprite to that of the plant of the living
        obj.querySelector("img").src =
          "sprites/interactables/others/plant_alive.png";

        showTextbox(
          "A bit of water goes a long way. There is a set of keys tucked under the leaves."
        );

        // Consume the bottle
        if (activeItemSlot) {
          // remove selected
          unselectSlot(activeItemSlot);

          // remove its contents
          activeItemSlot.innerHTML = "";
          activeItemSlot.classList.remove("slot-has-item");
        }
        activeItemSlot = null;
        activeItemFile = null;
        document.body.classList.remove("grabbing");

      } else {
        // Inventory is full, don’t mark puzzle as done yet and let player try again
        showTextbox(
          "I think there’s a keyring under the leaves, but my hands are full. I should make some space first."
        );
      }

    } else if (activeItemFile) {
      // Holding some other item
      showTextbox("I don’t think that’s going to help this plant.");

    } else {
      // Not holding any item
      showTextbox("A sad, thirsty plant. Maybe I can water it with something.");
    }

  } else {
    // Already watered and looted
    showTextbox("The plant looks much happier now. Or well, alive really.");
  }
}



// Trashcan
function handleTrashcan(obj) {
  if (!puzzleState.binStripTaken) {

    const gotStrip = addToInventory("sprites/items/codes/code_strip1.png");

    if (gotStrip) {
      puzzleState.binStripTaken = true;
      showTextbox("Digging through the trash... gross. But hey, I think I found my code!");
    } else {
      showTextbox("I see something in there, but I'm full up on junk right now.");
    }

  } else {
    showTextbox("No. I'm not doing that again.");
  }
}

// Chest
function handleChest(obj) {
  // If chest is already opened
  if (puzzleState.chestOpened && puzzleState.chestIdCardTaken) {
    showTextbox("The chest is empty now. Nothing else left inside.");
    return;
  }

  // If player attempts to open chest while holding the needed key
  if (!puzzleState.chestOpened) {
    if (activeItemFile === "keys.png") { // When the active item is the keys
      // Unlock chest
      puzzleState.chestOpened = true;

      // TODO: change the photo sprite

      // uncomment the below here with the correct png name
      // obj.querySelector("img").src = "sprites/interactables/others/"Enter new png here".png";

      showTextbox("The keys fit perfectly. The chest unlocks with a soft click.");

      if (activeItemSlot) {
        // remove selected, but we want to keep the keys to use elsewhere
        unselectSlot(activeItemSlot);
      }
      activeItemSlot = null;
      activeItemFile = null;
      document.body.classList.remove("grabbing");

      return;
    }

    if (activeItemFile) {
      showTextbox("The chest is locked tight. Whatever you're holding isn't helping.");
    } else {
      showTextbox("A small locked chest. I might need a key.");
    }

    return;
  }

  // Chest is open but id card has not been taken yet
  if (!puzzleState.chestIdCardTaken) {
    const gotCard = addToInventory("sprites/items/idcard.png");

    if (gotCard) {
      puzzleState.chestIdCardTaken = true;
      showTextbox("Inside the chest... my ID card! I thought I lost this yesterday.");
    } else {
      showTextbox("The ID card is sitting inside, but my inventory is full.");
    }

    return;
  }
}

