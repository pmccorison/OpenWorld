function InputHandler(){
    var self = this;

    self.keyStates = [];
};

InputHandler.prototype.KeyPressed = function(keyCode){
    var self = this;

    var foundKey = self.keyStates.filter(function(item){
        return item.key === keyCode;
    });

    if (foundKey.length > 0 && foundKey[0].wasPressed){
        return true;
    }

    return false;
};

InputHandler.prototype.KeyReleased = function(keyCode){
    var self = this;

    var foundKey = self.keyStates.filter(function(item){
        return item.key === keyCode;
    });

    if (foundKey.length > 0 && foundKey[0].wasReleased){
        return true;
    }

    return false;
};

InputHandler.prototype.IsKeyDown = function(keyCode){
    var self = this;

    var foundKey = self.keyStates.filter(function(item){
        return item.key === keyCode;
    });

    if (foundKey.length > 0 && foundKey[0].isPressed){
        return true;
    }

    return false;
};  

InputHandler.prototype.HandleKeyDown = function(keyCode){
    var self = this;

    var foundKey = self.keyStates.filter(function(item){
        return item.key === keyCode;
    });

    if (foundKey.length > 0){
        foundKey[0].isPressed = true;
        if(foundKey[0].pressedReset){
            foundKey[0].wasPressed = true;
            foundKey[0].pressedReset = false;
        }        
    } else {
        console.log("new key: " + keyCode);
        self.keyStates.push({
            key: keyCode,
            isPressed: true,
            wasPressed: true,
            wasReleased: false,
            pressedReset: false
        });
    }
};

InputHandler.prototype.HandleKeyUp = function(keyCode){
    var self = this;

    var foundKey = self.keyStates.filter(function(item){
        return item.key === keyCode;
    });

    if (foundKey.length > 0){
        foundKey[0].isPressed = false;
        foundKey[0].wasReleased = true;
        foundKey[0].pressedReset = true;
    } else {
        self.keyStates.push({
            key: keyCode,
            isPressed: false,
            wasPressed: false,
            wasReleased: true,
            pressedReset: true
        });
    }
};

InputHandler.prototype.ClearPressedStates = function(){
    var self = this;

    self.keyStates.forEach(key => {
        key.wasPressed = false;
        key.wasReleased = false;
    });
};

if (!window.InputHandlerInstance){
    window.InputHandlerInstance = new InputHandler();

    window.addEventListener('keydown', function(event){
        window.InputHandlerInstance.HandleKeyDown(event.keyCode);
    });
    
    window.addEventListener('keyup', function(event){
        window.InputHandlerInstance.HandleKeyUp(event.keyCode);
    });
}

export default window.InputHandlerInstance
