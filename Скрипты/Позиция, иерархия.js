﻿function AddNamePanel(panel) {
    if (panel.ArtPos.indexOf('(') < 0)
        panel.ArtPos = panel.Designation;
}

function AddNameBlock(block) {
    if ((block.ArtPos.indexOf('(') < 0) && (block.ArtPos.length > 0)){
        system.log("name: " + block.Name);
    }
        block.ArtPos = block.Designation;//.slice(0,2);
}

function InToList(obj) {
    for (var i = 0; i < obj.Count; i++) {
        objChild = obj.Objects[i];
        if ((objChild instanceof TFurnBlock) || (objChild instanceof TLayer3D)) {
            if (objChild instanceof TFurnBlock) {
                //system.log("name: " + objChild.Name);
                AddNameBlock(objChild);                
            }
            InToList(objChild);
        }
        if (obj[i] instanceof TFurnPanel) {
            AddNamePanel(obj[i].AsPanel);
        }
    }
}

for (var i = 0; i < Model.Count; i++) {
    obj = Model.Objects[i];
    if ((obj instanceof TFurnBlock) || (obj instanceof TLayer3D)) {
        if (obj instanceof TFurnBlock) {
            system.log("level 1");
            AddNameBlock(obj);            
        }
        InToList(obj);
    }
    if (obj instanceof TFurnPanel) {
        AddNamePanel(obj.AsPanel);
    }
}
