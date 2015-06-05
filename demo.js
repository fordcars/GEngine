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

window.onload = main;

function main()
{
	// Remember, this is used to include files.
	require(["GEngine", "HelperFunctions", "Point"], function(GEngine, HF, Point)
	{
		var game = new GEngine.Game({name: "Demo", version: "0.1", layers: ["bgIsCool", "fgIsCoolToo"], stepGame: stepGame, contextType: "2d"});
		
		var constructor = game.getSpriteConstructorManager().createConstructor({name: "Hi",
		init: function(sprite)
		{
			//console.log("Initializing " + sprite.getName());
		},
		renderer: function(sprite, info, args)
		{
			
		}});
		
		var constructor = game.getSpriteConstructorManager().createConstructor({name: "BOO!",
		init: function(sprite)
		{
			//console.log("Initializing " + sprite.getName());
		},
		renderer: function(sprite, info, args)
		{
			
		}});
		
		game.getSceneManager().createScene("CoolMain", "physics", {gravity: 9.8});
		game.getSceneManager().changeScene("CoolMain");
		game.getSceneManager().getScene().createSprite("Hi", 15, new Point.Point(100, 100), 0, 0, "physics");
		game.getSceneManager().getScene().createSprite("BOO!", 20, new Point.Point(100, 100), 0, 10, "physics");
		game.getSceneManager().getScene().createSprite("BOO!", 5, new Point.Point(100, 100), 0, 5, "physics");
		console.log(game.getSceneManager().getScene().getSprites()[0][0].getPhysics())
		
		console.log("Sprites:");
		console.log(game.getSceneManager().getScene().getSprites());
		console.log("Scene:");
		console.log(game.getSceneManager().getScene());
		
		function stepGame(scene, graphics)
		{
			var layer = graphics.getLayer();
			
			layer.clear();
			
			var sprite;
			
			for(var i=0; i<100; i++)
			{
				sprite = scene.getSprite();
				
				if(sprite==false)
				{
					break;
				}
				
				sprite.render("Hi");
			}
		}
	});
}