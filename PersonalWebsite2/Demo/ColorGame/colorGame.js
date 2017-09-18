
var squares = document.querySelectorAll(".square");
var numOfInitSq = squares.length;

var colors = generateColors(numOfInitSq);
//initiate colors;
initColors(numOfInitSq);

var rightColor = pickColor(numOfInitSq);
var result = document.querySelector("#result");
var header = document.querySelector("header");
var initColor = header.style.background;

//set the rgb in header to the rightColor's value
var colorDisplay = document.getElementById("colorDisplay")
colorDisplay.textContent = rightColor;

function generateColors(num){
	var colorPicked = [];
	for (var i = 0; i < num; i++) {
		colorPicked.push(randomColor());
	}
	return colorPicked;
}

function randomColor() {
	var r = Math.floor(Math.random() * 256);	
	var g = Math.floor(Math.random() * 256);	
	var y = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + y + ")";	
}

function pickColor(maxNum) {
	var pos = Math.floor(Math.random() * maxNum);
	return colors[pos];
}

function initColors(num) {
	for(var i = 0; i < num; i++) {
		// change color for each square
		squares[i].style.background = colors[i];

		// add event listener to each square
		squares[i].addEventListener("click", function() {
			var clickedColor = this.style.background;
			if (clickedColor === rightColor) {
				result.textContent = "Correct!";
				unifyColor(rightColor);
			} else {
				this.style.background = "black";
				result.textContent = "Try Again!"
			}
		});
	}
}

function unifyColor(color) {
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.background = color;
	}
	header.style.background = color;
}


var playAgain = document.querySelector("#playAgainBtn");

playAgain.addEventListener("click", function() {
	colors = generateColors(numOfInitSq);
	initColors(numOfInitSq);
	rightColor = pickColor(numOfInitSq);
	colorDisplay.textContent = rightColor;
	result.textContent = "";
	header.style.background = initColor;
});


var easy = document.querySelector("#easyBtn");
var hard = document.querySelector("#hardBtn");

// add EL for easy btn
easy.addEventListener("click", function() {
	numOfInitSq = 3;
	easy.classList.add("selected");
	easy.style.color = "white";
	hard.classList.remove("selected");
	hard.style.color = initColor;
	colors = generateColors(numOfInitSq);
	initColors(numOfInitSq);
	rightColor = pickColor(numOfInitSq);
	colorDisplay.textContent = rightColor;
	result.textContent = "";
	header.style.background = initColor;

	for (var i = numOfInitSq; i < squares.length; i++) {
		squares[i].style.display = "none";
	}
});

hard.addEventListener("click", function() {
	numOfInitSq = squares.length;
	easy.classList.remove("selected");
	easy.style.color = initColor;
	hard.classList.add("selected");
	hard.style.color = "white";
	colors = generateColors(numOfInitSq);
	initColors(numOfInitSq);
	rightColor = pickColor(numOfInitSq);
	colorDisplay.textContent = rightColor;
	result.textContent = "";
	header.style.background = initColor;

	for (var i = 0; i < numOfInitSq; i++) {
		squares[i].style.display = "block";
	}

});



