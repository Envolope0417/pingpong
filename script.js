document.addEventListener('DOMContentLoaded', () => {
    const playerPaddle = document.querySelector('.player-paddle');
    const table = document.querySelector('.table');
    let isDragging = false;

    // 监听鼠标按下事件
    playerPaddle.addEventListener('mousedown', (event) => {
        isDragging = true;
    });

    // 监听鼠标移动事件
    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const tableRect = table.getBoundingClientRect();
            const mouseX = event.clientX - tableRect.left;
            const mouseY = event.clientY - tableRect.top;

            // 限制球拍只能在球桌区域内移动
            if (mouseX > 40 && mouseX < tableRect.width - 40) {
                playerPaddle.style.left = `${mouseX - playerPaddle.offsetWidth / 2}px`;
            }
            if (mouseY > 40 && mouseY < tableRect.height - 40) {
                playerPaddle.style.top = `${mouseY - playerPaddle.offsetHeight / 2}px`;
            }
        }
    });

    // 监听鼠标松开事件
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
});
