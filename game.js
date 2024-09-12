const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector("#up");
const btnDown = document.querySelector("#Down");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");


let canvasSize;
let elementsSize;

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
    
     mapRowCols.forEach(( row , rowI) => {
      row.forEach(( col , colI) => {
        const emoji = emojis[col];
        const posX = elementsSize * (colI + 1);
        const posy = elementsSize * (rowI + 1);
        game.fillText(emoji, posX, posy)

     });
    });
    
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

}

function moveDown(){
  
}
function moveLeft(){
  
}
function moveRight(){
  
}
  