// GEngineDemo
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

window.onload = main;

function main()
{
	// Remember, this is used to include files.
	require(["GEngine", "HelperFunctions"], function(GEngine, HF)
	{
		var game = new GEngine.Game({name: "Demo", version: "0.1", layers: ["bgIsCool", "fgIsCoolToo"], update: update, contextType: "2d"});
		
		var constructor = game.getSpriteConstructorManager().createConstructor({name: "Hi",
		init: function(sprite)
		{
			//console.log("Initializing " + sprite.getName());
		},
		renderer: function()
		{
			console.log("Rendering hi!");
		}});
		
		var constructor = game.getSpriteConstructorManager().createConstructor({name: "BOO!",
		init: function(sprite)
		{
			//console.log("Initializing " + sprite.getName());
		},
		renderer: function()
		{
			console.log("Rendering boo!!");
		}});
		
		game.getSceneManager().createScene("CoolMain", "physics", {});
		game.getSceneManager().changeScene("CoolMain");
		game.getSceneManager().getScene().createSprite("Hi", 100, 100);
		game.getSceneManager().getScene().createSprite("BOO!", 100, 100, 10, "physics");
		game.getSceneManager().getScene().createSprite("BOO!", 100, 100, 5, "physics");
		
		console.log("Sprites:");
		console.log(game.getSceneManager().getScene().getSprites());
		console.log("Scene:");
		console.log(game.getSceneManager().getScene());
		
		function update()
		{
			
		}
	});
}