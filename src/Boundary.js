import { Vector } from './Vector.js';

export function Boundary(x1, y1, x2, y2) {
		this.p1 = new Vector(x1, y1);
		this.p2 = new Vector(x2, y2);
}

Boundary.prototype.show = function(ctx) {
		ctx.strokeStyle = 'rgba(255, 255, 255, .8	)';
	  ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(this.p1.x, this.p1.y);
		ctx.lineTo(this.p2.x, this.p2.y);
		ctx.stroke();
		ctx.closePath();
}
