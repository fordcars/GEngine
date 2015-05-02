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

exports.Point = function(x, y) // Doesn't have any getters/setters - access members directly
{
	var point = {};
	
	// Default values
	point.x = typeof x !== "undefined" ? x : 0;
	point.y = typeof y !== "undefined" ? y : 0;
	
	point.copy = function()
	{
		return new exports.Point(point.x, point.y);
	};
	
	point.distanceSquared = function(otherPoint)
	{
		var dX = otherPoint.x - point.x;
		var dY = otherPoint.y - point.y;
		
		return (dX * dX) + (dY * dY);
	};
	
	point.distanceTo = function(otherPoint)
	{
		var dX = otherPoint.x - point.x;
		var dY = otherPoint.y - point.y;
		
		return Math.sqrt((dX * dX) + (dY * dY));
	};
	
	// Arithmetic
	point.add = function(otherPoint)
	{
		point.x += otherPoint.x;
		point.y += otherPoint.y;
	};
	
	point.sub = function(otherPoint)
	{
		point.x -= otherPoint.x;
		point.y -= otherPoint.y;
	};
	
	point.mul = function(otherPoint)
	{
		point.x *= otherPoint.x;
		point.y *= otherPoint.y;
	};
	
	point.div = function(otherPoint)
	{
		point.x /= otherPoint.x;
		point.y /= otherPoint.y;
	};
	
	return point;
};

return exports;
});