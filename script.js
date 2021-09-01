import { SNAKE_SPEED, update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection } from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js'

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');

// main is called again and again (forever)
function main(currentTime){
    if(gameOver){
        if(confirm('You lost, Press ok to restart.')){
            window.location = 'Snake-game/'
        }
        return
    }

    // requestAnimationFrame will ask main when to render next frame
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    // To not to render to much (here it should not render before .5 seconds)
    if(secondsSinceLastRender < 1 / SNAKE_SPEED) return

    console.log('Rendering');
    lastRenderTime = currentTime;

    // update if snake had food or not
    update();
    // to draw everything on screen
    draw();
}
window.requestAnimationFrame(main);

function update(){
    updateSnake();
    updateFood();
    checkDeath();
}
function draw(){
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}
