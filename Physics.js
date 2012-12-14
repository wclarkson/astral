function Physics() {
	this.ship = new Ship(100,100,Math.PI/2);
	this.rocks = new Rocks();
	this.explosions = new Array();
	for (var i=0;i<8;i++) {
		this.rocks.add(400*Math.random(),400*Math.random(),1,1);
	}
}

Physics.prototype.update = function(canvas,dt) {
	var rocks = this.rocks.elems;
	var projs = this.ship.projs.elems;
	// console.log(String(rocks.length) + ' ' + String(projs.length));
	for (var i=0;i<rocks.length;i++) {
		for (var j=0;j<projs.length;j++) {
			var x = projs[i];
			var y = projs[i];
			if (pointInPoly(projs[j].x-rocks[i].x,projs[j].y-rocks[i].y,rocks[i].pts)) {
				this.explosions[this.explosions.length] = new Explosion(rocks[i].x,rocks[i].y,5);
				this.rocks.kill(i);
				this.ship.projs.kill(j);
				break;
			}
		}
	}
	this.ship.update(canvas,dt);
	this.rocks.update(canvas,dt);
	for (var i=this.explosions.length-1;i>=0;i--) {
		// console.log(String(i) + ' of ' + String(this.explosions.length));
		this.explosions[i].update(canvas,dt);
		if (this.explosions[i].lifespan<0) {
			this.explosions.slice(i,0);
		}
	}
	
};

Physics.prototype.render = function(context) {
	this.ship.render(context);
	this.rocks.render(context);
	for (var i=0;i<this.explosions.length;i++) {
		this.explosions[i].render(context);
	}
	
};