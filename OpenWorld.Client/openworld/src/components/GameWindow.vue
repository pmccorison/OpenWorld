<template>
    
    <div id="gameWindow">
        <div class="promptOverlay" v-if="ShowConnectionPrompt">
            <div>
                Enter PlayerId to connect:
                <br />
                <input type="text" v-model="PlayerId" />
            </div>
            <div>
                <button v-on:click="ConnectGame">Connect</button>
            </div>
        </div>
        <canvas id="gameCanvas" width="900" height="600"></canvas>
    </div>
</template>

<script>
import Vue from "vue"
import GameRoot from '../gamesrc/GameRoot.js'

export default {
    data: function(){
        return {
            GameRootClass: null,
            PlayerId: "",
            ShowConnectionPrompt: true
        };
    },
    created: function(){
    },
    methods: {
        ConnectGame: function(){
            var self = this;

            Vue.nextTick(function(){
                self.GameRootClass = new GameRoot("gameCanvas");            
                self.GameRootClass.Start(self.PlayerId).then(function(){
                    self.ShowConnectionPrompt = false;
                });                
            });  
        }
    }
};
</script>

<style lang="scss">
#gameWindow{
    height: 600px;
    text-align: center;
}

.promptOverlay{
    position: fixed;
    background-color: grey;
    opacity: .95;
    top: 10%;

    left: 10%;
    right: 10%;
    padding: 30px;
}
</style>
