
function _batch(flag, opt) {
	
	var operator = opt[0];
	
	var Params;
	var PROTO;
	var api, apiName;
	
	switch(flag) {
		
	case "LOOP_ARRAY": 
	{
	//
	var batchArr = opt[1];
	
	for(var iVal = 0; iVal < batchArr.length; iVal++) {
		
		var curVal = batchArr[iVal];
		
		switch(operator) {
			
		case "ARRAY_EXTEND":
		{
			PROTO = opt[2];
			
			api = curVal;
			apiName = api.name;
			
			Params = [ operator, api];
			PROTO[apiName] = returnGENERALFunction(Params, operator);
		}
		break;
					
		case "DOCUMENT_EXTEND":
		{
			PROTO = opt[2];
			
			var api = curVal;
			apiName = api.name;
			
			operator = "HTML_EXTEND";
			Params = [ api];
			PROTO[apiName] =returnGENERALFunction(Params, operator);
		}
		
		}
		}
	}
	
	case "LOOP_MAP":	//Map
	{
		var batchMap = opt[1];
		
		for(var kName in batchMap) {
			
			var curVal = batchMap[kName];
			
			switch(operator) {
				
			case "HTML_SHORT":
			{
				Params = [ curVal ];
				opt[2][kName] = returnGENERALFunction(Params, operator);
			}
			
			}
		}
	}
	
	}
}

function returnGENERALFunction(param, plan) {
	
	
	function GENERALFunction() {
		
		var argArray;
		var result;
		
		switch(plan) {
		
		case "ARRAY_EXTEND":
		{
			var arrVal = arguments[0];
			var arrapi = param[1];
			
			result = arrapi(this, arrVal);
		}
		break;
		
		case "QUICK_EVENT":
		{
			
			var callback = arguments[0];
			var eventType = param[0];
			
			argArray = [ callback, eventType, this ];
			
			result = bind.apply(null, argArray);
		}
		break;
		
		case "HTML_SHORT":
		{
			var propValue = arguments[0];
			var propName = param[0];
			
			if(_und(propValue) == true) {
				result = this[propName];
			}
			else {
				this[propName] = propValue;
				
				result = this;
			}
		}
		break;
		
		case "HTML_EXTEND": 
		{
			var htmlapi = param[0];
			
			var args = argToArr();
			args.unshift(this);
									
			result = htmlapi.apply(null, args);		
		}
		break;
		
		case "NATIVE_CLASS_CHECK":
		{
			var Class = param[0];
			var nativeapi = param[1];
			
			var checkObject = arguments[0];
			
			result = nativeapi(checkObject, Class);
		}
		break;
		
		case "QUICK_CSS":
		{
			var cssProp = param[0];
			var cssValue = arguments[0];
			
		
			result = this.css(cssProp, cssValue);

		}
		break;
		
		case "INTEGER_MARK":
		{
			var markAPI = param[0];
			var markIndex =param[1];
			
			result = markAPI(markIndex);
		}
	}
	
	return result;
	}
	
	return GENERALFunction;
}

function SETUPEnvironment() {
	//
	var browserName;
	var appName = navigator.appName;
	var appVersion = navigator.appVersion;
		
	if(appName.match(/Netscape/)) {
		
		if(appVersion.match(/Chrome/)) {
			
			browserName = "chrome";
			_ENV["chrome"] = true;
		}
		else if(appVersion.match(/Dreamweaver/)) {
			
			browserName = "dreamweaver";
			_ENV["Dreamweaver"] = 1;
		}
		else {
			browserName = appName;
			_ENV["firefox"] = 1;
		}
	}
	else if(appName.match(/Microsoft/)) {
		browserName = "ie";
		
		_ENV["ie"] = 1;
	}
	else {
		browserName = appName;
	}
	
	_ENV["browser"] = browserName;
}

