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

(function() // No globals
{
var globalLibs = ["Box2D"]; // Libraries using the global namespace for their interface
var modules = ["Context", "Input", "SpriteConstructorManager", "SceneManager"]

define(modules.concat(globalLibs), function(Context, Input, SpriteConstructorManager, SceneManager)
{
var exports = {};

exports.Game = function(parameters)
{
	var game = {};
	var parametersDefined = parameters!=null;
	
	if(parametersDefined)
	{
		// Game definitions
		var width = typeof parameters.width !== "undefined" ? parameters.width : 800;
		var height = typeof parameters.height !== "undefined" ? parameters.height : 600;
		var parent = typeof parameters.parent !== "undefined" ? parameters.parent : document.body;
		var contextType = typeof parameters.contextType !== "undefined" ? parameters.contextType : "2d";
		var updateCallback = typeof parameters.stepGame !== "undefined" ? parameters.stepGame : false;
		
		var mName = parameters.name;
		var mVersion = parameters.version;
		
		var mContext = new Context.Context(parameters.layers, width, height, parent, contextType);
		var mSpriteConstructorManager = new SpriteConstructorManager.SpriteConstructorManager();
		var mSceneManager = new SceneManager.SceneManager(mSpriteConstructorManager);
		
		// These are not really getters/setters
		game.getName = function()
		{
			return mName;
		};
		
		game.getVersion = function()
		{
			return mVersion;
		};
		
		game.getContext = function()
		{
			return mContext;
		};
		
		game.getSpriteConstructorManager = function()
		{
			return mSpriteConstructorManager;
		};
		
		game.getSceneManager = function()
		{
			return mSceneManager;
		};
		
		game.update = function()
		{
			var scene = mSceneManager.getScene();
			
			if(scene!=false && updateCallback!=false)
			{
				if(scene.getType()==="physics")
				{
					scene.getWorld().Step(16, 10);
				}
				
				scene.resetSpriteIndex();
				parameters.stepGame(scene, mContext.getGraphics());
			}
			
			window.requestAnimationFrame(game.update);
		};
		
		game.update();
	} else
	{
		console.error("No parameters specified for game()!");
		return false;
	}
	
	return game;
};

return exports;
}); // define()

})(); // Anonymous function