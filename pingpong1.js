window.onload = function () {
    // 获取标签元素
    function $(idName) {
        return document.getElementById(idName);
    }

    // 获取元素样式
    function getStyle(element, styleProperty) {
        const style = window.getComputedStyle(element);
        return style[styleProperty];
    }

    // 获取需要使用到的标签元素
    var game = $("game"),
        chooseMode = $("choose-mode"),
        chooseDifficulty = $("choose-difficulty"),
        gamePlay = $("gamePlay"),
        playwithFriend = $("friend-btn"),
        playwithBot = $("bot-btn"),
        back1 = $("back1"),
        back2 = $("back2"),
        playbtn = $("play-btn"),
        table = $("table"),
        ball = $("ball");

    const playerPaddle = document.getElementById("playerPaddle");
    const computerPaddle = document.getElementById("computerPaddle");
    const slider = document.getElementById('difficulty-slider');
    const sliderLong = document.getElementById('slider-long');
    const sliderCircle = document.getElementById('slider-circle');
    
    // 声明全局变量
    var timerCollision = null;
    // 获取需要使用到的元素样式
    var gameWidth = getStyle(game, "width"),
        gameHeight = getStyle(game, "height");
    var gameMarginLeft = getStyle(game, "marginLeft"),
        gameMarginTop = getStyle(game, "marginTop");
    var paddleWidth = getStyle(playerPaddle, "width"),
        paddleHeight = getStyle(playerPaddle, "height");
    var ballWidth = getStyle(ball, "width"),
        ballHeight = getStyle(ball, "height");

    // 从选择模式到选择难度的页面切换
    playwithBot.onclick = function () {
        chooseMode.style.display = "none";
        chooseDifficulty.style.display = "block";
        gamePlay.style.display = "none";
        choosedifficulty();
    };

    // 从选择难度back到选择模式页面
    back2.onclick = function () {
        chooseMode.style.display = "block";
        chooseDifficulty.style.display = "none";
        gamePlay.style.display = "none";
    };

    // 开始游戏
    playbtn.onclick = function () {
        chooseMode.style.display = "none";
        chooseDifficulty.style.display = "none";
        gamePlay.style.display = "block";

        // 鼠标移动事件
        document.addEventListener("mousemove", function (event) {
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            gameMarginLeft = parseInt(gameMarginLeft);
            playerPaddle.style.left = mouseX - gameMarginLeft - 20 + "px";
            playerPaddle.style.top = mouseY - 20 + "px";
        });

        // 处理球的碰撞逻辑
        handleBallCollision();
    };

    // 碰撞检测和移动逻辑
    function handleBallCollision() {
        checkCollision(playerPaddle, ball, () => {
            clearInterval(timerCollision);
            console.log('Elements are colliding!');
            trackElementDisplacementOverTime(playerPaddle, (displacement) => {
                var paddleVx = displacement.x;
                var paddleVy = displacement.y;
                moveElement(ball, paddleVx, paddleVy);
            });
        });
    }

    // 选择难度拖拽的方法
    function choosedifficulty() {
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

    // 碰撞逻辑
    function detectCollision(el1, el2) {
        const rect1 = el1.getBoundingClientRect();
        const rect2 = el2.getBoundingClientRect();

        const isColliding = !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );

        return isColliding;
    }

    // 检查碰撞
    function checkCollision(el1, el2, callback) {
        function update() {
            const collided = detectCollision(el1, el2);

            if (collided) {
                callback();
            }
        }

        timerCollision = setInterval(update, 50); // 每0.5秒检查一次碰撞
    }

    // 获取元素位移的方法
    function trackElementDisplacementOverTime(el, callback) {
        let lastPosition = {
            x: el.getBoundingClientRect().left,
            y: el.getBoundingClientRect().top
        };

        setInterval(() => {
            const rect = el.getBoundingClientRect();
            const currentPosition = {
                x: rect.left,
                y: rect.top
            };
            const displacement = {
                x: currentPosition.x - lastPosition.x,
                y: currentPosition.y - lastPosition.y
            };
            lastPosition = currentPosition;

            if (typeof callback === 'function') {
                callback(displacement);
            }
        }, 500); // 每0.25秒更新一次位置信息
    }

    // 小球的移动
    function moveElement(element, speedX, speedY) {
        const initialRect = element.getBoundingClientRect();
        let currentPositionX = initialRect.left;
        let currentPositionY = initialRect.top;

        function updatePosition() {
            currentPositionX += speedX;
            currentPositionY += speedY;

            element.style.left = currentPositionX + 'px';
            element.style.top = currentPositionY + 'px';

            console.log(currentPositionX, currentPositionY, speedX, speedY);
            requestAnimationFrame(updatePosition);
        }

        requestAnimationFrame(updatePosition);
    }
}