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

define(["Graphics", "Layer", "Input", "Transform"], function(Graphics, Layer, Input, Transform)
{
var exports = {};

exports.Context = function(layerArray, width, height, parent, contextType)
{
	var context = {};
	
	var mLayers = [];
	var mCanvas = [];
	
	var mDefaultLayer;
	var mWidth = width;
	var mHeight = height;
	
	var mGraphics;
	
	var mContainer = document.createElement("div");
	
	context.getCanvas = function()
	{
		return mCanvas;
	};
	
	context.getDefaultLayer = function()
	{
		return mDefaultLayer;
	};
	
	context.getDimensions = function()
	{
		return {width: mWidth, height: mHeight};
	};
	
	context.getGraphics = function()
	{
		return mGraphics;
	};
	
	context.getContainer = function()
	{
		return mContainer;
	};
	
	context.getLayer = function(name)
	{
		var layer;
		
		for(var i=0, length=mLayers.length; i<length; i++)
		{
			layer = mLayers[i];
			
			if(layer.getName()===name)
			{
				return layer;
			}
		}
	};
	
	mContainer.style.width = width + "px";
	mContainer.style.height = height + "px";
	mContainer.style.border = "solid black";
	mContainer.style.position = "absolute";
	mContainer.style.left = 0;
	mContainer.style.top = 0;
	
	for(var i=0, length=layerArray.length; i<length; i++)
	{
		var canvas = new Canvas(width, height, i);
		mCanvas.push(canvas);
		
		var layer = new Layer.Layer(canvas, layerArray[i]); // Adds the layer to the object
		addTransformMethods(layer); // Overload 'native' transform methods
		mLayers[i] = layer;
		
		if(i===0)
		{
			mDefaultLayer = layer;
		}
		
		mContainer.appendChild(canvas);
	}
	
	// Other definitions
	var mGraphics = new Graphics.Graphics(width, height, mDefaultLayer);
	var mInput = new Input.Input(context);
	
	parent.appendChild(mContainer);
	return context;
};

function addTransformMethods(layer) // Overloads native functions!
{
	var transform = new Transform.Transform();
	
	// Save 'native' methods (also useful to keep in the interface)
	layer.nSave = layer.save;
	layer.nRestore = layer.restore;
	layer.nResetTransform = layer.resetTransform;
	layer.nTransform = layer.transform;
	layer.nSetTransform = layer.setTransform;
	layer.nRotate = layer.rotate;
	layer.nTranslate = layer.translate;
	layer.nScale = layer.scale;
	layer.nReset = layer.reset;
	
	// Overloading
	layer.save = function()
	{
		layer.nSave();
		transform.save();
	};
	
	layer.restore = function()
	{
		layer.nRestore();
		transform.restore();
	};
	
	layer.resetTransform = function()
	{
		layer.nResetTransform();
		transform.reset();
	};
	
	layer.transform = function(a, b, c, d, e, f)
	{
		transform.multiply([a, b, c, d, e, f]);
	};
	
	layer.setTransform = function(a, b, c, d, e, f)
	{
		transform.setTransform([a, b, c, d, e, f]);
	};
	
	layer.invert = function()
	{
		transform.invert();
	};
	
	layer.rotate = function(rad)
	{
		layer.nRotate(rad);
		transform.rotate(rad);
	};

	layer.translate = function(x, y)
	{
		layer.nTranslate(x, y);
		transform.translate(x, y);
	};

	layer.scale = function(x, y)
	{
		layer.nScale(x, y);
		transform.scale(x, y);
	};

	layer.transformPoint = function(x, y)
	{
		transform.transformPoint(x, y);
	};
}

function Canvas(width, height, index) // Index is used for zIndex. Set this to whatever you want for single canvases.
{
	var canvas = document.createElement("canvas");

	canvas.style.position = "absolute";
	canvas.style.left = 0;
	canvas.style.top = 0;
	canvas.style.zIndex = index;
	
	canvas.width = width;
	canvas.height = height;
	
	return canvas;
};

return exports;
});