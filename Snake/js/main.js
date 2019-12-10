const canvas = document.querySelector('#canvasMain');
const ctx = canvas.getContext('2d');
var modeGame = document.querySelector('#mode');

const grid = 20; // 20x20
const FPS = 10;
var stopId;

var snake = {
    x: 200, // head x
    y: 200, // head y
    cells: [],
    dx: grid, //snake speed start x
    dy: 0 //snake speed start y

};

var food = {
    x: randomFood(0, grid) * grid,
    y: randomFood(0, grid) * grid
};

//stop game khi chet

function playGame() {

    setTimeout(function () {
        stopId = requestAnimationFrame(playGame);
    }, 1000 / FPS);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // snake move 
    snake.x += snake.dx;
    snake.y += snake.dy;
    // // thêm đầu và xoá đuôi để tạo hiệu ứng di chuyển 1 ô
    snake.cells.unshift({
        x: snake.x,
        y: snake.y
    });
    // khi snake length > 1 mới xoá đuôi
    if (snake.cells.length >= 2) {
        snake.cells.pop();
    }

    // đụng tường
    if (modeGame.textContent === 'A') {

        if (snake.x < 0 || snake.x > canvas.width || snake.y < 0 || snake.y > canvas.height) {
            resetGame();
            stopGame();
            return;
        }
    } else if (modeGame.textContent === 'B') { // xuyên tường

        // horizontal wall
        if (snake.x < 0) {
            snake.x = canvas.width - grid;
            snake.cells[0].x = snake.x;
        } else if (snake.x >= canvas.width) {
            snake.x = 0;
            snake.cells[0].x = 0;
        }
        // vertical wall
        if (snake.y < 0) {
            snake.y = canvas.height - grid;
            snake.cells[0].y = snake.y;
        } else if (snake.y >= canvas.height) {
            snake.y = 0;
            snake.cells[0].y = 0;
        }
    }


    // draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, grid, grid);
    //draw snake
    snake.cells.forEach(function (cell, index) {
        if (index === 0) { // head
            ctx.fillStyle = 'blue';
            ctx.fillRect(cell.x, cell.y, grid, grid);

        } else { // body
            ctx.fillStyle = 'rgb(29, 105, 219)';
            ctx.fillRect(cell.x, cell.y, grid, grid);
        }

        // snake eat food
        if (cell.x === food.x && cell.y === food.y) {

            snake.cells.push({
                x: snake.cells[snake.cells.length - 1].x - snake.dx,
                y: snake.cells[snake.cells.length - 1].y - snake.dy
            });
            food.x = randomFood(0, grid) * grid;
            food.y = randomFood(0, grid) * grid;
        }

        // kiễm tra rắn cắn thân
        for (let i = index + 1; i < snake.cells.length; i++) {
            // răn cắn thân => end
            if (snake.x === snake.cells[i].x && snake.y === snake.cells[i].y) {
                resetGame();
                stopGame();
                return;
            }

        }
    });



}

//function handle

function stopGame() {
    snake.dx = 0;
    snake.dy = 0;
    window.cancelAnimationFrame(stopId);

}

function resetGame() {

    snake = {
        x: 200, // head x
        y: 200, // head y
        cells: [],
        dx: grid, //snake speed start x
        dy: 0 //snake speed start y

    };

    food = {
        x: randomFood(0, grid) * grid,
        y: randomFood(0, grid) * grid
    };

}

function randomFood(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function changeMode(e) {

    if (e.keyCode === 79) {
        modeGame.textContent = 'A';
    } else if (e.keyCode === 80) {
        modeGame.textContent = 'B';
    }
}

function keyPush(e) {

    switch (e.keyCode) {
        //left key | A  
        case 37:
        case 65:
            if (!(snake.dx === grid && snake.dy === 0) && !(snake.dx === -grid && snake.dy === 0)) { // prevent quay đầu
                snake.dx = -grid;
                snake.dy = 0;
            }
            break;
            // up key | W
        case 38:
        case 87:
            if (!(snake.dx === 0 && snake.dy === grid) && !(snake.dx === 0 && snake.dy === -grid)) { // prevent quay đầu
                snake.dx = 0;
                snake.dy = -grid;
            }
            break;
            // right key | D
        case 39:
        case 68:
            if (!(snake.dx === -grid && snake.dy === 0) && !(snake.dx === grid && snake.dy === 0)) { // prevent quay đầu
                snake.dx = grid;
                snake.dy = 0;
            }
            break;
            // down key | S
        case 40:
        case 83:
            if (!(snake.dx === 0 && snake.dy === -grid) && !(snake.dx === 0 && snake.dy === grid)) { // prevent quay đầu
                snake.dx = 0;
                snake.dy = grid;
            }
            break;
    }
}

//event handle
document.addEventListener('keydown', keyPush);
document.addEventListener('keydown', changeMode);
//start game
stopId = requestAnimationFrame(playGame);