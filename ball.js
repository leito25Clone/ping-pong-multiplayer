GAME.namespace('GAME.Ball');

GAME.Ball = (function () {
var b2BodyDef     = Box2D.Dynamics.b2BodyDef,
    b2FixtureDef  = Box2D.Dynamics.b2FixtureDef,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2Body        = Box2D.Dynamics.b2Body,
    ballDef       = new b2BodyDef,
    ballFixDef    = new b2FixtureDef,
    init = function (radius) {
      ballDef.type = b2Body.b2_dynamicBody;
      ballFixDef.shape = new b2CircleShape(radius);
      ballFixDef.density = 10.0;
      ballFixDef.friction = 0.4;
      ballFixDef.restitution = 0.1;
      ballDef.userData = "ball";
    },
    Constr = function (world, radius, maskBits, categoryBits, position) {
      init(radius);
      this.alive = true;
      this.startPos = position;
      this.world = world;
      this.radius = radius;
      ballFixDef.filter.maskBits = maskBits;
      ballFixDef.filter.categoryBits = categoryBits;
      ballDef.position.Set(position.x, position.y);
      this.ball = world.CreateBody(ballDef);
      this.ball.CreateFixture(ballFixDef);
    };

    Constr.prototype.IsAlive = function() {
      if (this.alive === true) return true;
      return false;
    };

    Constr.prototype.Die = function() {
      this.alive = false;
    }

    Constr.prototype.Reset = function() {
      init(this.radius);
      this.alive = true;
      this.ball = this.world.CreateBody(ballDef);
      this.ball.CreateFixture(ballFixDef);
    }


    return Constr;
})();         
     
