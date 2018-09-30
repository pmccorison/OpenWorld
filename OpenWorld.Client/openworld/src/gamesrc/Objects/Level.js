import PlayerEventChannel from '../eventchannels/PlayerEventChannel'
import PlayerPawn from './PlayerPawn';
import ObjectIdGenerator from '../ObjectIdGenerator'

function Level(){
    var self = this;

    self.children = [];

    PlayerEventChannel.Subscribe(self, function(pawnStates){
        self.UpdateOtherPawns(pawnStates);
    });
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

Level.prototype.UpdateOtherPawns = function(pawnStates){
    var self = this;

    pawnStates.forEach(state => {
        var existingChildPawn = self.children.filter(function(stateItem){
            return stateItem.playerId === state.playerId;
        });

        if(existingChildPawn.length > 0){
            existingChildPawn[0].UpdateState(state);
        } else {
            var newPawn = new PlayerPawn(ObjectIdGenerator.GenerateId(), state.playerId);
            newPawn.UpdateState(state);
            self.AddChild(newPawn);
        }
    })
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
