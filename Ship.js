function Ship(x,y,angle) {
	this.x = x;
	this.y = y;
	this.fx = 0;
	this.fy = 0;
	this.thrust = 0;
	this.ax = 0;
	this.ay = 0;
	this.vx = 0;
	this.vy = 0;
	this.angle = angle;
	this.mass = 1;
	this.i = 0.1;
	this.moment = 0;
	this.alpha = 0;
	this.omega = 0
	this.reload = 0;
	this.pts = [[0,-12],[-7,3],[7,3]];
	this.projs = new Projectiles();
}

Ship.prototype.render = function(context) {
	context.strokeStyle = "#000000";
	context.beginPath();
	context.translate(this.x,this.y);
	context.rotate(this.angle);
	drawPoly(this.pts,context);
	context.stroke();
	if (this.thrust>0) {
		context.strokeStyle = "#E0B21B";
		context.beginPath();
		context.moveTo(-3,3);
		context.lineTo(0,7+4*Math.random());
		context.lineTo(3,3);
		context.stroke();
	}
	context.rotate(-this.angle);
	// Draw vector of thrust force
	// context.moveTo(0,0);
	// context.lineTo(this.fx,this.fy);
	// context.stroke();
	context.translate(-this.x,-this.y);
	this.projs.render(context);
};

Ship.prototype.update = function(canvas,dt) {
	if (this.angle>2*Math.PI) this.angle -= 2*Math.PI;
	this.fx = this.thrust*Math.sin(this.angle);
	this.fy = -this.thrust*Math.cos(this.angle);
	this.ax = this.fx/this.mass;
	this.ay = this.fy/this.mass;
	this.vx += this.ax*dt;
	this.vy += this.ay*dt;
	this.vx *= 0.995;
	this.vy *= 0.995;
	this.x += this.vx*dt;
	this.y += this.vy*dt;
	this.alpha = this.moment/this.i;
	this.omega += this.alpha*dt;
	this.omega *= 0.95;
	this.angle += this.omega*dt;
	if (this.reload>0) {
		this.reload--;
	}
	this.projs.update(canvas,dt);
};

Ship.prototype.fire = function() {
	if (this.reload==0) {
		var x = this.x + 7*Math.sin(this.angle);
		var y = this.y - 7*Math.cos(this.angle);
		var vx = this.vx + 600*Math.sin(this.angle);
		var vy = this.vy -600*Math.cos(this.angle);
		this.projs.add(x,y,vx,vy);
		this.reload = 0;	
	}
};