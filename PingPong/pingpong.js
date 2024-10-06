;window.onload = function () {
    // 选择难度拖拽
    choosedifficulty();
    // 获取标签元素
    function $(idName){
        return document.getElementById(idName);
    }
    // 获取需要使用到的标签元素
    var game = $("game"),
        chooseMode = $("choose-mode"),
        chooseDifficulty = $("choose-difficulty"),
        
        playwithFriend = $("friend-btn"),
        playwithBot = $("bot-btn"),
        back1 = $("back1"),
        back2 = $("back2");

    // 从选择模式到选择难度的页面切换
    playwithBot.onclick = function(){
        chooseMode.style.display = "none";
        chooseDifficulty.style.display = "block";
    }
    // 从选择难度back到选择模式页面
    back2.onclick = function(){
        chooseMode.style.display = "block";
        chooseDifficulty.style.display = "none";
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




