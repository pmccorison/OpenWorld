function ObjectIdGenerator(){
    var self = this;
    
    self.CurrentId = 0;
}

ObjectIdGenerator.prototype.GenerateId = function(){
    var self = this;
    
    return self.CurrentId++;
}

if(!window.ObjectIdGenerator){
    window.ObjectIdGenerator = new ObjectIdGenerator();
}

export default window.ObjectIdGenerator;
