function AddNamePanel(NumberUnit, panel) {
    if (panel.ArtPos.indexOf('(') < 0)
        panel.ArtPos = panel.Designation;
}

function AddNameBlock(block) {
    if ((block.ArtPos.indexOf('(') < 0) && (block.ArtPos.length > 0))
        block.ArtPos = block.Designation.slice(0,2);
}

function InToList(NumberUnit, obj) {
    for (var i = 0; i < obj.Count; i++) {
        objChild = obj.Objects[i];
        if ((objChild instanceof TFurnBlock) || (objChild instanceof TLayer3D)) {
            if (objChild instanceof TFurnBlock) AddNameBlock(objChild);
            InToList(NumberUnit, objChild);
        }
        if (obj[i] instanceof TFurnPanel) {
            AddNamePanel(NumberUnit, obj[i].AsPanel);
        }
    }
}

for (var i = 0; i < Model.Count; i++) {
    obj = Model.Objects[i];
    NumberUnit = obj.ArtPos;
    if ((obj instanceof TFurnBlock) || (obj instanceof TLayer3D)) {
        if (obj instanceof TFurnBlock) AddNameBlock(obj);
        InToList(NumberUnit, obj);
    }
    if (obj instanceof TFurnPanel) {
        AddNamePanel(NumberUnit, obj.AsPanel);
    }
}
