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

define(["SpriteConstructor"], function(SpriteConstructor)
{
var exports = {};

// Should we change the name of this class?
exports.SpriteConstructorManager = function() // Interface
{
	var spriteConstructorManager = {};
	
	var mConstructors = [];
	
	spriteConstructorManager.getConstructors = function()
	{
		return mConstructors;
	};
	
	spriteConstructorManager.createConstructor = function() // Factory. Calls new SpriteConstructor and pushes it to array
	{
		var constructor = this.tempConstructor.apply(this, arguments);
		mConstructors.push(constructor);
		return constructor;
	};
	
	spriteConstructorManager.tempConstructor = function() // Returns a constructor without keeping track of it
	{
		// Thanks to StackOverflow, using apply with new at:
		// http://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible
		function SC(args)
		{
			return SpriteConstructor.SpriteConstructor.apply(this, args);
		}
		SC.prototype = SpriteConstructor.SpriteConstructor.prototype; // This works? I think it passes the other object's reference, and works.
		
		var constructor = new SC(arguments);
		
		return constructor;
	};
	
	spriteConstructorManager.clear = function() // Deletes all constructors
	{
		mConstructors = [];
	};

	spriteConstructorManager.findConstructor = function(name)
	{
		var spriteConstructor;
		
		for(var i=0, length=mConstructors.length; i<length; i++)
		{
			spriteConstructor = mConstructors[i];
			
			if(spriteConstructor.getName()===name)
			{
				return spriteConstructor;
			}
		}
		
		return false;
	};
	
	return spriteConstructorManager;
};

return exports;
});