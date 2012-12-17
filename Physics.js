function Physics() {
	this.ships = new Array();
	this.ships[0] = new Ship(100,100,Math.PI/2);
	this.rocks = new Rocks();
	this.explosions = new Array();
	for (var i=0;i<8;i++) {
		this.rocks.add(400*Math.random(),400*Math.random(),30*Math.random(),30*Math.random());
	}
}

Physics.prototype.update = function(canvas,dt) {
	var rocks = this.rocks.elems;
	for (var s=0;s<this.ships.length;s++) {
		var projs = this.ships[s].projs.elems;
		for (var i=0;i<rocks.length;i++) {
			for (var j=0;j<projs.length;j++) {
				var x = projs[i];
				var y = projs[i];
				if (pointInPoly(projs[j].x-rocks[i].x,projs[j].y-rocks[i].y,rocks[i].pts)) {
					this.explosions[this.explosions.length] = new Explosion(rocks[i].x,rocks[i].y,5);
					this.rocks.kill(i);
					this.ships[s].projs.kill(j);
					break;
				}
			}
		}
	}
	for (i=0;i<rocks.length;i++) {
		for (var s=this.ships.length-1;s>=0;s--) {
			var pts = this.ships[s].pts;
			for (j=0;j<pts.length;j++) {
				var px = this.ships[s].x + pts[j][0]*Math.cos(this.ships[s].angle)-pts[j][1]*Math.sin(this.ships[s].angle);
								var py = this.ships[s].y + pts[j][0]*Math.sin(this.ships[s].angle)+pts[j][1]*Math.cos(this.ships[s].angle);
								if (pointInPoly(px-rocks[i].x,py-rocks[i].y,rocks[i].pts)) {
									this.explosions[this.explosions.length] = new Explosion(this.ships[s].x,this.ships[s].y,20);
									// console.log('before ' + this.ships)w;
									this.ships.splice(s,1);
									// console.log('after ' + this.ships);
									break;
								}
			}
		}
	}
	for (var i=0;i<this.ships.length;i++) {
		var projs = this.ships[i].projs.elems;
		for (var j=0;j<projs.length;j++) {
			projs[j].fx = 0;
			projs[j].fy = 0;
			for (var r=0;r<this.rocks.elems.length;r++) {
				var dx = this.rocks.elems[r].x - projs[j].x;
				var dy = this.rocks.elems[r].y - projs[j].y;
				var d = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
				var mag = 2000000/(Math.pow(dx,2)+Math.pow(dy,2));
				// console.log('rock_x: ' + String(d));
				projs[j].fx += (dx/d)*mag;
				projs[j].fy += (dy/d)*mag;
			}
			
			
		}
		this.ships[i].update(canvas,dt);
	}
	
	this.rocks.update(canvas,dt);
	for (i=this.explosions.length-1;i>=0;i--) {
		this.explosions[i].update(canvas,dt);
		if (this.explosions[i].lifespan<0) {
			this.explosions.slice(i,0);
		}
	}
	
};

Physics.prototype.render = function(context) {
	for (var i=0;i<this.ships.length;i++) {
		this.ships[i].render(context);
	}
	this.rocks.render(context);
	for (i=0;i<this.explosions.length;i++) {
		this.explosions[i].render(context);
	}
	
};