export function Vector(x, y) {
	this.x = x;
	this.y = y;
}

Vector.prototype.getter = function() {
	return {
		x: this.x,
		y: this.y
	};
};

Vector.prototype.setter = function(x, y) {
	this.x = x;
	this.y = y;
};

Vector.prototype.add = function(v) {
	this.x += v.x;
	this.y += v.y;
	return this;
}

Vector.prototype.sub = function(v) {
	this.x -= v.x;
	this.y -= v.y;
	return this;
}

Vector.prototype.normalize = function() {
	this.devide(this.modulus());
	return this;
}

Vector.prototype.multiply = function(scalar) {
	this.x *= scalar;
	this.y *= scalar;
	return this;
}

Vector.prototype.devide = function(scalar) {
	this.x /= scalar;
	this.y /= scalar;
	return this;
}

Vector.prototype.modulus = function() {
	return Math.sqrt(this.x*this.x + this.y*this.y);
}

Vector.prototype.setMag = function(scalar) {
	this.normalize();
	this.multiply(scalar);
	return this;
}

Vector.prototype.rotate = function(angle) {
	var x = this.x;
	var y = this.y;
	this.x = x * Math.cos(angle) - y * Math.sin(angle);
	this.y = x * Math.sin(angle) + y * Math.cos(angle);
	return this;
}

Vector.prototype.heading = function() {
	return Math.atan2(this.y, this.x);
}

export const fromAngle = (angle) => {
	return new Vector(Math.cos(angle), Math.sin(angle));
}

export const radians = (degrees) => {
	return degrees * Math.PI / 180;
}

export const dist = (v1, v2) => {
	return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
}

