import { Vector, fromAngle } from "./Vector.js";

export function Ray(pos, angle) {
	this.pos = pos;
	this.dir = fromAngle(angle);
}

Ray.prototype.show = function (ctx) {
	// alpha
	ctx.strokeStyle = "rgba(255,255,255,1)";
	//ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(this.pos.x, this.pos.y);
	ctx.lineTo(this.pos.x + this.dir.x * 100, this.pos.y + this.dir.y * 100);
	ctx.stroke();
};

Ray.prototype.setAngle = function (angle) {
	this.dir = fromAngle(angle);
};

Ray.prototype.cast = function (wall) {
	const x1 = wall.p1.x;
	const y1 = wall.p1.y;
	const x2 = wall.p2.x;
	const y2 = wall.p2.y;

	const x3 = this.pos.x;
	const y3 = this.pos.y;
	const x4 = this.pos.x + this.dir.x;
	const y4 = this.pos.y + this.dir.y;

	const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
	if (den == 0) {
		return;
	}

	const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
	const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

	if (t > 0 && t < 1 && u > 0) {
		const pt = new Vector(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
		return pt;
	} else {
		return;
	}

	return;
};
