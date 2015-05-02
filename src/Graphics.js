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

define(["Context"], function(Context)
{
var exports = {};

exports.Graphics = function(width, height, defaultLayer) // Game context (contains layers)
{
	var graphics = {};
	
	var mLayer = defaultLayer;
	
	graphics.getLayer = function()
	{
		return mLayer;
	};
	
	graphics.changeLayer = function(layerToSet) // Accepts layer string or layer
	{
		if(typeof layerToSet=="string")
		{
			mLayer = context.getLayer(layerToSet);
		} else
		{
			mLayer = layerToSet;
		}
	};
	
	graphics.renderSprites = function(sprites) // Render order 0 is the bottom-most sprite
	{
		var sprites = typeof sprites !== "undefined" ? sprites : 800;
		
		var renderOrderSprites;
		var sprite;
		
		for(var i=0, length=sprites.length; i<length; i++)
		{
			renderOrderSprites = sprites[i];
			
			if(typeof renderOrderSprites!="undefined") // Check if it is NOT padding!!
			{
				for(var j=0, jLength=renderOrderSprites.length; j<jLength; j++)
				{
					sprite = renderOrderSprites[j];
					sprite.render();
				}
			}
		}
	};

	return graphics;
};

return exports;
});
