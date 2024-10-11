;window.onload = function () {
    // 选择难度拖拽
    // choosedifficulty();
    // 获取标签元素
    function $(idName){
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
    
    // 获取需要使用到的元素样式
    function getStyle(element, styleProperty) {
        // 获取元素的计算样式
        const style = window.getComputedStyle(element);
        // 获取指定的样式值
        return style[styleProperty];
    }
    // 获取游戏界面的宽高
    var gameWidth = getStyle(game,"width"),
        gameHeight = getStyle(game,"height");
    // 游戏界面的左上外边距
    var gameML = getStyle(game,"marginLeft"),
        gameMT = getStyle(game,"marginTop");
    // 获取球拍的宽高
    var paddleWidth = getStyle(playerPaddle,"width"),
        paddleHeight = getStyle(playerPaddle,"height");
    // 获取小球宽高
    var ballWidth = getStyle(ball,"width"),
        ballHeight = getStyle(ball,"height");
    // 获取小球的位置
    var ballLeft = getStyle(ball,"left"),
        ballTop = getStyle(ball,"top");
    // 获取球拍的位置
    var playerPaddleLeft = getStyle(playerPaddle,"left"),
        playerPaddleTop = getStyle(playerPaddle,"top");
    // 
    
    
    

    
    // 全局变量
    // var gameStatus = false;
        
   

    // 从选择模式到选择难度的页面切换
    playwithBot.onclick = function(){
        chooseMode.style.display = "none";
        chooseDifficulty.style.display = "block";
        gamePlay.style.display = "none";
        // 难度条拖拽
        // enableDrag(sliderCircle, slider);
        choosedifficulty();
        // console.log(sliderLong.style.width,sliderCircle.style.left,slider.style.left);
    }
    // 从选择难度back到选择模式页面
    back2.onclick = function(){
        chooseMode.style.display = "block";
        chooseDifficulty.style.display = "none";
        gamePlay.style.display = "none";

        
    }
    
    // 开始游戏
    // .从选择难度界面进入游戏界面
    playbtn.onclick = function(){
        chooseMode.style.display = "none";
        chooseDifficulty.style.display = "none";
        gamePlay.style.display = "block";
        // 鼠标移动事件
        document.addEventListener("mousemove", function (event) {
            const mouse_x = event.clientX;
            const mouse_y = event.clientY;
            // 计算得到鼠标移动时球拍的位置

            gameml = parseInt(gameML);
            gamemt = parseInt(gameMT);
            
            playerPaddle.style.left = mouse_x - gameml - 20 + "px";
            playerPaddle.style.top = mouse_y - gamemt - 20 + "px";


            console.log(mouse_x, mouse_y, gameml, gamemt);
        });
        // 给当前文档添加键盘事件
        // document.onkeyup = function(){
        //     this.onmousemove = paddleMove;
        // }
        // enableDrag(playerPaddle, gamePlay);
        // trackElementPosition(playerPaddle);
        // trackElementPosition(ball);
        // isColliding(playerPaddle, ball);
        // startCollisionDetection(playerPaddle, ball);
        checkCollision(playerPaddle, ball, () => {
            console.log('Elements are colliding!');
            console.log(playerPaddle.style.left, ball.style.left);
            trackElementDisplacementOverTime(playerPaddle, (displacement) => {
                console.log(displacement.x, displacement.y);
                var paddleVx = displacement.x;
                var paddleVy = displacement.y;
                moveElement(ball, paddleVx, paddleVy);
                //console.log(ball.style.left, ball.style.top);
            });
            //console.log(a);
            // setTimeout(() => {
            //     console.log();
            //     // 这里可以执行一些操作，例如发送位移数据到服务器或进行进一步分析
            // }, 5000);
            // const tracker = trackElementDisplacementOverTime(playerPaddle, 'x');
            // var px = tracker.getDisplacements();
            // console.log(px);
            // console.log(getVelocity(playerPaddle));
            // var bx = trackElementDisplacementOverTime(ball, 'x');
            // var by = trackElementDisplacementOverTime(ball, 'y');
            // var px = trackElementDisplacementOverTime(playerPaddle, 'x');
            // var py = trackElementDisplacementOverTime(playerPaddle, 'y');
            // console.log(bx, by, px, py);
            
        });

        
    }
    
    
    // 实现鼠标拖拽球拍
    
    // 拖拽物品方法
    // function enableDrag(element, container) {
    //     let isDragging = false;
    //     let offsetX = 0;
    //     let offsetY = 0;

    //     // 开始拖动事件
    //     element.addEventListener('mousedown', (e) => {
    //         const elementRect = element.getBoundingClientRect();

    //         // 记录鼠标点击时相对元素的偏移量
    //         offsetX = e.clientX - elementRect.left;
    //         offsetY = e.clientY - elementRect.top;
    //         isDragging = true;
    //     });

    //     // 鼠标移动事件，更新元素的位置
    //     document.addEventListener('mousemove', (e) => {
    //         if (isDragging) {
    //             const containerRect = container.getBoundingClientRect();

    //             // 计算新的位置
    //             let newX = e.clientX - containerRect.left - offsetX;
    //             let newY = e.clientY - containerRect.top - offsetY;

    //             // 限制拖动范围
    //             if (newX < 0) newX = 0;
    //             if (newY < 0) newY = 0;
    //             if (newX + element.offsetWidth > containerRect.width) newX = containerRect.width - element.offsetWidth;
    //             if (newY + element.offsetHeight > containerRect.height) newY = containerRect.height - element.offsetHeight;

    //             // 更新元素的位置
    //             element.style.left = `${newX}px`;
    //             element.style.top = `${newY}px`;
    //         }
    //     });

    //     // 停止拖动事件
    //     document.addEventListener('mouseup', () => {
    //         isDragging = false;
    //     });
        
    // }

    
    
    // 选择难度拖拽的方法
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
    
    // 每0.1秒获取一次元素位置的方法
    // function trackElementPosition(element) {
    //     // if (!(element instanceof HTMLElement)) {
    //     //     console.error('The provided element is not a valid HTML element.');
    //     //     return;
    //     // }

    //     const updatePosition = () => {
    //         // 获取元素的位置信息
    //         const rect = element.getBoundingClientRect();
    //         const left = rect.left + window.scrollX;
    //         const top = rect.top + window.scrollY;
    //         const right = rect.right + window.scrollX;
    //         const bottom = rect.bottom + window.scrollY;

    //         // 打印元素的位置信息
    //         // console.log(`Element position: left=${left}, top=${top}, right=${right}, bottom=${bottom}`);

    //         // 使用requestAnimationFrame来实现每0.1秒更新一次位置
    //         requestAnimationFrame(updatePosition);
    //     };

    //     // 启动位置跟踪
    //     requestAnimationFrame(updatePosition);
    // }
    

    // 碰撞逻辑
    // function detectCollision(el1, el2) {
    //     // 获取元素的边界矩形
    //     const rect1 = el1.getBoundingClientRect();
    //     const rect2 = el2.getBoundingClientRect();

    //     // 检查两个元素是否碰撞
    //     const isColliding = !(
    //         rect1.right < rect2.left || // el1 在 el2 左侧
    //         rect1.left > rect2.right || // el1 在 el2 右侧
    //         rect1.bottom < rect2.top || // el1 在 el2 上方
    //         rect1.top > rect2.bottom    // el1 在 el2 下方
    //     );

    //     return isColliding;
    // }

    // // function checkCollision(el1, el2, callback) {
    // //     function update() {
    // //         const collided = detectCollision(el1, el2);

    // //         if (collided) {
    // //             callback(); // 触发碰撞时的回调
    // //         }

    // //         requestAnimationFrame(update); // 每帧继续检测
    // //     }

    // //     requestAnimationFrame(update);
    // // }

    // function checkCollision(el1, el2, callback) {
    //     function update() {
    //         const collided = detectCollision(el1, el2);

    //         if (collided) {
    //             callback(); // 触发碰撞时的回调
    //         }
    //     }

    //     // 使用setInterval每0.5秒检查一次碰撞
    //     setInterval(update, 50); 
    // }

    // // 计算速度的方法
    // // function getVelocity(el) {
    // //     let prevTime = null;
    // //     let prevPosition = { x: 0, y: 0 };
    // //     let velocity = { x: 0, y: 0 };

    // //     function updateVelocity(currentTime) {
    // //         if (!prevTime) {
    // //             prevTime = currentTime;
    // //             const rect = el.getBoundingClientRect();
    // //             prevPosition.x = rect.left + rect.width / 2;
    // //             prevPosition.y = rect.top + rect.height / 2;
    // //             requestAnimationFrame(updateVelocity);
    // //             return;
    // //         }

    // //         const timeDelta = (currentTime - prevTime) / 1000; // 转换为秒
    // //         prevTime = currentTime;

    // //         const rect = el.getBoundingClientRect();
    // //         const currentPosition = {
    // //             x: rect.left + rect.width / 2, // 获取元素中心的X坐标
    // //             y: rect.top + rect.height / 2,  // 获取元素中心的Y坐标
    // //         };

    // //         const deltaX = currentPosition.x - prevPosition.x;
    // //         const deltaY = currentPosition.y - prevPosition.y;

    // //         // 计算速度，单位是px/秒
    // //         velocity.x = deltaX / timeDelta;
    // //         velocity.y = deltaY / timeDelta;

    // //         // 更新上一帧的位置
    // //         prevPosition = currentPosition;

    // //         requestAnimationFrame(updateVelocity); // 每帧继续更新速度
    // //     }

    // //     // 启动 requestAnimationFrame 来计算速度
    // //     requestAnimationFrame(updateVelocity);

    // //     // 返回一个函数来获取当前速度
    // //     return function getCurrentVelocity() {
    // //         console.log(velocity.x, velocity.y);
    // //         return { x: velocity.x, y: velocity.y };
    // //         // return velocity;
    // //     };
    // // }

    // // 获取元素位移的方法
    // // function trackElementDisplacementOverTime(el, direction) {
    // //     let lastPosition = 0;
    // //     let currentPosition = 0;

    // //     // 初始化位置
    // //     if (direction === 'x') {
    // //         lastPosition = el.getBoundingClientRect().left;
    // //     } else if (direction === 'y') {
    // //         lastPosition = el.getBoundingClientRect().top;
    // //     }

    // //     // 使用setInterval定时更新位移
    // //     setInterval(() => {
    // //         const rect = el.getBoundingClientRect();

    // //         // 根据方向获取当前位置信息
    // //         if (direction === 'x') {
    // //             currentPosition = rect.left;
    // //         } else if (direction === 'y') {
    // //             currentPosition = rect.top;
    // //         } 
    // //     }, 200); // 每0.5秒更新一次位置信息

    // //     // 返回一个函数来获取0.5秒内的位移
        
    // //         const displacement = currentPosition - lastPosition;
    // //         lastPosition = currentPosition; // 更新为当前位置
    // //         return console.log(displacement, currentPosition, lastPosition);
        
    // // }

    // // function trackElementDisplacementOverTime(el, direction) {
    // //     let lastPosition = direction === 'x' ? el.getBoundingClientRect().left : el.getBoundingClientRect().top;
    // //     let currentPosition;

    // //     setInterval(() => {
    // //         const rect = el.getBoundingClientRect();
    // //         currentPosition = direction === 'x' ? rect.left : rect.top;
    // //         const displacement = currentPosition - lastPosition;
    // //         lastPosition = currentPosition;
    // //         // console.log(`Displacement in ${direction}: ${displacement}`);
            
    // //     }, 250); // 每0.2秒更新一次位置信息
        
    // // }
    // // 获取碰撞前的位移
    // function trackElementDisplacementOverTime(el, callback) {
    //     let lastPosition = {
    //         x: el.getBoundingClientRect().left,
    //         y: el.getBoundingClientRect().top
    //     };

    //     setInterval(() => {
    //         const rect = el.getBoundingClientRect();
    //         const currentPosition = {
    //             x: rect.left,
    //             y: rect.top
    //         };
    //         const displacement = {
    //             x: currentPosition.x - lastPosition.x,
    //             y: currentPosition.y - lastPosition.y
    //         };
    //         lastPosition = currentPosition;

    //         // 立即调用回调函数，并将位移值作为参数传递
    //         if (typeof callback === 'function') {
    //             callback(displacement);
    //         }
    //     }, 250); 
    // }

    // // 小球的移动
    // function moveElement(element, speedX, speedY) {
    //     // 获取元素的初始位置
    //     const initialRect = element.getBoundingClientRect();
    //     let currentPositionX = initialRect.left;
    //     let currentPositionY = initialRect.top;

    //     // 定义一个函数来更新元素的位置
    //     function updatePosition() {
    //         // 更新位置
    //         currentPositionX += speedX;
    //         currentPositionY += speedY;

    //         // 设置元素的新位置
            
    //         element.style.left = currentPositionX + 'px';
    //         element.style.top = currentPositionY + 'px';
            
    //         console.log(currentPositionX, currentPositionY);
    //         // 通过 requestAnimationFrame 来创建一个递归的动画循环
    //         requestAnimationFrame(updatePosition);
    //     }

    //     // 启动动画循环
    //     requestAnimationFrame(updatePosition);
    // }
    
}




