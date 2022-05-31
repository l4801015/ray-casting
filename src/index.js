import { Canvas } from "./Canvas";
import { Vector, radians } from "./Vector";
import { Boundary } from "./Boundary";
import { Ray } from "./Ray";
import { Particle } from "./Particle";
import { random, map, tan } from "./utils";

const width = window.innerWidth;
const height = window.innerHeight;
const canvas = new Canvas(width, height);
const ctx = canvas.init();

const sceneW = width / 2;
const sceneH = height / 2;

const walls = [];
const particle = new Particle(0, -sceneH / 2);
//const particle = new Particle(0, sceneH / 2);

const setup = () => {
	for (let i = 0; i < 5; i++) {
		let x1 = random(-sceneW, sceneW);
		let x2 = random(-sceneW, sceneW);
		let y1 = random(-sceneH, 0);
		let y2 = random(-sceneH, 0);
		//walls[i] = new Boundary(x1, y1, x2, y2);
	}
	// top wall
	walls.push(new Boundary(-sceneW, -sceneH + 2, sceneW, -sceneH));
	// bottom wall
	walls.push(new Boundary(-sceneW, 0, sceneW, 0));
	// right wall
	walls.push(new Boundary(-sceneW, -sceneH, -sceneW, 0));
	// left wall
	walls.push(new Boundary(sceneW - 2, -sceneH, sceneW, 0));

	walls.push(new Boundary(-sceneW + 100, -sceneH + 100, -sceneW + 100,	-sceneH + 200));
	walls.push(new Boundary(-sceneW + 200, -sceneH + 100, -sceneW + 200, -sceneH + 200));
	walls.push(new Boundary(-sceneW + 100, -sceneH + 200, -sceneW + 200, -sceneH + 200));
	walls.push(new Boundary(-sceneW + 100, -sceneH + 100, -sceneW + 200, -sceneH + 100));




	walls.push(new Boundary(-sceneW + 300, -sceneH + 100, -sceneW + 300, -sceneH + 200));
	walls.push(new Boundary(-sceneW + 400, -sceneH + 100, -sceneW + 400, -sceneH + 200));
	walls.push(new Boundary(-sceneW + 300, -sceneH + 200, -sceneW + 400, -sceneH + 200));
	walls.push(new Boundary(-sceneW + 300, -sceneH + 100, -sceneW + 400, -sceneH + 100));


	// create hexagon by walls
	walls.push(new Boundary(-sceneW + 150, -sceneH + 250, -sceneW + 150, -sceneH + 350));
	walls.push(new Boundary(-sceneW + 250, -sceneH + 250, -sceneW + 250, -sceneH + 350));
	walls.push(new Boundary(-sceneW + 150, -sceneH + 350, -sceneW + 250, -sceneH + 350));
	walls.push(new Boundary(-sceneW + 150, -sceneH + 250, -sceneW + 250, -sceneH + 250));





};

const loop = () => {
	canvas.clear();
	// fill style with dart green
	ctx.fillStyle = "#006400";
	ctx.fillRect(-sceneW, sceneH / 2, sceneW * 2, sceneH * 2);
	ctx.fillStyle = "#000000";
	ctx.fillRect(-sceneW, -sceneH, sceneW * 2, sceneH);
	for (let i = 0; i < walls.length; i++) {
		walls[i].show(ctx);
	}
	const distProjPlane = sceneW / 2 / tan(particle.fov / 2);
	const scene = particle.look(ctx, walls);
	const w = width / scene.length;

	for (let i = 0; i < scene.length; i++) {
		const sq = scene[i] * scene[i];	
		const wSq = sceneW * sceneW;
    const r = map(sq, 0, wSq, 139, 119);
		const g = map(sq, 0, wSq, 69, 49);
		const b = map(sq, 0, wSq, 19, 9);
		//const h = map(scene[i], 0, sceneW, sceneH, 0);
    let h = (((sceneW / scene[i]) * distProjPlane) / 4) / 2;
    if (h > sceneH) {
			h = sceneH;
		}
		// rect mode = center
		ctx.fillStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', 1)';
		ctx.fillRect(-sceneW + i * w, sceneH / 2, w+1, -h/2);
		ctx.fillRect(-sceneW + i * w, sceneH / 2 - 1, w+1, h/2);
	  //ctx.fillRect(-sceneW + i * w, sceneH, w + 1, -h);
	}
	
	requestAnimationFrame(loop);
};

const rotateL = document.createElement("button");
rotateL.innerHTML = "Rotate Left";
rotateL.addEventListener("click", () => {
 	particle.rotate(-10);
});
rotateL.style.position = "absolute";
rotateL.style.bottom = "80px";
rotateL.style.left = "10px";
rotateL.style.padding = "20px";
rotateL.style.backgroundColor = "#333";
rotateL.style.color = "#fff";
rotateL.style.border = "none";
document.body.appendChild(rotateL);

const rotateR = document.createElement("button");
rotateR.innerHTML = "Rotate Right";
rotateR.addEventListener("click", () => {
	 	particle.rotate(10);
});
rotateR.style.position = "absolute";
rotateR.style.bottom = "80px";
rotateR.style.right = "10px";
rotateR.style.padding = "20px";
rotateR.style.backgroundColor = "#333";
rotateR.style.color = "#fff";
rotateR.style.border = "none";
document.body.appendChild(rotateR);

const goForward = document.createElement("button");
goForward.innerHTML = "Go Forward";
goForward.addEventListener("click", () => {
	particle.goForward(10);
});
goForward.style.position = "absolute";
goForward.style.bottom = "10px";
goForward.style.left = "10px";
goForward.style.padding = "20px";
goForward.style.backgroundColor = "#333";
goForward.style.color = "#fff";
goForward.style.border = "none";
document.body.appendChild(goForward);

const left = document.createElement("button");
left.innerHTML = "Left";
left.addEventListener("click", () => {
	particle.pos.x += -20;
});
left.style.position = "absolute";
left.style.bottom = "10px";
left.style.left = "10px";
left.style.padding = "20px";
left.style.backgroundColor = "#333";
left.style.color = "#fff";
left.style.border = "none";
//document.body.appendChild(left);

const right = document.createElement("button");
right.innerHTML = "Right";
right.addEventListener("click", () => {
	particle.pos.x += 20;
});
right.style.position = "absolute";
right.style.bottom = "10px";
right.style.right = "10px";
right.style.padding = "20px";
right.style.backgroundColor = "#333";
right.style.color = "#fff";
right.style.border = "none";
//document.body.appendChild(right);

const up = document.createElement("button");
up.innerHTML = "Up";
up.addEventListener("click", () => {
	particle.pos.y += -20;
});
up.style.position = "absolute";
up.style.bottom = "80px";
up.style.left = "10px";
up.style.padding = "20px";
up.style.backgroundColor = "#333";
up.style.color = "#fff";
up.style.border = "none";
//document.body.appendChild(up);

const down = document.createElement("button");
down.innerHTML = "Down";
down.addEventListener("click", () => {
	particle.pos.y += 20;
});
down.style.position = "absolute";
down.style.bottom = "80px";
down.style.right = "10px";
down.style.padding = "20px";
down.style.backgroundColor = "#333";
down.style.color = "#fff";
down.style.border = "none";
//document.body.appendChild(down);

setup();
loop();
