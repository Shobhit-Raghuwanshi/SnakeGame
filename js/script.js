let direction = { x: 0, y: 0 };

const foodsound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
musicSound.loop = true;
let lastPaintTime = 0;
let speed = 5;
let snakeArr = [
    { x: 12, y: 13 }
];
let food = { x: 10, y: 8 };
let score = 0;
function toggleplay() {
    if (musicSound.paused) {
        musicSound.play();
        sound.innerHTML = "<i class='fas fa-volume-up fa-2x'></i>";
    } else {
        musicSound.pause();
        sound.innerHTML = "<i class='fas fa-volume-mute fa-2x'></i>";
    }
}
sound.addEventListener("mouseup", toggleplay);

function main(ctime) {

    window.requestAnimationFrame(main);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}
function isCollide(snakearr) {

    for (var i = 1; i < snakearr.length; i++) {
        if (snakearr[i].x === snakearr[0].x && snakearr[i].y === snakearr[0].y) {
            return true;
        }
    }

    if ((snakearr[0].x > 20 || snakearr[0].x < 0 || snakearr[0].y > 20 || snakearr[0].y < 0)) {
        return true;
    }
    return false;
}

function gameEngine() {




    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        direction = { x: 0, y: 0 };

        alert("Game over!!!");

        snakeArr = [{ x: 12, y: 13 }];

        score = 0;

    }

    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodsound.play();
        snakeArr.unshift({ x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y });
        score++;
        Score.innerHTML = "Score" + score;
        let a = 1 + Math.floor(20 * Math.random());
        let b = 1 + Math.floor(20 * Math.random());

        food = { x: a, y: b };

    }

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;

    board.innerHTML = "";

    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


window.requestAnimationFrame(main);
window.addEventListener("keyup", e => {
    direction = { x: 0, y: 1 };
    moveSound.play();
    switch (e.code) {
        case "KeyW":
            console.log("W");
            direction.x = 0;
            direction.y = -1;
            break;
        case "KeyS":
            console.log("S");
            direction.x = 0;
            direction.y = 1;
            break;
        case "KeyD":
            console.log("D");
            direction.x = 1;
            direction.y = 0;
            break;
        case "KeyA":
            console.log("A");
            direction.x = -1;
            direction.y = 0;
            break;
        default:
            break;
    }
})