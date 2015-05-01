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

function createMenuButtons()
{
	// Main Menu
	addMenuButton("Play", 200, m.mainMenuButtons, "normal", {defaultValue: "play"});
	addMenuButton("Options", 250, m.mainMenuButtons, "normal", {defaultValue: "options"});
	addMenuButton("Credits", 300, m.mainMenuButtons, "normal", {defaultValue: "credits"});
	
	// Options
	addMenuButton("Display mode", 200, m.optionsButtons, "toggle", {defaultValue: o.displayMode, values: ["Normal", "Full screen", "Full screen stretched"]}); // o.displayMode is the default setting
	addMenuButton("Debug", 250, m.optionsButtons, "boolean", {defaultValue: o.debug}); // DEBUG
	addMenuButton("Save and return", 350, m.optionsButtons, "callback", {defaultValue: saveOptions});
	
	// Credits
	addMenuButton("Back", 550, m.creditsButtons, "normal", {defaultValue: "main"});
	
	// Others
	addMenuButton("Yes", 250, m.confirmFullScreenButtons, "dummy"); // Hack in click handler
	addMenuButton("No", 300, m.confirmFullScreenButtons, "callback", {defaultValue: cancelFullScreenConfirmation});
}

function updateMenuInfo()
{
	if(m.location!=m.oldLocation)
	{
		m.newLocation = true;
		m.oldLocation = m.location;
	} else
	{
		m.newLocation = false;
	}
}

function addMenuButton(buttonName, buttonY, locationArray, buttonType, buttonParameters)
{
	var tempObj = {};
	
	tempObj.name = buttonName;
	tempObj.y = buttonY;
	tempObj.type = buttonType;
	
	if(isDefined(buttonParameters))
	{
		tempObj.parameters = buttonParameters;
		tempObj.value = buttonParameters.defaultValue;
		
		if(tempObj.type=="toggle")
		{
			tempObj.parameters.values = buttonParameters.values;
			tempObj.parameters.valueIndex = 0; // The index of the first value
		}
	}
	
	locationArray.push(tempObj);
}

function handleMenuButtons(layer, menuArray)
{
	var menuLoc = m.location;
	
	var screenCenter = c.hCanWidth
	
	var currentButton;
	var mouseOnButton = false;
	var buttonString;
	var buttonStringLength;
	var halfButtonLength;	
	
	layer.font = c.mainTextFont;
	
	for(var i=0, length=menuArray.length; i<length; i++)
	{
		currentButton = menuArray[i];
		
		mouseOnButton = false;
		
		if(currentButton.type=="boolean") // Button string to display
		{
			var booleanString;
			buttonString = currentButton.name + ": ";
			
			if(currentButton.value)
			{
				booleanString = "True";
			} else
			{
				booleanString = "False";
			}
			
			buttonString = buttonString + booleanString;
		} else if(currentButton.type=="toggle")
		{
			buttonString = currentButton.name + ": " + currentButton.value;
		} else
		{
			buttonString = currentButton.name;
		}
		
		buttonStringLength = layer.measureText(buttonString).width;
		halfButtonLength = buttonStringLength/2;
		
		if(inp.x>screenCenter-halfButtonLength && inp.x<screenCenter+halfButtonLength && inp.y>currentButton.y-m.buttonHeight && inp.y<currentButton.y)
		{
			mouseOnButton = true;
		}
		
		if(mouseOnButton)
		{
			layer.fillStyle = c.selectedButtonColor;
		} else
		{
			layer.fillStyle = c.mainMenuColor;
		}
		
		if(inp.clicked && mouseOnButton) // Handle clicks
		{
			if(currentButton.type=="normal")
			{
				changeMenuLocation(currentButton.value);
			} else if(currentButton.type=="boolean")
			{
				currentButton.value = !currentButton.value;
			} else if(currentButton.type=="toggle")
			{
				var parameters = currentButton.parameters; // parameters is the object containing all the button parameters
				var numberOfValues = parameters.values.length;
				
				if(parameters.valueIndex<numberOfValues-1)
				{
					parameters.valueIndex++;
				} else
				{
					parameters.valueIndex = c.defaultToggleButtonValueIndex;
				}
				
				currentButton.value = parameters.values[parameters.valueIndex];
			} else if(currentButton.type=="callback")
			{
				currentButton.value();
			}
		}
		
		fg.drawCenteredString(buttonString, c.hCanWidth, currentButton.y, buttonStringLength);
	}
}

function changeMenuLocation(locationString)
{
	m.location = locationString;
	m.newLocation = true;
}

