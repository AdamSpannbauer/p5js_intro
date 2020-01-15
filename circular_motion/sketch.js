const w = 640;
const h = 480;

const circle_d = h / 2;
const point_d = circle_d / 10;

const radius = circle_d / 2;
const theta = 30

let points = [];
let draw_lines = false

function step_theta(x, y, angle) {
	let new_x = x * cos(-angle) + y * sin(-angle);
	let new_y = -x * sin(-angle) + y * cos(-angle);
	return [new_x, new_y];
}


function setup() {
	angleMode(DEGREES);

	createCanvas(w, h);

	translate(w / 2, h / 2);
	
	let x1 = 0;
	let y1 = radius;
	for (var i = 0; i < 180 / theta; i++) {
		let offset_i = i * 36

		p = new Point(point_d, x1, y1, offset=offset_i, n_step=circle_d);
		points.push(p);

		let [new_x1, new_y1] = step_theta(x1, y1, theta);
		x1 = round(new_x1, 4);
		y1 = round(new_y1, 4);
	}
}


function draw() {
	clear();
	background(200);
	translate(w / 2, h / 2);

	push();
	noFill();
	strokeWeight(4);
	ellipse(0, 0, circle_d, circle_d);
	pop();

	if (frameCount % 200 === 0) {
		draw_lines = !draw_lines
	}

	fill(0, 250, 250);
	for (var p of points) {
		p.move();
		p.draw(draw_path=draw_lines);
	}
}


class Point {
  constructor(diameter, x1, y1, offset=0, n_step=200, v_sign=1) {
	this.lo_x = min([x1, -x1]);
	this.lo_y = min([y1, -y1]);
	this.hi_x = max([x1, -x1]);
	this.hi_y = max([y1, -y1]);

	this.x1 = x1;
	this.y1 = y1;
	this.x2 = -x1;
	this.y2 = -y1;

	this.x = x1;
	this.y = y1;

	this.diameter = diameter;

	this.vx = v_sign * Math.abs(this.x2 - this.x1) / n_step;
	this.vy = v_sign * Math.abs(this.y2 - this.y1) / n_step;

	for (var i = 0; i < offset; i++) {
		this.move();
	}
  }

  move() {
	this.x += this.vx;
	this.y += this.vy;

	if (this.y > this.hi_y | this.y < this.lo_y) {
		this.vy *= -1;
		this.y += 1 * this.vy;
	}  	

	if (this.x > this.hi_x | this.x < this.lo_x) {
		this.vx *= -1;
		this.x += 1 * this.vx;
	}
  }

  draw(draw_path=false) {
  	if (draw_path) {
  		push();
  		strokeWeight(2);
  		line(this.x1, this.y1, this.x2, this.y2);
  		pop();
  	}
	ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

