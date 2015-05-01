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

function getAnimationFromName(animationName)
{
	return getObjectFromName(a.animationSpriteContructors, animationName);
}

function createAnimationSprite(animationSpriteToCreate)
{
	var animationSprite = {};
	var currentAnimationFrame;
	
	animationSprite.name = animationSpriteToCreate.name;
	animationSprite.frames = []; // Defined in for loop
	animationSprite.delay = animationSpriteToCreate.delay;
	
	animationSprite.numberOfFrames = animationSpriteToCreate.frames.length;
	animationSprite.timeSinceLastFrame = 0; // Time (probably frames in the game) elapsed since last animation frame
	
	for(var i=0, length=animationSpriteToCreate.frames.length; i<length; i++)
	{
		currentAnimationFrame = animationSpriteToCreate.frames[i];
		
		animationSprite.frames.push(getResourceFromName(currentAnimationFrame));
	}
	
	animationSprite.width = animationSprite.frames[0].data.width;
	animationSprite.height = animationSprite.frames[0].data.height;
	
	if(animationSpriteToCreate.randomStart)
	{
		animationSprite.currentFrameIndex = randomInt(-1, animationSprite.numberOfFrames);
	} else
	{
		animationSprite.currentFrameIndex = 0;
	}
	
	addAnimationSpriteMethods(animationSprite);
	
	return animationSprite;
}

function addAnimationSpriteMethods(animationSprite)
{
	animationSprite.getFrame = function() // Returns an image data
	{
		if(this.timeSinceLastFrame>=this.delay)
		{
			this.timeSinceLastFrame = 0;
		
			if(this.currentFrameIndex<this.numberOfFrames-1)
			{
				this.currentFrameIndex++;
			} else
			{
				this.currentFrameIndex = 0;
			}
		}
		
		this.timeSinceLastFrame++;
		
		return this.frames[this.currentFrameIndex].data;
	}
}