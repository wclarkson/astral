var KEY = { W: 87, A: 65, S: 83, D: 68, SPACE: 32 };
var KEYSTATE = { UP: false, DOWN: false, LEFT: false, RIGHT: false, SPACE: false};

document.addEventListener('keydown', function(evt) {
	switch (evt.keyCode) {
		case KEY.W:
			phys.ships[0].thrust = 150; KEYSTATE.UP = true; break;
		case KEY.A:
			phys.ships[0].moment = -6; KEYSTATE.LEFT = true; break;
		case KEY.S:
			/*phys.ships[0].thrust = -150;*/ KEYSTATE.DOWN = true; break;
		case KEY.D:
			phys.ships[0].moment = 6; KEYSTATE.RIGHT = true; break;
		case KEY.SPACE:
			phys.ships[0].fire(); break;
	}
});

document.addEventListener('keyup', function(evt) {
	switch (evt.keyCode) {
		case KEY.W:
			phys.ships[0].thrust = 0; KEYSTATE.UP = false; break;
		case KEY.A:
			phys.ships[0].moment = 0; KEYSTATE.LEFT = false; break;
		case KEY.S:
			phys.ships[0].thrust = 0; KEYSTATE.DOWN = false; break;
		case KEY.D:
			phys.ships[0].moment = 0; KEYSTATE.RIGHT = false; break;
	}
});