var phys;

function initialize() {
	setInterval(draw,1000/30);
	phys = new Physics();
}

function draw() {
	var canvas = document.getElementById('canvasTest');
	var context = canvas.getContext('2d');
	context.fillStyle = "#EEEEEE";
	context.fillRect(0,0,canvas.width,canvas.height);
	phys.update(canvas,0.01);
	phys.render(context);
}

initialize();