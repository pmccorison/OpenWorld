import InputHandler from '../controllers/KeyHandler.js'
import PlayerEventChannel from '../eventchannels/PlayerEventChannel.js'

function PlayerController(playerPawn){
    var self = this;

    self.movementSpeed = 0.35;

    self.PlayerPawn = playerPawn;

    PlayerEventChannel.Connect("Test123");
};

PlayerController.prototype.Update = function(delta){
    var self = this;

    if(InputHandler.IsKeyDown(38)){
        self.PlayerPawn.PosY -= self.movementSpeed * delta;
    }
    if(InputHandler.IsKeyDown(40)){
        self.PlayerPawn.PosY += self.movementSpeed * delta;
    }
    if(InputHandler.IsKeyDown(39)){
        self.PlayerPawn.PosX += self.movementSpeed * delta;
    }
    if(InputHandler.IsKeyDown(37)){
        self.PlayerPawn.PosX -= self.movementSpeed * delta;
    }
};

window.addEventListener('keydown', function(event){

});

window.addEventListener('keyup', function(event){

});

export default PlayerController;
