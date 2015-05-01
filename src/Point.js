// GEngine
// Copyright © 2015 Carl Hewett

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