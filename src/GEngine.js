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

(function() // No globals
{
var globalLibs = ["libs/box2d.min"]; // Libraries using the global namespace for their interface
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
		var updateCallback = typeof parameters.update !== "undefined" ? parameters.update : false;
		
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
			
			if(updateCallback!=false)
			{
				parameters.update();
			}
			
			if(scene!=false)
			{
				// TODO: GIVE THIS (loop) TO THE DEVELOPER IN UPDATE + ability to give arguments to update() and init()!!!!!!!!!!!!!!!!!!!-- mGraphics.renderSprites(scene.getSprites());
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