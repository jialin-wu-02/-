const unit = 20;
const height = 600;
const width = 600;
let start = false;

let background = document.getElementById("bg");

let cbg = background.getContext("2d");

cbg.strokeStyle = "grey";
for (var i = 0; i <= width; i = i + unit) {
	cbg.moveTo(0, i);
	cbg.lineTo(height, i);
}
for (i = 0; i <= width; i = i + unit) {
	cbg.moveTo(i, 0);
	cbg.lineTo(i, height);
}

cbg.stroke();

let canvas = document.getElementById("game");
let scores = [0];

let c = canvas.getContext("2d");

const askAgain = (score) => {
	document.getElementById("card").style.display = "block";
	document.getElementById("endscore").innerHTML = "Score: " + score;
	document.getElementById("highestscore").innerHTML = "Highest: " + Math.max(...scores);
}

window.addEventListener("keydown", (event) => {
	if (!start) {
		if (event.keyCode === 13) {
			restart();
		}
	}

})

const clearBoard = () => {
	c.clearRect(0, 0, height, width);
}

const drawSquare = (x, y, color) => {
	c.fillStyle = color;
	c.fillRect(x * unit, y * unit, unit, unit);
}

const drawSnake = (snake) => {
	drawSquare(snake[0].x, snake[0].y, "#2B97FF");
	for (var i = 1; i < snake.length; i++) {
		drawSquare(snake[i].x, snake[i].y, "#2B97FF");
	}
}

const getNewFoodPosition = (snake) => {
	let randomX = Math.floor(Math.random() * (width / unit - 1));
	let randomY = Math.floor(Math.random() * (height / unit - 1));
	if (snakeOverlap(snake, randomX, randomY)) {
		return getNewFoodPosition(snake);
	} else {
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


const game = () => {

	let foodEaten = true;

	let leftdirection = false;
	let rightdirection = false;
	let updirection = false;
	let downdirection = false;

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
	let numberFoodEaten = -1; // a free food eaten, therefore get rid of it by -1.


	snake[0] = {x : x + 3, y: y}; // always the head of the snake
	snake[1] = {x : x + 2, y: y};
	snake[2] = {x : x + 1, y: y};
	snake[3] = {x : x, y: y};

	let food = getNewFoodPosition(snake);
	let justPressed = false; // handle lagging, get rid 

	window.addEventListener("keydown", (event) => {

		if (!justPressed) {
			justPressed = true;
			console.log(event.keyCode);
			// 37, 38, 39, 40
			// left, up, right, down
			console.log(snake);
			// when user press left in the start, snake needs to inverse its head.
			// only if 0's x is bigger than 1's x,
			// otherwise no need to reverse.
			if (event.keyCode == 37 && start == false && snake[0].x > snake[1].x) {
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
		}

	})


	const addSnake = (numberFoodEaten) => {
		if (numberFoodEaten <= 6) {
			var addNumber = 2;
		} else if (numberFoodEaten <= 12) {
			var addNumber = 4;
		} else {
			var addNumber = 8;
		}

		for (var i = 0; i < addNumber; i++) {
			snake[snake.length] = {x : snake[snake.length - 1].x, y: snake[snake.length - 1].y};
		}

	}


	const animate = () => {
		clearBoard();
		drawSnake(snake);
		justPressed = false;

		if (foodEaten) {
			foodEaten = false;
			food = getNewFoodPosition(snake);
			numberFoodEaten += 1;
			score = document.getElementsByClassName('score');
			score[0].innerHTML = "Score: " + numberFoodEaten * 100
		}

		if (numberFoodEaten <= 6) {
			drawSquare(food[0], food[1], "#FFD73C");
		} else if (numberFoodEaten <= 12) {
			drawSquare(food[0], food[1], "#EB952D");
		} else {
			drawSquare(food[0], food[1], "#FF5326");
		}
		
		if (snake[0].x == food[0] && snake[0].y == food[1]) {
			foodEaten = true;
			addSnake(numberFoodEaten);
		}

		// eat itself
		if (snakeOverlap(snake.slice(1, snake.length), snake[0].x, snake[0].y)) {
			clearInterval(timer);
			start = false;
			scores.push(numberFoodEaten * 100);
			askAgain(numberFoodEaten * 100);
		}

		// edges detection
		if (snake[0].x < 0 || snake[0].y < 0 
			|| snake[0].x > width / unit - 1 
			|| snake[0].y > height / unit - 1) {
			clearInterval(timer);
			start = false;
			scores.push(numberFoodEaten * 100);
			askAgain(numberFoodEaten * 100);
		}
		if (start) {
			move();
		}
	}

	var timer = setInterval(animate, 110);

}

var timer1 = game();

const restart = () => {
	document.getElementById("card").style.display = "none";
	clearInterval(timer1);
	timer1 = game();
}





