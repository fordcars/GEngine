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

define(function()
{
var exports = {};

exports.Layer = function(canvas, name)
{
	var layer = canvas.getContext("2d");
	var mName = name;
	
	layer.getName = function()
	{
		return mName;
	};
	
	layer.clear = function()
	{
		var canvasCorner = layer.transformPoint(0, 0);console.log(canvasCorner); // ONLY DEBUG PLACE ---- THIS RETURNS UNDEFINED WHYSSS
		var canvasCorner2 = layer.transformPoint(canvas.width, canvas.height);
		var width = canvasCorner2.x - canvasCorner.x;
		var height = canvasCorner2.y - canvasCorner.y;
		
		layer.clearRect(canvasCorner.x, canvasCorner.y, width, height);
	};
	
	layer.fill = function()
	{
		var canvasCorner = layer.transformPoint(0, 0);
		var canvasCorner2 = layer.transformPoint(canvas.width, canvas.height);
		var width = canvasCorner2.x - canvasCorner.x;
		var height = canvasCorner2.y - canvasCorner.y;
		
		layer.fillRect(canvasCorner.x, canvasCorner.y, width, height);
	};
	
	layer.drawCircle = function(x, y, radius, filled)
	{
		this.beginPath();
		this.arc(x, y, radius, 0, Math.TAU, true);
		
		if(filled)
		{
			this.fill();
		} else
		{
			this.stroke();
		}
	};
	
	return layer;
};

return exports;
});