utils = {};

utils.intersects = function (rectA, rectB) {
	return !(rectA.x + rectA.width < rectB.x ||
			rectB.x + rectB.width < rectA.x ||
			rectA.y + rectA.height < rectB.y ||
			rectB.y + rectB.height < rectA.y);
};

utils.inSegment = function (point, segment) {
	if ((point >= segment.k) && (point <= segment.l)) {
		return true;
	}
	return false;
};

utils.intersectsWithPaddle = function (rectA, circle) {
	return !(rectA.x + rectA.width < circle.x - circle.radius ||
			circle.x + circle.radius < rectA.x ||
			rectA.y + rectA.height < circle.y - circle.radius ||
			circle.y + circle.radius < rectA.y);
};

utils.captureMouse = function (element) {
	var mouse = {x: 0, y: 0};
	element.addEventListener('mousemove', function (event) {
		var x, y;
		if (event.pageX || event.pageY) {
			x = event.pageX;
			y = event.pageY;
		} else {
			x = event.clientX + document.body.scrollLeft +
			document.documentElement.scrollLeft;
			y = event.clientY + document.body.scrollTop +
			document.documentElement.scrollTop;
		}
		x -= element.offsetLeft;
		y -= element.offsetTop;
		mouse.x = x;
		mouse.y = y;
		}, false);

	return mouse;
};

// metrics of Euklid space
utils.getDistance = function (p1, p2) {
	return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};