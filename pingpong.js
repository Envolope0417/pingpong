;window.onload = function () {
    // 选择难度拖拽
    choosedifficulty();
    // 获取标签元素
    function $(idName){
        return document.getElementById(idName);
    }
    
    function getStyle(ele, attr) {
        var res = window.getComputedStyle(ele, null)[attr];
        return parseFloat(res);
    }
    
    //获取需要使用到的元素样式
    //1、获取游戏界面的宽高
    var gameWidth = getStyle(game,"width"),
        gameHeight = getStyle(game,"height");
    // 2、游戏界面的左上外边距
    var gameML = getStyle(game,"marginLeft"),
        gameMT = getStyle(game,"marginTop");
    // 3、获取小球宽高
    var ballWidth = getStyle(ball,"width"),
        ballHeight = getStyle(ball,"height");
    // 4、获取球拍的宽高
    var paddleWidth = getStyle(paddle,"width"),
        paddleHeight = getStyle(paddle,"height");
    // 全局变量
    var gameStatus = false;

    
    // 获取需要使用到的标签元素
    var game = $("game"),
        chooseMode = $("choose-mode"),
        chooseDifficulty = $("choose-difficulty"),
        gamePlay = $("gamePlay"),
        playwithFriend = $("friend-btn"),
        playwithBot = $("bot-btn"),
        back1 = $("back1"),
        back2 = $("back2");
        playbtn = $("play-btn");

    // 从选择模式到选择难度的页面切换
    playwithBot.onclick = function(){
        chooseMode.style.display = "none";
        chooseDifficulty.style.display = "block";
        gamePlay.style.display = "none";
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
        // 给当前文档添加键盘事件
        document.onkeyup = function(){
            this.onmousemove = paddleMove;
        }
    }
    //球拍的移动
    function paddleMove(evt){
        var e = evt || window.event;
        // 获取鼠标移动时的位置
        var mouse_x = e.x || e.pageX,
            mouse_y = e.y || e.pageY;
            
        // 计算得到鼠标移动时球拍的位置
        var paddle_left = mouse_x - gameML - paddleWidth/2,
            paddle_top = mouse_y - gameMT - paddleHeight/2;
        paddle.style.left = paddle_left;
        paddle.style.top = paddle_top;  
    }
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
    
}




