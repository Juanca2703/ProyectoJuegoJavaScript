const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector("#up");
const btnDown = document.querySelector("#down");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");


let canvasSize;
let elementsSize;

const playerPos = {
  x: undefined,
  y: undefined,
}

const gifPosition = {
  x: undefined,
  y: undefined,
}

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }
  
  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);
  
  elementsSize = canvasSize / 10;

  startGame();
}


function startGame (){

    game.font = elementsSize +`px verdana`
    game.textAlign = "end";

    const map = maps[0];
    const mapRow = map.trim().split("\n"); 
    const mapRowCols = mapRow.map( row => row.trim().split(""));


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
         
        }

        game.fillText(emoji, posX, posY)

     });
    }); 

    movePlayer();
    console.log(playerPos);
    
    }

    function movePlayer() {

      const gifCollisionX = playerPos.x.toFixed(3) == gifPosition.x.toFixed(3);
      const gifCollisionY = playerPos.y.toFixed(3) == gifPosition.y.toFixed(3);
      const gifCollision = gifCollisionX && gifCollisionY;

      if (gifCollision){
        console.log('pasaste de nivel!')
      }


      game.fillText(emojis["PLAYER"], playerPos.x, playerPos.y);
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

function mapColision () {
  
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
  