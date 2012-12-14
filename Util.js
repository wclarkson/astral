function drawPoly(pts,context) {
	context.moveTo(pts[0][0],pts[0][1]);
	for (var i=1;i<pts.length;i++) {
		context.lineTo(pts[i][0],pts[i][1]);
	}
	context.lineTo(pts[0][0],pts[0][1]);
}

function pointInTri(x,y,pts) {
	x1 = pts[0][0]; x2 = pts[1][0]; x3 = pts[2][0];
	y1 = pts[0][1]; y2 = pts[1][1]; y3 = pts[2][1];
	l1 = ((y2-y3)*(x-x3)+(x3-x2)*(y-y3))/((y2-y3)*(x1-x3)+(x3-x2)*(y1-y3));
	l2 = ((y3-y1)*(x-x3)+(x1-x3)*(y-y3))/((y2-y3)*(x1-x3)+(x3-x2)*(y1-y3));
	l3 = 1-l1-l2;
	return (0<=l1)&&(l1<=1)&&(0<=l2)&&(l2<=1)&&(0<=l3)&&(l3<=1);
}

function pointInPoly(x,y,pts) {
	var inPoly = 0;
	for (var i=1;i<pts.length;i++) {
			inPoly += (pointInTri(x,y,[[0,0],[pts[i][0],pts[i][1]],[pts[i-1][0],pts[i-1][1]]]) ? 1:0);
	}
	return (inPoly>0 ? true : false);
}