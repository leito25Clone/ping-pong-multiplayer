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
		console.log("x: " + mouse.x + ", y: " + mouse.y);
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

		if (utils.getDistance({x: greenBall.x, y: greenBall.y},{x: redBall.x, y:redBall.y}) 
				< (greenBall.radius * 2) ) {
			var tempX = greenBall.speedX,
				tempY = greenBall.speedY;
			greenBall.speedX = redBall.speedX;
			greenBall.speedY = redBall.speedY;
			redBall.speedX = tempX;
			redBall.speedY = tempY;
		}
/*
		if (utils.intersects(greenBall.getBounds(), redBall.getBounds()) === true) {
			var tempX = greenBall.speedX,
				tempY = greenBall.speedY;
			greenBall.speedX = redBall.speedX;
			greenBall.speedY = redBall.speedY;
			redBall.speedX = tempX;
			redBall.speedY = tempY;
			
			console.log("Intersect: Red Ball & Green Ball");
		}
*/
		if (utils.intersects(greenBall.getBounds(), paddle.getBounds()) === true) {
			greenBall.speedX *= -1;
			greenBall.speedY *= -1;
			console.log("Intersect: Green Ball & Paddle");
		}

		if (utils.intersects(redBall.getBounds(), paddle.getBounds()) === true) {
			redBall.speedX *= -1;
			redBall.speedY *= -1;
			console.log("Intersect: Red Ball & Paddle");
		}
/*
		greenBall.testCollision(redBall.getBounds());
		redBall.testCollision(greenBall.getBounds());
*/		
		greenBall.testBorderCollision(canvas);
		greenBall.move();
		greenBall.draw(context);


		redBall.testBorderCollision(canvas);
		redBall.move();
		redBall.draw(context);

		paddle.draw(context);
		
	}());

};