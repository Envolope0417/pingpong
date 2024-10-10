document.addEventListener('DOMContentLoaded', function () {
    const gamePlay = document.getElementById('gamePlay');
    const table = document.getElementById('table');
    const playerPaddle = document.getElementById('playerPaddle');
    const computerPaddle = document.getElementById('computerPaddle');
    const ball = document.getElementById('ball');
    const net = document.getElementById('net');

    let ballSpeedX = 2;
    let ballSpeedY = -2;
    let collisionDetected = false;
    let collisionTimer = 0;
    let lastPaddleX = 0;
    let lastPaddleY = 0;
    let lastBallX = 0;
    let lastBallY = 0;

    gamePlay.style.display = 'block';

    // 初始化球的位置
    ball.style.top = `${table.offsetTop + (table.offsetHeight / 2)}px`;
    ball.style.left = `${table.offsetLeft + (table.offsetWidth / 2)}px`;

    // 玩家球拍跟随鼠标移动
    playerPaddle.addEventListener('mousemove', function (e) {
        const rect = e.target.getBoundingClientRect();
        const top = Math.max(0, Math.min(gamePlay.offsetHeight - rect.height, e.clientY - rect.top - gamePlay.scrollTop));
        const left = Math.max(0, Math.min(gamePlay.offsetWidth - rect.width, e.clientX - rect.left - gamePlay.scrollLeft));
        e.target.style.top = `${top}px`;
    });

    // 电脑球拍跟随球移动
    function moveComputerPaddle() {
        const ballRect = ball.getBoundingClientRect();
        const paddleRect = computerPaddle.getBoundingClientRect();
        const paddleX = ballRect.left - (paddleRect.width / 2) + ballSpeedX;
        const paddleY = ballRect.top - paddleRect.height / 2 + ballSpeedY;
        computerPaddle.style.left = `${paddleX}px`;
        computerPaddle.style.top = `${paddleY}px`;
    }
    setInterval(moveComputerPaddle, 16);

    // 移动球
    function moveBall() {
        if (!collisionDetected) {
            const ballRect = ball.getBoundingClientRect();
            ball.style.left = `${ballRect.left + ballSpeedX}px`;
            ball.style.top = `${ballRect.top + ballSpeedY}px`;
        }
    }
    setInterval(moveBall, 16);

    // 碰撞检测
    function detectCollision() {
        if (!collisionDetected) {
            const playerRect = playerPaddle.getBoundingClientRect();
            const computerRect = computerPaddle.getBoundingClientRect();
            const ballRect = ball.getBoundingClientRect();

            // 检测球与玩家球拍的碰撞
            if (ballRect.right >= playerRect.left && ballRect.left <= playerRect.right && ballRect.bottom >= playerRect.top && ballRect.top <= playerRect.bottom) {
                handleCollision();
            }

            // 检测球与电脑球拍的碰撞
            if (ballRect.right >= computerRect.left && ballRect.left <= computerRect.right && ballRect.bottom >= computerRect.top && ballRect.top <= computerRect.bottom) {
                handleCollision();
            }

            // 检测球是否出界
            if (ballRect.left <= table.offsetLeft || ballRect.right >= table.offsetLeft + table.offsetWidth || ballRect.top <= table.offsetTop || ballRect.bottom >= table.offsetTop + table.offsetHeight) {
                endRound();
            }
        }
    }
    setInterval(detectCollision, 16);

    // 处理碰撞
    function handleCollision() {
        collisionDetected = true;
        collisionTimer = Date.now();

        // 记录最后一次位置
        lastPaddleX = computerPaddle.offsetLeft;
        lastPaddleY = computerPaddle.offsetTop;
        lastBallX = ball.offsetLeft;
        lastBallY = ball.offsetTop;

        // 停止球的移动
        ballSpeedX = 0;
        ballSpeedY = 0;

        // 计算位移
        const paddleDisplacementX = computerPaddle.offsetLeft - lastPaddleX;
        const paddleDisplacementY = computerPaddle.offsetTop - lastPaddleY;
        const ballDisplacementX = ball.offsetLeft - lastBallX;
        const ballDisplacementY = ball.offsetTop - lastBallY;

        // 更新球的位置
        function updateBallPosition() {
            if (Date.now() - collisionTimer < 500) {
                ballSpeedX = 10 * paddleDisplacementX;
                ballSpeedY = -10 * paddleDisplacementY;
                moveBall();
            } else {
                collisionDetected = false;
                clearInterval(updateBallPositionInterval);
                detectCollision();
            }
        }
        const updateBallPositionInterval = setInterval(updateBallPosition, 250);
    }

    // 结束回合
    function endRound() {
        gamePlay.style.display = 'none';
        alert('回合结束');
        // 重置游戏状态
        ballSpeedX = 2;
        ballSpeedY = -2;
        collisionDetected = false;
        lastPaddleX = 0;
        lastPaddleY = 0;
        lastBallX = 0;
        lastBallY = 0;
        // 重新显示游戏区域，开始新的回合
        setTimeout(() => {
            gamePlay.style.display = 'block';
            ball.style.top = `${table.offsetTop + (table.offsetHeight / 2)}px`;
            ball.style.left = `${table.offsetLeft + (table.offsetWidth / 2)}px`;
        }, 1000);
    }
});