window.onload = function () {
    const ball = document.getElementById("ball");
    const playerPaddle = document.getElementById("playerPaddle");
    const computerPaddle = document.getElementById("computerPaddle");

    // Player Paddle's movement
    document.addEventListener("mousemove", function (event) {
        const mouse_x = event.clientX;
        const mouse_y = event.clientY;
        playerPaddle.style.left = mouse_x - 20 + "px";
        playerPaddle.style.top = mouse_y - 20 + "px";
    });

    // Global Ball Object
    class Ball {
        constructor(x, y, Vx, Vy) {
            this.x = x;
            this.y = y;
            this.Vx = Vx;
            this.Vy = Vy;
        }
    }

    class PlayerPaddle {
        constructor(x, y, Vx, Vy) {
            this.x = x;
            this.y = y;
            this.Vx = Vx;
            this.Vy = Vy;
        }
    }

    // Initialize ball position
    ball.style.left = "225px";
    ball.style.top = "350px";

    // Create instances
    const ballInstance = new Ball(parseInt(ball.style.left), parseInt(ball.style.top), 5, 3);
    const playerPaddleInstance = new PlayerPaddle(parseInt(playerPaddle.style.left), parseInt(playerPaddle.style.top), 0, 0);

    // Start collision detection
    CollisionDetection();
    // Ball movement
    setInterval(ballMove, 10);

    // Collision Detection
    function CollisionDetection() {
        let collisionDetection = true;

        function checkCollision() {
            if (!collisionDetection) return;

            const ballX = parseInt(ball.style.left);
            const ballY = parseInt(ball.style.top);
            const playerPaddleX = parseInt(playerPaddle.style.left);
            const playerPaddleY = parseInt(playerPaddle.style.top);

            // Player paddle collision detection
            if (ballY + ball.offsetHeight >= playerPaddleY &&
                ballX + ball.offsetWidth > playerPaddleX &&
                ballX < playerPaddleX + playerPaddle.offsetWidth) {

                handleCollision();
                return;
            }

            // Update ball position before collision
            ballInstance.x = ballX;
            ballInstance.y = ballY;
        }

        function handleCollision() {
            collisionDetection = false;
            console.log("Collision detected!");

            // Get speed
            getSpeed();

            // Resume collision detection after 0.5 seconds
            setTimeout(() => {
                collisionDetection = true;
                console.log("Resume collision detection.");
                checkCollision();
            }, 500);
        }

        // Start detection
        requestAnimationFrame(checkCollision);
    }

    // Change ball movement state
    function ballMove() {
        const ballX = parseInt(ball.style.left);
        const ballY = parseInt(ball.style.top);

        ball.style.left = (ballX + ballInstance.Vx) + "px";
        ball.style.top = (ballY + ballInstance.Vy) + "px";

        console.log('ball moving');
        console.log('ball left=' + ball.style.left + ', ball top=' + ball.style.top);
    }

    // Get ball and mouse speed
    function getSpeed() {
        const currentBallX = parseInt(ball.style.left);
        const currentBallY = parseInt(ball.style.top);

        ballInstance.Vx = currentBallX - ballInstance.x;
        ballInstance.Vy = currentBallY - ballInstance.y;

        console.log('Current ball X=' + currentBallX + ', Current ball Y=' + currentBallY);
    }
};