const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Ball
let ball = { x: 400, y: 300, radius: 10, dx: 4, dy: 4 };

// Draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

// Update game
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) ball.dx *= -1;
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) ball.dy *= -1;

    requestAnimationFrame(update);
}

update();
