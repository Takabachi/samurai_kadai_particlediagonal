window.requestAnimFrame = (function(){
  return (
    window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback, time) {
      var time = time ? time: 1000 / 60;
      window.setTimeout(callback, time);
    }
  ); 
})();

let canvas = document.getElementById("sample");
let ctx = canvas.getContext("2d");

let Particle = function(scale, color, vx, vy, gv){
  this.scale = scale; // 大きさ
  this.color = color; //色
  this.vx = vx; //x速度
  this.vy = vy; //y速度
  this.gv = gv; //重力
  this.position = {x:0, y:0}; //位置
};

Particle.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.position.x, this.position.y, this.scale, 0, 2*Math.PI, false);
  ctx.fillStyle = this.color;
  ctx.fill();
};

Particle.prototype.update = function() {
  this.vy += this.gv;
  this.position.x += this.vx;
  this.position.y += this.vy;

  //地面の衝突判定
  if (this.position.y > canvas.height - this.scale) {
    this.vy *= -0.6;
    this.vx *= 0.85;
    this.position.y = canvas.height - this.scale;
  }

  this.draw();
};

let density = 500;  
let particles = []; 
let colors = ['gold', 'crimson', 'deepskyblue', 'lime'];

for (var i=0; i<density; i++) {
  let color = colors[~~(Math.random()*4)];
  let scale = ~~(Math.random()*5)+5;
  let x = Math.random() * 10 - 4;
  let y = Math.random()* 9 + 5;
  let g = Math.random()* 0.1 + 0.25;
  
  particles[i] = new Particle(scale, color, x, -y, g);
  particles[i].position.x = 0;
  particles[i].position.y = 200;
}

let loop = () => {
  requestAnimFrame(loop);
  
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  for(let i in particles) {
    particles[i].update();
  }
  
}

loop();
