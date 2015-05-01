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

var tau = Math.PI * 2;

exports.drawCenteredString = function(layer, string, x, y, stringLength)
{
	var halfStringLength;
	
	if(stringLength!=null)
	{
		halfStringLength = stringLength / 2;
	} else
	{
		halfStringLength = layer.measureText(string).width / 2;
	}
	
	layer.fillText(string, x - halfStringLength, y);
};

exports.drawCircle = function(layer, x, y, radius, filled)
{
	layer.beginPath();
	layer.arc(x, y, radius, 0, tau, true);
	
	if(filled)
	{
		layer.fill();
	} else
	{
		layer.stroke();
	}
};

exports.getCirclePath = function(layer, x, y, radius)
{
	layer.arc(x, y, radius, 0, tau, true);
};

return exports;
});