function SETUPTypeCheckAPI() {
	
	function returnTypeCheckAPI(typeName) {
		
		function NORMALTypeCheckAPI(object) {
			
			var type = typeof(object);
			
			return (type == typeName);
		}
		
		return NORMALTypeCheckAPI;
	}
	var typelist = [ "boolean", "number", "string", "object", "function", "null", "undefined" ];
	
	for(var index = 0; index < typelist.length;index++) {
		
		var cur = typelist[index];
		var shortName = cur.substring(0,3);
		
		window["_" + shortName] = returnTypeCheckAPI(cur);
	}
	
	//	
	function NORMALNativeClassCheck(object, Class) {
		return (object instanceof Class);
	}
	
	var nativeMap =
	{
		"_ARR" : Array,
		"_HTMLNODE" : HTMLElement,
		"_NODELIST" : NodeList,
		"_COLLECT" : HTMLCollection
	}
	
	for(var kNative in nativeMap) {
		
		var curClass = nativeMap[kNative];
		
		var params = [ curClass, NORMALNativeClassCheck ];
		window[kNative] = returnGENERALFunction(params, "NATIVE_CLASS_CHECK");
	}
	
	//
	function _numStr(string) {
		
		var result = string.match(/^(([\d])|([\d]+\.)|(\.))+([\d]*)$/)
		
		return Boolean(result);
	}
	
	window["_numStr"] = _numStr;
}

/*	生成若干 HTML对象创建函数	*/
function addHTMLQuickCreator() {
	
	function returnHTMLQuickCreator(tagName) {
		
		function NORMALHTMLCreator() {
			
			var element;
			var props = {};
			
			var curMap = tagMap[tagName];
			for(var i = 0; i < arguments.length; i++) {
				var propName = curMap[i];
				var propValue = arguments[i];
				
				if(_und(propValue) == true) {
					continue;
				}
				props[propName] = propValue; 
			}
			
			element = create(tagName, props);
			
			return element;
		}
		                                                                                                                                                                                
		return NORMALHTMLCreator;
	}
	var tagMap =
	{
		"div" : [ "innerHTML", "className", "id"],
		"span" : [ "innerHTML", "className", "id"],
		"p" : [ "innerHTML", "className" ],
		
		"ul" : [ "className", "id" ],
		"li" : [ "innerHTML", "className"  ],          
		"br" : [],
		
		"style" : [ "innerHTML", "id" ]
	}
	
	for(var key in tagMap) {
		
		window[key] = returnHTMLQuickCreator(key);
	}
	
	//
	function STYLE(code, id) {
		
		var props = 
		{
			"id" : id,
			"innerHTML" : code
		}
		var styleNode = create("style", props, head);
		
		return styleNode;
	}
	
	var creatorSrc = [ STYLE ];
	
	relate(creatorSrc);
}

function extendBasic() {
	
	var opt;
	
	function check(array, value) {
		
		var isFind = false;
		
		for(var iArr = 0; iArr < array.length; iArr++) {
			
			var curVal = array[iArr];
			
			if(curVal == value) {
				isFind = true;
				break;
			}
		}
		
		return isFind;
	}
	
	function each(array, callback, args) {
		
		for(var iArr = 0; iArr < array.length; iArr++) {
			
			var curVal = array[iArr];
			args.unshift(curVal);
			
			callback.apply(null, args);
		}
		
		return array;
	}
	
	var arrList = [ check, each ];
	opt = 
	[ "ARRAY_EXTEND" ,arrList, Array.prototype ];
	
	_batch("LOOP_ARRAY", opt);
	
	//	event
	var EventProto = Event.prototype;
	
	quickDefine("tag", "this.target.tagName", EventProto);
}


function returnDefineFunction(type, arg2) {
	
	function NORMALGetter() {
		
		return this[arg2];
	}
	
	function NORMALSetter(value) {
		
		this[arg2] = value;
	}
	
	if(type == "get") {
		
		return NORMALGetter;
	}
	else {
		
		return NORMALSetter;
	}
}


//	HTML 对象扩展

