function Level(){
    var self = this;

    self.children = [];
};

Level.prototype.AddChild = function(newObject){
    var self = this;

    var existingChild = self.children.filter(function(item){
        return item.objectId === newObject.objectId;
    });

    if(existingChild.length === 0){
        self.children.push(newObject);
    }
};

Level.prototype.Update = function(delta){
    var self = this;

    self.children.forEach(child => {
        child.Update(delta);
    });
};

Level.prototype.Draw = function(context){
    var self = this;

    self.children.forEach(child => {
        child.Draw(context);
    });
};

export default Level;
