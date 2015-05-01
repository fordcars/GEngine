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