var c = document.getElementById('c'),
    light = {
        posX: 0,
        posY: 0,
        radius: 50
    };

c.width = window.innerWidth;
c.height = window.innerHeight;
var dx = 2;
var dy = -2;
var x = c.width;
var y =c.height;
var balls = [];
var ballCount = 6;

for (var i = 0; i < ballCount; i++) {
  var ball = [];
  ball.push(Math.random() * c.width); // X-pos
  ball.push(Math.random() * c.height); // Y-pos
  ball.push(Math.random()); // X-velocity
  ball.push(1 - ball[2]); // Y-Velocity
  if(Math.random() < 0.5){
    ball[3] = -ball[3];
  }
  if(Math.random() > 0.5){
    ball[2] = -ball[2];
  }
  var radius = (Math.random() * 25 ) + 5
  ball.push(radius);
  ball.push(5);   //	pi × radius2
  balls.push(ball);
}

var lightBall = [];
lightBall.push(light.posX);
lightBall.push(light.posY);
lightBall.push(0);
lightBall.push(0);
lightBall.push(light.radius);
balls.push(lightBall);
ballCount++;




function drawBall(ball, ctx) {
    ctx.beginPath();
    ctx.arc(ball[0], ball[1], ball[4], 0, Math.PI*2);
    ctx.fillStyle = "BLACK";
    ctx.fill();
    ctx.closePath();

    if(ball[0] + ball[2] > c.width-ball[4] || ball[0] + ball[2] < ball[4]) {
        ball[2] = -ball[2];
        console.log("Bonk");
    }
    if(ball[1] + ball[3] > c.height-ball[4] || ball[1] + ball[3] < ball[4]) {
        ball[3]= -ball[3];
        console.log("Bonk");
    }
    ball[0] += ball[2];
    ball[1] += ball[3];

}

function calculateCollisions(ball1, ballNumber){
  for (var i = 0; i < ballCount; i++) {
    ball2 = balls[i]

    Distance = Math.sqrt(
    ((ball1[0] - ball2[0]) * (ball1[0] - ball2[0]))
  + ((ball1[1] - ball2[1]) * (ball1[1] - ball2[1]))
);

    if (Distance < ball1[4] + ball2[4] && Distance != 0){
      if(i == ballCount-1){
        alert("You suck");
        console.log("You suck");
      }else{
      console.log("collision");
      // calculateBounce(ball1, ball2);
    }
    }
  }
}

function calculateBounce(ball1, ball2){
  ball1[2] = (ball1[2] * (ball1[5] - ball2[5]) + (2 * ball2[5] * ball2[2])) / (ball1[5] + ball2[5]);
  ball1[3] = (ball1[3] * (ball1[5] - ball2[5]) + (2 * ball2[5] * ball2[3])) / (ball1[5] + ball2[5]);
  ball2[2] = (ball2[2] * (ball2[5] - ball1[5]) + (2 * ball1[5] * ball1[2])) / (ball1[5] + ball2[5]);
  ball2[3] = (ball2[3] * (ball2[5] - ball1[5]) + (2 * ball1[5] * ball1[3])) / (ball1[5] + ball2[5]);

  ball1[0] += ball1[2] * 10;
  ball1[1] += ball1[3] * 10;
  ball2[0] += ball2[2] * 10;
  ball2[1] += ball2[3] * 10;

}

c.addEventListener('mousemove', function (evt) {
    setLightPos(evt);
    renderLight();
}, false);

window.addEventListener('resize', function () {
    renderLight();
}, false);

var setLightPos = function (evt) {
    var rect = c.getBoundingClientRect();
    light.posX = evt.clientX - rect.left;
    light.posY = evt.clientY - rect.top;
    lightBall = balls[ballCount-1];
    lightBall[0] = light.posX;
    lightBall[1] = light.posY;
}

var renderLight = function () {
    var ctx = c.getContext('2d');
    ctx.save();
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = 'rgba(0, 0, 0, .7)';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(light.posX, light.posY, light.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = 'white';
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.shadowBlur = 30;
    ctx.shadowColor = 'rgba(255, 255, 255, 1)';
    ctx.fill();
    ctx.restore();

    for (var i = 0; i < ballCount - 1; i++) {
      drawBall(balls[i], ctx);
    }

    for (var i = 0; i < ballCount; i++) {
      for (var j = i + 1; j < ballCount; j++){
        calculateCollisions(balls[i]);
      }
    }
}

function myFunction() {
  var w = window.outerWidth;
  var h = window.outerHeight;
  c.width = w;
  c.height = h;
}

setInterval(renderLight, 25);
