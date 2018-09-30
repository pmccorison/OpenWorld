import InputHandler from '../controllers/KeyHandler.js'
import PlayerEventChannel from '../eventchannels/PlayerEventChannel'

function PlayerController(playerPawn){
    var self = this;

    self.movementSpeed = 0.35;

    self.PlayerPawn = playerPawn;
};

PlayerController.prototype.Update = function(delta){
    var self = this;

    if(InputHandler.IsKeyDown(38)){
        self.PlayerPawn.LocY -= self.movementSpeed * delta;
    }
    if(InputHandler.IsKeyDown(40)){
        self.PlayerPawn.LocY += self.movementSpeed * delta;
    }
    if(InputHandler.IsKeyDown(39)){
        self.PlayerPawn.LocX += self.movementSpeed * delta;
    }
    if(InputHandler.IsKeyDown(37)){
        self.PlayerPawn.LocX -= self.movementSpeed * delta;
    }
    PlayerEventChannel.UpdateCurrentPlayerPosition(self.PlayerPawn.LocX, self.PlayerPawn.LocY, self.PlayerPawn.LocZ);
};

window.addEventListener('keydown', function(event){

});

window.addEventListener('keyup', function(event){

});

export default PlayerController;
