// GEngine
//
//The MIT License (MIT)
//
//Copyright (c) 2015 Carl Hewett
//
//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:
//
//The above copyright notice and this permission notice shall be included in
//all copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//THE SOFTWARE.

// Types: basic, physics
// Physics types: polygon, circle

define(["Point", "Box2DW"], function(Point, Box2D)
{
var exports = {};

// renderOrder+ are optional
exports.Sprite = function(scene, constructor, vertices, position, angle, renderOrder, type, typeArgs) // Free to edit these and changing copy() accordingly (except scene and constructor of course)
{
	var sprite = {};
	
	var mName = constructor.getName();
	var mVerticesOrRadius = vertices; // Holds vertices, or if it is a circle, the radius
	var mShape = mVerticesOrRadius.length==undefined ? "circle" : "polygon"; // If it is a radius, set is as a circle
	var mPosition = position;
	var mAngle = angle;
	var mScene = scene;
	var mRenderOrder = typeof renderOrder !== "undefined" ? renderOrder : 0;
	var mType = typeof type !== "undefined" ? type : "basic";
	
	var mData = constructor.getData();
	var mRenderer = constructor.getRenderer(); // Giving the renderer and friends as arguments removes the use of the constructor
	
	var mPhysics = false; // Only defined if it is of physics type
	
	typeArgs = typeof typeArgs !== "undefined" ? typeArgs : {};
	
	(function setupSprite() // First parenthesis vital for calling it directly
	{
		if(mType==="physics" && mScene.getType()==="physics")
		{
			var world = mScene.getWorld();
			var fixture = new Box2D.b2FixtureDef();
			var shape;
			
			// Defaults
			var density = typeof typeArgs.density !== "undefined" ? typeArgs.density : 1.0;
			var friction = typeof typeArgs.density !== "undefined" ? typeArgs.density : 0.2;
			var restitution = typeof typeArgs.density !== "undefined" ? typeArgs.density : 0.1;
			var physicsType = typeof typeArgs.physicsType !== "undefined" ? typeArgs.physicsType : Box2D.b2Body.b2_dynamicBody; 
			
			var mass = typeof typeArgs.mass !== "undefined" ? typeArgs.mass : 2.0;
			
			switch(mShape)
			{
				case "polygon":
					var vertices = mVerticesOrRadius;
					shape = new Box2D.b2PolygonShape();
					
					if(typeof vertices==="undefined")
					{
						shape.SetAsBox(10, 10);
					} else
					{
						shape.vertices = vertices;
						shape.vertexCount = vertices.length; // Needed?
					}
					break;
				
				case "circle":
					shape = new Box2D.b2CircleShape();
					shape.SetRadius(typeof typeArgs.radius !== "undefined" ? typeArgs.radius : 15);
					break;
			}
			
			fixture.shape = shape;
			fixture.density = density;
			fixture.friction = friction;
			fixture.restitution = restitution;
			
			var bodyDef = new Box2D.b2BodyDef();
			bodyDef.position.SetV(mPosition);
			bodyDef.angle = mAngle;
			
			mPhysics = world.CreateBody(bodyDef).CreateFixture(fixture); // Returns body
		} else
		{
			mType = "basic"; // If physics is not on or available
		}
	})();
	
	sprite.getPhysics = function()
	{
		return mPhysics;
	};
	
	sprite.delete = function()
	{
		mScene.deleteSprite(this);
	};
	
	sprite.render = function(args)
	{
		var info = {};
		info.verticesOrRadius = mVerticesOrRadius;
		
		mRenderer(this, info, args);
	};
	
	sprite.copy = function(spriteScene)
	{
		spriteScene = typeof spriteScene !== "undefined" ? spriteScene : mScene;
		return new Sprite(spriteScene, constructor, mPosition.x, mPosition.y, mType, mRenderOrder);
	};
	
	sprite.getName = function()
	{
		return mName;
	};
	
	sprite.setVerticesOrRadius = function(values)
	{
		mVerticesOrRadius = values;
	};
	
	sprite.getCoords = function() // For physics and basic sprites
	{
		if(mType=="physics")
		{
			return mPhysics.GetXForm().position;
		} else
		{
			return mPosition;
		}
	};
	
	sprite.getAngle = function()
	{
		if(mType=="physics")
		{
			return mPhysics.GetAngle();
		} else
		{
			return mAngle;
		}
	};
	
	sprite.getRenderOrder = function()
	{
		return mRenderOrder;
	};
	
	sprite.setRenderOrder = function(newRenderOrder)
	{
		var sprites = mScene.getSprites();
		var oldRenderOrder = mRenderOrder;
		var oldRenderArray = sprites[oldRenderOrder];
		
		mScene.removeSpriteFromArray(oldRenderOrder, oldRenderArray.indexOf(this)); // Remove old sprite
		
		mRenderOrder = newRenderOrder;
		mScene.addSpriteToArray(this); // Re-adds the reference to the new render order
	};
	
	sprite.bringRenderTop = function() // Brings it on top of all other sprites of the same render order
	{
		var sprites = mScene.getSprites();
		var order = mRenderOrder;
		var renderArray = sprites[order];
		var indexToRemove = renderArray.indexOf(this);
		var lastIndex = renderArray.length
		
		mScene.removeSpriteFromArray(order, indexToRemove);
		mScene.addSpriteToArray(this, lastIndex);
	};
	
	sprite.bringRenderBottom = function() // Brings it under all other sprites of the same render order
	{
		var sprites = mScene.getSprites();
		var order = mRenderOrder;
		var renderArray = sprites[order];
		var indexToRemove = renderArray.indexOf(this);
		
		mScene.removeSpriteFromArray(order, indexToRemove);
		mScene.addSpriteToArray(this, 0);
	};
	
	return sprite;
}

return exports;
});