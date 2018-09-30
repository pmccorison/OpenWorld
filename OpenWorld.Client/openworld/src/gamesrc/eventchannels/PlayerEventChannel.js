const signalR = require("@aspnet/signalr");

function PlayerEventChannel(){
    var self = this;

    self.playerId = "";
    self.connection = null;
    self.isConnected = false;

    self.playerStateObject = null;

    self.networkEventSubscribers = {};
}

PlayerEventChannel.prototype.Connect = function(playerId){
    var self = this;

    self.playerId = playerId;

    return new Promise(function(resolve, reject){
        //connect to signalr with the specified player id
        self.connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:44314/PlayerEvents").build();
    
        self.connection.on("RecieveClientData", function(clientStatesRecieved){
            //console.log("here");
            self.HandleServerEvent(clientStatesRecieved);
        });

        self.connection.on("ConnectionResult", function(stateObject){
            //handle connection response
            self.playerStateObject = stateObject;
            resolve();
        });

        self.connection.on("ConnectionFailed", function(){
            reject(new Error("Unable to register with the server."));
        })
    
        self.connection.start().then(function(){
            self.isConnected = true;
            self.connection.invoke("ConnectPlayer", self.playerId, "none");
        }).catch(function(err){
            console.log(err);
        });
    
        setInterval(function(){
            self.SendDataToServer();
        }, 20);
    });
}

PlayerEventChannel.prototype.SendDataToServer = function(){
    var self = this;

    if(self.isConnected && self.playerStateObject){
        self.connection.invoke("UpdateClientEvents", self.playerStateObject);
    }
}

PlayerEventChannel.prototype.HandleServerEvent = function(clientStatesRecieved){
    var self = this;

    var nonSelfStates = clientStatesRecieved.filter(function(item){
        return item.playerId !== self.playerId;
    });

    if(nonSelfStates.length > 0){
        for (var property in self.networkEventSubscribers) {
            if (self.networkEventSubscribers.hasOwnProperty(property)) {
                // do stuff
                self.networkEventSubscribers[property](nonSelfStates);
            }
        }
    }
}

PlayerEventChannel.prototype.UpdateCurrentPlayerPosition = function(LocX, LocY, LocZ){
    var self = this;

    self.playerStateObject.LocX = LocX;
    self.playerStateObject.LocY = LocY;
    self.playerStateObject.LocZ = LocZ;
}

PlayerEventChannel.prototype.QueueEvent = function(){

}

PlayerEventChannel.prototype.GetServerData = function(){

}

PlayerEventChannel.prototype.Subscribe = function(object, method){
    var self = this;

    self.networkEventSubscribers[object] = method;
}

if(!window.PlayerEventChannel){
    window.PlayerEventChannel = new PlayerEventChannel();
}

export default window.PlayerEventChannel;
