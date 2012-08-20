window.onload = function init() {
   var   b2World = Box2D.Dynamics.b2World,
         b2Vec2 = Box2D.Common.Math.b2Vec2,
         b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
         b2Body = Box2D.Dynamics.b2Body,
         b2AABB = Box2D.Collision.b2AABB,
         b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef,
         scale = GAME.SCALE,
         flag = false;

   var world      = new b2World( new b2Vec2(0, 0), true);
   var ground     = new GAME.Bound(world, 2);
   var washer     = new GAME.Ball(world, 1, 2, 2, {x:300/scale, y:200/scale}, "washer");
   var paddle     = new GAME.Ball(world, 1, 6, 6, {x:500/scale, y:200/scale}, "paddle");
   var enemyPaddle     = new GAME.Ball(world, 1, 6, 6, {x:100/scale, y:200/scale}, "paddle");
	var separator  = new GAME.Rectangle(world, 
      {
         x: (600/2)/scale,
         y: 300/2/scale
      },
      {
         width: 3/scale,
         height: 300/scale
      }, 4); 
   var rightGateSeparator = new GAME.Rectangle(world, 
      {
         x: 570/scale,
         y: 300/2/scale
      },
      {
         width: 3/scale,
         height: 300/scale
      }, 4);
   var leftGateSeparator = new GAME.Rectangle(world, 
      {
         x: 1,
         y: 300/2/scale
      },
      {
         width: 3/scale,
         height: 300/scale
      }, 4);
   var leftGate      = new GAME.Gate(world,
      {
         x: 0,
         y: 210/scale
      },
      {
         width: 3/scale,
         height: 100/scale
      }, 2, "leftGate");
		
   var rightGate      = new GAME.Gate(world,
      {
         x: 600/scale,
         y: 210/scale
      },
      {
         width: 3/scale,
         height: 100/scale
      }, 2, "rightGate");
      
   var listener = new Box2D.Dynamics.b2ContactListener;
    listener.BeginContact = function(contact) {
      if ((contact.GetFixtureA().GetBody().GetUserData() === "rightGate") 
            && (contact.GetFixtureB().GetBody().GetUserData() === "washer")) {
         rightGate.Goal();
         washer.Die();
         
      }
      if ((contact.GetFixtureA().GetBody().GetUserData() === "leftGate") 
         && (contact.GetFixtureB().GetBody().GetUserData() === "washer")) {
         leftGate.Goal();
         washer.Die();
      }
    }
   world.SetContactListener(listener);

      //setup debug draw
      var debugDraw = new b2DebugDraw();
      debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
      debugDraw.SetDrawScale(30.0);
      debugDraw.SetFillAlpha(0.5);
      debugDraw.SetLineThickness(1.0);
      debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
      world.SetDebugDraw(debugDraw);

      window.setInterval(update, 1000 / 60);
         
      //points
      var   leftGateCount = document.getElementById("leftCount"),
            rightGateCount = document.getElementById("rightCount");



      //mouse
      
      var mouseX, mouseY, mousePVec, isMouseDown, selectedBody, mouseJoint;
      var canvasPosition = getElementPosition(document.getElementById("canvas"));
    
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
         
         //Was goal
         if (!washer.IsAlive())  {
               washer.Reset();
               paddle.Reset();
               enemyPaddle.Reset();
               leftGateCount.innerHTML = leftGate.GetGoalsCount();
               rightGateCount.innerHTML = rightGate.GetGoalsCount();
         }
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