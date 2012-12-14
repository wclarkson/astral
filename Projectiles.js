function Projectiles() {
	this.elems = new Array();
}

Projectiles.prototype.add = function(xin,yin,vxin,vyin) {
	temp = {x: xin, y: yin, vx: vxin, vy: vyin};
	this.elems[this.elems.length] = temp;
};

Projectiles.prototype.update = function(canvas,dt) {
	for (var i=0;i<this.elems.length;i++) {
		var pt = this.elems[i];
		pt.x += pt.vx*dt;
		pt.y += pt.vy*dt;
		if ((pt.x<0)||(pt.x>canvas.width)||(pt.y<0)||(pt.y>canvas.height)) {
			this.elems.splice(i,1);
			i--;
		}
	}
};

Projectiles.prototype.render = function(context) {
	for (var i=0;i<this.elems.length;i++) {
		var pt = this.elems[i];
		context.fillStyle = "#FF0000";
		context.beginPath();
		context.arc(pt.x,pt.y,2,0,2*Math.PI,true);
		context.fill();
	}
};

Projectiles.prototype.kill = function(i) {
	this.elems.splice(i,1);
};