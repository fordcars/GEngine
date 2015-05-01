// GEngine
// Copyright © 2015 Carl Hewett

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// Types: basic, physics

define(["Point"], function(Point)
{
var exports = {};

exports.Sprite = function(scene, constructor, x, y, renderOrder, type, typeArgs) // Free to edit these and changing copy() accordingly (except scene and constructor of course)
{
	var sprite = {};
	
	var mName = constructor.getName();
	var mCoords = new Point.Point(x, y);
	var mScene = scene;
	var mRenderOrder = typeof renderOrder !== "undefined" ? renderOrder : 0;
	var mType = typeof type !== "undefined" ? type : "basic";
	
	var mData = constructor.getData();
	var mRenderer = constructor.getRenderer(); // Giving the renderer and friends as arguments removes the use of the constructor
	
	var mPhysics = false; // Only defined if it is of physics type
	
	if(mType==="physics" && mScene.getType()!=="physics")
	{
		if(typeof typeArgs !== "undefined")
		{
			// Defaults
			var physicsType = typeof typeArgs.physicsType !== "undefined" ? typeArgs.physicsType : new Box2D.b2Vec2(0, -10);
			mWorld = new Box2D.b2World(gravity, sleep);
		}
	} else
	{
		mType = "basic"; // If physics is not available
	}
	
	sprite.delete = function()
	{
		mScene.deleteSprite(this);
	};
	
	sprite.render = function()
	{
		mRenderer(mData);
	};
	
	sprite.copy = function(spriteScene)
	{
		spriteScene = typeof spriteScene !== "undefined" ? spriteScene : mScene;
		return new Sprite(spriteScene, constructor, mCoords.x, mCoords.y, mType, mRenderOrder);
	};
	
	sprite.getName = function()
	{
		return mName;
	};
	
	sprite.getCoords = function()
	{
		return mCoords;
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