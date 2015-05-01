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

function addEventListeners() // Only called once
{
	mainCanvas.addEventListener("mousemove", function(event){mouseMoveEventHandler(event);}, false);
	mainCanvas.addEventListener("click", function(event){clickEventHandler(event);}, false);
	
	// On document
	document.addEventListener("keydown", function(event){keyDownEventHandler(event);}, false);
	document.addEventListener("keyup", function(event){keyUpEventHandler(event);}, false);
}

function mouseMoveEventHandler(event)
{
	var e = e || window.event;
	var currentTime = Date.now();
	
	if(currentTime>(inp.lastMouseMoveTime + c.mouseMoveThrottle))
	{
		var xValue = (e.layerX - mainCanvasContext.lastTranslationX) / mainCanvasContext.lastScalingX; // Translation is calculated after scaling
		var yValue = (e.layerY - mainCanvasContext.lastTranslationY) / mainCanvasContext.lastScalingY;
		
		inp.x = Math.round(xValue);
		inp.y = Math.round(yValue);
		
		inp.lastMouseMoveTime = currentTime;
	}
}

function clickEventHandler(event)
{
	if(m.location=="confirmFullScreen") // Hack!
	{
		var screenCenter = c.hCanWidth;
		var confirmButton = m.confirmFullScreenButtons[0];
		var buttonStringLength = fg.measureText(confirmButton.name).width;
		var halfButtonLength = buttonStringLength / 2;
		
		if(inp.x>screenCenter-halfButtonLength && inp.x<screenCenter+halfButtonLength && inp.y>confirmButton.y-m.buttonHeight && inp.y<confirmButton.y)
		{
			launchGameFullScreen();
			changeMenuLocation("main");
			
			return; // Ignores everything else that could happen
		}
	}
	
	inp.clickBuffer = true;
}

function keyDownEventHandler(event)
{
	var e = e || window.event;
	var keyCode = e.keyCode || e.key;
	
	for(var i=0; i<c.numberOfInputKeys; i++)
	{
		if(inp.keys[i].keyCode==keyCode)
		{
			inp.keys[i].s = true;
		}
	}
	
	e.preventDefault();
	return false;
}

function keyUpEventHandler(event)
{
	var e = e || window.event;
	var keyCode = e.keyCode || e.key;
	
	for(var i=0; i<c.numberOfInputKeys; i++)
	{
		if(inp.keys[i].keyCode==keyCode)
		{
			inp.keys[i].s = false;
		}
	}
	
	e.preventDefault();
	return false;
}

function newInputKey(keyCode)
{
	var tempObj = {};
	
	tempObj.keyCode = keyCode;
	tempObj.s = false; // State
	
	inp.keys.push(tempObj);
	
	return tempObj;
}

function checkForClick() // Do not call more than once per frame!
{
	if(inp.clickBuffer)
	{
		inp.clickBuffer = false;
		return true;
	} else
	{
		return false;
	}
}