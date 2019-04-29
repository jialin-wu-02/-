const unit = 20;
const height = 600;
const width = 600;

let start = false;
let foodEaten = true;

let leftdirection = false;
let rightdirection = false;
let updirection = false;
let downdirection = false;

let canvas = document.querySelector("canvas");

let c = canvas.getContext("2d");

const drawBoard = () => {
	c.strokeStyle = "grey";
	for (var i = 0; i <= width; i = i + unit) {
		c.moveTo(0, i);
		c.lineTo(height, i);
	}
	for (i = 0; i <= width; i = i + unit) {
		c.moveTo(i, 0);
		c.lineTo(i, height);
	}
    c.stroke();
}


const clearBoard = (x, y) => {
	c.clearRect(0, 0, height, width);
	drawBoard();
}

const drawSquare = (x, y, color) => {
	c.fillStyle = color;
	c.fillRect(x * unit, y * unit, unit, unit);
}

const drawSnake = (snake) => {
	drawSquare(snake[0].x, snake[0].y, "blue");
	for (var i = 1; i < snake.length; i++) {
		drawSquare(snake[i].x, snake[i].y, "blue");
	}
}

const getNewFoodPosition = () => {
	let randomX = Math.floor(Math.random() * (width / unit - 1));
	let randomY = Math.floor(Math.random() * (height / unit - 1));
	if (snakeOverlap(snake, randomX, randomY)) {
		return getNewFoodPosition();
	} else {
		foodEaten = false;
		return [randomX, randomY];
	}
}

const snakeOverlap = (snake, randomX, randomY) => {
	for (let i = 0; i < snake.length; i++) {
		if (snake[i].x === randomX && snake[i].y === randomY) {
			return true;
		}
	}
	return false;
}

const move = () => {
	let dx = 0;
	let dy = 0;
	if (rightdirection) {
		dx = 1;
	} else if (leftdirection) {
		dx = -1;
	} else if (updirection) {
		dy = -1;
	} else if (downdirection) {
		dy = 1;
	}
	for (let i = snake.length - 1; i >= 1; i--) {
		snake[i].x = snake[i-1].x;
		snake[i].y = snake[i-1].y;
	}
	snake[0].x += dx;
	snake[0].y += dy;
}

let snake = [];
let x = Math.floor(Math.random() * (width / unit - 3));
let y = Math.floor(Math.random() * (height / unit - 3));

snake[0] = {x : x + 3, y: y}; // always the head of the snake
snake[1] = {x : x + 2, y: y};
snake[2] = {x : x + 1, y: y};
snake[3] = {x : x, y: y};

let food = getNewFoodPosition();

window.addEventListener("keydown", (event) => {
	console.log(event.keyCode);
	// 37, 38, 39, 40
	// left, up, right, down

	// when user press left in the start, snake needs to inverse its head.
	if (event.keyCode == 37 && start == false) {
		start = true;
		snake.reverse();
	}
	if (event.keyCode == 37 && !rightdirection) {
		start = true;
		leftdirection = true;
		updirection = false;
		downdirection = false;
	} else if (event.keyCode == 39 && !leftdirection) {
		start = true;
		rightdirection = true;
		updirection = false;
		downdirection = false;
	} else if (event.keyCode == 38 && !downdirection) {
		start = true;
		rightdirection = false;
		leftdirection = false;
		updirection = true;
	} else if (event.keyCode == 40 && !updirection) {
		start = true;
		rightdirection = false;
		leftdirection = false;
		downdirection = true;
	}
})


const animate = () => {
	clearBoard();
	if (foodEaten) {
		food = getNewFoodPosition();
	}
	drawSquare(food[0], food[1], "red");
	drawSnake(snake);
	if (snake[0].x == food[0] && snake[0].y == food[1]) {
		foodEaten = true;
		snake[snake.length] = {x : snake[snake.length - 1].x, y: snake[snake.length - 1].y};
		snake[snake.length] = {x : snake[snake.length - 1].x, y: snake[snake.length - 1].y};
	}

	// eat itself
	if (snakeOverlap(snake.slice(1, snake.length), snake[0].x, snake[0].y)) {
		clearInterval(timer);
	}

	// edges detection
	if (snake[0].x < 0 || snake[0].y < 0 
		|| snake[0].x > width / unit - 1 
		|| snake[0].y > height / unit - 1) {
		clearInterval(timer);
	}
	if (start) {
		move();
	}
}

var timer = setInterval(animate, 110);





