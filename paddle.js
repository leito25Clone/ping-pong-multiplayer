function Paddle(width, height, color) {
	if (width === undefined) width = 20;
	if (height === undefined) height = 100;
	if (color === undefined) color = "blue";

	this.x = 0;
	this.y = 0;
	this.width = width;
	this.height = height;
	this.color = color;
	this.rotation = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.speedX = 4;
	this.speedY = 4;
	this.lineWidth = 1;
}

Paddle.prototype.draw = function(context) {
	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	context.scale(this.scaleX, this.scaleY);
	context.lineWidth = this.lineWidth;
	context.fillStyle = this.color; //TODO: add utils class
	context.beginPath();
	context.rect(0,0,this.width, this.height);
	context.closePath();
	context.fill();
	if (this.lineWidth > 0 )
	{
		context.stroke();
	}
	context.restore();
};

Paddle.prototype.getBounds = function() {
	return 	{
				x: this.x, 
				y: this.y,
				width: this.width,
				height: this.height
			};
};

Paddle.prototype.move = function (y, canvas) {
	if ((y+this.height) < canvas.height) {
		this.y = y;
	}
};

Paddle.prototype.moveUp = function() {
	this.y -= 15; //TODO: extracts to consts
};

Paddle.prototype.moveDown = function() {
	this.y += 15; //TODO: extract to consts
};
