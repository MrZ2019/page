
function _on(cell, eventName) {
	
	var cells = _NERVE[eventName];
	
	if(_und(cells) == true) {
		
		cells = _NERVE[eventName] = [];
		
	}

	cells.push(cell);
	
	return cell;
}

function _emit(eventName) {
	
	var cells = _NERVE[eventName] || [];
	
	for(var iCell = 0; iCell < cells.length; iCell++) {
		
		cells[iCell]();
	}
	
	return cells;
}

/*	参考 JQuery , $ 函数实现一个简单的选择器 */
function $(selectString) {
	
	var keySymbol = selectString[0];
	
	var result;
	
	switch(keySymbol) {
		
		case ".":
		{
			var className = selectString.substr(1);
			
			result = document.getElementsByClassName(className);
		}
		
		break;
		
		case "#":
		{
			var elementID = selectString.substr(1);
			
			result = document.getElementById(elementID);
		}
		
		break;
		
		default:
		{
			var tagName = selectString.substr(1);
			
			result = document.getElementsByTagName(tagName);
		}
		
	}
	
	return result;
}

/*	创建一个元素对象 */ 
function create(tagName, propertys, parent) {
	
	parent = parent || body;
	
	var element = document.createElement(tagName);
	
	for(var propName in propertys) {
		
		var curValue = propertys[propName];
		
		if(_und(curValue) == true) {
			continue;
		}
		
		element[propName] = curValue;
	}
	
	parent.append(element);
	return element;
}

function createList(items, Class, parent, type) {
	
	parent = parent || body;
	
	var listProp =
	{
		"className" : Class
	}
	
	type = type || "ul";
	
	var ListNode = create("ul", listProp, parent);
	
	var curVal, LI;
	var iItem;
	if(_ARR(items) == true) {
		
		for(iItem = 0; iItem < items.length; iItem++) {
			
			curVal = items[iItem];
			LI = li(curVal).appendTo(ListNode);
			LI._INDEX = iItem;
		}
	}
	else if(_obj(items)) {
		
		iItem = 0;
		for(var kItem in items) {
			var curVal = items[kItem];
			
			LI = li(kItem).appendTo(ListNode);
			LI._INDEX = iItem;
			LI._VALUE = curVal;
			
			iItem++;
		}
	}
	
	
	return ListNode;
}

function createNAV(items, opt) {
	
	function DRAW_NAV() {
	
		opt = opt || {};
		
		var Class = "NAV";
		Class += " POINTER";
		var type = opt["type"] || "ul";
		var parent = opt["parent"] || body;
		
		defaultIndex = opt["default"] || 0;
		
		NAV = createList(items, Class, parent, type);
		
		var id = opt["id"];
		if(_und(id) == false) {
			NAV.id = id;
		}
		
		NAV.child[defaultIndex].CLASS += " Selected";	
	}
	
	function SET_VIEW() {
		
		var HavePage = opt["HavePage"] || true;
		var Container = opt["Container"] || body;
		
		if(HavePage == false) {
			return;
		}
		
		var pageCount;
		var idList = [];
		
		if(_ARR(items) == true) {
			pageCount = items.length;
		}
		else {
			pageCount = count(items);
			
			idList = objToArr(items);
		}
		
		
		for(var iPage = 0; iPage < pageCount; iPage++) {
			
			var curView = div("view" + iPage, "NAV_VIEW", idList[iPage]);
			curView.appendTo(Container);
			
			views.push(curView);
		}
		
		views[0].show();
	}
	
	function NEXUS_NAV() {
		
		function NAV_click() {
			
			if(event.tag == "LI") {
								
				selectedITEM.CLASS = "";
				selectedITEM = event.target;
				var _INDEX = selectedITEM._INDEX;
				selectedITEM.CLASS = "Selected";
				
				selectedVIEW.hide();
				selectedVIEW = views[_INDEX];
				selectedVIEW.show();
			}
		}
				
		var LI_list = NAV.child;
		
		var selectedITEM = LI_list[defaultIndex];
		var selectedVIEW = views[defaultIndex];
		
		NAV.click(NAV_click);
		
		//
		NAV.views = views;
	}

	
	var NAV;
	var defaultIndex;
	
	var views = [];
	
	DRAW_NAV();
	SET_VIEW();
	NEXUS_NAV();
	return NAV;
}

