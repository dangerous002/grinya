function game(speed){
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    const ground = new Image();
    ground.src = "ground.png";

    const foodImg = new Image();
    foodImg.src = "food.ico";

    const head = new Image();
    head.src = 'head.ico'

    let box = 32;

    let score = 0;

    let food = {
        x: Math.floor((Math.random() * 17 + 1)) * box,
        y: Math.floor((Math.random() * 15 + 3)) * box,
    };

    let snake = [];
    snake[0] = {
        x: 9 * box,
        y: 10 * box
    };

    let dir;

    document.addEventListener("keydown", direction);

    // document.getElementById('cb1').addEventListener('click', function(event){
    //     if(dir != 'down'){
    //         dir = 'up';
    //     }
    // });
    // document.getElementById('cb2').addEventListener('click', function(event){
    //     if(dir != 'right'){
    //         dir = 'left';
    //     }
    // });
    // document.getElementById('cb3').addEventListener('click', function(event){
    //     if(dir != 'up'){
    //         dir = 'down';
    //     }
    // });
    // document.getElementById('cb4').addEventListener('click', function(event){
    //     if(dir != 'left'){
    //         dir = 'right'
    //     }
    // });

    document.getElementById('cb1').onclick = function(e){
        if (dir != 'down'){
            dir = 'up';
        }
    }

    document.getElementById('cb2').onclick = function(e){
        if (dir != 'right'){
            dir = 'left';
        }
    }

    document.getElementById('cb3').onclick = function(e){
        if (dir != 'up'){
            dir = 'down';
        }
    }

    document.getElementById('cb4').onclick = function(e){
        if (dir != 'left'){
            dir = 'right';
        }
    }


    function direction(event) {
        if(event.keyCode == 37 && dir != "right")
            dir = "left";
        else if(event.keyCode == 38 && dir != "down")
            dir = "up";
        else if(event.keyCode == 39 && dir != "left")
            dir = "right";
        else if(event.keyCode == 40 && dir != "up")
            dir = "down";
        else if(event.keyCode == 87 && dir != "down")
            dir = "up";
        else if(event.keyCode == 65 && dir != "right")
            dir = "left";
        else if(event.keyCode == 83 && dir != "up")
            dir = "down";
        else if(event.keyCode == 68 && dir != "left")
            dir = "right";
    }

    function eatTail(head, arr) {
        for(let i = 0; i < arr.length; i++) {
            if(head.x == arr[i].x && head.y == arr[i].y)
                clearInterval(game);
        }
    }

    function drawGame() {
        ctx.drawImage(ground, 0, 0);

        ctx.drawImage(foodImg, food.x, food.y);

        for(let i = 0; i < snake.length; i++) {
            // ctx.fillStyle = i == 0 ? "green" : "red";
            // ctx.fillRect(snake[i].x, snake[i].y, box, box);

            if(i == 0){
                ctx.drawImage(head, snake[0].x, snake[0].y);
            } else {
                ctx.fillStyle = "#00942a";
                ctx.fillRect(snake[i].x, snake[i].y, box, box);
            }
        }

        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.fillText(score, box * 2.5, box * 1.7);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if(snakeX == food.x && snakeY == food.y) {
            score++;
            food = {
                x: Math.floor((Math.random() * 17 + 1)) * box,
                y: Math.floor((Math.random() * 15 + 3)) * box,
            };
        } else
            snake.pop();

        if(snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17){
            clearInterval(game);
            setTimeout(showScore, 2500, score);
        }

        if(dir == "left") snakeX -= box;
        if(dir == "right") snakeX += box;
        if(dir == "up") snakeY -= box;
        if(dir == "down") snakeY += box;

        let newHead = {
            x: snakeX,
            y: snakeY
        };

        eatTail(newHead, snake);

        snake.unshift(newHead);
    }

    let game = setInterval(drawGame, speed);
}

const menu = {
    show: function(){
        document.querySelector('.menu').style.display = 'block';
    },
    hide: function(){
        document.querySelector('.menu').style.display = 'none';
    }
};

const container = {
    show: function(){
        document.querySelector('.container').style.display = 'block';
    },
    hide: function(){
        document.querySelector('.container').style.display = 'none';
    }
}

const scoreControl = {
    show: function(){
        document.querySelector('.score').style.display = 'block';
    },
    hide: function(){
        document.querySelector('.score').style.display = 'none';
    }
}

function getSpeed(difficultValue){
    if(difficultValue == 'easy'){
        speed = 150;
    } else if (difficultValue == 'medium'){
        speed = 110;
    } else if (difficultValue == 'hard'){
        speed = 75;
    } else {
        speed = 150;
    }
    return speed;
}

function gameStart(difficult){
    const speed = getSpeed(difficult);
    menu.hide();
    container.show();

    const controlButtons = document.querySelector('.controls');
    // const controlButtonsStyles = 'display: grid;grid-template-columns: repeat(3, 1fr);grid-template-rows: repeat(2, 1fr);grid-column-gap: 0px;grid-row-gap: 0px;width: 300px;height: 200px;';

    if(checkDevice() == 'pc'){
        controlButtons.style.display = 'none';
    }

    game(speed);
}

function gameStop(){
    scoreControl.hide();
    container.hide();
    menu.show();
}

function showScore(score){
    const scoreElement = document.getElementById('score_content');
    scoreElement.textContent = 'Счет: ' + String(score);
    scoreControl.show()
    console.log('Score: ' + String(score));
    setTimeout(gameStop, 2500);
}

function checkDevice(){
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
    .test(navigator.userAgent)) {
        return 'mobile'
    } else {
        return 'pc'
    }
}

function main(){
    const buttonStart = document.getElementById('start_button');
    const menuForm = document.getElementById('menu-form');

    menu.show();

    menuForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(menuForm);
        const difficult = formData.get('difficult-level');
        gameStart(difficult);
    })
}   

main();
