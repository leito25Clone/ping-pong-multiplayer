GAME.namespace('GAME.Gate');
GAME.Gate = (function () {
  var b2BodyDef       = Box2D.Dynamics.b2BodyDef,
      b2FixtureDef    = Box2D.Dynamics.b2FixtureDef,
      b2PolygonShape  = Box2D.Collision.Shapes.b2PolygonShape,
      b2Body          = Box2D.Dynamics.b2Body,
      gateDef    = new b2BodyDef,
      gateFixDef = new b2FixtureDef,
      scale           = GAME.SCALE,
      init = function (gateName) {
        gateDef.type     = b2Body.b2_staticBody;
        gateFixDef.shape = new b2PolygonShape;
        gateFixDef.density     = 10.0;
        gateFixDef.friction    = 0.4;
        gateFixDef.restitution = 0.1;
        gateDef.userData = gateName;
      },
      Constr = function (world, position, size, categoryBits, gateName) {
        init(gateName);
        this.goals = 0;
        gateFixDef.shape.SetAsBox(size.width, size.height);
        gateFixDef.isSensor = true;
        gateFixDef.filter.categoryBits = categoryBits;
        gateDef.position.Set(position.x, position.y);
        world.CreateBody(gateDef).CreateFixture(gateFixDef);
      }; 
      Constr.prototype.GetGoalsCount = function() {
        return this.goals;
      };
      Constr.prototype.Goal = function () {
        this.goals+=1;
      };
      Constr.prototype.ResetGoalsCount = function () {
        this.goals = 0;
      };

      return Constr;
})();