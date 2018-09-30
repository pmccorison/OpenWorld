<template>
    <div id="app">
        <div class="chatContainer">
            <ChatWindow />
        </div>
        <div class="gameContainer">
            <GameWindow />
            <PlayerData />
        </div>
    </div>
</template>

<script>
import GameWindow from './components/GameWindow.vue';
import ChatWindow from './components/ChatWindow.vue';
import PlayerData from './components/PlayerData.vue';

export default {
    name: 'app',
    components: {
        ChatWindow,
        GameWindow,
        PlayerData
    }
};
</script>

<style lang="scss">
$chatWidth: 300px;

html, body{
    margin: 0;
    padding: 0;
    height: 100%;
}

#app{
    height: 100%;
    max-width: 1600px;
    margin: 0 auto;
}

.chatContainer{
    width: $chatWidth;
    float: left;
    background-color: red;
    height: 100%;
}  

.gameContainer{
    margin-left: $chatWidth;
}
</style>
