import { Ray } from "./Ray";
import { Vector, radians, dist} from "./Vector";

export function Particle(x, y) {	
	this.pos = new Vector(x, y);
	this.rays = [];
	this.fov = 60;
	this.heading = 0; //angle
	for (let i = -this.fov / 2; i < this.fov / 2; i += .2) {
		this.rays.push(new Ray(this.pos, radians(i)));
	}	
}

Particle.prototype.rotate = function(angle) {
	this.heading += angle;
	let index = 0;
	for (let i = -this.fov / 2; i < this.fov / 2; i += .2) {
		this.rays[index].setAngle(radians(i + this.heading));
		index++;
	}
}

Particle.prototype.goForward = function(speed) {
	let angle = radians(this.heading);
	this.pos.x += Math.cos(angle) * speed;
	this.pos.y += Math.sin(angle) * speed;
}

Particle.prototype.goBackward = function(speed) {
	let angle = radians(this.heading);
	this.pos.x -= Math.cos(angle) * speed;
	this.pos.y -= Math.sin(angle) * speed;
}

Particle.prototype.look = function(ctx, walls) {
	const scene = [];
	for (let i = 0; i < this.rays.length; i++) {
		const ray = this.rays[i];
		let closest = null;
		let record = Infinity;
		for (let j = 0; j < walls.length; j++) {
			const wall = walls[j];
			const pt = ray.cast(wall);
			if (pt) {
				const d = dist(this.pos, pt);
				if (d < record) {
					record = d;
					closest = pt;
				}
			}
		}
		if (closest) {
			// draw withe to black gradient line
			ctx.strokeStyle = `rgba(255, 255, 255, .1)`;
			ctx.beginPath();
			ctx.moveTo(this.pos.x, this.pos.y);
			ctx.lineTo(closest.x, closest.y);
			ctx.stroke();
			ctx.closePath();
		}
		scene.push(record);
	}
	return scene;
}