function extendHTMLDOM() {
	
	var opt;
	var list;
	//	document
	
	var DOCProto = Document.prototype;
	
	function tags(node, tag) {
		
		return node.getElementsByTagName(tag);
	}
	list = [ tags ];
	opt = [ "DOCUMENT_EXTEND", list, DOCProto];
	_batch("LOOP_ARRAY", opt);
	//	原有方法
	var shortAPIMap =
	{
		"append" : "appendChild",
		"insert" : "insertBefore",
		"remove" : "removeChild",
		"replace" : "replaceChild",
	}
	
	var ElementProto = HTMLElement.prototype;
	
	for(var memberName in shortAPIMap) {
		
		var curMember = shortAPIMap[memberName];
		
		ElementProto[memberName] = ElementProto[curMember];
	}
	
	//	自定义方法
	function appendTo(node, parent) {
		
		parent = parent || body;
		return parent.appendChild(node);
	}
	
	function kill(node) {
		
		var parent = node.parentElement;
		return parent.removeChild(node);
	}
	
	function clear(node) {
		
		var firstChild = node.firstChild;
		
		var curChild = firstChild;
		var nextNode;
		while(curChild) {
			nextNode = curChild.nextSibling;
			node.removeChild(curChild);
			curChild = nextNode;
		}
		
		return node;
	}
	
	function moveTo(node, ref, pos) {
		
		pos = pos || "before";
		
		var parent;
		var reVal;
		
		switch(pos) {
			
			case "first":
			{
				parent = ref;
				
				var firstChild = parent;
				
				if(_und(firstChild) == true) {
					reVal = parent.append(firstChild);
				}
				else {
					reVal = parent.insert(node, firstChild);
				}
			}
			break;
			
			case "before":
			{
				parent = ref.parent;
				reVal = parent.insert(node, ref);
			}
			break;
			
			case "after":
			{
				parent = ref.parent;
				
				var nextSib = ref.nextSibling;
				
				if(_und(nextSib) == true) {
					reVal = parent.append(node);
				}
				else {
					reVal = parent.insert(node, nextSib);
				}
			}
		}
		
		return reVal;
	}
	//	属性值
	function attr(node, attrName, attrValue) {
		var returnValue;
		
		if(_und(attrValue) == 1) {
			
			returnValue = node.getAttribute(attrName);
		}
		else {
			node.setAttribute(attrName);
			returnValue = node;	
		}
		
		return returnValue;
	}
	
	function css(node, arg1, arg2) {
		
		function decideValue() {
			
			var reValue;
			
			var dimensionList =
			[
			"width", "height", "top", "left", "right", "bottom", "fontSize" ];
			
			var bCut = false;
			var bDimen = dimensionList.check(propName);
			
			if(operator == "BOTH") {
				
				if(_boo(arg2) == true) {
					operator = "READ";
					
					bCut = arg2;
				}
				else {
					operator = "WRITE";
				}
			}
			
			if(operator == "READ"){
				propValue = styleOBJ[propName];
				
				if(bDimen == true) {
					if(bCut && arg2) {
						propValue = propValue.replace(/[A-z]/g, "");
						propValue = parseInt(propValue);
						
						if(propValue.toString() == "NaN") {
							propValue = 0;
						}
						
					}
				}
				
				reValue = propValue;
			}
			else if(operator == "WRITE") {
				
				if(bOBJ == true) {
					propValue = propObject[propName];
					reValue = propValue;				
				}
				else {
					reValue = arg2;
				}
								
				if(bDimen && (_num(reValue) || _numStr(reValue) )) {
					reValue += "px";
				}
				
			}
					
			return reValue;
		}
		var returnValue;
		
		var propObject;
		var propName, propValue;
		var styleOBJ = getComputedStyle(node);
		
		var operator;
		var bOBJ = false;
		
		if(_ARR(arg1) == 1) {
			
			operator = "READ";
			var propList = arg1;
			propObject = {};
			
			for(var iProp = 0; iProp < propList.length;iProp++) {
				propName = propList[iProp];
				propValue = decideValue();
				
				propObject[propName] = propValue;
			}
			
			returnValue = propObject;
		}
		else if(_obj(arg1) == 1) {
			
			operator = "WRITE"
			propObject = arg1;
			bOBJ = true;
			for(var kProp in propObject) {
				
				propName = kProp;
				propValue = decideValue();
				
				node.style[kProp] = propValue;
			}
			
			returnValue = node;
		}
		else {
			propName = arg1;
			propValue = arg2;
			
			if(_und(propValue) == 1) {
				
				returnValue = styleOBJ[propName];
			}
			else {
				operator = "BOTH";
				returnValue = decideValue();
				
				if(_str(returnValue) == true) {
					
					node.style[propName] = returnValue;
				}
			}		
		}
		
		return returnValue;
	}
	
	//	切换显示
	function toggle(node) {
		
		var cssVal;
		
		cssVal = node.disp();

		if(cssVal == "none") {
			
			var _preVal = node._PRE_DISPLAY;
			if(_und(_preVal) == true) {
				cssVal = "block";
			}
			else {
				cssVal = _preVal;
			}
			
			node.disp(cssVal);
		}
		else {
			node._PRE_DISPLAY = cssVal;
			node.disp("none");
		}
		
		return node;
	}
	
	//
	function show(node) {
		
		var _pre_disp = node._PRE_DISPLAY;
		
		if(_und(_pre_disp) == true) {
			node.disp("block");
		}
		else {
			node.disp(_pre_disp);
		}
		
		return node;
	}
	
	function hide(node) {
		
		var disp = node.disp();
		
		if(disp !== "none") {
			node._PRE_DISPLAY = disp;
		}
		
		node.disp("none");
	}
	
	//
	function loadCode(node, source, type) {
		
		type = type || "DOM";
		
		switch(type) {
			
			case "DOM":
			{
				if(_str(source) == true) {
					source = $(source);
				}
	
				node.HTML = source.HTML;
			}
			break;
			
			case "DOM_LIST":
			{
				
				for(var iDom = 0; iDom < source.length; iDom++) {
					
					var curDOM = source[iDom];
					
					node.HTML += curDom.HTML;
				}
			}
		}
		
		return node;
	}
	var extendAPI = 
	[ appendTo, kill, clear,
	  attr, 
	  css, toggle, show, hide, 
	  loadCode ];
	
	for(var iExtend = 0; iExtend < extendAPI.length; iExtend++) {
		
		var curMethod = extendAPI[iExtend];
		var methodName = curMethod.name;
		
		var params = [ curMethod ];
		
		ElementProto[methodName] = returnGENERALFunction(params, "HTML_EXTEND");
	}
	//
	var shortDefMap =
	{
		"type" : "nodeType",
		"value" : "nodeValue",
		
		"parent" : "parentElement",
		"child" : "children",
		"first" : "firstChild",
		"last" : "lastChild",
		"pre" : "previousSibling",
		"next" : "nextSibling",
		
		"HTML" : "innerHTML",
		"TXT" : "innerText",
		"CLASS" : "className"
	}
	
	for(var kProp in shortDefMap) {
		
		var curProp = shortDefMap[kProp];
		
		var propGetter = returnDefineFunction("get", curProp);
		var propSetter = returnDefineFunction("set", curProp);
		
		define(kProp, propGetter, propSetter, ElementProto);
	}
	
	var shortPropMap =
	{
		"html" : "innerHTML",
		"txt" : "innerText",
		"Class" : "className"
	}
	
	opt = [ "HTML_SHORT", shortPropMap, ElementProto ];
	_batch("LOOP_MAP", opt);
	//	事件
	var eventArray = 
	[ "click", "mousedown", "mouseup", "mousemove", "mouseover",
	"mouseout" ];
	
	for(var iEvent = 0; iEvent < eventArray.length;iEvent++) {
		
		var curEvent = eventArray[iEvent];
		var eventParam = [ curEvent ];
		
		ElementProto[curEvent] = returnGENERALFunction(eventParam, "QUICK_EVENT");
	}
	
	ElementProto.bind = 
	function(callback, type, useCapture) {
		return bind(callback, type, this, useCapture);
	}
	
	ElementProto.unbind = 
	
	function(callback, type, useCapture) {
		return unbind(callback, type, this, useCapture);
	}
	
	//	样式
	var cssMap = 
	{
		"color" : "color",
		"bg" : "background",
		"disp" : "display",
		
		"fsize" : "fontSize",
		
		"width" : "width",
		"height" : "height",
		"pos" : "position",
		"pad" : "padding",
		"margin" : "margin",
		"y" : "top",
		"x" : "left",
		"bot" : "bottom",
		"rig" : "right",
		
		"opa" : "opacity",
		"border" : "border",
	}
	
	for(var kCSS in cssMap) {
		
		var curValue = cssMap[kCSS];
		
		var cssParam = [ curValue ];
		ElementProto[kCSS] = returnGENERALFunction(cssParam, "QUICK_CSS");
	}
	
	_DOM["extended"] = true;
}