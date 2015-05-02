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
exports.b2AABB = Box2D.Collision.b2AABB;
exports.b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
exports.b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
exports.b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

return exports;
});