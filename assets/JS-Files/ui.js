

function itemEdditorUi(){
    for(let i = 0; i < itemEdditorButtons.length; i++){
      itemEdditorButtons[i].draw()
    }
    for(let i = 0; i < itemEdditorTextBoxes.length; i++){
      itemEdditorTextBoxes[i].draw()
    }
    for(let i = 0; i < itemEdditorText.length; i++){
      itemEdditorText[i].draw()
    }
    if(itemCreatorType === "sword"){
      for(let i = 0; i < itemEdditorSwordIconButtons.length; i++){
        itemEdditorSwordIconButtons[i].draw()
      }
    }
    itemEdditorDemoIcon.draw()
  }
  
  function edditorUi(){
    for(let i = 0; i < edditorUiBackground.length; i++){
      edditorUiBackground[i].draw()
    }
    for(let i = 0; i < edditorMenuButtons.length; i++){
      edditorMenuButtons[i].draw()
    }
    for(let i = 0; i < Buttons.length; i++){
      Buttons[i].draw()
    }
  }