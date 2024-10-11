// 全局对象小球
class Ball{
    constructor(x, y, Vx, Vy){
        this.x = x;
        this.y = y;
        this.Vx = Vx;
        this.Vy = Vy;
    }
}

class PlayerPaddle{
    constructor(x, y, Vx, Vy){
        this.x = x;
        this.y = y;
        this.Vx = Vx;
        this.Vy = Vy;
    }
}



// 碰撞检测
function CollisionDetection() {
    let collisionDetection = true;

    // 检测碰撞条件
    function checkCollision() {
        if (!collisionDetection) return;

        const ballX = parseInt(ball.style.left);
        const ballY = parseInt(ball.style.top);
        const playerPaddleX = parseInt(playerPaddle.style.left);
        const playerPaddleY = parseInt(playerPaddle.style.top);
        const computerPaddleX = parseInt(computerPaddle.style.left);
        const computerPaddleY = parseInt(computerPaddle.style.top);

        // 玩家球拍碰撞检测
        if (ballY + ball.offsetHeight >= playerPaddleY &&
            ballX + ball.offsetWidth > playerPaddleX &&
            ballX < playerPaddleX + playerPaddle.offsetWidth) {
            handleCollision();
            return;
        }

        // 电脑球拍碰撞检测
        if (ballY <= computerPaddleY + computerPaddle.offsetHeight &&
            ballX + ball.offsetWidth > computerPaddleX &&
            ballX < computerPaddleX + computerPaddle.offsetWidth) {
            handleCollision();
            return;
        }

        // 循环
        // requestAnimationFrame(checkCollision);
        setInterval(checkCollision, 250);
    }

    // 碰撞函数，停止检测并在0.5秒后恢复,在这里写碰撞之后要发生的事情
    function handleCollision() {
        collisionDetection = false;
        console.log("Collision detected!");

        // 获取小球和鼠标当前位置并计算速度
        setInterval(function () {
            // 获取小球当前位置
            const currentBallX = parseInt(ball.style.left);
            const currentBallY = parseInt(ball.style.top);
            
            // 获取鼠标当前位置
            document.addEventListener("mousemove", function (event) {
                const currentPlayerPaddleX = event.clientX;
                const currentPlayerPaddleY = event.clientY;
                
                // 计算鼠标速递
                PlayerPaddle.Vx = currentPlayerPaddleX - PlayerPaddle.x;
                PlayerPaddle.Vy = currentPlayerPaddleY - PlayerPaddle.y;
            });

            // 计算小球速度
            Ball.Vx = currentBallX - Ball.x;
            Ball.Vy = currentBallY - Ball.y;

        }, 250)
        
        
        


        // 0.5秒后恢复碰撞检测
        setTimeout(() => {
            collisionDetection = true;
            console.log("Collision.");
            // requestAnimationFrame(checkCollision); 
            setInterval(checkCollision, 250);
        
        
        }, 500);
        
        
        

        


        
    }

    // 启动检测
    requestAnimationFrame(checkCollision);

    // 获取小球碰撞前位置
    Ball.x = parseInt(ball.style.left);
    Ball.y = parseInt(ball.style.top);
    
    // 获取球拍即鼠标碰撞前位置
    document.addEventListener("mousemove", function (event) {
        PlayerPaddle.x = event.clientX;
        PlayerPaddle.y = event.clientY;

    });

    
}

