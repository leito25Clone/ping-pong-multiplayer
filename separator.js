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