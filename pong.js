const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 5,
    dx: 5,
    dy: 5
};

// Paddle
const paddleWidth = 10, paddleHeight = 100;
const user = { x: 0, y: canvas.height / 2 - 50, width: paddleWidth, height: paddleHeight, color: 'white', score: 0 };
const cpu = { x: canvas.width - paddleWidth, y: canvas.height / 2 - 50, width: paddleWidth, height: paddleHeight, color: 'white', score: 0 };

// Draw functions
function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}
function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

// Game logic
function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Bounce
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0)
        ball.dy *= -1;

    // Simple AI
    cpu.y += ((ball.y - (cpu.y + paddleHeight / 2))) * 0.1;

    // Paddle collision
    let paddle = (ball.x < canvas.width / 2) ? user : cpu;
    if (
        ball.x - ball.radius < paddle.x + paddle.width &&
        ball.x + ball.radius > paddle.x &&
        ball.y < paddle.y + paddle.height &&
        ball.y > paddle.y
    ) {
        ball.dx *= -1;
    }

    // Reset if out of bounds
    if (ball.x + ball.radius < 0 || ball.x - ball.radius > canvas.width) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
    }
}

// Render loop
function render() {
    drawRect(0, 0, canvas.width, canvas.height, 'black');
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(cpu.x, cpu.y, cpu.width, cpu.height, cpu.color);
    drawCircle(ball.x, ball.y, ball.radius, 'white');
}

function game() {
    update();
    render();
}

setInterval(game, 1000 / 60);

// Control
document.addEventListener('mousemove', (e) => {
    user.y = e.clientY - paddleHeight / 2;
});
