var canvas = document.getElementById("myCanvas");

canvas.width = 400;
canvas.height = 400;
var ctx = canvas.getContext('2d');

ctx.fillStyle = 'blue';
// x, y, w, h
ctx.fillRect(0,0,100, 100);
