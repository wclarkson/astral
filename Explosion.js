function Explosion(xin,yin,mag) {
	console.log("Making new explosion.");
	this.elems = new Array();
	this.lifespan = 30;
	for (var i=0;i<2*Math.PI;i+=(0.5/mag)*Math.PI/8+0.5*Math.random()) {
		var v0 = mag*30 + 300*Math.random();
		temp = {x: xin, y: yin, vx: v0*Math.cos(i), vy: -v0*Math.sin(i)};
		this.elems[this.elems.length] = temp;
	}
	
}

Explosion.prototype.update = function(canvas,dt) {
	for (var i=0;i<this.elems.length;i++) {
		this.elems[i].x += this.elems[i].vx*dt;
		this.elems[i].y += this.elems[i].vy*dt;
	}
	this.lifespan--;
};

Explosion.prototype.render = function(context) {
	context.strokeStyle = "rgba(255,0,0,"+(this.lifespan/50)+")";
	context.beginPath();
	for (var i=0;i<this.elems.length;i++) {
		var pt = this.elems[i]
		context.moveTo(pt.x,pt.y);
		context.lineTo(pt.x+pt.vx/50,pt.y+pt.vy/50);
	}
	context.stroke();
};