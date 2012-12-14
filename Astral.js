var b;
var p;

function initialize() {
	setInterval(draw,20);
	angle = 0;
	b = new Ship(100,100,Math.PI/2);
	p = new Projectiles();
}

function draw() {
	var canvas = document.getElementById('canvasTest');
	var context = canvas.getContext('2d');
	context.fillStyle = "#222222";
	context.fillRect(0,0,canvas.width,canvas.height);
	b.update(canvas,0.01);
	b.render(context);
	p.update(canvas,0.01);
	p.render(context);
}

initialize();