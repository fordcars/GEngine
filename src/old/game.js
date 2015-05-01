// Wind
// Copyright © 2014 Carl Hewett

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

function displayGame()
{
	var gameLocation = ga.uiLocation;
	
	if(ga.firstFrame)
	{
		ga.firstFrame = false;
		setupGame();
	}
	
	if(gameLocation=="game")
	{
		mainGameLoop();
	}
}

function setupGame()
{
	clearAllLayers();
	loadNextLevel();
	
	ga.uiLocation = "game";
}

function mainGameLoop()
{
	bg.clearLayer(); // Background layer
	
	drawSprites(bg);
}

// Game elements
function createSprite(animationSprite, x, y) // An animation sprite is the raw animation, while the sprite is a game object.
{
	var sprite = {};
	var firstAnimationFrame;
	
	sprite.animation = createAnimationSprite(animationSprite, x, y);
	
	sprite.x = x;
	sprite.y = y;
	
	// Collision box
	sprite.boxWidth = sprite.animation.width;
	sprite.boxHeight = sprite.animation.height;
	
	return sprite;
}

// Game events
function onGameOver()
{
}