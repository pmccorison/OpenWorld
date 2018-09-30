function PlayerPawn(objectId){
    var self = this;

    self.objectId = objectId;
    self.PosX = 50;
    self.PosY = 50;
}

PlayerPawn.prototype.Update = function(delta){
    // var self = this;

    // do nothing, other things control this object
}

PlayerPawn.prototype.Draw = function(context){
    var self = this;

    context.fillStyle = "blue";
    context.fillRect(self.PosX, self.PosY, 20, 20);
}

export default PlayerPawn
