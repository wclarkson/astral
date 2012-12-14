function Rocks() {
	this.elems = new Array();
}

Rocks.prototype.add = function(xin,yin,vxin,vyin) {
	var points = new Array();
	for (var i=0;i<2*Math.PI;i+=Math.PI/4) {
		var r = 8+10*Math.random();
		points[points.length] = [r*Math.cos(i),r*Math.sin(i)];
	}
	temp = {x: xin, y: yin, vx: vxin, vy: vyin, pts: points};
	this.elems[this.elems.length] = temp;
};

Rocks.prototype.update = function(canvas,dt) {
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

Rocks.prototype.render = function(context) {
	for (var i=0;i<this.elems.length;i++) {
		var pt = this.elems[i];
		context.strokeStyle = "#111111";
		context.beginPath();
		context.translate(pt.x,pt.y);
		drawPoly(pt.pts,context);
		context.stroke();
		context.translate(-pt.x,-pt.y);
	}
};

Rocks.prototype.kill = function(i) {
	console.log("Rock destroyed.");
	this.elems.splice(i,1);
};