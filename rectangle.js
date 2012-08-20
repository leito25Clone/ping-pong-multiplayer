GAME.namespace('GAME.Rectangle');
GAME.Rectangle = (function () {
  var b2BodyDef       = Box2D.Dynamics.b2BodyDef,
      b2FixtureDef    = Box2D.Dynamics.b2FixtureDef,
      b2PolygonShape  = Box2D.Collision.Shapes.b2PolygonShape,
      b2Body          = Box2D.Dynamics.b2Body,
      rectangleDef    = new b2BodyDef,
      rectangleFixDef = new b2FixtureDef,
      scale           = GAME.SCALE,
      init = function () {
        rectangleDef.type     = b2Body.b2_staticBody;
        rectangleFixDef.shape = new b2PolygonShape;
        rectangleFixDef.density     = 10.0;
        rectangleFixDef.friction    = 0.4;
        rectangleFixDef.restitution = 0.1;
      },
      Constr = function (world, position, size, categoryBits) {
        init();
        rectangleFixDef.shape.SetAsBox(size.width, size.height);
        rectangleFixDef.filter.categoryBits = categoryBits;
        rectangleDef.position.Set(position.x, position.y);
        world.CreateBody(rectangleDef).CreateFixture(rectangleFixDef);
      }; 

      return Constr;
})();
  