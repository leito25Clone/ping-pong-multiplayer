var paddle;
var scale = 30;


 window.onload = function init() {
            
         var world = new b2World(
               new b2Vec2(0, 0)    //gravity
            ,  true                 //allow sleep
         );
         
     
		 
		var scale = 30;
                      
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