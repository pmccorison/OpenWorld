<template>
    <div id="gameWindow">
        <canvas id="gameCanvas" width="900" height="600"></canvas>
    </div>
</template>

<script>
import Vue from "vue"
import GameRoot from '../gamesrc/GameRoot.js'

export default {
    data: function(){
        return {
            GameRootClass: null
        };
    },
    created: function(){
        var self = this;
        Vue.nextTick(function(){
            self.GameRootClass = new GameRoot("gameCanvas");            
            self.GameRootClass.Start();
        });        
    }
};
</script>

<style lang="scss">
#gameWindow{
    height: 600px;
    text-align: center;
}

#gameCanvas{

}
</style>
