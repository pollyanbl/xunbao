class TreasureMap {
  static getInitialClue() {
      return new Promise((resolve) => {
          setTimeout(() => {
              resolve("在古老的图书馆里找到了第一个线索...");
          }, 1000);
      });
  }

  static decodeAncientScript(clue) {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              if (!clue) {
                  reject("没有线索可以解码!");
              }
              resolve("解码成功!宝藏在一座古老的神庙中...");
          }, 1500);
      });
  }

  static searchTemple(location) {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              const random = Math.random();
              if (random < 0.5) {
                  reject("糟糕!遇到了神庙守卫!寻宝失败");
              }
              resolve("找到了一个神秘的箱子...");
          }, 2000);
      });
  }

  static solveRiddle(riddle) {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              const random = Math.random();
              if (random < 0.5) {
                  reject("谜题太复杂了，解不开!");
              }
              resolve("谜题解开，箱子打开了!");
          }, 1500);
      });
  }

  static openTreasureBox() {
      return new Promise((resolve) => {
          setTimeout(() => {
              resolve("恭喜!你找到了传说中的宝藏!");
          }, 1000);
      });
  }
}

function changeBackground(imagePath) {
  document.body.style.backgroundImage = `url('${imagePath}')`;
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundSize = 'cover';
}

function showTreasureBox(imagePath) {
  // 创建一个新的图片元素
  var treasureBoxImage = new Image();
  treasureBoxImage.src = imagePath; // 使用传入的图片路径
  treasureBoxImage.style.position = 'absolute'; // 使用绝对定位
  treasureBoxImage.style.left = '70%'; // 将图片的左边定位到屏幕中心
  treasureBoxImage.style.top = '50%'; // 将图片的顶部定位到屏幕中心
  // treasureBoxImage.style.transform = 'translate(-50%)'; // 使用transform进行微调，确保图片中心与屏幕中心对齐
  treasureBoxImage.style.zIndex = 1000; // 设置较高的z-index，确保图片在顶层

  // 将图片添加到body中
  document.body.appendChild(treasureBoxImage);
}

let playerInfo; // 全局变量存储玩家信息  

document.getElementById('registerButton').addEventListener('click', () => {  
    const nickname = document.getElementById('nicknameInput').value.trim();  
    if (nickname) {  
        playerInfo = registerPlayer(nickname);  
        document.getElementById('playerRegistration').style.display = 'none'; // 隐藏注册界面  
        document.getElementById('startButton').style.display = 'block'; // 显示开始游戏按钮  
    } else {  
        alert('请输入有效的昵称');  
    }  
});  

document.getElementById('startButton').addEventListener('click', () => {  
    if (!playerInfo) {  
        alert('请先注册');  
        return;  
    }  
    playerInfo.history.push(`开始游戏 ${playerInfo.history.length + 1} 次`); // 记录开始游戏的次数  
    updateGameHistory(playerInfo, `开始游戏 ${playerInfo.history.length} 次`);  

    // 清空之前的故事内容，只保留历史记录  
    const storyElement = document.getElementById('story');  
    storyElement.innerHTML = `<p>历史记录: ${playerInfo.history.join(', ')}</p>`;  

    // 确保 findTreasureWithAsyncAwait 没有被多次调用  
    if (!storyElement.dataset.isRunning) {  
        storyElement.dataset.isRunning = "true"; // 防止重复执行  
        findTreasureWithAsyncAwait().then(() => {  
            delete storyElement.dataset.isRunning; // 游戏结束后清除标识  
        });  
    }  
});  

// 在游戏开始时恢复玩家信息  
window.onload = () => {  
    playerInfo = getPlayerInfo(); // 获取玩家信息  
    if (playerInfo) {  
        document.getElementById('nicknameInput').value = playerInfo.nickname; // 显示昵称  
        document.getElementById('startButton').style.display = 'block'; // 显示开始游戏按钮  
    } else {  
        document.getElementById('playerRegistration').style.display = 'block'; // 显示注册界面  
    }  
};  

async function findTreasureWithAsyncAwait() {  
    const storyElement = document.getElementById('story');  
    try {  
        // 在开始时清空内容  
        storyElement.innerHTML = '';   

        const initialClue = await TreasureMap.getInitialClue();  
        storyElement.innerHTML += `<p>${initialClue}</p>`;  
        updateGameHistory(playerInfo, initialClue);  
        changeBackground('image/图书馆.jpeg');  

        const libraryInfo = await fetchLibraryInfo();  
        storyElement.innerHTML += `<p>${libraryInfo}</p>`;  
        updateGameHistory(playerInfo, libraryInfo);  

        const location = await TreasureMap.decodeAncientScript(initialClue);  
        storyElement.innerHTML += `<p>${location}</p>`;  
        updateGameHistory(playerInfo, location);  
        changeBackground('image/神庙1.jpeg');  

        const templeInfo = await fetchTempleInfo();  
        storyElement.innerHTML += `<p>${templeInfo}</p>`;  
        updateGameHistory(playerInfo, templeInfo);  

        const box = await TreasureMap.searchTemple(location);  
        storyElement.innerHTML += `<p>${box}</p>`;  
        updateGameHistory(playerInfo, box);  
        
        showTreasureBox('image/宝箱关.png');  

        const guardInfo = await fetchGuardInfo();  
        storyElement.innerHTML += `<p>${guardInfo}</p>`;  
        updateGameHistory(playerInfo, guardInfo);  

        const riddle = "一个古老箱子的谜题";  
        const answer = await TreasureMap.solveRiddle(riddle);  
        storyElement.innerHTML += `<p>${answer}</p>`;  
        updateGameHistory(playerInfo, answer);  
        
        showTreasureBox('image/宝箱开.png');  

    } catch (error) {  
        storyElement.innerHTML += `<p class="error">任务失败: ${error}</p>`;  
        updateGameHistory(playerInfo, `任务失败: ${error}`);  
    }  
}

const backgroundMusic = document.getElementById('backgroundMusic');  
const musicToggle = document.getElementById('musicToggle');  

musicToggle.addEventListener('click', () => {  
    if (backgroundMusic.paused) {  
        backgroundMusic.play();  
        musicToggle.textContent = '暂停音乐'; // 当音乐播放时显示此文本  
    } else {  
        backgroundMusic.pause();  
        musicToggle.textContent = '播放音乐'; // 当音乐暂停时显示此文本  
    }  
});   

document.getElementById('startButton').addEventListener('click', findTreasureWithAsyncAwait);  