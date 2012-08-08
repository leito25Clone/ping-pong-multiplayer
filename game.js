window.onload = function () {

	console.log("game.js succesfully loaded");
	var canvas = document.getElementById('gameCanvas'),
		context = canvas.getContext("2d"),
		redBall = new Ball(),
		greenBall = new Ball(20, "green"),
		paddle = new Paddle(),
		centerX = canvas.width / 2,
		centerY = canvas.height / 2,
		angle = 0,
		radiusX = 10,
		radiusY = 10,
		mouse = utils.captureMouse(canvas);

	redBall.x = centerX + 20;
	redBall.y = centerY - 123;
	
	greenBall.x = centerX - 100;
	greenBall.y = centerY ;

	paddle.x = centerX;
	paddle.y = centerY;

	var onKeyPressed = function (event) {
		switch (event.keyCode) {
			case 38:  //TODO: change to consts
				console.log("Key Up Pressed!");
				paddle.moveUp();
				break;
			case 40:
				console.log("Key Down Pressed!");
				paddle.moveDown();
				break;
			default:
				console.log(event.type);
				break;
		}
	};

	//window.addEventListener('keyup', onKeyPressed, false);
	window.addEventListener('keydown', onKeyPressed, false);
	canvas.addEventListener('mousemove', function () {
		paddle.move(mouse.y, canvas);
		//console.log("x: " + mouse.x + ", y: " + mouse.y);
	}, false);

	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (callback) {
			return window.setTimeout(callback, 1000/60);
		});
	}

	(function drawFrame () {
		window.requestAnimationFrame(drawFrame, canvas);
		context.clearRect(0, 0, canvas.width, canvas.height);

		var distanceBetweenCircles = utils.getDistance({x: greenBall.x, y: greenBall.y},{x: redBall.x, y:redBall.y});
		if ( distanceBetweenCircles	< (greenBall.radius + redBall.radius) ) {
			
			//TODO: improve deltas calculation
			var tempX = greenBall.speedX,
				tempY = greenBall.speedY,
				deltaX = Math.abs(Math.abs(greenBall.x - redBall.x) - Math.sqrt(distanceBetweenCircles)),
				deltaY = Math.abs(Math.abs(greenBall.y - redBall.y) - Math.sqrt(distanceBetweenCircles));
	
			(tempX > 0) ? greenBall.x -= deltaX : greenBall.x += deltaX;
			(tempY > 0) ? greenBall.y -= deltaY : greenBall.y += deltaY;

			greenBall.speedX = redBall.speedX;
			greenBall.speedY = redBall.speedY;
			redBall.speedX = tempX;
			redBall.speedY = tempY;
		}

		greenBall.testCollision(paddle.getBounds());
		redBall.testCollision(paddle.getBounds());

		greenBall.testBorderCollision(canvas);
		greenBall.move();
		greenBall.draw(context);


		redBall.testBorderCollision(canvas);
		redBall.move();
		redBall.draw(context);

		paddle.draw(context);
		
	}());

};