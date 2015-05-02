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