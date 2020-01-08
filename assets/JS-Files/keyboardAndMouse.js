

function keyTyped() {
  if (scene === "editor") {
    if(edditorMenu === "map"){
      if (doorWorldId.focused) {
        doorWorldId.updateText(key)
      }

      if (doorOutId.focused) {
        doorOutId.updateText(key)
      }

      if (doorId.focused) {
        doorId.updateText(key)
      }
      
      if (doorOutDirection.focused) {
        doorOutDirection.updateText(key)
      }
    }
    
    if (edditorMenu === "items") {
      for (let i = 0; i < itemEdditorTextBoxes.length; i++) {
        if (itemEdditorTextBoxes[i].focused) {
          itemEdditorTextBoxes[i].updateText(key)
        }
      }
    }
    if (edditorMenu === "newMap") {
      for (let i = 0; i < newMapEditorTextbox.length; i++) {
        if (newMapEditorTextbox[i].focused) {
          newMapEditorTextbox[i].updateText(key)
        }
      }
    }
  }
}

function keyPressed() {
  if (key === "t") {
    showDebug = !showDebug
  }

  if (keyCode === ESCAPE && scene !== "menu") {
    paused = !paused
  }

  if (scene === "editor") {
    if(edditorMenu === "map"){
      if(selectedTextureList === "doors"){
        
        if (doorWorldId.focused) {
          if (keyCode === BACKSPACE) {
            doorWorldId.textBackspace()
          }
          if (keyCode === ENTER) {
            doorWorldId.setMax();
          }
        }
        
        if (doorOutId.focused) {
          if (keyCode === BACKSPACE) {
            doorOutId.textBackspace()
          }
          if (keyCode === ENTER) {
            doorOutId.setMax();
          }
        }
        
        if (doorId.focused) {
          if (keyCode === BACKSPACE) {
            doorId.textBackspace()
          }
          if (keyCode === ENTER) {
            doorId.setMax();
          }
        }

        if (doorOutDirection.focused) {
          if (keyCode === BACKSPACE) {
            doorOutDirection.textBackspace()
          }
          if (keyCode === ENTER) {
            doorOutDirection.setMax();
          }
        }
      }
    }

    if (edditorMenu === "items") {
      for (let i = 0; i < itemEdditorTextBoxes.length; i++) {
        if (itemEdditorTextBoxes[i].focused) {
          if (keyCode === BACKSPACE) {
            itemEdditorTextBoxes[i].textBackspace()
          }
          if (keyCode === ENTER) {
            itemEdditorTextBoxes[i].setMax();
          }
        }
      }
    }

    if (edditorMenu === "newMap") {
      for (let i = 0; i < newMapEditorTextbox.length; i++) {
        if (newMapEditorTextbox[i].focused) {
          if (keyCode === BACKSPACE) {
            newMapEditorTextbox[i].textBackspace()
          }
          if (keyCode === ENTER) {
            newMapEditorTextbox[i].setMax();
          }
        }
      }
    }
  }
  if (scene === "game") {
    if (key === "e" && !paused) {
      Player.Inv.invOpen = !Player.Inv.invOpen;
      if(Player.Inv.selectedTile !== undefined){
        Player.Inv.selectedTile.selected = false;
        Player.Inv.selectedTile = undefined;
      }
      
      canMove = !Player.Inv.invOpen;
    }
    if(key === 'f'){
      Player.pickUpItem(mapList[currentMap].grid)
    }
  }
}

