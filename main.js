 var paddle;
 window.onload = function init() {
         var   b2Vec2 = Box2D.Common.Math.b2Vec2
            ,  b2AABB = Box2D.Collision.b2AABB
         	,	b2BodyDef = Box2D.Dynamics.b2BodyDef
         	,	b2Body = Box2D.Dynamics.b2Body
         	,	b2FixtureDef = Box2D.Dynamics.b2FixtureDef
         	,	b2Fixture = Box2D.Dynamics.b2Fixture
         	,	b2World = Box2D.Dynamics.b2World
         	,	b2MassData = Box2D.Collision.Shapes.b2MassData
         	,	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
         	,	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
         	,	b2DebugDraw = Box2D.Dynamics.b2DebugDraw
            ,  b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef,
			b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef
            ;
         
         var world = new b2World(
               new b2Vec2(0, 0)    //gravity
            ,  true                 //allow sleep
         );
         
         var fixDef = new b2FixtureDef;
         fixDef.density = 1.0;
         fixDef.friction = 1.5;
         fixDef.restitution = 0.7;
         
         var bodyDef = new b2BodyDef;
		 
		 var scale = 30;
         
         //create ground
         bodyDef.type = b2Body.b2_staticBody;
         fixDef.shape = new b2PolygonShape;
         fixDef.shape.SetAsBox(300/scale, 60/scale);
         fixDef.filter.categoryBits = 2;
         bodyDef.position.Set(300/scale, 400 / scale + 1.8);
         
         var ground = world.CreateBody(bodyDef);
		   ground.CreateFixture(fixDef);
         
         bodyDef.position.Set(300/scale, -1.8);
         world.CreateBody(bodyDef).CreateFixture(fixDef);
         
         fixDef.shape.SetAsBox(60/scale, 120/scale);
         
         bodyDef.position.Set(-1.8, 390/scale);
         world.CreateBody(bodyDef).CreateFixture(fixDef);

         bodyDef.position.Set(-1.8, 1.8);
         world.CreateBody(bodyDef).CreateFixture(fixDef);
         
         bodyDef.position.Set(600/scale+1.8, 390/scale);
         world.CreateBody(bodyDef).CreateFixture(fixDef);
      
      //separator
      var separatorDef = new b2BodyDef,
          separatorFixDef = new b2FixtureDef;
          
      separatorDef.type = b2Body.b2_staticBody;
      separatorFixDef.shape = new b2PolygonShape;
      separatorFixDef.shape.SetAsBox(3/scale, 300/scale);
      separatorFixDef.density = 10.0;
      separatorFixDef.friction = 0.4;
      separatorFixDef.restitution = 0.1;
      separatorFixDef.filter.categoryBits = 4;
      separatorDef.position.Set((600/2)/scale, 300/2/scale);
      separator = world.CreateBody(separatorDef);
      separator.CreateFixture(separatorFixDef);


      //ball
      var   ballDef = new b2BodyDef,
            ballFixDef = new b2FixtureDef;
          
      ballDef.type = b2Body.b2_dynamicBody;
      ballFixDef.shape = new b2CircleShape(30/scale);
      ballFixDef.density = 10.0;
      ballFixDef.friction = 0.4;
      ballFixDef.restitution = 0.1;
      ballFixDef.filter.maskBits = 2;
      ballDef.position.Set((600/2)/scale, 300/2/scale);
      ball = world.CreateBody(ballDef);
      ball.CreateFixture(ballFixDef);

      //paddle
		 var paddleDef = new b2BodyDef,
			 paddleFixDef = new b2FixtureDef;
			 
		 paddleDef.type = b2Body.b2_dynamicBody;
		 paddleFixDef.shape = new b2CircleShape(30/scale);
       paddleFixDef.filter.categoryBits = 2;
		 paddleFixDef.density = 10.0;
		 paddleFixDef.friction = 0.4;
	     paddleFixDef.restitution = 0.1;
         paddleDef.position.Set((600-50)/scale, 120/scale);
         paddle = world.CreateBody(paddleDef);
		 paddle.CreateFixture(paddleFixDef);
	
      //enemy paddle
      var enemyPaddleDef = new b2BodyDef,
          enemyPaddleFixDef = new b2FixtureDef;
          
       enemyPaddleDef.type = b2Body.b2_dynamicBody;
       enemyPaddleFixDef.shape = new b2CircleShape(30/scale);
       enemyPaddleFixDef.filter.categoryBits = 2;
         //paddleFixDef.shape.SetAsBox(10/scale, 30/scale);
       enemyPaddleFixDef.density = 10.0;
       enemyPaddleFixDef.friction = 0.4;
        enemyPaddleFixDef.restitution = 0.1;
         enemyPaddleDef.position.Set(50/scale, 120/scale);
         enemyPaddle = world.CreateBody(enemyPaddleDef);
       enemyPaddle.CreateFixture(enemyPaddleFixDef);

	   var enemyJointDef = new b2PrismaticJointDef,
         worldAxis = new b2Vec2 (0.0, 1.0);
      enemyJointDef.collideConnected = true;
      enemyJointDef.Initialize(enemyPaddle, ground, 
      enemyPaddle.GetWorldCenter(), worldAxis);
      world.CreateJoint(enemyJointDef);  
             
         //setup debug draw
         var debugDraw = new b2DebugDraw();
			debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
			debugDraw.SetDrawScale(30.0);
			debugDraw.SetFillAlpha(0.5);
			debugDraw.SetLineThickness(1.0);
			debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
			world.SetDebugDraw(debugDraw);
         
         window.setInterval(update, 1000 / 60);
         
         //mouse
         
         var mouseX, mouseY, mousePVec, isMouseDown, selectedBody, mouseJoint;
         var canvasPosition = getElementPosition(document.getElementById("canvas"));
         
		 var onKeyPressed = function (event) {
			switch (event.keyCode) {
				case 38:  //TODO: change to consts
					console.log("Key Up Pressed!");
					var vel = paddle.GetLinearVelocity();
					vel.y = 5;
					paddle.SetLinearVelocity(vel);
					
					break;
				case 40:
					console.log("Key Down Pressed!");
					var vel = paddle.GetLinearVelocity();
					vel.y = -5;
					paddle.SetLinearVelocity(vel);
					break;
				default:
					console.log(event.type);
					break;
			}
		};
		
		window.addEventListener('keydown', onKeyPressed, false);
		
		 
		 
         document.addEventListener("mousedown", function(e) {
            isMouseDown = true;
            handleMouseMove(e);
            document.addEventListener("mousemove", handleMouseMove, true);
         }, true);
         
         document.addEventListener("mouseup", function() {
            document.removeEventListener("mousemove", handleMouseMove, true);
            isMouseDown = false;
            mouseX = undefined;
            mouseY = undefined;
         }, true);
         
         function handleMouseMove(e) {
            mouseX = (e.clientX - canvasPosition.x) / 30;
            mouseY = (e.clientY - canvasPosition.y) / 30;
         };
         
         function getBodyAtMouse() {
            mousePVec = new b2Vec2(mouseX, mouseY);
            var aabb = new b2AABB();
            aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
            aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);
            
            // Query the world for overlapping shapes.

            selectedBody = null;
            world.QueryAABB(getBodyCB, aabb);
            return selectedBody;
         }

         function getBodyCB(fixture) {
            if(fixture.GetBody().GetType() != b2Body.b2_staticBody) {
               if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
                  selectedBody = fixture.GetBody();
                  return false;
               }
            }
            return true;
         }
         
         //update
         
         function update() {
         
            if(isMouseDown && (!mouseJoint)) {
               var body = getBodyAtMouse();
               if(body) {
                  var md = new b2MouseJointDef();
                  md.bodyA = world.GetGroundBody();
                  md.bodyB = body;
                  md.target.Set(mouseX, mouseY);
                  md.collideConnected = true;
                  md.maxForce = 300.0 * body.GetMass();
                  mouseJoint = world.CreateJoint(md);
                  body.SetAwake(true);
               }
            }
            
            if(mouseJoint) {
               if(isMouseDown) {
                  mouseJoint.SetTarget(new b2Vec2(mouseX, mouseY));
               } else {
                  world.DestroyJoint(mouseJoint);
                  mouseJoint = null;
               }
            }
         
            world.Step(1 / 60, 10, 10);
            world.DrawDebugData();
            world.ClearForces();
         };
         
         //helpers
         
         //http://js-tut.aardon.de/js-tut/tutorial/position.html
         function getElementPosition(element) {
            var elem=element, tagname="", x=0, y=0;
           
            while((typeof(elem) == "object") && (typeof(elem.tagName) != "undefined")) {
               y += elem.offsetTop;
               x += elem.offsetLeft;
               tagname = elem.tagName.toUpperCase();

               if(tagname == "BODY")
                  elem=0;

               if(typeof(elem) == "object") {
                  if(typeof(elem.offsetParent) == "object")
                     elem = elem.offsetParent;
               }
            }

            return {x: x, y: y};
         }


      };