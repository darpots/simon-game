// Sounds
const sound1 = document.querySelector('.sound1');
const sound2 = document.querySelector('.sound2');
const sound3 = document.querySelector('.sound3');
const sound4 = document.querySelector('.sound4');

// Buttons
const startButton = document.querySelector('.start');
const powerbutton = document.querySelector('.powerbutton');
let poweredUp = false; // is game switched on?
const display = document.querySelector('.display');
const strict = document.querySelector('.strict');
let strictMode = false;

//  Lightpads
const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');

// Scores
let score;
let simon;
let player = [];
let winningScore = 20;

// Reset 
function init() {
	if (poweredUp) {
		score = 1;
		simon = [];
		display.textContent = score;
		game();
	}
}


// Main game 
function game() {
	player = [];
	randomNumber();
	playback();
}

function checkCorrect() {
	for (var i = 0; i < simon.length; i++) {
		if (player[player.length -1] !== simon[player.length -1]) {
			player = [];
			if (strictMode) {
				init();
			}
		}
		if (player.length === winningScore) {
			winner();
			return;
		}
		if (player.length === simon.length) {
			score++;
			setTimeout(() => {
				display.textContent = score;
			}, 300)
			game();
		}
	}
}


function winner() {
	setTimeout(() => {
		green.classList.add('brighten');
		red.classList.add('brighten');
		yellow.classList.add('brighten');
		blue.classList.add('brighten');
	}, 400)
	display.textContent = 'Win';
}



// Make random number
function randomNumber() {
	num = Math.floor(Math.random() * 4) + 1;
	simon.push(num);
}

// Play simon sounds
function playback() {
	let delay = 0;
	simon.forEach((arr) => {
		setTimeout(function () {
			playbackSound(arr);
		}, 1000 + delay)
		delay += 600;
	})
}


//  Power-on the game
function powerUpSimon() {
	poweredUp = !poweredUp;
	if (poweredUp) {
		powerbutton.classList.add('switchon');
		display.textContent = 'On';
		setTimeout(() => {
			display.textContent = '0'
		}, 500);
	} else {
		powerbutton.classList.remove('switchon')
		display.textContent = 'Off';
		setTimeout(() => {
			display.textContent = ''
		}, 1000);
	}
}

// Check for strcit mode
function isStrict() {
	strictMode = !strictMode;
	if (strictMode) {
		strict.classList.add('stricton');
		init();
	} else {
		strict.classList.remove('stricton');
		init();
	}
}

// Detect pad press and invoke playsound
function padPressed(e) {
	if (poweredUp) {
		arr = parseInt(e.target.dataset.color);
		player.push(arr);
		playbackSound(arr);
		checkCorrect();
	}
}

// Play sound and light pads
function playbackSound(arr) {
	if (arr === 1) {
		sound1.play();
		green.classList.add('brighten');
		setTimeout(() => {
			green.classList.remove('brighten');
		}, 300);
	}
	if (arr === 2) {
		sound2.play();
		red.classList.add('brighten');
		setTimeout(() => {
			red.classList.remove('brighten');
		}, 300);
	}
	if (arr === 3) {
		sound3.play();
		yellow.classList.add('brighten');
		setTimeout(() => {
			yellow.classList.remove('brighten');
		}, 300);
	}
	if (arr === 4) {
		sound4.play();
		blue.classList.add('brighten');
		setTimeout(() => {
			blue.classList.remove('brighten');
		}, 300);
	}
}




// Listeners
startButton.addEventListener('click', init);
powerbutton.addEventListener('click', powerUpSimon);
green.addEventListener('click', padPressed);
red.addEventListener('click', padPressed);
yellow.addEventListener('click', padPressed);
blue.addEventListener('click', padPressed);
strict.addEventListener('click', isStrict);