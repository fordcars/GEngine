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

function getLevels(resourceArray)
{
	var levels = [];
	var currentResource;
	
	for(var i=0, length=resourceArray.length; i<length; i++)
	{
		currentResource = resourceArray[i];
		
		if(currentResource.type=="level")
		{
			levels.push(currentResource);
		}
	}
	
	return levels;
}

function changeLevel(levelString)
{
	l.currentLevel = parseLevel(levelString);
}

function loadNextLevel()
{
	changeLevel(l.levels[l.currentLevelIndex].data);
	
	if(l.currentLevelIndex<l.levels.length-1) // To make sure we don't load a non-existing level
	{
		l.currentLevelIndex++;
	}
}

function parseLevel(levelString)
{
	var parsedLevel = {}; // Return value
	var parsedString = parseSimpleTextDatabase(levelString);
	
	var currentLine;
	
	parsedLevel.sprites = [];
	
	for(var i=0, length=parsedString.length; i<length; i++)
	{
		currentLine = parsedString[i];
		
		switch(currentLine.name)
		{
			case "Author":
				parsedLevel.author = currentLine.values[0];
				break
				
			case "Sprite":
				var animationSprite = getAnimationFromName(currentLine.values[0]);
				var spriteX = currentLine.values[1];
				var spriteY = currentLine.values[2];
				
				parsedLevel.sprites.push(createSprite(animationSprite, spriteX, spriteY));
				break;
			
			default:
				break;
		}
	}
	
	return parsedLevel;
}