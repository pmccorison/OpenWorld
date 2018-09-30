import Level from '../gamesrc/objects/Level.js'
import PlayerPawn from '../gamesrc/objects/PlayerPawn.js'
import InputHandler from '../gamesrc/controllers/KeyHandler.js'
import ObjectIdGenerator from '../gamesrc/ObjectIdGenerator.js'
import PlayerController from './controllers/PlayerController.js';

function GameRoot(canvasId){
    var self = this;

    self.lastFrameTimeMs = 0;
    self.maxFPS = 300;
    self.delta = 0;
    self.timestep = 1000 / 60;
    self.fps = 60;
    self.framesThisSecond = 0;
    self.lastFpsUpdate = 0;
    self.running = false;
    self.started = false;
    self.frameID = 0;

    self.canvas = document.getElementById(canvasId);
    self.canvasContext = self.canvas.getContext("2d");

    self.Level = new Level();

    var currentPlayerPawn = new PlayerPawn(ObjectIdGenerator.GenerateId());

    self.PlayerController = new PlayerController(currentPlayerPawn);

    self.Level.AddChild(currentPlayerPawn);
}

GameRoot.prototype.__Update = function(delta) {
    var self = this;

    self.PlayerController.Update(delta);

    self.Level.Update(delta);

    InputHandler.ClearPressedStates();
}

GameRoot.prototype.__Draw = function(interp) {
    var self = this;
    self.canvasContext.clearRect(0, 0, self.canvas.width, self.canvas.height);

    self.Level.Draw(self.canvasContext);

    self.canvasContext.font = "20px Arial";
    self.canvasContext.fillStyle = "black";
    self.canvasContext.fillText("FPS: " + Math.round(self.fps), 10, 30);
}

GameRoot.prototype.__Panic = function() {
    var self = this;
    self.delta = 0;
}

GameRoot.prototype.__Begin = function() {

}

GameRoot.prototype.__End = function(fps) {
    
}

GameRoot.prototype.Start = function(){
    var self = this;

    if (!self.started) {
        self.started = true;
        self.frameID = requestAnimationFrame(function(timestamp) {
            self.__Draw(1);
            self.running = true;
            self.lastFrameTimeMs = timestamp;
            self.lastFpsUpdate = timestamp;
            self.framesThisSecond = 0;
            self.frameID = requestAnimationFrame(function(newTimestamp){
                self.__MainLoop(newTimestamp);
            });
        });
    }
}

GameRoot.prototype.Stop = function() {
    var self = this;
    self.running = false;
    self.started = false;
    cancelAnimationFrame(self.frameID);
}

GameRoot.prototype.__MainLoop = function(timestamp) {
    var self = this;

    // Throttle the frame rate.    
    if (timestamp < self.lastFrameTimeMs + (1000 / self.maxFPS)) {
        self.frameID = requestAnimationFrame(function(newTimestamp){
            self.__MainLoop(newTimestamp);
        });
        return;
    }
    self.delta += timestamp - self.lastFrameTimeMs;
    self.lastFrameTimeMs = timestamp;

    self.__Begin(timestamp, self.delta);

    if (timestamp > self.lastFpsUpdate + 1000) {
        self.fps = 0.25 * self.framesThisSecond + 0.75 * self.fps;

        self.lastFpsUpdate = timestamp;
        self.framesThisSecond = 0;
    }
    self.framesThisSecond++;

    var numUpdateSteps = 0;
    while (self.delta >= self.timestep) {
        self.__Update(self.timestep);
        self.delta -= self.timestep;
        if (++numUpdateSteps >= 240) {
            self.__Panic();
            break;
        }
    }

    self.__Draw(self.delta / self.timestep);

    self.__End(self.fps);

    self.frameID = requestAnimationFrame(function(newTimestamp){
        self.__MainLoop(newTimestamp);
    });
}

export default GameRoot;
