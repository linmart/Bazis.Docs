﻿function AddNamePanel(panel) {
    if (panel.ArtPos.indexOf('(') < 0)
        panel.ArtPos = panel.Designation;
}

function AddNameBlock(block, level) {
    if ((block.ArtPos.indexOf('(') < 0) && (block.ArtPos.length > 0)){
        system.log("name: " + block.Name);
    }
    if (level == 1) block.ArtPos = block.Designation.slice(0,2);
    if (level == 2) block.ArtPos = block.Designation.slice(0,5);
}

function InToList(obj, level) {
    for (var i = 0; i < obj.Count; i++) {
        objChild = obj.Objects[i];
        if ((objChild instanceof TFurnBlock) || (objChild instanceof TLayer3D)) {
            if (objChild instanceof TFurnBlock) {
                AddNameBlock(objChild, level);                
            }
            InToList(objChild, level+1);
        }
        if (obj[i] instanceof TFurnPanel) {
            AddNamePanel(obj[i].AsPanel);
        }
    }
}

for (var i = 0; i < Model.Count; i++) {
    var level = 1;
    obj = Model.Objects[i];
    if ((obj instanceof TFurnBlock) || (obj instanceof TLayer3D)) {
        if (obj instanceof TFurnBlock) {
            AddNameBlock(obj, level);            
        }
        InToList(obj, level+1);
    }
    if (obj instanceof TFurnPanel) {
        AddNamePanel(obj.AsPanel);
    }
}
