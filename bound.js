GAME.namespace('GAME.Bound');

GAME.Bound = (function () {

	var	b2BodyDef 		= Box2D.Dynamics.b2BodyDef,
        b2FixtureDef 	= Box2D.Dynamics.b2FixtureDef,
        b2PolygonShape 	= Box2D.Collision.Shapes.b2PolygonShape,
        b2Body 			= Box2D.Dynamics.b2Body,
		bodyDef 		= new b2BodyDef,
		fixDef 			= new b2FixtureDef,
		scale			= GAME.SCALE,
		topAndBottom	= {
			width: 300/scale, 
			height: 40/scale,
			bottom: {
				x: 300/scale,
				y: 430/scale
			},
			top: {
				x: 300/scale,
				y: -1
			}
		},
		leftAndRight 	= {
			width: 60/scale, 
			height: 120/scale,
			leftTop: {
				x: -1,
				y: 1
			},
			leftBottom: {
				x: -1,
				y: 390/scale
			},
			rightTop: {
				x: 630/scale,
				y: 1
			},
			rightBottom: {
				x: 630/scale,
				y: 390/scale
			}
		},
		init 			= function () {
			
			bodyDef.type = b2Body.b2_staticBody;
			bodyDef.userData = "bounds";
			fixDef.shape = new b2PolygonShape;
			//Set ground parameters
		   	fixDef.density 		= 1.0;
		   	fixDef.friction 	= 1.5;
		   	fixDef.restitution 	= 0.7;
		},
		Constr = function (world, categoryBits) {
			
			init();
			
			//TopAndBottom
			fixDef.shape.SetAsBox(topAndBottom.width, topAndBottom.height); 
			fixDef.filter.categoryBits = categoryBits;
			
			bodyDef.position.Set(topAndBottom.bottom.x,topAndBottom.bottom.y);
			world.CreateBody(bodyDef).CreateFixture(fixDef);;

			bodyDef.position.Set(topAndBottom.top.x, topAndBottom.top.y);
			world.CreateBody(bodyDef).CreateFixture(fixDef);

			//LeftAndRight
			fixDef.shape.SetAsBox(leftAndRight.width, leftAndRight.height);

			bodyDef.position.Set(leftAndRight.leftTop.x, leftAndRight.leftTop.y);
			world.CreateBody(bodyDef).CreateFixture(fixDef);

			bodyDef.position.Set(leftAndRight.leftBottom.x, leftAndRight.leftBottom.y);
			world.CreateBody(bodyDef).CreateFixture(fixDef);

			bodyDef.position.Set(leftAndRight.rightTop.x, leftAndRight.rightTop.y);
			world.CreateBody(bodyDef).CreateFixture(fixDef);

			bodyDef.position.Set(leftAndRight.rightBottom.x, leftAndRight.rightBottom.y);
			world.CreateBody(bodyDef).CreateFixture(fixDef);
		}
	
	return Constr;
})();

