function Ball (radius, color) {
	if (radius === undefined) {
		radius = 20;
	}
	if (color === undefined) {
		color="red";
	}
	this.x = 0;
	this.y = 0;
	this.radius = radius;
	this.color = color;
	this.rotation = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.speedX = 7;
	this.speedY = 7;
	this.lineWidth = 1;

}

Ball.prototype.draw = function(context) {
	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	context.scale(this.scaleX, this.scaleY);
	context.lineWidth = this.lineWidth;
	context.fillStyle = this.color; //TODO: add utils class
	context.beginPath();
	//x, y, radius, start_angle, end_angle, anti-clockwise
	context.arc(0,0,this.radius,0,(Math.PI * 2),true);
	context.closePath();
	context.fill();
	if (this.lineWidth > 0 )
	{
		context.stroke();
	}
	context.restore();
};

/*Ball.prototype.testBorderCollision = function(canvas) {
	
	if (((this.x + this.radius) > canvas.width) || (this.x - this.radius < 0)) {
		this.speedX *= -1;
		console.log("Out by X");
	}	

	if (((this.y + this.radius) > canvas.height) || (this.y - this.radius < 0)) {
		this.speedY *= -1;
		console.log("Out by Y");
	}
};*/

Ball.prototype.testBorderCollision = function(canvas) {
	var outLeft 	= utils.getDistance({x:this.x,y:this.y}, {x:0,y:this.y}),
		outRight 	= utils.getDistance({x:this.x,y:this.y}, {x:canvas.width,y:this.y}),
		outTop 		= utils.getDistance({x:this.x,y:this.y}, {x:this.x,y:0}),
		outBottom 	= utils.getDistance({x:this.x,y:this.y}, {x:this.x,y:canvas.height}),
		delta 		= 0.10;
	
	if (outLeft < (this.radius + delta)) {
		this.x += (this.radius - outLeft);
		this.speedX *= -1;
	}
	if (outRight < (this.radius + delta)) {
		this.x -= (this.radius - outRight);
		this.speedX *= -1;
	}
	if (outTop < (this.radius + delta)) {
		this.y += (this.radius - outTop);
		this.speedY *= -1;
	}
	if (outBottom < (this.radius + delta)) {
		this.y -= (this.radius - outBottom);
		this.speedY *= -1;
	}
}

Ball.prototype.testCollision = function(bounds) {
	
	var outLeft 	= utils.getDistance({x:this.x,y:this.y}, {x:bounds.x,y:this.y}),
		outRight 	= utils.getDistance({x:this.x,y:this.y}, {x:bounds.x + bounds.width, y: this.y}),
		outTop 		= utils.getDistance({x:this.x,y:this.y}, {x:this.x,y:bounds.y}),
		outBottom 	= utils.getDistance({x:this.x,y:this.y}, {x:this.x,y:bounds.y + bounds.height}),
		delta 		= 0.10;
	
	if ((outLeft < this.radius) 
			&& (utils.inSegment(this.y, {k: bounds.y,l:bounds.y+bounds.height}))) {
		this.x -= (this.radius - outLeft);
		this.speedX *= -1;
	}
	if ((outRight < this.radius) 
			&& (utils.inSegment(this.y, {k: bounds.y,l:bounds.y+bounds.height}))) {
		this.x += (this.radius - outRight);
		this.speedX *= -1;
	}
	if ((outTop < this.radius) 
			&& (utils.inSegment(this.x, {k: bounds.x,l:bounds.x+bounds.width}))) {
		this.y -= (this.radius - outTop);
		this.speedY *= -1;
	}
	if ((outBottom < this.radius) 
			&& utils.inSegment(this.x, {k: bounds.x,l:bounds.x+bounds.width})){
		this.y += (this.radius - outBottom);
		this.speedY *= -1;
	}
	/*
	var this_bounds = this.getBounds();

	if (((this_bounds.x + this_bounds.width) > bounds.x) && (bounds.x > this_bounds.x)) {
		this.speedX *= -1;
	}	

	if (((this_bounds.y + this_bounds.height) > bounds.y) && (bounds.y > this_bounds.y)) {
		this.speedY *= -1;	
	}
	*/
};

Ball.prototype.move = function() {

	this.x += this.speedX;
	this.y += this.speedY;
}

Ball.prototype.getBounds = function() {
	return 	{
				x: this.x - this.radius, 
				y: this.y - this.radius,
				width: this.radius * 2,
				height: this.radius * 2
			};
};

//Ball.prototype.isHit() {}