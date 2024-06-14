

function defineHTMLThings() {
	
	//	导入大量的 对象到当前空间
	var _supportOption = { "PrimaryManagerSupport" : 1 };
	eval(_support([ "seed" ], _supportOption));
	
	var HTMLThings = new Object();
	startObjectCounter(HTMLThings);
	
	/*	关联一个数组或对象的所有成员 到 HTMLThings */
	function relateToHTML(source) {
		
		if(isArray(source) == true) {
			relateFromArray(HTMLThings, source);
			
		}
		else if(isObject(source == true)) {
			relateFromMap(HTMLThings, source);
		}
	}
	//	HTMLObjects1
	var DefaultNexusOption =
	{
		"UseCapture" : false,
		"DefaultEventType" : "click",
		
		"DefaultProcessor" :
		function() {
			var noticeText;
			
			noticeText = event.type + " occured on " + event.target;
			
			println(noticeText, "Event");
		},
		
		"DefaultTraceProcessor" :
		function() {
			var remindText;
			
			remindText = "The " + event.type + " incident happened on the " + 
			event.target + ", and processor is tracing."
			
			println(remindText, "Event");
		}
	}
	
	var QuickHTMLPropertyOrder = [ "className", "id", "innerHTML", "innerText" ];
	
	//	Node 类型的 简写属性地图
	var XMLNodeOptimizePropertyMap =
	{
		//"name" : "nodeName",	//	节点名称 (name 属性已定义)
		"type" : "nodeType",	//	节点类型
		"value" : "nodeValue",	//	节点值
		
		"text" : "textContent",	//	文本内容
		
		"first" : "firstChild",	//	第一个子节点
		"last" : "lastChild",	//	最后一个节点
		"childs" : "childNodes",	//	所有子节点
		"parent" : "parentNode",	//	父节点
		"pre" : "previousSibling",	//	前一个相邻节点
		"next" : "nextSibling",	//	后一个相邻节点
	}
	

	var XMLNodeExtendFunctionList =
	[ removeAllChilds, deleteSelf, appendToNode, wrapNode, addPreviousSibling, 
	addNextSibling, moveToBefore, moveToAfter, moveToFirst, moveToLast, insertAfter,
	replaceSelfByNode, replaceToNode, swapNode, attribute ];
	
	/*	Node 原型函数的 名字简化地图 */
	var XMLNodeOptimizeFunctionMap =
	{
		"append" : "appendChild",	//	附加子节点
		"cut" : "removeChild",	//	删除子节点
		"remove" : "removeChild",
		"insert" : "insertBefore",	//	插入子节点
		"clone" : "cloneNode",
		"replace" : "replaceChild",
		
		"hasAttrs" : "hasAttributes",
		"hasChild" : "hasChildNodes",
	}	
	
	/*	Node 自定义扩展函数的 简写映射 */
	var XMLNodeOptimizeCustomizeMap = 
	{
		"appendTo" : appendToNode,	//	附加当前节点至目标节点
		"depend" : appendToNode,
		"kill" : deleteSelf,	//	删除当前节点
		"wrap" : wrapNode,	//	" 围绕 " 目标节点
		"clear" : removeAllChilds,	//	删除所有 子节点
		"before" : addPreviousSibling,	//	在当前节点之前添加 相邻节点
		"after" : addNextSibling,	//	在当前节点之后添加		相邻节点
		"beforeTo" : moveToBefore,	//	移动当前节点至目标节点之前
		"preTo" : moveToBefore,
		"afterTo" : moveToAfter,	//	移动当前节点至目标节点之后
		"nextTo" : moveToAfter,
		
		"toFirst" : moveToFirst,	//	移动当前节点至目标父节点的第一个子节点
		"toLast" : moveToLast,	//	移动当前节点至目标节点的最后一个子节点
		"replaceBy" : replaceSelfByNode,
		"replaceTo" : replaceToNode,
		"swap" : swapNode,
		
		"attr" : attribute
	}
	
	var DefaultNodeShortDefineOption =
	{
		"enumerable" : 0
	}
	
	var HTMLObjects1 = 
	{
		"DefaultNexusOption" : DefaultNexusOption,
		
		"QuickHTMLPropertyOrder" : QuickHTMLPropertyOrder,
		
		"XMLNodeExtendFunctionLIst" : XMLNodeExtendFunctionList,
		
		"XMLNodeOptimizePropertyMap" : XMLNodeOptimizePropertyMap,
		
		"XMLNodeOptimizeFunctionMap" : XMLNodeOptimizeFunctionMap,
		
		"XMLNodeOptimizeCustomizeMap" : XMLNodeOptimizeCustomizeMap,
		
		"DefaultNodeShortDefineOption" : DefaultNodeShortDefineOption
	}
	relateToHTML(HTMLObjects1);
	
	//	HTMLObjects2
	
	var XMLElementOptimizePropertyMap = 
	{
		"attrs" : "attributes",
		"tag" : "tagName"
	}
	
	var XMLElementOptimizeFunctionMap = 
	{
		"nodesByTag" : "getElementsByTagName"
	}
	
	var XMLElementOptimizeCustomizeMap =
	{
		"tags" : "getElementsByTagName"
	}
	
	//	HTMLElement 原型函数扩展列表 
	var	HTMLElementExtendFunctionList =
	[ checkElementClass, addElementClass, removeElementClass, getElementStyle, setElementStyle, css, toggleNode, showNode, hideNode, animateElement, nexusElement, disnexusElement, nexusElementAndTrace ];
	
	//	HTMLElement 简写属性 描述对象
	var HTMLElementOptimizePropertyMap =
	{
		"html" : "innerHTML",	
		"txt" : "innerText",
		"Class" : "className",
	}
	
	//	为 HTMLElement 声明新属性里使用的默认选项
	var DefaultHTMLElementShortDefineOption = 
	{
		"enumerable" : 0
	}
	
	//	HTMLElement 原型函数简写
	var HTMLElementOptimizeFunctionMap =
	{
		"addListen" : "addEventListener",
		"cutListen" : "removeEventListener",
		
		"getAttr" : "getAttribute",
		"setAttr" : "setAttribute",
		"hasAttr" : "hasAttribute"
	}
	
	//	HTMLElement 扩展函数简写
	var HTMLElementOptimizeCustomizeMap = 
	{
		"hasClass" : checkElementClass,	//	测试类名
		"addClass" : addElementClass,
		"cutClass" : removeElementClass,	//	删除类名
		"getStyle" : getElementStyle,	//	获取样式
		"setStyle" : setElementStyle,	//	设置样式
		
		"animate" : animateElement,	//	创建动画
		"toggle" : toggleNode,
		"show" : showNode,
		"hide" : hideNode,
		
		"bind" : nexusElement,	//	
		"tie" : nexusElement,
		"unbind" : disnexusElement,
		"untie" : disnexusElement,
		"tbind" : nexusElementAndTrace
	}
	
	var HTMLObjects2 =
	{
		"XMLElementOptimizePropertyMap" : XMLElementOptimizePropertyMap,
		"XMLElementOptimizeFunctionMap" : XMLElementOptimizeFunctionMap,
		"XMLElementOptimizeCustomizeMap" : XMLElementOptimizeCustomizeMap,
		
		"HTMLElementExtendFunctionList" : HTMLElementExtendFunctionList,
		"HTMLElementOptimizePropertyMap" : HTMLElementOptimizePropertyMap,
		"DefaultHTMLElementShortDefineOption" : DefaultHTMLElementShortDefineOption
	}
	relateToHTML(HTMLObjects2);
	
	//	默认 快速函数 css 使用的参数值
	var DefaultShortCSSArgument = 
	{
		"PropertyName" : "color",
		"PropertyValue" : "value",
		"DimensionUnit" : "px"
	}
	
	//	css 一般样式列表
	var ShortCSSPropertyList = 
	[ "color", "background", "opacity", "fontFamily", "display",
	  "position" ];
	
	//	css 尺寸样式列表
	var ShortCSSDimensionPropertyList = 
	[ "width" , "height" , "padding", "margin", "left", "right",
	  "top", "bottom", "fontSize", "lineHeight" ];
	
	//	css 样式值 的单位列表
	var CSSValueUnitNameList = [ "px", "em" ];
	
	//	animate 函数使用的默认参数值
	var DefaultAnimateArgument =
	{
		"Duration" : 0.5,
		"Times" : 64,
		"UnitName" : "px"
	}
	
	var ShortEventNameList = 
	[ "click", "dblclick", "mouseover", "mouseout", "mousedown",
	"mouseup", "keydown", "keyup", "keypress" ];
	
	var NodeListExtendList =
	[ "attribute" , "css", "nexusElement", "disnexusElement", "nexusElementAndTrace" , "toggleNode", "showNode", "hideNode"];
	
	var NodeListOptimizeMap = 
	{
		"attribute" : "attr",
		"bind" : "nexusElementAndTrace",
		"tbind" : "nexusElementAndTrace",
		"unbind" : "disnexusElement",
		
		"toogle" : "toggleNode",
		"show" : "showNode",
		"hide" : "hideNode",
		
		"each" : "eachValue",
		"filter" : "filterArray",
		"map" : "mapArray",
		"and" : "andOperate",
		"or" : "orOperate"
	}
	
	//	
	var PublicHTMLThings = 
	{
		"id" : nodeByID,
		"tags" : nodesByTag,
		"Class" : nodesByClass,
		"$" : selectHTMLElements,
		"xpath" : evaluateXPath,
		"create" : createElement,
		
		"bind" : tNexus,
		"unbind" : disNexus
	}
	
	//	样品文档 的创建选项
	var DefaultExampleDocumentOption =
	{
		"MinLevel" : 1,
		"MaxLevel" : 3,
		"MinChildCount" : 2,
		"MaxChildCount" : 4,
		
		"ContentSource" : "ManagerSource"
	}
	
	var DefaultRandomAnimateOption = 
	{
		"Duration" : 0.25,
		"TimesUnit" : 64,
		"MinNodeCount" : 4,
		"MaxNodeCount" : 8,
		
		"MaxLevel" : 4,
		"CSSPropertyList" : [ "fontSize", "width", "height", "left", "top" ],
		"CSSPropertyDetail" :
		{
			"fontSize" : 
			{
				"MinValue" : 12,
				"MaxValue" : 36
			}
			,
			"width" : 
			{ 
				"MinValue" : 0,
				"MaxValue" : 640
			},
			"height" : 
			{ 
				"MinValue" : 48,
				"MaxValue" : 480
			},
			"left" : {
				"MinValue" : -240,
				"MaxValue" : 240
			},
			"top" : {
				"MinValue" : -128,
				"MaxValue" : 128
			}
		}
	}
	
	//	创建各种 界面元素 使用的一些默认参数
	var DefaultUICreateArgument = 
	{
		"ButtonText" : "button",
		"TextInputText" : "write some here.."
	}
	
	var HTMLObjects3 = 
	{
		"DefaultShortCSSArgument" : DefaultShortCSSArgument, 
		"DefaultExampleDocumentOption" : DefaultExampleDocumentOption,
		"DefaultRandomAnimateOption" : DefaultRandomAnimateOption
	}
	relateToHTML(HTMLObjects3);
	
	//	HTMLFunctions1
	/*	侦听 targetObject 的 eventType 事件， 如果事件发生， 调用 eventProcessor
	nexusOption 指定 侦听选项 */
	function nexusEvent(eventProcessor,eventType, targetObject,    nexusOption) {
		
		nexusOption = argumentFromDefault(nexusOption, DefaultNexusOption);
		
		var useCapture = nexusOption["UseCapture"];
		
		targetObject = targetObject || window;
		
		var defaultEventType = nexusOption["DefaultEventType"];
		eventType = eventType || defaultEventType;
		
		defaultProcessor = nexusOption["DefaultProcessor"];
		eventProcessor = eventProcessor || defaultProcessor;
		
		targetObject.addEventListener(eventType, eventProcessor, useCapture);
		
		return targetObject;
	}
	
	/*	删除 targetObject 对象的事件类型为 eventType 的 侦听函数 processor */
	function disNexus(teventProcessor,eventType, targetObject, nexusOption) {
		
		nexusOption = argumentFromDefault(nexusOption, DefaultNexusOption);
		targetObject = targetObject || window;
		
		var useCapture = nexusOption["UseCapture"];
		var defaultType = nexusOption["DefaultEventType"];
		var defaultProcessor = nexusOption["DefaultProcessor"];
		
		eventType = eventType || defaultType;
		processor = processor || defaultProcessor;
		
		targetObject.removeEventListener(eventType, processor, useCapture);
		
		return targetObject;
	}
	
	/*	为一个 HTML 对象添加事件侦听处理函数， 并且 使用 traceCode 测试 */
	function tNexus(eventProcessor,eventType, targetObject, nexusOption) {
		
		function nexusEventTraceProcessor() {
			
			processor = eventProcessor || DefaultNexusOption["DefaultTraceProcessor"];
			
			var eventInfo =
			{
				"targetObject" : targetObject,
				"eventType" : eventType
			}
			
			Monitor.traceCode(processor, null, eventInfo);	
		}
		
		targetObject = targetObject || window;
		eventType = eventType || DefaultNexusOption["DefaultEventType"];
		
		nexusEvent(nexusEventTraceProcessor,eventType, targetObject,    nexusOption);
		
		return nexusEventTraceProcessor;
	}
	
	//	调用 nexusEvent ，使用 不同的 参数顺序 
	function nexusElement(element, eventType, processor, nexusOption) {
		return nexusEvent(processor, eventType, element, nexusOption);
	}
	
	//	第一个参数是 element
	function disnexusElement(element, eventType, processor, nexusOption) {
		return disNexus(processor, eventType, element, nexusOption);
	}
	
	//	测试 事件
	function nexusElementAndTrace(element, eventType, processor, nexusOption) {
		return tNexus(processor, eventType, element, nexusOption);
	}
	
	/*	解释一个 XPath 表达式， targetElement 指定当前节点， targetDocument
	是当前文档， 返回列表 */
	function evaluateXPath(pathExpress, targetElement, targetDocument) {
		
		targetDocument = targetDocument || document;
		targetElement = targetElement || targetDocument;
		pathExpress = pathExpress || "\/\/*";
		
		var evaluateResult;
		var nodeList = new Array();
		
		evaluateResult = targetDocument.evaluate(pathExpress, targetElement, null, XPathResult.ANY_TYPE, null);
		
		var currentNode;
		while(currentNode = evaluateResult.iterateNext()) {
			
			nodeList.push(currentNode);
		}
		
		return nodeList;
		
	}
	
	/*	使用一种比 XPath 更为简洁的语法去选取 节点 */
	function selectHTMLElements(selectExpress, targetDocument) {
		
		targetDocument = targetDocument || document;
		var pathExpress = "";
		
		if(isNull(selectExpress) == true) {
			pathExpress = "//*";
		}
		else {
			
			var deleteSpaceOption =
			{
				"DeleteBody" : false
			}
			
			selectExpress = deleteSpaceFromString(selectExpress, deleteSpaceOption);
			
			var splitStrings = selectExpress.split(/\s+/);
			
			for(var index = 0; index < splitStrings.length; index++) {
				
				var currentString = splitStrings[index];
				var currentStep;
				
				var HTMLTag = currentString.match(/^\w+/);
				
				if(isExsit(HTMLTag) == 1) {
					HTMLTag = HTMLTag[0];
				}
				else {
					HTMLTag = "*";
				}
				
				var elementID = currentString.match(/#\w+/);
				
				if(isExsit(elementID) == 1) {
					elementID = elementID[0].replace("#", "");
					//	加了引号
					elementID = "[@id='" + elementID + "']";	
				}
				else {
					elementID = "";
				}
				
				currentStep = "\/\/" + HTMLTag + elementID;
				pathExpress +=currentStep;
			}
			var resultNodes = evaluateXPath(pathExpress, null, targetDocument);
		}		
		return resultNodes;
	}
	
	/*	nodeByID 根据传入的 id 值返回 元素 */
	function nodeByID(id) {
		var node = document.getElementById(id);
		
		return node;
	}
	
	/*	nodesByClass 的参数 className 指定元素的 类名 */
	function nodesByClass(className) {
		var nodes = document.getElementsByClassName(className);
		
		return nodes;
	}
	
	/*	返回 相同标签的 元素 */
	function nodesByTag(tagName) {
		var nodes = document.getElementsByTagName(tagName);
		
		return nodes;
	}
	
	/*	在目标文档创建一个 文本节点 */
	function createTextNode(text, targetDocument) {
		
		targetDocument = targetDocument || document;
		
		var textNode = targetDocument.createTextNode(text);
		
		return textNode;
	}
	
	/*	返回 指定类名 的所有节点 */
	function getElementsByClass(className, targetDocument) {
		
		targetDocument = targetDocument || document;
		
		var resultNodes = targetDocument.getElementsByClassName(className);
		
		return resultNodes;
	}
	
	/*	 从一个 字符串数组 创建 属性对象 ，每个值的索引对应 
	另一个对象 QuickHTMLPropertyOrder 的索引 */
	function decideQuickHTMLProperty(material) {
		

		var returnProperty = new Object();
		
		if(isArray(material) == true) {
			
			for(var index = 0; index < material.length; index++) {
				
				var currentPropertyName = QuickHTMLPropertyOrder[index];
				var currentValue = material[index];
				
				returnProperty[currentPropertyName] = currentValue;
			}
		}
		else if(isObject(material) == true) {
			returnProperty = material;
		}
		
		return returnProperty;
	}
	
	/*	新建 HTML 元素对象 ，propertys 可以是数组 ，也可以是对象 */
	function createElement(tagName, propertys, targetDocument) {
		
		targetDocument = targetDocument || document;
		propertys = decideQuickHTMLProperty(propertys);
		
		var element = targetDocument.createElement(tagName);
		
		relateFromMap(element, propertys);
		
		return element;
	}

	var HTMLFunctions1 = [ nexusEvent, disNexus, tNexus, evaluateXPath, selectHTMLElements, nodeByID, nodesByClass, nodesByTag, createTextNode, getElementsByClass, decideQuickHTMLProperty, createElement];
	relateToHTML(HTMLFunctions1);
	
	//	HTMLFunctions2
	/*	测试一个 HTML 对象是否拥有 指定的类名 */
	function checkElementClass(element, checkClassName) {
		
		var elementClass = element.className;
		var checkResult;
		
		if(elementClass !== "") {
			
			var splitClass = elementClass.split(/\s+/);
			checkResult = checkValueInArray(splitClass, checkClassName);
		}
		else {
			checkResult = false;
		}
		
		return checkResult;
	}	
	
	/*	为一个 HTML 对象添加类名 */
	function addElementClass(element, className) {
		
		var result;
		if(checkElementClass(element, className) == false) {
			
			element.className += " " + className;
			result = true;
		}
		else {
			result = false;
		}
		
		return result;
	}
	
	/* 删除一个 HTML 对象指定的 类名 */
	function removeElementClass(element, className) {
		
		var elementClassName = element.className;
		var splitClass = elementClassName.split(/\s+/);
		
		var result = false;
		
		for(var index = 0; index < splitClass.length; index++) {
			var currentClass = splitClass[index];
			
			if(currentClass == className) {
				splitClass.splice(index, 1);
					
				newClassName = splitClass.join(" ");
				element.className = newClassName;
				
				result = true;
				break;
			}
		}
		
		return result;
	}
	
	/*	返回一个 HTML对象快速创建函数 tagCreator 使用了外层函数的 
	tagName 参数 和 propertyNameArray 参数*/
	function returnHTMLCreatorFunction(tagName, propertyNameArray) {
		
		/*	对象创建 工具函数 */
		function tagCreator() {
			
			var element = document.createElement(tagName);
			
			for(var index = 0; index < propertyNameArray.length; index++) {
				
				var currentPropertyName = propertyNameArray[index];
				var currentPropertyValue = arguments[index];
				
				if(isDefined(currentPropertyValue) == true) {
					element[currentPropertyName] = currentPropertyValue;
				}
			}
			
			return element;
		}
		
		return tagCreator;
	}
	
	/*	创建一组 名字为 HTML 标签名的 HTML 对象创建函数 */
	function createQuickHTMLCreatorSet(targetObject) {
		
		targetObject = targetObject || window;
		
		var shortTagMap = ShortTagNameMap.getMap();
		
		for(var tagName in shortTagMap) {
			
			var currentArray = shortTagMap[tagName];
			var currentTagCreator = returnHTMLCreatorFunction(tagName, currentArray);
			targetObject[tagName] = currentTagCreator;
		}
	}
	
	var HTMLFunction2 = [ checkElementClass, addElementClass, removeElementClass, 
	createQuickHTMLCreatorSet, returnNodeQuickGetter, returnNodeQuickSetter ];
	relateToHTML(HTMLFunction2);	
	
	//	HTMLThings 3
	/*	清除 targetNode 的所有子节点 */
	function removeAllChilds(targetNode) {
		
		var childNodes = targetNode.childNodes;
		for(var index = childNodes.length -1; index >= 0; index--) {
			
			var currentChild = childNodes[index];
			targetNode.removeChild(currentChild);
		}
		
		return targetNode;
	}
	
	/*	删除节点自身 */
	function deleteSelf(targetNode) {
		
		var parentNode = targetNode.parentNode;
		var operateResult = parentNode.removeChild(targetNode);
		
		return operateResult;
	}
	
	/*	附加 node 节点至 parentNode */
	function appendToNode(node, parentNode) {
		
		parentNode = parentNode || document.body;
		var operateResult = parentNode.appendChild(node);
		
		return operateResult;
	}
	
	/*	使 childNode 成为 node的子节点 ， node 的位置会改变 */
	function wrapNode(node, childNode) {
		
		var parentNode = childNode.parentNode;
		
		parentNode.insertBefore(node, childNode);
		var wrapResult = node.appendChild(childNode);
		
		return wrapResult;
	}
	
	/*	在 node 之前 插入 previousSibling */
	function addPreviousSibling(node, previousSibling) {
		
		var parentNode = node.parentNode;
		
		var operateResult = parentNode.insertBefore(previousSibling, node);

		
		return operateResult;
	}
	
	/*	在 node 之后 插入 nextSibling */
	function addNextSibling(node, nextSibling) {
		
		var parentNode = node.parentNode;
		
		parentNode.insertBefore(nextSibling, node);
		var operateResult = parentNode.insertBefore(node, nextSibling);
		
		return operateResult;
	}
	
	/*	移动 node 至 referenceNode 之后 */
	function moveToAfter(node, referenceNode) {
		
		var referenceParent = referenceNode.parentNode;
		
		referenceParent.insertBefore(node, referenceNode);
		var moveResult = referenceParent.insertBefore(referenceNode, node);
		
		return moveResult;
	}
	
	/*	移至 node 至 referenceNode 之前 */
	function moveToBefore(node, referenceNode) {
		
		var referenceParent = referenceNode.parentNode;
		
		var moveResult = referenceParent.insertBefore(node, referenceNode);
		
		return moveResult;
	}
	
	/*	移动 node 至  parentNode 的第一个 子节点 
	如果 parentNode 未指定 则指定为 node 的当前 父节点*/
	function moveToFirst(node, parentNode) {
		
		parentNode = parentNode || node.parentNode;
		
		var firstChild = parentNode.firstChild;
		var moveResult = parentNode.insertBefore(node, firstChild);
		
		return moveResult;
	}
	
	/*	移动 node 至 parentNode 的最后一个子节点 */
	function moveToLast(node, parentNode) {
		
		parentNode = parentNode || node.parentNode;
		
		var moveResult = parentNode.appendChild(node);
		
		return moveResult;
	}
	
	/*	在 node 的子节点 referenceNode 之后插入 childNode 新节点 */
	function insertAfter(node, childNode, referenceNode) {
		
		if(isUndefined(referenceNode) == true) {
			
			var referenceNode = node.firstChild;
			
			if(isDefined(firstChild) == true) {
				node.insertBefore(childNode, referenceNode);
			}
			else {
				node.appendChild(childNode);
			}
		}
		else {
			node.insertBefore(childNode, referenceNode);
		}
		var operateResult = node.insertBefore(referenceNode, childNode);
		
		return operateResult;
	}
	
	/*	使 replaceNode 替换 当前节点 node */
	function replaceSelfByNode(node, replaceNode) {
		
		var parentNode = node.parentNode;
		
		var replaceResult = parentNode.replaceChild(replaceNode, node);
		
		return replaceResult;
	}
	
	/*	使 replaceNode 被当前节点 node 替换 */
	function replaceToNode(node, replaceNode) {
		
		var replaceParent = replaceNode.parentNode;
		
		var replaceResult = replaceParent.replaceChild(node, replaceNode);
		
		return replaceResult;
	}
	
	/*	交换 node 和 otherNode 的位置 */
	function swapNode(node, otherNode) {
		
		var nodeParent = node.parentNode;
		var otherParent = otherNode.parentNode;
		var newOtherNode = otherNode.cloneNode();

		nodeParent.replaceChild(newOtherNode, node);
		otherParent.replaceChild(node, otherNode);
		nodeParent.replaceChild(otherNode, newOtherNode);
		
		return node;
	}
	
	var HTMLSources3 = [ removeAllChilds, deleteSelf, appendToNode, wrapNode,
	addPreviousSibling, addNextSibling, moveToBefore, moveToAfter, 
	moveToFirst, moveToLast, insertAfter, replaceSelfByNode, swapNode];
	relateToHTML(HTMLSources3);
	
	//	HTMLSources4
	
	function attribute(node, attributeName, attributeValue) {
		
		var result;
		
		if(isObject(attributeName) == true) {
			
			attributeMap = attributeName;
			
			for(var attrName in attributeMap) {
				
				var attrValue = attributeMap[attrName];
				node.setAttribute(attrName, attrValue);
			}
			
			result = node;
		}
		else {
			if(isDefined(attributeValue) == true) {
				node.setAttriubte(attributeName, attributeValue);
				result = node;
			}
			else {
				result = node.getAttribute(attributeName);
			}
		}
		
		return result;
	}
	//	移除 propertyValue 的单位名字
	function cutCSSValueUnitName(propertyValue) {
		
		if(isString(propertyValue) == true) {
			var unitList = CSSValueUnitNameList;
			
			for(var index = 0; index < unitList.length; index++) {
				
				var currentUnit = unitList[index];
				propertyValue = propertyValue.replace(currentUnit, "");
			}
			
			//	如果字符串表示一个 数字，那么转化它成为数字
			if(isNumberString(propertyValue) == true) {
				propertyValue = parseInt(propertyValue);		
			}
		}
		
		return propertyValue;
	}
	
	//	取得 element 的属性为 propertyName 的样式值
	function getElementStyle(element, propertyName, cutUnitName) {
		
		propertyName = propertyName || DefaultShortCSSArgument["PropertyName"];
		
		var styleObject = window.getComputedStyle(element);
		var propertyValue = styleObject[propertyName];
		
		if(cutUnitName == true) {
			propertyValue = cutCSSValueUnitName(propertyValue);
		}
		
		return propertyValue;
	}
	
	//	设置 element 名为 propertyName 的值 为 propertyValue
	function setElementStyle(element, propertyName, propertyValue) {
		
		propertyName = propertyName || DefaultShortCSSArgument["PropertyValue"];
		
		propertyValue = propertyValue || "";
	
		var isDimension = checkValueInArray( ShortCSSDimensionPropertyList, propertyName);
		
		if(isString(propertyValue) == false) {
			propertyValue = propertyValue.toString();
		}
		
		if(isDimension && isNumberString(propertyValue)) {
			var unitName = DefaultShortCSSArgument["DimensionUnit"];
			propertyValue += unitName;
		}		
		
		element.style[propertyName] = propertyValue;
		
		return element;
	}
	
	/*	快速设置 element 的样式， 如果 propertyValue 已指定，
	那么 设置新值，否则返回属性值
	第二个参数可以指定一个 对象 */
	function css(element, propertyName, propertyValue) {
		
		var returnValue;
		
		propertyName = propertyName || DefaultShortCSSArgument["PropertyName"];		
		if(isString(propertyName) == true) {
			
			if(isUndefined(propertyValue) == true) {
				
				returnValue = getElementStyle(element, propertyName);
			}
			else {
				setElementStyle(element, propertyName, propertyValue);
				returnValue = element;
			}
		}
		//	如果是一个对象， 键名是 样式名， 键值是 样式值
		else {
			
			var cssMap = propertyName;
			
			for(var cssName in cssMap) {
				
				var cssValue = cssMap[cssName];
				setElementStyle(element, cssName, cssValue);
			}
			
			returnValue = element;
		}
		
		return returnValue;
	}
	
	function toggleNode(node) {
		
		var displayValue = getElementStyle(node, "display");
		
		if(displayValue == "none") {
			setElementStyle(node, "display", "block");
		}
		else {
			setElementStyle(node, "display", "none");
		}
	}
	
	function showNode(node) {
		
		var preValue = node.$preDisplayValue;
		
		if(isDefined(preValue) == 1) {
			node.css("display", preValue);
		}
		else {
			node.css("display", "block");
		}
	}
	
	function hideNode(node) {
		
		node.$preDisplayValue = node.css("display");
		node.css("display", "none");
	}
	/*	生成一个 动画， element 指向目录元素， targetCSS 指向目标最后的值，
	duration 是持续时间， times 指明 "帧数", sourceCSS 指向 元素 最初的样式 */
	function animateElement(element, targetCSS, duration, times, sourceCSS) {
		
		//	计算两个值的 差
		function computeDiffer(valueA, valueB) {
			valueA = cutCSSValueUnitName(valueA);
			valueB = cutCSSValueUnitName(valueB);
			
			return valueA - valueB;
		}

		duration = duration || DefaultAnimateArgument["Duration"];
		times = times || duration * DefaultAnimateArgument["Times"];
		
		sourceCSS = sourceCSS || {};	
		
		var relativeCSS = new Object();
		var sourceNumberCSS = new Object();
		
		for(var propertyName in targetCSS) {
			
			var targetValue = targetCSS[propertyName];
			
			sourceValue = sourceCSS[propertyName];
			
			//	如果 源属性值  没有显式指明 
			if(isUndefined(sourceValue) == true) {
				sourceValue = getElementStyle(element, propertyName);
				sourceCSS[propertyName] = sourceValue;
			}
			//	如果 sourceValue 是一个数字
			else if(isString(sourceValue) == false) {
				
				sourceValue = sourceValue.toString();
			}
			sourceValue = cutCSSValueUnitName(sourceValue);
			
			var differ = computeDiffer(targetValue,sourceValue);
			
			relativeCSS[propertyName] = differ / times;
			sourceNumberCSS[propertyName] = sourceValue;
		}
		
		//	step2
		
		function startAnimate() {
			
			var interval = duration*1000 / times;
			
			animateTimer = setInterval(animateCallback, interval);
		}
		
		function stopAnimate() {
			clearInterval(animateTimer);
		}
		
		function animateCallback() {
			
			for(var propertyName in targetCSS) {
				
				var currentValue = sourceNumberCSS[propertyName] + counter*relativeCSS[propertyName] + defaultUnit;
				setElementStyle(element, propertyName, currentValue);
			}
			
			if(counter++ == times) {
				stopAnimate();
			}
		}
		
		var counter = 1;
		var animateTimer;
		
		var defaultUnit = DefaultAnimateArgument["UnitName"];
		startAnimate();	
	}
	
	var HTMLSources4 = [ cutCSSValueUnitName, attribute, getElementStyle, setElementStyle,  css, animateElement ];
	relateToHTML(HTMLSources4);
	
	//	HTMLSources5
	/*	返回 Node 原型扩展函数 , 在 ExtendXMLNode 中调用 */
	function returnNodeExtendFunction(functionObject) {
		
		function NormalNodeExtendFunction() {
			
			var Argument = getArgumentsArray();
			Argument.unshift(this);
			var operateResult = functionObject.apply(null, Argument);
			
			return operateResult;
		}
		
		return NormalNodeExtendFunction;
	}
	
	/*	返回一个 css 属性值快速设置函数 ， 该函数被 元素对象 的与属性名相同的成员 调用 
	第二个参数 表示当前 处理的属性值 是否具有单位 ，如果是， 返回一个 在访问属性过程 处理
	属性值 */
	function returnHTMLElementQuickCSSFunction(propertyName, isDimensionProperty) {
		
		//	函数对应 一般的 css 属性
		function NormalQuickCSSFunction() {
			
			var Argument = getArgumentsArray();
			Argument.unshift(propertyName);
			Argument.unshift(this);
			
			var result = css.apply(null, Argument);
			
			return result;
		}
		
		//	如果属性带有 尺寸单位，那么返回 此函数
		function NormalQuickDimensionCSSFunction() {
			
			var Argument = getArgumentsArray();
			var result;
			
			var unitName = DefaultShortCSSArgument["DimensionUnit"];
			
		
			var propertyValue = Argument[0];
			Argument.unshift(propertyName);
			Argument.unshift(this);	
						
			if(isDefined(propertyValue) == true) {
				
				propertyValue = propertyValue.toString();
				
				if(isNumberString(propertyValue) == true) {
					propertyValue += unitName;
				}
				Argument[2] = propertyValue;
				css.apply(null, Argument);
				
				result = this;
			}
			else {		
				result = css.apply(null, Argument);
				result = result.replace(unitName, "");
			}
			
			return result;
		}
		
		var returnFunction;
		
		if(isDimensionProperty == true) {
			returnFunction = NormalQuickDimensionCSSFunction;
		}
		else {
			returnFunction = NormalQuickCSSFunction;
		}
		
		return returnFunction;
	}
	
	/*	返回一个 短写 事件添加函数 */
	function returnHTMLElementQuickEventFunction(eventName, isTrace) {
		
		function NormalQuickEventFunction() {
			
			var Argument = getArgumentsArray();
			Argument.unshift(eventName);
			Argument.unshift(this);
			
			var result;
			
			if(isTrace == true) {
				result = nexusElementAndTrace.apply(null, Argument);
			}
			else {
				result = nexusElement.apply(null, Argument);
			}
			
			return result;
		}
		
		return NormalQuickEventFunction;
	}
	/*	为 Node 原型增加 函数 */
	function extendXMLNode() {
		
		var extendList = XMLNodeExtendFunctionList;
		
		for(var index = 0; index < extendList.length; index++) {
			
			var currentFunction = extendList[index];
			var functionName = currentFunction.name;
			var extendFunction = returnNodeExtendFunction(currentFunction);
			
			Node.prototype[functionName] = extendFunction;
		}	
	}
	
	/*	扩展 HTMLElement 原型对象 */
	function extendHTMLElement() {
		
		var extendList = HTMLElementExtendFunctionList;
		var HTMLProto = HTMLElement.prototype;
		
		for(var index = 0; index < extendList.length; index++) {
			
			var currentFunction = extendList[index];
			
			var functionName = currentFunction.name;
			
			//	returnNodeExtendFunction 在这里是 第二次使用
			HTMLProto[functionName] = returnNodeExtendFunction(currentFunction);
		}
	}		
	/*	返回 Node 简写属性的 访问函数 */
	function returnNodeQuickGetter(propertyName) {
		
		function XMLNodePropertyQuickGetter() {
			return this[propertyName];
		}
		
		return XMLNodePropertyQuickGetter;
	}
	
	/*	返回 Node 简写属性的 设置函数 */
	function returnNodeQuickSetter(propertyName) {
		
		function XMLNodePropertyQuickSetter(propertyValue) {
			this[propertyName] = propertyValue;
		}
		
		return XMLNodePropertyQuickSetter;
	}
	
	/*	"分离函数" , 从 propertyMap 声明一些 属性 至 原型对象 prototype */
	function defineShortPropertyToXML(propertyMap, prototype, defineOption) {
		
		defineOption = defineOption || DefaultNodeShortDefineOption;
		
		for(var shortPropertyName in propertyMap) {
			var correctPropertyName = propertyMap[shortPropertyName];
			
			var propertyGetter = returnNodeQuickGetter(correctPropertyName);
			var propertySetter = returnNodeQuickSetter(correctPropertyName);
			
			define(shortPropertyName, propertyGetter, propertySetter, prototype, defineOption);
		}
	}
	
	/*	向 原型对象 prototype 添加短名字函数 */
	function addShortFunctionToXML(nameMap, prototype, isExtendFunction) {
		
		for(var shortName in nameMap) {
			
			var currentValue = nameMap[shortName];
			var functionName;
			
			if(isExtendFunction == true) {
				functionName = currentValue.name;
			}
			else {
				functionName = currentValue;
			}
			
			prototype[shortName] = prototype[functionName];
		}
	}
	
	var HTMLSources5 = [ returnNodeExtendFunction, returnHTMLElementQuickCSSFunction, returnHTMLElementQuickEventFunction,
	extendXMLNode, extendHTMLElement, returnNodeQuickGetter, returnNodeQuickSetter, defineShortPropertyToXML, addShortFunctionToXML ];
	relateToHTML(HTMLSources5);	
	
	//	HTMLSources6
	/*	创建一个 类名为 Button 的按钮 text 指定按钮的文本
	id 指定按钮的 id, parent 指定父元素 */
	function createButton(text, id, parent) {
		
		parent = parent || document.body;
		text = text || DefaultUICreateArgument["ButtonText"];
		
		var propertys = 
		{
			"className" : "Button",
			"innerText" : text
		};
		
		if(isDefined(id)) {
			propertys["id"] = id;
		}
		
		var element = createElement("div", propertys);
		
		appendToNode(element, parent);
		return element;
	}
	
	function createTextInput(text, id, parent) {
		
		parent = parent || document.body;
		text = text || DefaultUICreateArgument["TextInputText"];
		
		var props = 
		{
			"className" : "TextInput",
			"contentEditable" : "true",
			"text" : text
		}
		
		if(isDefined(id) == 1) {
			props.id = id;
		}
		
		var inputNode = createElement("div", props);
		appendToNode(inputNode, parent);
		
		return inputNode;
	}
	
	function createTreeView(source, id, parent) {
		
		var maxLevel = 5;
		
		function createUL(object, parent, level) {
			
			if(level == maxLevel) {
				return;
			}
			
			for(var memberName in object) {
				
				var curMember = object[memberName];
				var memberType = typeof(curMember);
				
				var	props = 
				{
					"className" : memberType,
					"innerText" : memberName
				};
				
				if(isObject(curMember) == 1) {
					
					var ul = createElement("ul", props);			
					createUL(curMember, ul, level+1);
					appendToNode(ul, parent);
				}
				else {
					var li = createElement("li", props);
					appendToNode(li, parent);
				}
			}		
		}
		
		function onTreeClick() {
			
			var target = event.target;
			
			if(target.tagName == "UL") {
				
				target.childNodes.toggleNode();
			}
		}
		parent = parent || document.body;
		
		source = source || window || 
		{
			 "creature" : 
			 {
				"animal" : "dog", 
				"plant" : "grass"
			 }
			 ,
			 "weather" :
			 {
				 "cold" : "winter",
				 "hot" : "summer"
			 }
		}
		
		var props = 
		{
			"className" : "TreeView"
		}
		
		if(isDefined(id) == 1) {
			props.id = id;
		}
		
		var treeView = createElement("ul", props);
		treeView.moveToFirst(wicket);
 			
		//appendToNode(treeView, parent);
		if(isArray(source) == 1) {
		}
		else {
			createUL(source, treeView, 1);
		}
		
		treeView.click(onTreeClick, true);
		
		return treeView;
	}
	
	function activePage() {
		
		var selectLI, selectPage;
		var pages = new Array();
		
		function setDefaultPage() {
			
			var liNodes = card.nodesByTag("li");
			
			var liLength = liNodes.length;
			if(liLength > 0) {
				
				for(var liIndex = 0; liIndex < liNodes.length; liIndex++) {
					
					var curLI = liNodes[liIndex];
					curLI.LIIndex = liIndex;
					
					var pageName = curLI.getAttr("page");
					addvar(curLI, "curLI");
					addvar(pageName, "pageName");
					var curPage = nodeByID(pageName);
					
					var pageDESC =
					{
						"pageName" : pageName,
						"pageNode" : curPage
					}
					
					pages.push(pageDESC);
					
					if(curPage.hasAttr("default") == 1) {
						selectPage = curPage;
						selectLI = curLI;
					}
				}
				
				if(isUndefined(selectPage) == 1) {
					var firstLI = liNodes[0];
					
					selectLI = firstLI;
					selectPage = pages[0]["pageNode"];
				}
				
				selectPage.addClass("Select");
				selectPage.addClass("Select");
			}
		}
		
		function hidePage() {
			selectLI.cutClass("Select");
			selectPage.cutClass("Select");	
		}
		
		function showPage() {
			selectLI.addClass("Select");
			selectPage.addClass("Select");
		}
		
		function onCardClick() {
			var target = event.target;
			
			if(target.tagName == "LI") {
				hidePage();
				selectLI = target;
				var liIndex = selectLI.LIIndex;
				selectPage = pages[liIndex]["pageNode"];
				showPage();
			}
		}
		var card = nodeByID("_maincard");	
		
		if(isDefined(card) == 1) {
			
			setDefaultPage();
			card.bind("click", onCardClick);
		
		}
	}
	var HTMLSources6 = [ createButton, createTextInput, createTreeView, activePage ];
	relateToHTML(HTMLSources6);
	//	HTMLSourcesX

	/*	为 Node 的原型增加一些 简写属性， 它们与原有的属性对应
	只不过名字比较短 同时 也修改 Element原型*/
	function optimizeXMLNode(nameMapObject, NodeIsExtend) {
		
		nameMapObject = nameMapObject || {};
		
		//	第一部分 修改 Node 原型
		var NodeProto = Node.prototype;
		
			//	处理 原型属性
		var propertyMap = nameMapObject["NodePropertyMap"] || XMLNodeOptimizePropertyMap;
		
		defineShortPropertyToXML(propertyMap, NodeProto);

			//	处理	原型函数
		var functionMap = nameMapObject["NodeFunctionMap"] || XMLNodeOptimizeFunctionMap;
		
		addShortFunctionToXML(functionMap, NodeProto, false);

			//	增加 Node 自定义函数 的简写函数
		var extendMap = nameMapObject["NodeExtendMap"] || XMLNodeOptimizeCustomizeMap;
		
		addShortFunctionToXML(extendMap, NodeProto, true);
		
		//	第二部分	修改Element 原型
		var ElementProto = Element.prototype;
		
			//	Element 原型自身的 属性 比较少
		var elementPropertyMap = nameMapObject["ElementPropertyMap"] || XMLElementOptimizePropertyMap;
		
		defineShortPropertyToXML(elementPropertyMap, ElementProto);
		
			//	方法 也少
		var elementFunctionMap = nameMapObject["ElementFunctionMap"] || XMLElementOptimizeFunctionMap;
		
		addShortFunctionToXML(elementFunctionMap, ElementProto, false);
		
			//	扩展方法
		var elementExtendMap = nameMapObject["ElementExtendMap"] || XMLElementOptimizeCustomizeMap;
		
		addShortFunctionToXML(elementExtendMap, ElementProto, true);
	}	
	
	/*	修改 HTMLElement 的原型 增加一个 属性 和 快捷函数 */
	function optimizeHTMLElement(nameMapObject, ElementIsExtend) {
		
		//	step1	
		var nameMapObject = nameMapObject || {};
		var HTMLProto = HTMLElement.prototype;
		
			//	增加属性
		var propertyMap = nameMapObject["ElementPropertyMap"] || HTMLElementOptimizePropertyMap;
		
		defineShortPropertyToXML(propertyMap, HTMLProto);
		
			//	增加 短写 函数
		var functionMap = nameMapObject["ElementFunctionMap"] || HTMLElementOptimizeFunctionMap;
		
		addShortFunctionToXML(functionMap, HTMLProto, false);

			//	增加 扩展函数 的简写函数
		var shortFunctionMap = nameMapObject["ElementExtendMap"] || HTMLElementOptimizeCustomizeMap;
		
		addShortFunctionToXML(shortFunctionMap, HTMLProto, true);
		
		//	step2	样式表相关操作
			//	一般属性
		var cssList = ShortCSSPropertyList;
		
		for(var index = 0; index < cssList.length; index++) {
			
			var currentProperty = cssList[index];
			
			HTMLProto[currentProperty] = returnHTMLElementQuickCSSFunction(currentProperty, false);
		}
			//	带 单位的属性
		var cssDimensionList = ShortCSSDimensionPropertyList;
		
		for(var counter = 0; counter < cssDimensionList.length; counter++) {
			
			var dimenProperty = cssDimensionList[counter];
			
			HTMLProto[dimenProperty] = returnHTMLElementQuickCSSFunction(dimenProperty, true);
		}
		
		//	step3	简写的事件函数
		var shortEventList = ShortEventNameList;
		
		for(var eventIndex = 0; eventIndex < shortEventList.length; eventIndex++) {
			
			var eventName = shortEventList[eventIndex];
			HTMLProto[eventName] = returnHTMLElementQuickEventFunction(eventName, true);
		}
	}
	
	function returnNodeListExtendFunction(functionName) {
		
		function NormalNodeListExtendFunction() {
			
			var nodelist = this;
			
			for(var nodeIndex = 0; nodeIndex < nodelist.length; nodeIndex++) {
				var currentNode = nodelist[nodeIndex];
				
				var nodeFunction = currentNode[functionName];
				
				if(isDefined(nodeFunction) == true) {
					nodeFunction.apply(currentNode, arguments);
				}
				
				addObject(
				{
					"nodeIndex" : nodeIndex,
					"currentNode" : currentNode,
					"nodeFunction" : nodeFunction,
					"arguments" : arguments
				})
			}
		}
		
		return NormalNodeListExtendFunction;
	}
	
	function extendNodeList() {
		
		var NodeListProto = NodeList.prototype;
		
		//	新增一些 处理节点的函数
		var extendList = NodeListExtendList;
		
		for(var index = 0; index < extendList.length; index++) {
			
			var functionName = extendList[index];
			
			NodeListProto[functionName] = returnNodeListExtendFunction(functionName);
		}
		
		//	与数组有关
		
		installArrayExtend(NodeListProto);
		
	}
	
	function optimizeNodeList() {
		
		var NodeListProto = NodeList.prototype;
		var shortMap = NodeListOptimizeMap;
		
		for(var shortName in shortMap) {
			
			var functionName = shortMap[shortName];
			
			NodeListProto[shortName] = NodeListProto[functionName];
		}
	}
	
	/*	创建 示例文档 这里使用了 递归 */
	function createExampleDocument(documentName, createOption) {
		
		createOption = argumentFromDefault(createOption, DefaultExampleDocumentOption);
		
		var randomInt = createRandomInteger;
		
		function createChildDIV(currentLevel, parentNode) {
							
			var currentChildCount = randomInt(minChildCount, maxChildCount);
						
			for(var counter = 0; counter < currentChildCount; counter++) {
				
				var currentChildClass = "Level" + currentLevel;
				
				var childContent;
				
				if(contentSource == "ManagerSource") {
					var currentFunctionIndex = randomInt(0, functionCount);
					var currentItem = functionNameArray[currentFunctionIndex];
					
					if(isFunction(currentItem) == true) {
						var functionCodeLength = currentItem.toString().length;
						
						childContent = currentItem.name + " " + functionCodeLength;
					}
					else {
						childContent = typeof(currentItem);
					}
				}
				else {
					var usefulNumber = randomInt(0, 100);
					childContent = "interest number " + usefulNumber;
				}
				
				var currentChild = createElement("div", [ currentChildClass, null, childContent ]);
				
				appendToNode(currentChild, parentNode);
			
				if(currentLevel < currentMaxLevel) {
					
					createChildDIV(currentLevel+1, currentChild);
				}
			}
		}
		var minLevel = createOption["MinLevel"];
		var maxLevel = createOption["MaxLevel"];
		
		var minChildCount = createOption["MinChildCount"];
		var maxChildCount = createOption["MaxChildCount"];
		
		var contentSource = createOption["ContentSource"];
		
		if(contentSource == "ManagerSource") {
			var functionHeap= x.PrimaryManager.getHeap();
			var functionNameArray = convertObjectToArray(functionHeap);
			var functionCount = functionNameArray.length;
		}
		
		var currentMaxLevel = randomInt(minLevel, maxLevel);
		
		//	文档是 div 节点
		var exampleDocument = createElement("div", [ null, "ExampleDocument" ]);
		appendToNode(exampleDocument, document.body)
		
		createChildDIV(1, exampleDocument);
		
		return exampleDocument;
	}
	
	function randomAnimate(briskLevel, animateOption) {
		
		function getLuckyNode() {
			var origin = example;
			
			var childs;
			var levelCounter = 1;
			var dealNode;
			dealNode = origin;
			while(childs = dealNode.children) {
				if(levelCounter++ == MaxLevel || decide(MaxLevel) || !childs.length ) {
					break;
				}
							
				var childsCount = childs.length;
				var childIndex = getInt(childsCount-1 , 0);
				
				dealNode = childs[childIndex];
			}
			
			return dealNode;
		}
		
		function animateIt(node) {
			var currentProperty = cssList[getInt(cssListLength-1)];
			var currentDetail = detailList[currentProperty];
			
			var sourceCSS = new Object();
			var targetCSS = new Object();
			
			targetCSS[currentProperty] = getElementStyle(node, currentProperty);
			
			var minValue = currentDetail["MinValue"];
			var maxValue = currentDetail["MaxValue"]
			var currentValue = getInt(maxValue, minValue);
			
			sourceCSS[currentProperty] = currentValue
			
			node.animate(targetCSS, Duration, null, sourceCSS);
		}
		
		function testDepth() {
		}
		
		animateOption = argumentFromDefault(animateOption, DefaultRandomAnimateOption);
		
		eval(raiseScopeFromObject("animateOption", animateOption));
		
		var getInt = createRandomInteger;
		var cssList = animateOption["CSSPropertyList"];
		var cssListLength = cssList.length;
		
		var detailList = animateOption["CSSPropertyDetail"];
		
		var nodeCount = getInt(MinNodeCount, MaxNodeCount);
		
		for(var counter = 0; counter < nodeCount; counter++) {
			
			var luckyNode = getLuckyNode();
			animateIt(luckyNode);
		}
	}
	
	function optimizeDocument() {
		
		extendXMLNode();
		optimizeXMLNode();
		
		extendHTMLElement();
		optimizeHTMLElement();
		
		extendNodeList();
		optimizeNodeList();
	}
	
	function headmostForDocument() {
		
		html.createQuickHTMLCreatorSet();
		
		activePage();
	}
	var HTMLSourcesX = [ optimizeXMLNode, optimizeHTMLElement, extendNodeList, optimizeNodeList, createExampleDocument, randomAnimate];
	relateToHTML(HTMLSourcesX);
	
	/*	除了声明的一些动作 */
	optimizeDocument();
	relateFromMap(window, PublicHTMLThings);
	
	tNexus(headmostForDocument, "load");
	
	return HTMLThings;	
}