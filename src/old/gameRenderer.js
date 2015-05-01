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

function drawSprites(layer)
{
	var currentSprite;
	var imageWidth;
	var imageHeight;
	
	for(var i=0, length=l.currentLevel.sprites.length; i<length; i++)
	{
		currentSprite = l.currentLevel.sprites[i];
		drawSprite(layer, currentSprite);
	}
}

function drawSprite(layer, sprite)
{
	layer.drawImage(sprite.animation.getFrame(), sprite.x, sprite.y);
}
		