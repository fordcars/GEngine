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