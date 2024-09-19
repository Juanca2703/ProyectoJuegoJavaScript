const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector("#up");
const btnDown = document.querySelector("#down");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');


let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeStart;
let timeInterval;


const playerPos = {
  x: undefined,
  y: undefined,
}

const giftPosition = {
  x: undefined,
  y: undefined,
}

let enemyPosition = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.7;
  } else {
    canvasSize = window.innerHeight * 0.7;
  }

  
  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);
  
  elementsSize = canvasSize / 10;

  playerPos.x = undefined;
  playerPos.y = undefined;
  startGame();
}


function startGame (){

    game.font = elementsSize +`px verdana`
    game.textAlign = "end";

    const map = maps[level];

    if (!map) {
      gameWin();
      return;
    }

    if (!timeStart){
      timeStart = Date.now();
      timeInterval = setInterval(showTime, 100);
      showRecord();
    }

    const mapRow = map.trim().split("\n"); 
    const mapRowCols = mapRow.map( row => row.trim().split(""));

    showLives();

    enemyPosition = [];


     game.clearRect(0,0, canvasSize, canvasSize);
     mapRowCols.forEach(( row , rowI) => {
      row.forEach(( col , colI) => {
        const emoji = emojis[col];
        const posX = elementsSize * (colI + 1);
        const posY = elementsSize * (rowI + 1);

        if (col == "O"){
          if (!playerPos.x && !playerPos.y){
            playerPos.x = posX;
            playerPos.y = posY;
          }
         
        } else if (col == 'I') {
          giftPosition.x = posX;
          giftPosition.y = posY;
        } else if (col == 'X') {
          enemyPosition.push({
            x: posX,
            y: posY,
          });
        }

        game.fillText(emoji, posX, posY)

     });
    }); 

    movePlayer();
    console.log(playerPos);
    
    }

function movePlayer() {

      const giftCollisionX = playerPos.x.toFixed(3) == giftPosition.x.toFixed(3);
      const giftCollisionY = playerPos.y.toFixed(3) == giftPosition.y.toFixed(3);
      const giftCollision = giftCollisionX && giftCollisionY;

      if (giftCollision) {
        levelWin();
      }

      const enemyCollision = enemyPosition.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(3) == playerPos.x.toFixed(3);
        const enemyCollisionY = enemy.y.toFixed(3) == playerPos.y.toFixed(3);
        return enemyCollisionX && enemyCollisionY;
      });
      
      if (enemyCollision) {
        levelFail();
      }


      game.fillText(emojis["PLAYER"], playerPos.x, playerPos.y);
}

function levelWin (){
  console.log('Ganasteee!');
  level++;
  startGame();
}

function levelFail() {
  lives--;

  console.log(lives);
  if (lives <= 0) {
    level=0;
    lives=3;
    timeStart = undefined;
  }

  playerPos.x=undefined;
  playerPos.y=undefined;
  startGame();
}

function gameWin() {
  console.log('¡Terminaste el juego!');

  const playerTime = spanTime.innerHTML = Date.now() - timeStart;
  const recordTime = localStorage.getItem('record_time')

  if (recordTime) {
    if(recordTime >= playerTime) {
      localStorage.setItem('record_time', playerTime);
      pResult.innerHTML = 'SUPERASTE EL RECORD!';
    } else {
      pResult.innerHTML = 'Lo siento, no superaste el Record :(';
    }
  } else {
    localStorage.setItem('record_time', playerTime);
    pResult.innerHTML = 'Primer vez? Muy bien!, ahora supera tu record si puedes ;D';
  }

  clearInterval(timeInterval);
}

function showLives() {
  const heartsArray = Array(lives).fill(emojis['HEART']);

  spanLives.innerHTML = '';
  heartsArray.forEach(heart => spanLives.append(heart));
}
function showTime(){
  spanTime.innerHTML = Date.now() - timeStart;
}

function showRecord() {
  spanRecord.innerHTML = localStorage.getItem('record_time');
}

window.addEventListener("keydown", moveBykeys)
btnUp.addEventListener("click", moveUp);
btnDown.addEventListener("click", moveDown);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveDown);


function moveBykeys(event){
  if (event.key == "ArrowUp")  moveUp();
   else if (event.key == "ArrowDown")  moveDown();
   else if (event.key == "ArrowLeft")  moveLeft();
   else if (event.key == "ArrowRight")  moveRight();
  
}


function moveUp(){
  if (playerPos.y - elementsSize < elementsSize) console.log('out');
   else playerPos.y -= elementsSize;
  startGame();
}
function moveDown(){
  if (playerPos.y + elementsSize > canvasSize) console.log('out');
  else playerPos.y += elementsSize;
  startGame();
}
function moveLeft(){
  if (playerPos.x - elementsSize < elementsSize) console.log('out');
  else playerPos.x -= elementsSize;
  startGame();
}
function moveRight(){
  if (playerPos.x + elementsSize > canvasSize) console.log('out');
  else playerPos.x += elementsSize;
  startGame();
}
  