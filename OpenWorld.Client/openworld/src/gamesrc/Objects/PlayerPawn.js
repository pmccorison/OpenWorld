function PlayerPawn(objectId, playerId){
    var self = this;

    self.objectId = objectId;
    self.LocX = 50;
    self.LocY = 50;
    self.LocZ = 0;
    self.playerId = playerId;
}

PlayerPawn.prototype.Update = function(delta){
    // var self = this;

    // do nothing, other things control this object
}

PlayerPawn.prototype.UpdateState = function(stateItem){
    var self = this;
    self.LocX = stateItem.locX;
    self.LocY = stateItem.locY;
    self.LocZ = stateItem.locZ;
}

PlayerPawn.prototype.Draw = function(context){
    var self = this;

    context.fillStyle = "blue";
    context.fillRect(self.LocX, self.LocY, 20, 20);
}

export default PlayerPawn
