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

window.onload = main;

// All evil globals defined here
var fg; // Layer 1 (The top layer)
var bg; // Layer 2

var canvasContainer;
var canvases = [];
var canvasContexts = [];
var mainCanvas;
var mainCanvasContext;

// "Namespaces"
var gr = {}; // Graphics. Game and graphics both start with g
var r = {}; // Resources
var a = {}; // Animations
var inp = {}; // Input. i is used in for loops, in is a reserved word, doh! Use inp
var m = {}; // Menu
var o = {}; // Options
var ga = {}; // Game. Game and graphics both start with g
var l = {}; // Levels
var c = {}; // Constants

function definitions() // Has access to other functions, since this is after function definitions.
{
	// Resources
	r.resourceConstructors = [
		{type: "image", name: "tree01", path: "tree/tree01.jpg"},
		{type: "image", name: "tree02", path: "tree/tree02.jpg"},
		{type: "image", name: "man01", path: "man/man01.jpg"},
		{type: "image", name: "man02", path: "man/man02.jpg"},
		{type: "level", name: "GrassLand", path: "levels/GrassLand.txt"}]; // Text resources *have* to be .txt
	
	r.resourceArray = createResources(r.resourceConstructors); // Creates an array of resource objects
	r.resourcesLoaded = 0;
	
	// Animations
	a.animationSpriteContructors = [
		{name: "tree", frames: ["tree01", "tree02"], delay: 15, randomStart: true},
		{name: "man", frames: ["man01", "man02"], delay: 10, randomStart: true}];
	
	// Input
	inp.x = 0;
	inp.y = 0;
	inp.clickBuffer = false;
	inp.clicked = false; // Updated each frame. Use this! (inp.clicked = checkForClick() each frame)
	
	inp.lastMouseMoveTime = 0;
	
	inp.keys = [];
	
	inp.up = newInputKey(38); // In javascript, objects get passed by reference
	inp.down = newInputKey(40);
	inp.left = newInputKey(37);
	inp.right = newInputKey(39);

	// Menu
	m.mainMenuButtons = [];
	m.optionsButtons = [];
	m.creditsButtons = [];
	m.confirmFullScreenButtons = [];
	
	m.location = "loading";
	m.oldLocation = "";
	m.newLocation = true; // Is true when this is the first frame since m.location changed
	m.buttonHeight = 20;

	m.creditsHeight = 0;
	
	// Options
	o.displayMode = "Normal"; // Default settings defined here
	o.debug = false;
	
	// Game
	ga.firstFrame = true;
	ga.uiLocation = "game";
	
	// Levels
	l.levels = getLevels(r.resourceArray); // Gets all levels, in order (the order they are loaded, in r.resourceConstructors)
	l.currentLevelIndex = 0;
	l.currentLevel;
	
	// Constants
	c.gameName = "Wind";
	c.gameVersion = "0.1";
	c.numberOfLayers = 2;
	c.defaultCanWidth = 800;
	c.defaultCanHeight = 600;
	c.canWidth = c.defaultCanWidth;
	c.canHeight = c.defaultCanHeight;
	c.hCanWidth = c.defaultCanWidth / 2;
	c.hCanHeight = c.defaultCanHeight / 2;
	
	c.numberOfResources = r.resourceArray.length;
	c.resourcesPath = "resources/"; // Used in loadResources()
	
	c.defaultTranslationX = 0;
	c.defaultTranslationY = 0;
	c.defaultScalingX = 1;
	c.defaultScalingY = 1;

	c.mainTextFont = "20pt Courier New";
	c.mainTextHeight = 20;
	c.bigTextFont = "30pt Courier New";
	c.bigTextHeight = 30;
	c.mainMenuColor = "rgb(65, 125, 130)";
	c.mainMenuBackgroundColor = "black";
	c.selectedButtonColor = "white";
	
	c.credits = ["-PROGRAMMING-", "Carl Hewett", "", "-SPECIAL THANKS TO-", "Me"] // '-' are used to indicate titles
	c.numberOfCredits = c.credits.length;
	c.creditsVisibleHeight = 80;
	c.defaultCreditsHeight = c.defaultCanHeight - c.creditsVisibleHeight + c.bigTextHeight + 5;
	
	c.numberOfInputKeys = inp.keys.length;
	c.mouseMoveThrottle = 1; // The smaller the more precise (at the cost of CPU)
	c.defaultToggleButtonValueIndex = 0;
	
	c.lineEndings = "\n"; // All line endings in levels are set to this
}

function main()
{
	var currentCanvas;
	var currentCanvasContext;
	
	definitions();

	(function() // requestAnimationFrame polyfill by Erik Möller. Fixed by Paul Irish and Tino Zijdel, https://gist.github.com/paulirish/1579671, MIT license
	{
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
				window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
					|| window[vendors[x]+'CancelRequestAnimationFrame'];
		}

		if (!window.requestAnimationFrame)
			window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
				timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

		if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
	}());
	
	setupElements(document.body);
	createMenuButtons();
	
	loadResources(r.resourceArray); // Starts loading resources
	
	window.requestAnimationFrame(update);
}

function setupElements(parent)
{
	canvasContainer = document.createElement("div");
	parent.appendChild(canvasContainer);
	
	for(var i=c.numberOfLayers-1; i>=0; i--)
	{
		currentCanvas = document.createElement("canvas");

		currentCanvas.style.position = "absolute";
		currentCanvas.style.left = 0;
		currentCanvas.style.top = 0;
		currentCanvas.style.zIndex = i;
		
		currentCanvas.width = c.defaultCanWidth;
		currentCanvas.height = c.defaultCanHeight;
		
		canvases.push(currentCanvas);
		
		currentCanvasContext = currentCanvas.getContext("2d");
		
		currentCanvasContext.save(); // For restoring when scaling
		addGraphicMembers(currentCanvasContext); // In graphics.js
		
		canvasContexts.push(currentCanvasContext);
		
		canvasContainer.appendChild(currentCanvas);
	}

	mainCanvas = canvases[0];
	mainCanvasContext = canvasContexts[0];
	
	fg = canvasContexts[0];
	bg = canvasContexts[1];
	
	addEventListeners(); // In input.js
}

function update()
{
	window.requestAnimationFrame(update);
	
	var menuLoc = m.location;
	
	inp.clicked = checkForClick();
	
	if(!ga.firstFrame && ga.uiLocation=="game") // Optimization
	{
		displayGame();
		
		return;
	}
	
	updateMenuInfo();
	
	if(menuLoc=="loading")
	{
		displayLoading(fg);
	} else if(menuLoc=="main")
	{
		displayMainMenu(fg);
	} else if(menuLoc=="options")
	{
		displayOptions(fg);
	} else if(menuLoc=="credits")
	{
		displayCredits(fg);
	} else if(menuLoc=="confirmFullScreen")
	{
		displayConfirmFullScreen(fg);
	}
}