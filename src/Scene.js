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

define(["Sprite", "Box2DW"], function(Sprite, Box2D) // Locals having the same name as globals don't change them
{
var exports = {};

exports.Scene = function(spriteConstructorManager, name, type, typeArgs) // Feel free to change these (except spriteConstructorManager)
{
	var scene = {};
	
	var mName = name;
	var mSprites = []; // 2d. Its index represents the render order. Make sure to check for undefined in the first array because of padding!
	var mSpriteConstructorManager = spriteConstructorManager;
	var mType = typeof type !== "undefined" ? type : "basic";
	
	// Physics
	var mWorld = false; // Only defined if the scene is a physics type
	
	if(mType=="physics")
	{
		if(typeof typeArgs !== "undefined")
		{
			// Defaults
			var gravity = typeof typeArgs.gravity !== "undefined" ? typeArgs.gravity : new Box2D.b2Vec2(0, -10);
			var sleep = typeof typeArgs.sleep !== "undefined" ? typeArgs.sleep : true;
			mWorld = new Box2D.b2World(gravity, sleep);
		}
	}
	
	scene.delete = function()
	{
		mSpriteConstructorManager.deleteScene(this);
	};
	
	scene.getName = function()
	{
		return mName;
	};
	
	scene.getSprites = function()
	{
		return mSprites;
	};
	
	scene.getType = function()
	{
		return mType
	};
	
	// Creates new sprite using a constructor, or a constructor name.
	scene.createSprite = function(constructor)
	{
		var spriteConstructor = constructor; // Make sure we are out of this weird arguments object
		
		// Find constructor
		if(typeof constructor==="string")
		{
			spriteConstructor = mSpriteConstructorManager.findConstructor(constructor);
		}
		
		// Add this scene as the first argument of the new sprite
		var args = Array.prototype.slice.call(arguments); // Turn into array
		args.splice(0, 1, this, spriteConstructor); // Remove first argument, and add others
		
		var sprite = spriteConstructor.createSprite.apply(this, args); // Apply args
		
		this.addSpriteToArray(sprite);
		return sprite;
	};
	
	// Very lengthy, needs work?
	scene.findSprites = function(spriteName) // Sprite name = type
	{
		var sprites = [];
		
		var renderOrderSprites;
		var currentSprite;
		
		for(var i=0, length=mSprites.length; i<length; i++)
		{
			renderOrderSprites = mSprites[i];
			
			if(typeof renderOrderSprites!=="undefined")
			{
				for(var j=0, jLength=renderOrderSprites.length; j<jLength; j++)
				{
					currentSprite = renderOrderSprites[j];
					
					if(currentSprite.getName()===spriteName)
					{
						sprites.push(currentSprite);
					}
				}
			}
		}
		
		return sprites;
	};
	
	scene.clear = function() // Deletes all sprites
	{
		mSprites = [];
	};
	
	scene.deleteSprite = function(sprite)
	{
		var renderOrderSprites;
		var currentSprite;
		
		for(var i=0, length=mSprites.length; i<length; i++)
		{
			renderOrderSprites = mSprites[i];
			
			if(typeof renderOrderSprites!=="undefined")
			{
				for(var j=0, jLength=renderOrderSprites.length; j<jLength; j++)
				{
					currentSprite = renderOrderSprites[j];
					
					if(currentSprite===sprite)
					{
						this.removeSpriteFromArray(i, j);
						
						return true;
					}
				}
			}
		}
		
		return false;
	};
	
	scene.deleteSprites = function(spriteName)
	{
		var renderOrderSprites;
		var currentSprite;
		
		for(var i=0, length=mSprites.length; i<length; i++)
		{
			renderOrderSprites = mSprites[i];
			
			if(typeof renderOrderSprites!="undefined")
			{
				for(var j=0, jLength=renderOrderSprites.length; j<jLength; j++)
				{
					currentSprite = renderOrderSprites[j];
					
					if(currentSprite.getName()===spriteName)
					{
						this.removeSpriteFromArray(i, j);
					}
				}
			}
		}
	};
	
	// Helper functions
	scene.addSpriteToArray = function(sprite, index) // This will add the sprite to the array. mSprites[renderOrder][spriteIndex]
	{
		var array = mSprites;
		var renderOrder = sprite.getRenderOrder();
		var arrayLength =  array.length;
		index = typeof index !== "undefined" ? index : array.length; // Default is top-most. This index represents the index in the same render order
		
		if(renderOrder>=arrayLength) // Padding, like this we can iterate through this easily
		{
			for(var i=arrayLength; i<renderOrder; i++)
			{
				array[i] = undefined;
			}
		}
		
		if(typeof array[renderOrder]==="undefined")
		{
			array[renderOrder] = []; // Create a new array
		}
		
		if(index>=array[renderOrder].length)
		{
			array[renderOrder].push(sprite); // If it's out of range, just add it to the end (faster!)
		} else
		{
			array[renderOrder].splice(index, 0, sprite);
		}
	}

	scene.removeSpriteFromArray = function(renderOrder, index) // Remove the sprite from mSprites
	{
		var array = mSprites;
		if(renderOrder>=0 && renderOrder<array.length)
		{
			var renderOrderSprites = array[renderOrder]; // Get array
			
			if(typeof renderOrderSprites!=="undefined" && index>=0 && index<renderOrderSprites.length) // Validation + in range
			{
				if(renderOrderSprites.length===1) // Only one here
				{
					if(renderOrder===array.length-1)
					{
						var lastGoodIndex = -1;
						
						for(var i=0; i<renderOrder; i++)
						{
							if(typeof array[i]!=="undefined")
							{
								lastGoodIndex = i;
							}
						}
						
						array.splice(lastGoodIndex+1, renderOrder-lastGoodIndex);
					} else
					{
						array[renderOrder] = undefined; // Cannot use any variable for this and setting it to undefined!!
					}
				} else
				{
					renderOrderSprites.splice(index, 1);
				}
				
				return true;
			}
		}
		
		return false;
	}
	
	return scene;
};

return exports;
});