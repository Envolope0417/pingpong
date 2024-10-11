window.onload = function () {

    // 获取标签元素
    function $(idName) {
        return document.getElementById(idName);
    }


    // function getStyle(ele, attr) {
    //     var res = window.getComputedStyle(ele, null)[attr];
    //     return parseFloat(res);
    // }

    // 获取需要使用到的标签元素
    var game = $("game"),
        chooseMode = $("choose-mode"),
        chooseDifficulty = $("choose-difficulty"),
        gamePlay = $("gamePlay"),       
        playwithBot = $("bot-btn"),
        back2 = $("back2"),
        playbtn = $("play-btn"),
        table = $("table");
  

    const ball = document.getElementById("ball");
    const playerPaddle = document.getElementById("playerPaddle");
    const computerPaddle = document.getElementById("computerPaddle");


    // 获取需要使用到的元素样式
    function getStyle(element, styleProperty) {
        // 获取元素的计算样式
        const style = window.getComputedStyle(element);
        // 获取指定的样式值
        return style[styleProperty];
    }
    // 游戏界面的左上外边距
    var gameML = getStyle(game, "marginLeft"),
        gameMT = getStyle(game, "marginTop");
    
    playwithBot.onclick = function () {
        chooseMode.style.display = "none";
        chooseDifficulty.style.display = "block";
        gamePlay.style.display = "none";
        // 难度条拖拽
        // enableDrag(sliderCircle, slider);
        choosedifficulty();
        // console.log(sliderLong.style.width,sliderCircle.style.left,slider.style.left);
    }
    // 从选择难度back到选择模式页面
    back2.onclick = function () {
        chooseMode.style.display = "block";
        chooseDifficulty.style.display = "none";
        gamePlay.style.display = "none";


    }
    
    // 全局对象小球和球拍碰撞前的位置和碰撞速度
    class Balll {
        constructor(x, y, Vx, Vy) {
            this.x = x;
            this.y = y;
            this.Vx = Vx;
            this.Vy = Vy;
        }
    }

    class PlayerPaddlee {
        constructor(x, y, Vx, Vy) {
            this.x = x;
            this.y = y;
            this.Vx = Vx;
            this.Vy = Vy;
        }
    }
    
    // 给小球位置初值
    ball.style.left = "225px";
    ball.style.top = "350px";

    // 创建实例
    const Ball = new Balll(parseInt(ball.style.left), parseInt(ball.style.left), 0, 0);
    const PlayerPaddle = new PlayerPaddlee(parseInt(playerPaddle.style.left), parseInt(playerPaddle.style.left), 0, 0);

    
    // 开始游戏
    // .从选择难度界面进入游戏界面
    playbtn.onclick = function () {
        chooseMode.style.display = "none";
        chooseDifficulty.style.display = "none";
        gamePlay.style.display = "block";


// playerPaddle的运动
    document.addEventListener("mousemove", function (event) {
        const mouse_x = event.clientX;
        const mouse_y = event.clientY;
        
        // gameml = parseInt(gameML);
        // gamemt = parseInt(gameMT);

        playerPaddle.style.left = mouse_x  - 20 + "px";
        playerPaddle.style.top = mouse_y - 20 + "px";


        // console.log(mouse_x, mouse_y);
    });
    
        
   
    // 启动碰撞检测
    CollisionDetection();
    // 球运动
    
}
    
// 碰撞检测
function CollisionDetection() {
    let collisionDetection = true;

    

    // 启动检测
    setInterval(checkCollision, 100);

    // 检测碰撞条件
    function checkCollision() {

        // 电脑球拍运动
        moveComputerPaddle();

        console.log(collisionDetection);
        if (!collisionDetection) return;

        const ballX = parseInt(ball.style.left);
        const ballY = parseInt(ball.style.top);
        const playerPaddleX = parseInt(playerPaddle.style.left);
        const playerPaddleY = parseInt(playerPaddle.style.top);
        const computerPaddleX = parseInt(computerPaddle.style.left);
        const computerPaddleY = parseInt(computerPaddle.style.top);
        console.log(ballX, ballY, playerPaddleX, playerPaddleY, ball.style.left);

        // 玩家球拍碰撞检测
        if (ballY + ball.offsetHeight >= playerPaddleY &&
            ballX + ball.offsetWidth > playerPaddleX &&
            ballX < playerPaddleX + playerPaddle.offsetWidth) {

            handleCollision();
            return;
        } else {
            // 获取小球碰撞前位置
            Ball.x = parseInt(ball.style.left);
            Ball.y = parseInt(ball.style.top);

            console.log('ballx=' + Ball.x + 'bally=' + Ball.y);

            // 获取球拍即鼠标碰撞前位置
            document.addEventListener("mousemove", function (event) {
                PlayerPaddle.x = event.clientX;
                PlayerPaddle.y = event.clientY;

            });
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
        // setInterval(checkCollision, 250);
    }

    // 碰撞函数，停止检测并在0.5秒后恢复,在这里写碰撞之后要发生的事情
    function handleCollision() {
        collisionDetection = false;
        console.log("Collision detected!");

        // 获取小球和鼠标当前位置并计算速度
        getSpeed();
        setInterval(ballMove, 50);

        console.log(Ball.Vx, Ball.Vy);

        // 0.5秒后恢复碰撞检测
        setTimeout(() => {
            collisionDetection = true;
            console.log("Collision.");
            // requestAnimationFrame(checkCollision); 
            // setInterval(checkCollision, 250);
            checkCollision();


        }, 500);



    }

    
}


    // 电脑球拍运动
    function moveComputerPaddle() {
        const ballX = parseInt(ball.style.left);
        const ballY = parseInt(ball.style.top);

        // 电脑球拍x方向与球x方向一致，y方向与球y方向相反
        computerPaddle.style.left = ballX + "px";
        computerPaddle.style.top = `${table.clientHeight - ballY}px`;
    }

// 改变小球运动状态
function ballMove(){
    parseInt(ball.style.left);
    parseInt(ball.style.top);
    
    // ball.style.left = (parseInt(ball.style.left) + Ball.Vx + PlayerPaddle.Vx) + "px";
    // ball.style.top = (parseInt(ball.style.top) + Ball.Vy + PlayerPaddle.Vy) + "px";

    ball.style.left = parseInt(ball.style.left) - 10 + "px";
    ball.style.top = parseInt(ball.style.top) - 10 + "px";

    console.log('ballmoving');
    console.log('ballleft='+ ball.style.left + 'balltop=' + ball.style.top);
    
}

// 获取小球和鼠标的速度
function getSpeed(){
    const currentBallX = parseInt(ball.style.left);
    const currentBallY = parseInt(ball.style.top);
    

    Ball.Vx = currentBallX - Ball.x;
    Ball.Vy = currentBallY - Ball.y;
    
    console.log('currentBallX=' + currentBallX + 'currentBallY=' + currentBallY + 'BallVx=' + Ball.Vx + 'BallVy=' + Ball.Vy + 'BallX=' + Ball.x+ 'BallY=' + Ball.y);
    // 获取鼠标的速度
    document.addEventListener("mousemove", function (event) {
        const currentPlayerPaddleX = event.clientX;
        const currentPlayerPaddleY = event.clientY;

        // 计算鼠标速递
        PlayerPaddle.Vx = currentPlayerPaddleX - PlayerPaddle.x;
        PlayerPaddle.Vy = currentPlayerPaddleY - PlayerPaddle.y;

        //console.log('PlayerPaddleVx=' + PlayerPaddle.Vx + 'PlayerPaddleVy=' + PlayerPaddle.Vy + 'currentPlayerPaddleX=' + currentPlayerPaddleX+ 'currentPlayerPaddleY=' + currentPlayerPaddleY+ 'PlayerPaddleX=' + PlayerPaddle.x+ 'PlayerPaddleY=' + PlayerPaddle.y);
    });
    
}
// 困难调整拖拽
    function choosedifficulty() {
        const slider = document.getElementById('difficulty-slider');
        const sliderLong = document.getElementById('slider-long');
        const sliderCircle = document.getElementById('slider-circle');

        let isDragging = false;

        sliderCircle.addEventListener('mousedown', function () {
            isDragging = true;
        });

        window.addEventListener('mousemove', function (event) {
            if (isDragging) {
                const rect = slider.getBoundingClientRect();
                const offsetX = event.clientX - rect.left;

                // 确保circle还在slider范围内
                const sliderWidth = rect.width;
                const circlePos = Math.max(0, Math.min(sliderWidth, offsetX));

                // 更新circle的位置和进度条的宽度
                sliderCircle.style.right = `${sliderWidth - circlePos - 20}px`;
                sliderLong.style.width = `${(circlePos / sliderWidth) * 100}%`;
            }
        });

        window.addEventListener('mouseup', function () {
            isDragging = false;
        });
    }

};
