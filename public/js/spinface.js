class Face {
	constructor(bounds, ctx, x, y) {
		this._rotation = 0;
		this.bounds = bounds;
		this._x = x;
		this._y = y;
		this.setVelocity();
		this.ctx = ctx;
		this.img = new Image();
		this.img.addEventListener('load', () => {
			this._center = { x: this._x - (this.img.width / 2), y: this._y - (this.img.height / 2) }
			this.draw(x, y);
		});
		this.img.src = '/imgs/face.png';
	}

	setVelocity() {
		this.vx = (Math.random() * 5);
		this.vy = (Math.random() * 5);
	}

	draw () {
		if (this._center) {
			this._x += this.vx;
			this._y += this.vy;

			this.ctx.save();
			this.ctx.translate(this._x, this._y);
			this.ctx.rotate(this._rotation = this._rotation);
			this.ctx.drawImage(this.img, this._center.x, this._center.y);
			this.ctx.restore();

			this._rotation += 0.1;

			this.checkBounds();
		}
	}

	clear() {
		this.setVelocity();
		this.ctx.clearRect(0, 0, this.bounds.width, this.bounds.height);
	}

	checkBounds() {
		if(this._y >= this.bounds.y || this._y <= 0) {
			this.vy = -this.vy;
		}

		if(this._x >= this.bounds.x || this._x <= 0) {
			this.vx = -this.vx;
		}
	}
}

var resizeCanvas = function (canvas) {
	var width = screen.width;
	var height = 500;

	if (width > 930) {
		width = 930;
	}

	canvas.width = width;
	canvas.height = height;
}

var getCanvas = function () {
	var canvas = document.querySelector('canvas')
	
	resizeCanvas(canvas);

	return canvas;

}

var canvas = getCanvas();
var face = new Face({ x: canvas.width, y: canvas.height }, canvas.getContext('2d'), 0, 0);

var run = function () {
	face.draw();
	requestAnimationFrame(run);
}

window.addEventListener('resize', () => {
	face.clear();
	resizeCanvas(canvas);
});

requestAnimationFrame(run);
