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
