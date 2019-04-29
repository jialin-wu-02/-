var canvas = document.querySelector("canvas");

var c = canvas.getContext("2d");

const unit = 40;
const height = 600;
const width = 600;

let leftdirection;
let rightdirection;
let updirection;
let downdirection;

window.addEventListener("keydown", (event) => {
	console.log(event.keyCode);
	// 37, 38, 39, 40
	// left, up, right, down
	if (event.keyCode == 37 && !rightdirection) {
		leftdirection = true;
		updirection = false;
		downdirection = false;
	} else if (event.keyCode == 39 && !leftdirection) {
		rightdirection = true;
		updirection = false;
		downdirection = false;
	} else if (event.keyCode == 38 && !downdirection) {
		rightdirection = false;
		leftdirection = false;
		updirection = true;
	} else if (event.keyCode == 40 && !updirection) {
		rightdirection = false;
		leftdirection = false;
		downdirection = true;
	}
})

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

drawBoard();

class Square {

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	draw() {
		// console.log(unit, this.x);
		c.fillStyle = "blue";
		c.fillRect(this.x * unit, this.y * unit, unit, unit);
	}

	moveRight() {
		this.x = this.x + 1;
	}
}


const clearBoard = () => {
	c.clearRect(0, 0, height, width);
	drawBoard();
}

var x = 0;
var y = 2;
let a = new Square(x, y);
let b = new Square(x + 1, y);

const animate = () => {
	clearBoard();
	// a.draw();
	b.draw();
	// b.draw();
	if (rightdirection) {
		a.moveRight();
		a.draw();
	} 
	// else if (leftdirection) {
		// x -= 1;
	// } else if (updirection) {
	// 	y -= 1;
	// } else if (downdirection) {
	// 	y += 1;
	// }
}

setInterval(animate, 150);










