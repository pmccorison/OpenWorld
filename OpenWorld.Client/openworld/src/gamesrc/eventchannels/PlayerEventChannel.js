const signalR = require("@aspnet/signalr");

function PlayerEventChannel(){
    var self = this;

    self.playerId = "";
    self.connection = null;
    self.isConnected = false;
}

PlayerEventChannel.prototype.Connect = function(playerId){
    var self = this;

    self.playerId = playerId;

    //connect to signalr with the specified player id
    self.connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:44314/PlayerEvents").build();

    self.connection.on("RecieveClientData", function(clientStatesRecieved){
        //console.log("here");
        self.HandleServerEvent(clientStatesRecieved);
    });

    self.connection.start().then(function(){
        self.isConnected = true;
    }).catch(function(err){
        console.log(err);
    });

    setInterval(function(){
        self.SendDataToServer();
    }, 100);
}

PlayerEventChannel.prototype.SendDataToServer = function(){
    var self = this;

    if(self.isConnected){
        //console.log("sending data to server");

        self.connection.invoke("UpdateClientEvents", self.playerId);
    }
}

PlayerEventChannel.prototype.HandleServerEvent = function(clientStatesRecieved){
    //console.log(clientStatesRecieved);
}

PlayerEventChannel.prototype.QueueEvent = function(){

}

PlayerEventChannel.prototype.GetServerData = function(){

}

if(!window.PlayerEventChannel){
    window.PlayerEventChannel = new PlayerEventChannel();
}

export default window.PlayerEventChannel;
