const w = 640;
const h = 480;
const circle_d = h / 2;
const circle_r = circle_d / 2

let angle = 0
let delta_angle = 1

function setup() {
	angleMode(DEGREES);
	createCanvas(w, h);
}

function draw() {
	clear();
	translate(w / 2, h / 2);

	fill(255, 100, 100);
	ellipse(0, 0, circle_d, circle_d);

	if (frameCount > 200) {
		for (i = 0; i < 16; i++) {
			rotate(22.5);
			line(0, circle_r, 0, -circle_r);
		}
	}
	
	rotate(-angle);
	translate(0, circle_r / 2);

	if (frameCount > 400) {
		fill(100, 100, 255);
		ellipse(0, 0, circle_r, circle_r);
	}

	fill(0);
	rotate(angle * 2);
	for (i = 0; i < 8; i++) {
		rotate(45)
		ellipse(0, circle_r / 2, 10, 10)
	}

	angle += delta_angle;
}
