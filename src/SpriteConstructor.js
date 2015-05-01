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

// Types: normal, custom

define(["Sprite"], function(Sprite)
{
var exports = {};

// Sprite constructor
exports.SpriteConstructor = function(args)
{
	if(typeof args === "undefined")
	{
		return false;
	}
	
	var spriteConstructor = {};
		
	var mName = args.name; // Unique
	var mData = typeof args.data !== "undefined" ? args.data : {};
	var mInit = typeof args.init !== "undefined" ? args.init : function(){};
	var mRenderer = typeof args.renderer !== "undefined" ? args.renderer : function(){}; // Define those variables for clarity
	var mType = typeof args.type !== "undefined" ? args.type : "normal";
	
	spriteConstructor.getName = function()
	{
		return mName;
	};
	
	spriteConstructor.getRenderer = function()
	{
		return mRenderer;
	};
	
	spriteConstructor.getData = function()
	{
		return mData;
	};
	
	spriteConstructor.getType = function()
	{
		return mType;
	};
	
	spriteConstructor.createSprite = function() // Thanks to StackOverflow: new Sprite() with all arguments passed
	{
		var createdSprite;
		
		function S(args)
		{
			return Sprite.Sprite.apply(this, args);
		}
		
		S.prototype = Sprite.Sprite.prototype;
		
		createdSprite = new S(arguments);
		mInit(createdSprite); // Call the initializer
		
		return createdSprite;
	};
	
	return spriteConstructor;
};

return exports;
});