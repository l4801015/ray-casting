export const random = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const map = (value, min1, max1, min2, max2) => {
	return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
}

export const tan = (angle) => {
	return Math.tan(angle * Math.PI / 180);
}
