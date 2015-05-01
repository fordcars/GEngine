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

define(["Scene"], function(Scene)
{
var exports = {};

exports.SceneManager = function(spriteConstructorManager)// Keeps track of scenes
{
	var sceneManager = {};
	
	var mScenes = [];
	var mScene = false; // Current scene
	
	sceneManager.getScene = function()
	{
		return mScene;
	};
	
	sceneManager.changeScene = function(scene)
	{
		if(typeof scene==="string")
		{
			scene = sceneManager.findScene(scene);
		}
		
		mScene = scene;
	};
	
	sceneManager.createScene = function() // Factory
	{
		function S(args)
		{
			return Scene.Scene.apply(this, args);
		}
		
		S.prototype = Scene.Scene.prototype;
		
		var args = Array.prototype.slice.call(arguments); // Turn into array
		args.splice(0, 0, spriteConstructorManager); // Add this argument in first
		var scene = new S(args);
		
		mScenes.push(scene);
		
		if(!mScene)
		{
			mScene = scene;
		}
		return scene;
	};
	
	sceneManager.deleteScene = function(scene)
	{
		if(scene===mScene)
		{
			mScene = false;
		}
		
		if(typeof scene==="string")
		{
			scene = sceneManager.findScene(scene);
		}
		
		var index = mScenes.indexOf(scene);
		mScenes.splice(index, 1);
	};
	
	sceneManager.findScene = function(name)
	{
		var scene;
		
		for(var i=0, length=mScenes.length; i<length; i++)
		{
			scene = mScenes[i];
			
			if(scene.getName()===name)
			{
				return scene;
			}
		}
		
		return false;
	};
	
	return sceneManager;
};

return exports;
});