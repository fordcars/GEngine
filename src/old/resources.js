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

function getResourceConstructorFromName(resourceName)
{
	return getObjectFromName(r.resourceConstructors, resourceName);
}

function getResourceFromName(resourceName)
{
	var currentResource;
	
	for(var i=0, length=r.resourceArray.length; i<length; i++)
	{
		currentResource = r.resourceArray[i];
		
		if(currentResource.name==resourceName)
		{
			return currentResource;
		}
	}
}

function createResources(resourcesToCreate)
{
	var resources = [];
	var currentResource;
	var resourceToPush;
	
	for(var i=0, length=resourcesToCreate.length; i<length; i++)
	{
		currentResource = resourcesToCreate[i];
		
		resourceToPush = createResource(currentResource);
		resources.push(resourceToPush);
	}
	
	return resources;
}

function createResource(resourceToCreate)
{
	var resource = {};
	
	resource.type = resourceToCreate.type;
	resource.name = resourceToCreate.name;
	resource.path = resourceToCreate.path;
	
	resource.data; // Loaded resource will be here
	
	return resource;
}

function loadResources(resourcesArray) // Works because objects in javascript are passed by reference!
{
	var currentResource;
	var currentResourceFullPath; // The resource starts loading when its source (src) is set to this
	var currentResourceData;
	
	for(var i=0; i<c.numberOfResources; i++)
	{
		currentResource = resourcesArray[i];
		currentResourceFullPath = c.resourcesPath + currentResource.path;
		
		switch(currentResource.type)
		{
			case "image":
				currentResourceData = new Image();
				break; // Breaks out of switch only! Stays in for loop
			
			case "level":
				currentResourceData = createTextResourceData();
				break;
				
			default:
				currentResourceData = {};
				break;
				
		}
		
		currentResourceData.src = currentResourceFullPath; // Starts loading
		
		currentResourceData.addEventListener("load", function(){resourceLoaded();}, false); // Resource will not load instantly, so listen to the load event
		currentResource.data = currentResourceData;
	}
}

function resourceLoaded()
{
	r.resourcesLoaded++;
}

function checkLoadedResources()
{
	if(r.resourcesLoaded>=c.numberOfResources)
	{
		return true;
	} else
	{
		return false;
	}
}

function createTextResourceData()
{
	var textResourceData = document.createElement("iframe"); // http://stackoverflow.com/questions/4533018/how-to-read-a-text-file-from-server-using-javascript
	
	textResourceData.isText = true; // Useful flag. In other resource types, this flag is not defined.
	textResourceData.getText = function()
	{
		return this.contentWindow.document.body.childNodes[0].innerHTML;
	}
	
	textResourceData.style.display = "none";
	document.body.appendChild(textResourceData);
	
	return textResourceData;
}

function getTextResourcesData() // Sets the data parameter of all text resources to the resource's text
{
	var currentResource;
	
	for(var i=0, length=r.resourceArray.length; i<length; i++)
	{
		currentResource = r.resourceArray[i]; // Objects passed by reference!
		
		if(currentResource.data.isText)
		{
			currentResource.data = currentResource.data.getText();
		}
	}
}