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

function getObjectFromName(objectArray, objectName)
{
	var currentObject;
	
	for(var i=0, length=objectArray.length; i<length; i++)
	{
		currentObject = objectArray[i];
		
		if(currentObject.name==objectName)
		{
			return currentObject;
		}
	}
}

function error(error)
{
	console.error("ERROR:", error);
}

function isDefined(thingToCheck)
{
	return (thingToCheck!=undefined && thingToCheck!=null);
}

function randomInt(min, max) // Between min and max (exclusive)
{
	return Math.floor(Math.random() * (min - max + 1) + max);
}

function randomFloat(min, max) // Between min and max (exclusive)
{
	return Math.random() * (min - max + 1) + max;
}

function createPoint(x, y)
{
	return {x: x, y: y};
}

function createDoublePoint(x1, y1, x2, y2)
{
	return {x1: x1, y1: y1, x2: x2, y2: y2};
}

function getNameObjectsFromArray(array)
{
	var outputObject = {};
	var currentObject;
	
	for(var i=0, length=array.length; i<length; i++)
	{
		currentObject = array[i];
		
		outputObject[currentObject.name] = currentObject;
	}
	
	return outputObject;
}

function normalizeLineEndings(string)
{
	string.replace(/(rn|r|n)/g, c.lineEndings);
	return string;
}

function parseSimpleTextDatabase(text) // Returns an array of line objects. Each of them contain .name (string) and .values (array of strings)
{
	var parsedText = [];
	var stringToParse = normalizeLineEndings(text) + c.lineEndings; // Adds new line for cleaner parsing
	
	var currentChar;
	var currentLineName;
	var currentLineValues = [];
	var currentWord = "";
	
	var inLineName = true;
	var inComment = false;
	
	var lineObject = {};
	
	for(var i=0, length=stringToParse.length; i<length; i++)
	{
		currentChar = stringToParse[i];
		
		if(inComment)
		{
			if(currentChar==c.lineEndings)
			{
				inComment = false;
			}
			
			continue;
		}
		
		switch(currentChar)
		{
			case c.lineEndings:
				if(inLineName) // Same as case " "
				{
					currentLineName = currentWord;
					
					inLineName = false;
				} else
				{
					currentLineValues.push(currentWord);
				}
				
				if(currentLineName!="")
				{
					lineObject = {};
					
					lineObject.name = currentLineName;
					lineObject.values = currentLineValues;
					
					parsedText.push(lineObject);
				}
				
				// Clean up
				currentLineValues = [];
				currentWord = "";
				inLineName = true;
				inComment = false;
				break;
			
			case " ":
				if(inLineName)
				{
					currentLineName = currentWord;
					
					inLineName = false;
				} else
				{
					currentLineValues.push(currentWord);
				}
				
				// Clean up
				currentWord = "";
				
				break;
			
			case "#": // Comments
				inComment = true;
				break;
			
			default:
				currentWord += currentChar;
				
				break;
		}
	}
	
	return parsedText;
}