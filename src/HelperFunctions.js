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

exports.randomInt = function(min,max) // Inclusive
{
	return Math.floor(Math.random()*(max-min+1)+min); // http://stackoverflow.com/questions/4959975/generate-random-value-between-two-numbers-in-javascript/7228322#7228322
};

exports.randomFloat = function(min,max) // Inclusive
{
	return parseFloat((Math.random() * (max - min) + min).toFixed(4)); // http://stackoverflow.com/questions/17726753/get-a-random-number-between-0-0200-and-0-120-float-numbers
};

exports.toB2Vec2 = function(point) // Point to Box2D b2Vec2
{
	return new Box2D.Common.Math.b2Vec2(point.x, point.y);
};

return exports;
});