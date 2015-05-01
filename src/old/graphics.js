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

function addGraphicMembers(context)
{
	context.lastTranslationX = c.defaultTranslationX;
	context.lastTranslationY = c.defaultTranslationY;
	context.lastScalingX = c.defaultScalingX;
	context.lastScalingY = c.defaultScalingY;
	
	context.drawString = function(stringToDraw, stringY)
	{
		this.fillText(stringToDraw, 20, stringY);
	};
	
	context.drawCenteredString = function(string, x, y, stringLength)
	{
		var halfStringLength;
		
		if(isDefined(stringLength))
		{
			halfStringLength = stringLength / 2;
		} else
		{
			halfStringLength = this.measureText(string).width / 2;
		}
		
		this.fillText(string, x - halfStringLength, y);
	};
	
	context.fillLayer = function()
	{
		this.fillRect(0, 0, c.canWidth, c.canHeight);
	};
	
	context.clearLayer = function()
	{
		this.clearRect(0, 0, c.canWidth, c.canHeight);
	};
	
	context.restoreLayer = function() // Restores layer to original state
	{
		this.setTranslationVariables(c.defaultTranslationX, c.defaultTranslationY);
		this.setScalingVariables(c.defaultScalingX, c.defaultScalingY);
		
		this.restore();
		this.save();
	};
	
	context.setTranslationVariables = function(x, y)
	{
		this.lastTranslationX = x;
		this.lastTranslationY = y;
	};
	
	context.translateAndUpdate = function(x, y)
	{
		this.setTranslationVariables(x, y);
		
		this.translate(x, y);
	};
	
	context.translateLayer = function(x, y)
	{
		this.restoreLayer(); // Remember that this uses this!
		
		this.translateAndUpdate(x, y);
	};
	
	context.setScalingVariables = function(x, y)
	{
		this.lastScalingX = x;
		this.lastScalingY = y;
	};
	
	context.scaleAndUpdate = function(x, y)
	{
		this.setScalingVariables(x, y);
		
		this.scale(x, y);
	};
	
	context.scaleLayer = function(x, y)
	{
		this.restoreLayer(); // Remember that this uses this!
		
		this.scaleAndUpdate(x, y);
	};
}

function clearAllLayers()
{
	var currentLayer;
	
	for(var i=0; i<c.numberOfLayers; i++)
	{
		currentLayer = canvasContexts[i];
		
		currentLayer.clearLayer();
	}
}

function restoreLayers()
{
	var currentLayer;
	
	for(var i=0; i<c.numberOfLayers; i++)
	{
		currentLayer = canvasContexts[i];
		
		currentLayer.restoreLayer();
	}
}

function translateLayers(x, y)
{
	var currentLayer;
	
	for(var i=0; i<c.numberOfLayers; i++)
	{
		currentLayer = canvasContexts[i];
		
		currentLayer.translateLayer(x, y);
	}
}

function scaleLayers(x, y)
{
	var currentLayer;
	
	for(var i=0; i<c.numberOfLayers; i++)
	{
		currentLayer = canvasContexts[i];
		
		currentLayer.scaleLayer(x, y);
	}
}

function translateAndScaleLayers(translationX, translationY, scalingX, scalingY)
{
	var currentLayer;
	
	for(var i=0; i<c.numberOfLayers; i++)
	{
		currentLayer = canvasContexts[i];
		
		currentLayer.restoreLayer();
		
		currentLayer.translateAndUpdate(translationX, translationY);
		currentLayer.scaleAndUpdate(scalingX, scalingY);
	}
}

function resizeCanvases(width, height)
{
	var currentCanvas;
	
	for(var i=0; i<c.numberOfLayers; i++)
	{
		currentCanvas = canvases[i];
		
		currentCanvas.width = width;
		currentCanvas.height = height;
	}
}

function resizeCanvasesAndStretch(width, height)
{
	var currentCanvas;
	var widthConstant = width / c.canWidth;
	var heightConstant = height / c.canHeight;
	
	for(var i=0; i<c.numberOfLayers; i++)
	{
		currentCanvas = canvases[i];
		
		currentCanvas.width = Math.round(width);
		currentCanvas.height = Math.round(height);
		
		canvasContexts[i].scaleLayer(widthConstant, heightConstant);
	}
}

function launchGameFullScreen()
{
	var translationX = c.defaultTranslationX;
	var translationY = c.defaultTranslationY;
	var resizeCanWidth;
	var resizeCanHeight;
	
	clearAllLayers(); // Just in-case
	
	launchElementFullScreen(canvasContainer);
	
	if(o.displayMode=="Full screen")
	{
		var canvasRatio = c.canWidth / c.canHeight;
		var scalingX = c.defaultScalingX;
		var scalingY = c.defaultScalingY;
		
		if(screen.width>screen.height)
		{
			resizeCanWidth = screen.height * canvasRatio;
			resizeCanHeight = screen.height;
		} else if(screen.width<screen.height)
		{
			resizeCanWidth = screen.width;
			resizeCanHeight = screen.width * canvasRatio;
		} else // screen.width==screen.height
		{
			if(c.canWidth>c.canHeight)
			{
				resizeCanWidth = screen.width;
				resizeCanHeight = screen.width * canvasRatio;
			} else
			{
				resizeCanWidth = screen.height * canvasRatio;
				resizeCanHeight = screen.height;
			}
		}
		
		scalingX = resizeCanWidth / c.canWidth;
		scalingY = resizeCanHeight / c.canHeight;
		
		translationX = (screen.width / 2) - c.hCanWidth * scalingX;
		translationY = (screen.height / 2) - c.hCanHeight * scalingY;
		
		resizeCanvases(screen.width, screen.height);
		
		// Not translated/scaled yet!
		fg.fillStyle = "black";
		fg.fillRect(0, 0, screen.width, screen.height); // Fills in the sides of the canvas, just in-case
		
		translateAndScaleLayers(translationX, translationY, scalingX, scalingY);
	} else if(o.displayMode=="Full screen stretched")
	{
		resizeCanWidth = screen.width;
		resizeCanHeight = screen.height;
		
		scalingX = resizeCanWidth / c.canWidth;
		scalingY = resizeCanHeight / c.canHeight;
		
		translationX = c.defaultTranslationX;
		translationY = c.defaultTranslationY;
		
		resizeCanvases(screen.width, screen.height);
		translateAndScaleLayers(translationX, translationY, scalingX, scalingY); // Work on this, Normal -> Stretched bugs!
	}
}

function launchElementFullScreen(element) { // http://davidwalsh.name/fullscreen
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function exitFullScreen() // Based on http://davidwalsh.name/fullscreen
{
	resizeCanvases(c.defaultCanWidth, c.defaultCanHeight);
	restoreLayers();
	
	if(document.exitFullscreen)
	{
		document.exitFullscreen();
	} else if(document.mozCancelFullScreen)
	{
		document.mozCancelFullScreen();
	} else if(document.webkitExitFullscreen)
	{
		document.webkitExitFullscreen();
	}
}