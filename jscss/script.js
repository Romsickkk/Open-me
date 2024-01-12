const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Ground and food icons
const ground = new Image();
ground.src = "content/ground.png";

const foodCherry = new Image();
foodCherry.src = "content/foodCherry.png";

const foodCoconut = new Image();
foodCoconut.src = "content/foodCoconut.png";

const foodStrawberry = new Image();
foodStrawberry.src = "content/foodStrawberry.png";

// Random food icon
const allFoods = [foodCherry, foodCoconut, foodStrawberry];
let newFood = allFoods[Math.floor(Math.random() * allFoods.length)];
let oldFood;

function newRandomFood(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomFoodFunc(array) {
  while (true) {
    newFood = newRandomFood(array);
    if (oldFood != newFood) {
      return newFood;
    }
  }
}

//Food and snake position
let box = 32;
let score = 0;

let food = {
  x: Math.floor(Math.random() * Math.floor(box / 2) + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

let event = document.addEventListener("keydown", direction);

// Movement keys
let dir = "";
function direction(event) {
  if ((event.keyCode == 37 || event.keyCode == 65) && dir != "right") {
    dir = "left";
  } else if ((event.keyCode == 38 || event.keyCode == 87) && dir != "down") {
    dir = "up";
  } else if ((event.keyCode == 39 || event.keyCode == 68) && dir != "left") {
    dir = "right";
  } else if ((event.keyCode == 40 || event.keyCode == 83) && dir != "up") {
    dir = "down";
  }
}

// Game function
function drowGame() {
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(newFood, food.x, food.y);

  //Snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "red" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  //Score
  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.fillText(score, box * 2.5, box * 2);

  //Snake Movement
  function foodFunc() {
    while (true) {
      food = {
        x: Math.floor(Math.random() * Math.floor(box / 2) + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box,
      };
      if (
        food.x < box + 1 ||
        food.x > box * Math.floor(box / 2) - 1 ||
        food.y < 3 * box + 1 ||
        food.y > box * Math.floor(box / 2) - 1
      ) {
      } else {
        return food;
      }
    }
  }

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (snakeX == food.x && snakeY == food.y) {
    oldFood = newFood;
    score++;
    foodFunc();
    newFood = randomFoodFunc(allFoods);
    funcPoint(pointEat);
  } else {
    snake.pop();
  }

  // Game LOST
  if (
    snakeX < box ||
    snakeX > box * Math.floor(box / 2) ||
    snakeY < 3 * box ||
    snakeY > box * Math.floor(box / 2)
  ) {
    clearInterval(game);
    clearAllMusics();
    pointSound(loseSound, firstAudio);
    openPopup();
    startLowSoundMusic(gameOver);
    backgroundColor.style.backgroundColor = "#FF0000";
  }
  function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (head.x == arr[i].x && head.y == arr[i].y) {
        clearInterval(game);
        clearAllMusics();
        pointSound(loseSound, firstAudio);
        openPopup();
        startLowSoundMusic(gameOver);
        backgroundColor.style.backgroundColor = "#FF0000";
      }
    }
  }

  if (dir == "left") snakeX -= box;
  if (dir == "right") snakeX += box;
  if (dir == "up") snakeY -= box;
  if (dir == "down") snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  eatTail(newHead, snake);
  snake.unshift(newHead);
}

//Game Interval
let game;
game = setInterval(drowGame, 200);
function newInterval(newIntervalNum) {
  clearInterval(game);

  game = setInterval(drowGame, newIntervalNum);
}