function displayLoading(layer)
{
	clearAllLayers();
	
	var textHeight = c.hCanHeight - 20;
	var totalLoadingBarWidth = 400;
	var totalLoadingBarHeight = 20;
	var loadedBarWidth = (totalLoadingBarWidth / c.numberOfResources) * r.resourcesLoaded;
	
	layer.fillStyle = c.mainMenuBackgroundColor;
	layer.fillLayer();
	
	layer.font = c.mainTextFont;
	layer.fillStyle = c.mainMenuColor;
	layer.strokeStyle = c.mainMenuColor;
	
	layer.drawCenteredString("Loading", c.hCanWidth, textHeight);
	
	layer.fillRect(c.hCanWidth-200, c.hCanHeight, loadedBarWidth, totalLoadingBarHeight);
	
	layer.strokeStyle = "white";
	layer.strokeRect(c.hCanWidth-200, c.hCanHeight, totalLoadingBarWidth, totalLoadingBarHeight);
	
	if(checkLoadedResources())
	{
		getTextResourcesData();
		changeMenuLocation("main");
	}
}

function displayMainMenu(layer)
{
	layer.clearLayer();
	
	layer.fillStyle = c.mainMenuBackgroundColor;
	layer.fillLayer();

	layer.font = c.bigTextFont;
	layer.fillStyle = c.mainMenuColor;
	layer.drawCenteredString(c.gameName, c.hCanWidth, 100);
	
	layer.font = c.mainTextFont;
	layer.drawString(c.gameVersion, 550);
	
	handleMenuButtons(layer, m.mainMenuButtons); // Always put this after drawing the menu page
}

function displayOptions(layer)
{
	layer.clearLayer();
	
	layer.fillStyle = c.mainMenuBackgroundColor;
	layer.fillLayer();
	
	layer.font = c.bigTextFont;
	layer.fillStyle = c.mainMenuColor;
	layer.drawCenteredString("Options", c.hCanWidth, 100);
	
	layer.font = c.mainTextFont;
	layer.drawString(c.gameVersion, 550);
	
	handleMenuButtons(layer, m.optionsButtons);
}

function displayCredits(layer)
{
	layer.clearLayer();
	
	var lineY = 0;
	var minLimit = -10;
	var maxLimit = c.defaultCreditsHeight;
	var currentCreditLine;
	var tempString;

	layer.fillStyle = c.mainMenuBackgroundColor;
	layer.fillLayer();
	
	if(m.newLocation)
	{
		m.creditsHeight = c.defaultCreditsHeight;
	}
	
	for(var i=0; i<c.numberOfCredits; i++)
	{
		currentCreditLine = c.credits[i];
		lineY = i * 40 + m.creditsHeight;
		
		if(lineY>minLimit && lineY<maxLimit)
		{
			if(currentCreditLine[0]=="-")
			{
				tempString = c.credits
			
				layer.font = c.bigTextFont;
				layer.fillStyle = "white";
				
				layer.drawCenteredString(currentCreditLine, c.hCanWidth, lineY);
			} else
			{
				layer.font = c.mainTextFont;
				layer.fillStyle = "white";
				
				layer.drawCenteredString(currentCreditLine, c.hCanWidth, lineY);
			}
		}
	}
	
	m.creditsHeight--;
	
	if(lineY<minLimit) // lineY is from the last line of the credits
	{
		changeMenuLocation("main");
	}
	
	layer.fillStyle = c.mainMenuBackgroundColor;
	layer.fillRect(0, c.canHeight-c.creditsVisibleHeight, c.canWidth, c.creditsVisibleHeight); // Covers the lower part of the screen for aesthetics
	
	handleMenuButtons(layer, m.creditsButtons);
}

function displayConfirmFullScreen(layer)
{
	layer.clearLayer();
	
	layer.fillStyle = c.mainMenuBackgroundColor;
	layer.fillLayer();
	
	layer.fillStyle = c.mainMenuColor;	
	layer.drawCenteredString("Confirm full screen?", c.hCanWidth, 200);
	
	handleMenuButtons(layer, m.confirmFullScreenButtons);
}

function saveOptions() // Why does the screen flash when this runs?
{
	o.displayMode = m.optionsButtons[0].value;
	o.debug = m.optionsButtons[1].value;
	
	if(o.displayMode!="Normal")
	{
		changeMenuLocation("confirmFullScreen");
	} else
	{
		exitFullScreen();
		changeMenuLocation("main");
	}
}

function cancelFullScreenConfirmation()
{
	var displayModeOptionsButton = m.optionsButtons[0];
	
	displayModeOptionsButton.value = displayModeOptionsButton.parameters.defaultValue; // Default value
	displayModeOptionsButton.parameters.valueIndex = c.defaultToggleButtonValueIndex; // Put's it back to it's original states
	
	o.fullScreen = false;
	
	changeMenuLocation("main");
}