function mouseClicked() {
  let mouseOnUi = false;
  if (scene === "editor") {
    mouseOnUi = false;
    for (let j = 0; j < edditorUiBackground.length; j++) {
      if (edditorUiBackground[j].mouseOverUi()) {
        mouseOnUi = true
      }
    }
    if (edditorMenu === "map") {
      if(edditorMapMenuButtons[0].mouseOn()){
        edditorMapMenu = "tiles"
        brushMode = "Single"
      }
      if(edditorMapMenuButtons[1].mouseOn()){
        edditorMapMenu = "items"
        brushMode = "ItemSpawnAdd"
      }

      if(edditorMapMenu === "tiles"){
        //select what tile to paint//
        if(mapSelectionButtons[0].mouseOn()){
          selectedTextureList = "maps";
        }

        if(mapSelectionButtons[1].mouseOn()){
          selectedTextureList = "outside";
        }

        if(mapSelectionButtons[4].mouseOn()){
          selectedTextureList = "doors";
        }

        if(selectedTextureList === "outside"){
          if(outsideTextureList.mouseOn() !== undefined){
            selectedTexture = outsideTextureList.mouseOn().tile;
          }
        }

        if(selectedTextureList === "doors"){
          if(doorTextureList.mouseOn() !== undefined){
            selectedTexture = doorTextureList.mouseOn().tile;
          }
          doorWorldId.mouseOn()
          doorOutId.mouseOn()
          doorId.mouseOn()
          doorOutDirection.mouseOn()
        }

        if(selectedTextureList === "maps"){
          if(mapSelectorList.mouseOn() !== undefined){
            currentMap = mapSelectorList.mouseOn();
          }
        }

        //select brush bode//
        for (let i = 0; i < edditorBrushes.length; i++) {
          if (edditorBrushes[i].mouseOn()) {
            brushMode = edditorBrushes[i].name
            brush = null;
            canMove = true;
          }
        }
  
        //area Brush//
        if (brushMode === "Area") {
          if (!mouseOnUi) {
            if (brush === null) {
              brush = new areaBrush(mouseX, mouseY)
              canMove = false;
            }
            else {
              brush.updateSize(mouseX, mouseY)
              brush.changeTiles(mapList[currentMap].grid);
              brush = null;
              canMove = true;
            }
          }
        }
      }

      //select item spawn point//
      if(edditorMapMenu === "items"){
        if(edditorItemButtons[0].mouseOn()){
          brushMode = "ItemSpawnAdd"
        }
        if(edditorItemButtons[1].mouseOn()){
          brushMode = "ItemSpawnRemove"
        }
        if(edditorItemButtons[2].mouseOn()){
          randomOnlyItems = true;
          customOnlyItems = false;
        }
        
        if(edditorItemButtons[3].mouseOn()){
          randomOnlyItems = false;
          customOnlyItems = true;
        }
        if(edditorItemButtons[4].mouseOn()){
          randomOnlyItems = false;
          customOnlyItems = false;
        }
        if(edditorItemButtons[5].mouseOn()){
          customItem = null;
        }
        if(customItemList.mouseOn() !== undefined){
          customItem = customItemList.mouseOn()
          console.log('item updated')
        }
      }

    }
    if (edditorMenu === "items") {
      for (let i = 0; i < itemEdditorTextBoxes.length; i++) {
        itemEdditorTextBoxes[i].mouseOn()
      }
      
      if (itemCreatorType === "sword") {
        if (itemEdditorSwordIconButtons.mouseOn()) {
          itemEdditorDemoIcon.image = itemEdditorSwordIconButtons.mouseOn().image
        }
      }
      if (itemCreatorType === "bow") {
        if (itemEdditorBowIconButtons.mouseOn()) {
          itemEdditorDemoIcon.image = itemEdditorBowIconButtons.mouseOn().image
        }
      }
      if (itemCreatorType === "staff") {
        if (itemEdditorStaffIconButtons.mouseOn()) {
          itemEdditorDemoIcon.image = itemEdditorStaffIconButtons.mouseOn().image
        }
      }
      if (itemCreatorType === "potion") {
        if (itemEdditorPotionIconButtons.mouseOn()) {
          itemEdditorDemoIcon.image = itemEdditorPotionIconButtons.mouseOn().image
        }
      }

      if (itemEdditorButtons[0].mouseOn()) { //new bow button//
        itemCreatorType = "sword";

        itemEdditorDemoIcon.image = itemEdditorSwordIconButtons.buttons[0].image

        itemEdditorText[0].textData = "Attack Range"
        itemEdditorText[1].textData = "Attack Speed"
        itemEdditorText[2].textData = "Damage"
      }
      if (itemEdditorButtons[1].mouseOn()) { //new bow button//
        itemCreatorType = "bow";

        itemEdditorDemoIcon.image = itemEdditorBowIconButtons.buttons[0].image

        itemEdditorText[0].textData = "Range"
        itemEdditorText[1].textData = "Draw Speed"
        itemEdditorText[2].textData = "Damage"
      }
      if (itemEdditorButtons[2].mouseOn()) { //new staff button//
        itemCreatorType = "staff";

        itemEdditorDemoIcon.image = itemEdditorStaffIconButtons.buttons[0].image

        itemEdditorText[0].textData = "Cast Range"
        itemEdditorText[1].textData = "Cast Speed"
        itemEdditorText[2].textData = "Damage"
      }
      if (itemEdditorButtons[3].mouseOn()) { //new Potion button//
        itemCreatorType = "potion";

        itemEdditorDemoIcon.image = itemEdditorPotionIconButtons.buttons[0].image

        itemEdditorText[0].textData = "Duration"
        itemEdditorText[1].textData = "Affect"
        itemEdditorText[2].textData = "Strength"
      }
      if (itemEdditorButtons[4].mouseOn()) { //saveItem button//
        if(itemCreatorType === "sword"){
          worldItems[0].push(itemCreator(itemCreatorType));
        }
        if(itemCreatorType === "bow"){
          worldItems[1].push(itemCreator(itemCreatorType));
        }
        if(itemCreatorType === "staff"){
          worldItems[2].push(itemCreator(itemCreatorType));
        }
        if(itemCreatorType === "potion"){
          worldItems[3].push(itemCreator(itemCreatorType));
        }
        customItemList.update();
      }
      if (itemEdditorButtons[5].mouseOn()){
        for(let i = 0; i< worldItems.length; i++){
          if(worldItems[i].includes(customItem)){
            worldItems[i].splice(worldItems[i].indexOf(customItem),1)
            customItemList.update();
          }
        }
      }
      
      if(customItemList.mouseOn() !== undefined){
        customItem = customItemList.mouseOn()
      }
    }

    if (edditorMenu === "newMap") {
      for (let i = 0; i < newMapEditorTextbox.length; i++) {
        newMapEditorTextbox[i].mouseOn()
      }
      if(newMapEditorButtons[0].mouseOn()){
        mapList.push(new GridGen(newMapEditorTextbox[0].returnAsNum(), newMapEditorTextbox[1].returnAsNum(), 64, textures[1]))
        mapSelectorList.update()
      }
      if(newMapEditorButtons[1].mouseOn()){
        if(mapList.length > 1){
          mapList.splice(currentMap, 1)
          currentMap = 0;
          mapSelectorList.update()
        }
      }

      if(mapSelectorList.mouseOn() !== undefined){
        currentMap = mapSelectorList.mouseOn();
      }
    }
    //save load//UPDATE FOR 2D ARRAY
    if (Buttons[0].mouseOn()) { //save//
      saveLoad = []
      for (let y = 0; y < mapList[0].grid.length; y++) {
        for (let x = 0; x < mapList[0].grid[y].length; x++) {
          mapList[0].grid[y][x].save(saveLoad)
        }
      }
      console.log("saved");
      var JsonSave = {
        saveData: saveLoad,
      }
      saveJSON(JsonSave, "MapSaveData");
    }

    if (Buttons[1].mouseOn()) { //load//
      //make better//
      loadJSON("assets/MapSaveData.json", loadMap)
    }
    if (Buttons[2].mouseOn()) { //load//
      //make better//
      loadMap(json);
    }

    //select edditor mode//
    if (edditorMenuButtons[0].mouseOn()) { //tiles
      edditorMenu = "map"
      mapOffsetX = 0;
      mapOffsetY = 0;
    }

    if (edditorMenuButtons[1].mouseOn()) { //new Map
      edditorMenu = "newMap"
      mapOffsetX = 0;
      mapOffsetY = 0;
    }

    if (edditorMenuButtons[2].mouseOn()) { //items
      edditorMenu = "items"
      mapOffsetX = 0;
      mapOffsetY = 0;
    }
  }

  if(scene === "game"){
    if(Player.Inv.invOpen){
      Player.Inv.mouseOn()
    }
  }

  if (scene === "menu") {
    if (menuButtons[0].mouseOn()) {
      resetVals()
      scene = "editor";
    }
    if (menuButtons[1].mouseOn()) {
      resetVals()
      startGame()
      scene = "game";
    }
  }

  if (paused) {
    if (resumeButton.mouseOn()) {
      paused = false;
    }
    if (backButton.mouseOn()) {
      scene = "menu";
      resetVals();
    }
  }
}