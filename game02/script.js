var canvas = document.getElementById("myCanvas");
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
canvas.height = GAME_HEIGHT;
canvas.width = GAME_WIDTH;
var ctx = canvas.getContext('2d');
var isMoving = false;
var game = {
  background: {x: 0, y: 0, w: GAME_WIDTH, h: GAME_HEIGHT, imgSrc: "Assets/background.jpg", speedX: 0, speedY: 0},
  player: {x: 50, y: 200, w: 80, h: 80, imgSrc: "Assets/pika.png", speedX: 4, speedY: 0},
  enemy: {x: 300, y: 200, w: 80, h: 80, imgSrc: "Assets/gengar.png", speedX: 0, speedY: 4},
  enemy1: {x: 600, y: 200, w: 80, h: 80, imgSrc: "Assets/drowsy.png", speedX: 0, speedY: 6},
  enemy2: {x: 900, y: 200, w: 80, h: 80, imgSrc: "Assets/gengar.png", speedX: 0, speedY: 9},
  goal: {x: 1200, y: 200, w: 80, h: 80, imgSrc: "Assets/ball.png", speedX: 0, speedY: 0},
  over: false
}
canvas.addEventListener('mousedown', function(){
  isMoving = true;
});
canvas.addEventListener('mouseup', function(){
  isMoving = false;
});
function isCollision(obj1, obj2){
  var xdir = false, ydir = false;
  if(obj2.x < obj1.x + obj1.w && obj2.x + obj2.w  > obj1.x){
    xdir = true;
  }
  if(obj2.y < obj1.y + obj1.h && obj2.y + obj2.h > obj1.y){
    ydir = true;
  }
  var isCollision = xdir && ydir;
  if(isCollision && obj2 == game.goal){
    window.alert("Congrats");
  }else if(isCollision){
    window.alert("Game Over");
  }
  return isCollision;
}

function checkCollision(){
  return isCollision(game.player, game.enemy) || isCollision(game.player, game.enemy1) || isCollision(game.player, game.enemy2) || isCollision(game.player, game.goal);
}
function updateObj(obj){
  obj.y += obj.speedY;
  if(obj.y > GAME_HEIGHT || obj.y < 0){
    obj.speedY *= -1;
  }
  if(isMoving){
    obj.x -= game.player.speedX;
    // if(obj.x > GAME_WIDTH || obj.x < 0){
    //   obj.speedX *= -1;
    // }
  }
}
function update(){
  if(checkCollision()){
    game.over = true;
  } else {
    // updateObj(game.player);
    updateObj(game.enemy);
    updateObj(game.enemy1);
    updateObj(game.enemy2);
    updateObj(game.goal);
  }
}
function drawObj(obj){
  var image = new Image();
  image.src = obj.imgSrc;
  image.onload = function(){
    ctx.drawImage(image, obj.x, obj.y, obj.w, obj.h);
  }
}
function draw(){
  drawObj(game.background);
  drawObj(game.player);
  drawObj(game.enemy);
  drawObj(game.enemy1);
  drawObj(game.enemy2);
  drawObj(game.goal);
}
function render(){
  draw();
  update();
  if(!game.over){
    window.requestAnimationFrame(render);
  }
}
render();
