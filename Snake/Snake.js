var canvas = document.querySelector("canvas");

var c = canvas.getContext("2d");

let vx = 0;
let dvx = 10;
let vy = 0;
let dvy = 0;
let x = 0;
let y = 0;
let length = 80;
let height = 40;
let state = 0; // 0 for horizontal and 1 for vertical

window.addEventListener("keydown", (event) => {
	console.log(event.keyCode);
	// 37, 38, 39, 40
	// left, up, right, down
	switch(event.keyCode) {
		case 37:
			dvx = -Math.abs(dvx);
			dvy = 0;
			state = 0;
			break;
		case 39:
			dvx = Math.abs(dvx);
			dvy = 0;
			state = 0;
			break;
		case 38:
			dvy = -Math.abs(dvy);
			dvx = 0;
			if (state === 0) {
				dvy = 10;
				state = 1;
				var temp = length;
				length = height;
				height = temp;
				console.log(length, height);
			}
			break;
		case 40:
			dvy = Math.abs(dvy);
			dvx = 0;
			state = 1;
			break;
	}
})

const drawBoard = () => {
	for (var i = 0; i <= 600; i = i + 40) {
		c.moveTo(0, i);
		c.lineTo(600, i);
	}
	for (i = 0; i <= 600; i = i + 40) {
		c.moveTo(i, 0);
		c.lineTo(i, 600);
	}
    c.strokeStyle = "grey";
    c.stroke();
}

// drawBoard();

const Square = (x, y, length, height) => {
	c.fillStyle = "blue";
	c.fillRect(x, y, length, height);
}


const animate = () => {
	requestAnimationFrame(animate)
	c.clearRect(x, y, length, height);
	x += dvx;
	y += dvy;
	if (x <= 0 || x >= 600) {
		dvx = -dvx;
	}
	if (y <= 0 || y >= 600) {
		dvy = -dvy;
	}
	Square(x, y, length, height);
}


animate();










