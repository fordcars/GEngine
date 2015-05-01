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

// Box2D Wrapper - this classifies Box2D and removes the use of the global (but is still there and vital (for now)!)

define(function()
{
var exports = {};

exports.b2Vec2 = Box2D.Common.Math.b2Vec2;
exports.b2BodyDef = Box2D.Dynamics.b2BodyDef;
exports.b2Body = Box2D.Dynamics.b2Body;
exports.b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
exports.b2Fixture = Box2D.Dynamics.b2Fixture;
exports.b2World = Box2D.Dynamics.b2World;
exports.b2MassData = Box2D.Collision.Shapes.b2MassData;
exports.b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
exports.b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
exports.b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

return exports;
});