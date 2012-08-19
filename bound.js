var fixDef = new b2FixtureDef;
   fixDef.density = 1.0;
   fixDef.friction = 1.5;
   fixDef.restitution = 0.7;

var bodyDef = new b2BodyDef;
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