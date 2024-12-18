function savePlayerInfo(playerInfo) {  
    localStorage.setItem('playerInfo', JSON.stringify(playerInfo));  
}  

function getPlayerInfo() {  
    const playerInfo = localStorage.getItem('playerInfo');  
    return playerInfo ? JSON.parse(playerInfo) : { id: Date.now(), nickname: '玩家', history: [] };  
}  

function updateGameHistory(playerInfo, event) {  
    playerInfo.history.push(event);  
    savePlayerInfo(playerInfo);  
}

// localStorage.js  
function savePlayerInfo(playerInfo) {  
    localStorage.setItem('playerInfo', JSON.stringify(playerInfo));  
}  

function getPlayerInfo() {  
    const playerInfo = localStorage.getItem('playerInfo');  
    return playerInfo ? JSON.parse(playerInfo) : null;  
}  

function registerPlayer(nickname) {  
    const playerInfo = {  
        id: Date.now(),  
        nickname: nickname,  
        history: []  
    };  
    savePlayerInfo(playerInfo);  
    return playerInfo;  
}  

function updateGameHistory(playerInfo, event) {  
    playerInfo.history.push(event);  
    savePlayerInfo(playerInfo);  
}