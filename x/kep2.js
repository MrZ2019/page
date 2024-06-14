
/*	声明 很多非函数的 对象 */

function defineObjects() {
	
	eval(_support([ "seed" ]));
	
	var mapManager = x.PrimaryManager;
	
	/*	将 sourcesMap 中包含的对象附加至 MapManager */
	function shipToManager(sourcesMap) {
		
		for(var keyName in sourcesMap) {
			var currentObject = sourcesMap[keyName];
			
			mapManager.addElement(currentObject, keyName);
		}
	}
	/*	ShortCSSSet 保存部分 CSS 属性名 */
	var ShortCSSSet = new Set();
	var CSSPositionList = 
	[ "display", "width", "height", "position", "top", "left", "right", "bottom",
	"margin", "padding" ];
	
	var CSSTextList = 
	[ "color", "fontSize"];
	
	var CSSVisualList = [ "background", "opacity", "visibility" ]
		
	ShortCSSSet.extendFromArray(CSSPositionList);
	ShortCSSSet.extendFromArray(CSSTextList);
	ShortCSSSet.extendFromArray(CSSVisualList);
	
	/*	ShortEvnetSet 存储事件名，它会在建立快捷函数时使用  */
	var ShortEventSet = new Set();
	
	var EventList = [ "click", "dblclick", "mousedown", "mousemove", "mouseup",
	"mouseover", "mouseout", "keydown", "keyup", "keypress"];
	
	ShortEventSet.extendFromArray(EventList);
	
	//
/*	var ArrayExtendFunctionList = [ eachValue, ArrayAndOperate, ArrayOrOperate ]*/
	/*	ShortTagMap 的键是 HTML标签，其值是 标签对应的属性 */
	var ShortTagMap = new Map();
	
	var tagObject = 
	{
		"a" : ["href","innerHTML"],
		"div" : ["innerHTML","className","id"],
		"img" : ["src","id"],
		"p" : ["innerHTML", "className", "id"],
		"li" : ["innerHTML","className", "id"],
		"form" : ["id","className","action","method"],
		"tr" : ["ClassName"],
		"td" : ["innerHTML","className"]
	}
	
	ShortTagMap.extendFromObject(tagObject);
	
	/*	增强对象 的功能 */
	var ObjectExtension = 
	{
		"perKey" : 
		function() {
			var Arguments = getArgumentsArray();
			Arguments.unshift(this);
			perKey.apply(null, Arguments);	
		}
		
	}
	
	/*	处理数组对象的 扩展对象 */	
	var ArrayExtension = 
	{
		"eachValue" :
		function() {
			var Arguments = getArgumentsArray();
			Arguments.unshift(this);
			
			var eachValueFunction = mapManager.getObject("eachValue");
			eachValueFunction.apply(null, Arguments);
		} ,
		
		"mapArray" :
		function() {
			var Arguments = getArgumentsArray();
			Arguments.unshift(this);
			
			var mapArrayFunction = mapManager.getObject("mapArrayToArray");
			var mapResult = mapArrayFunction.apply(null, Arguments);
			
			return mapResult;
		} ,
		
		"filterArray" :
		function() {
			var Arguments = getArgumentsArray();
			Arguments.unshift(this);
			
			var filterArrayFunction = mapManager.getObject("filterArray");
			var filterResult = filterArrayFunction.apply(null, Arguments);
			
			return filterResult;
		} ,
		
		"andOperate" :
		function(array2, array3) {
			var Arguments = getArgumentsArray();
			Arguments.unshift(this);
			
			var andFunction = mapManager.getObject("arrayAndOperate");
			var andResult = andFunction.apply(null, Arguments);
			
			return andResult;
		} ,
		
		"orOperate" :
		function(array2, array3) {
			var Arguments = getArgumentsArray();
			Arguments.unshift(this);
			
			var orFunction = mapManager.getObject("arrayOrOperate");
			var orResult = orFunction.apply(null, Arguments);
			
			return orResult;
		}
	}
	
	var ArrayOptimizeMap = 
	{
		"each" : "eachValue",
		"map" : "mapArray",
		"filter" : "mapFilter",
		"and" : "andOperate",
		"or" : "orOperate"
	}
	
	var ObjectSection1 = 
	{
		"ShortCSSPropertyNameSet" : ShortCSSSet,
		
		"ShortEventNameList" : ShortEventSet,
		
		"ShortTagNameMap" : ShortTagMap,
		
		"ObjectExtension" : ObjectExtension,
		
		"ArrayExtension" : ArrayExtension,
		
		"ArrayOptimizeMap" : ArrayOptimizeMap
	}
		
	shipToManager(ObjectSection1);
	return mapManager;
}

/*	defineFunctions 声明的函数很多 ，它返回一个对象保存所有的函数引用 */

function defineFunctions() {
	
	eval(_support([ "Monitor", "seed" ]));
	
	var PublicObjects = 
	{
		"quickDefine" : quickDefine,
		"repeat" : getRepeatCount
	}
	
	var mapManager = x.PrimaryManager;
	
	var moduleManager = x.ModuleManager;
	
	var pushMembers = x.pushToPrimaryManager;
	var loadModule = moduleManager.loadModule;
	
	eval(madeRoute());
	
	/*	制作一条 "通路" ， 让 原来 MapManager 中的成员进入 "空间" */
	function madeRoute() {
		return mapManager.makeAllElementDefine();
	}
	
	//	将一个对象的成员复制到另一个对象上，第三个参数 optionMember 可选，它指定需要复制的源对象的成员
	function carryObject(sourceObject, targetObject, optionMember) {
		
		if(isUndefined(optionMember) == false) {
			
			for(var index = 0; index < optionMember.length; index++) {
				var currentMemberName = optionMember[index];
				
				targetObject[currentMemberName] = sourceObject[currentMemberName];
			}
		}
		else {
			
			for(var keyName in sourceObject) {
				var currentValue = sourceObject[keyName];
				
				targetObject[keyName] = currentValue;
			}
		}
		
		return sourceObject;
	}
	
	/*	删除 targetObject 对象的成员，如果 optionalMember 未指定，那么 targetObject 拥有的
	所有与 specifyObject 对象键名相同的成员会被删除，如果 optionalMember 指定了，那么此数组
	包含需要删除的成员的键名， specifyObject 不会起作用 */
	
	function deleteObjectInAnother(targetObject, specifyObject, optionalMember) {
		
		if(optionalMember instanceof Array) {
			specifyObject = null;
			
			for(var counter = 0; couter < optionalMember.length; counter++) {
				var currentValue = optionalMember[counter];
				
				delete targetObject[currentValue];
			}
		}
		else {
			for(var keyName in specifyObject) {
				delete targetObject[keyName];
			}
		}
		
		return targetObject;
	}
	
	/*	code 指定一个函数作为参数传递， 使用 try.catch 语句包围， codeArguments 是
	调用 code 时使用的参数， 如果未捕捉到任何异常，那么 successCallback 会在 code 调用
	后执行，如果 catch 代码块获得异常，errorCallback 会被调用 */
	function testFunction(code, codeArguments, errorCallback, successCallback) {
		
		try {
			
			code.apply(null, codeArguments);
			if(successCallback) {
				
				successCalback();
			}
		}
		catch(exception) {
			if(errorCallback) {				
				errorCallback(exception);
			}
			else {
				
				var msg = exception.message;
				
				alert(msg);
			}
		}
		
		return code;
	}
	
	/*	分析一个像 "A=a,B=b" 的字符串，它返回一个对象，对象的成员由 源
	字符串的字串组成，字串由逗号分割，每个字串中，等号之前是成员的名字，
	等号之后是成员的 值 */
	function analyseStringToObject(sourceString) {
		
		var returnObject = new Object();
		
		var splitArray = sourceString.split(",");
		
		for(var counter = 0; counter < splitArray.length; counter) {
			var keyName,value;
			
			var currentItem = splitArray[counter];
			
			keyName = currentItem.match(/.+(?==)/);
			value = currentItem.replace(keyName, "");
			
			returnObject[keyName] = value;
		}
		
		return returnObject;
	}
	
	var kepPart1 = [ carryObject, deleteObjectInAnother, 
	testFunction, analyseStringToObject];
	
	pushMembers(kepPart1);
	
	/*	KepPart2 */
	
	/*	toogleShortCSS 为 HTML 对象添加属性, 属性指向对应的 CSS 属性 */
	function toggleShortCSS(bool) {
		
		var CSSPropertyList = mapManager.getObject("shortCSSPropertyNameSet");
		
		return CSSPropertyList;
	}
	
	/*	Google Chrome 浏览器下 异常信息 输出函数 */ 
	function printErrorInChrome(exception) {
		
		var errorString = "";
		
		errorString = exception.stack;
		
		return errorString;
	}
	
	/*	如果发生错误， 而且 当前浏览器是著名网页开发工具 Dreamweaver, 那么
	此函数可能会调用 */
	function printErrorInDreamweaver(exception) {
		
		d2 += "enter dreamweaver";
		var errorName = exception.name;
		var errorLineNumber = exception.line;
		var errorMessage = exception.message;
		
		var errorText = "Dreamweaver discover " + errorName;
		errorText += " at line " + errorLineNumber + ".\n";
		errorText += "\n";
		errorText += errorMessage;
		
		return errorText;
	}
	
	/*	一个回调函数，发生错误时被调用 */
	function testCodeErrorCallback(exception, eventInfo) {
		
		var getBrowser = mapManager.getObject("getBrowserName");
		var printInChrome = mapManager.getObject("printErrorInChrome");
		var printInDreamweaver = mapManager.getObject("printErrorInDreamweaver");
		
		var errorMessage = exception.message;	
		
		var currentBrowser = getBrowser();
		switch(currentBrowser) {
			case "Chrome":
			errorMessage = printInChrome(exception);
			break;
			
			case "Dreamweaver" :
			errorMessage = printInDreamweaver(exception);
			break;
			
			default :
			errorMessage = exception.message;
		}
		
		var getPageinfo = mapManager.getObject("getPageinfo");
		var ouputMessageToView = mapManager.getObject("ouputErrorMessageToView");
		
		var conditionForOuput = getPageinfo("DebugViewIsCreated");
		
		if(conditionForOuput == true) {
			ouputMessageToView(errorMessage);
		}
		else {
			alert(errorMessage);
		}
	}
	
	/*	测试一个函数， 相关信息可以输出至 一个 HTML 块级对象 */
	function testCodeForView(code) {
		
		var testCodeErrorCallback = mapManager.getObject("testCodeErrorCallback");
		
		var codeArguments = new Array();
		
		for(var index = 1; index < arguments.length; index++) {
			
			var currentArgument = arguments[index];
			codeArguments.push(currentArgument);
		}
		
		testFunction(code, codeArguments, testCodeErrorCallback, null)
	}

	
	var kepPart2 = [ toggleShortCSS, printErrorInChrome, printErrorInDreamweaver, 
	testCodeErrorCallback, testCodeForView];
	
	pushMembers(kepPart2);
	
	/* kepPart3 */
	
	/*	getPageinfo 得到键名是 keyName 的页面信息 */
	function getPageinfo(keyName) {
		
		var Information = loadModule("Information");
		var pageInformation = Information.PageInformation;
		
		var result = pageInformation[keyName];
		
		return result;
	}
	
	/*	setPageinfo 设置页面信息 */
	function setPageinfo(keyName, value) {
		
		var Information = loadModule("Information");
		var pageinfo = Information.PageInformation;
		
		var previousValue = pageinfo[keyName];
		
		pageinfo[keyName] = value;
		
		return previousValue;
	}
	
	//	optional
	function ouputErrorMessageToView(errorText) {
		
		d2 = errorText;
	}
	
	/*	制造一个异常对象 , 可以自定义 objectData 对象
	用以 保存一些数据 */
	function terminateScript(someText, objectData) {
		someText = someText || "you terminate script.";
		
		var TerminatorObject = new Object();
		TerminatorObject.message = someText;
		TerminatorObject.objectData = objectData;
		
		throw TerminatorObject;
	}
	
	/*	传入的字符串由 逗号 分割， 每个字串 的形式是
	name=value ,返回一个对象 */
	function getObjectFromEqualString(sourceString) {
		
		var returnObject = new Object;
		
		splitClauseArray = sourceString.split(",");
		
		for(var index = 0; index < splitClauseArray.length; index++) {
			
			var memberName, memberValue;
			var currentClause = splitClauseArray[index];
			
			memberName = currentClause.match(/.+(?==)/);
			memberValue = currentClause.replace(memberName + "=", "");
			
			returnObject[memberName] = memberValue;
		}
		
		return returnObject;
	}
	var kepPart3 = [ getPageinfo, setPageinfo, ouputErrorMessageToView, terminateScript,
	getObjectFromEqualString ];
	pushMembers(kepPart3);
	
	/*	loopCode 处理一个 代码字符串， times 指定执行的次数
	passArguments 包含需要在 代码块使用的对象， 对象在 loopCode
	的命名方式是 x0,x1... */
	function loopCode(codeString, times, passArguments) {
		
		if(isArray(passArguments) == 1) {
			
			for(var counter = 0; counter < passArguments.length; counter++) {
				var currentArugment = passArguments[counter];
				
				var varString = "var x" + counter + "=passArguments[counter]";
				eval(varString);
			}
		}
		else if(isObject(passArguments) == true) {
			
			for(var keyName in passArguments) {
				
				var varString = "var " + keyName + "=passArguments[keyName]";
				eval(varString);
			}
		}
		
		for(var number = 0; number < times; number++) {
			
			eval(codeString);
		}
	}
	
	/*	循环执行指定的函数一定次数， 可以传递 函数参数和 作用域对象 */
	function loopFunction(FunctionObject, times, functionArguments, scopeObjet) {
		
		for(var counter = 0; counter < times.length; counter++) {
			
			FunctionObject.apply(scopeObject, functionArguments);
		}
	}
	
	/*	从一个对象或者数组 关联至 x 对象 */
	function relateToX(sources) {
		
		if(isArray(sources) == 1) {
			relateFromArray(x, sources);
		}
		else if(isObject(sources) == 1) {
			relateFromMap(x, sources);
		}
		else {
			worse("parameter error");
		}
	}
	
	/*	调用 tryEval 解释一段代码， 如果解释正常，
	那么返回 returnValue */
	function getTryEval(code) {
		
		var evalResult = tryEval(code);
		var returnValue;
		
		if(evalResult.finished == 1) {
			
			returnValue = evalResult.returnValue;
		}
		else {
			returnValue = "[Parse Error]";
		}
		
		return returnValue;
	}
	
	/*	为一个对象 声明一个属性， 只需指定一个 对象的 访问地址，不需要指定 getter 和 setter 
	如果只需要一个 访问器 那么可以在 defineOption 中指定一个 disableGetter 或者 disableSetter 
	这里假设 addressExpress 指向的对象不变 ，对象在每次 调用 访问器时解释
	另外 如果在 添加一个 callFunctionStyle 那么 addressExpress 指向一个函数 在 Setter 中被调用*/
	function quickDefine(propertyName, addressExpress, targetObject, defineOption) {
		
		//	传递 至 define 的 Getter参数
		function quickGetter() {
			var evalResult = getTryEval(addressExpress);
			
			return evalResult;
		}
		
		//	对象属性的 Setter 访问器
		function quickSetter(value) {
			if(isString(value) == 1) {
/*			    value = value.replace(/\r/g,"\\r").replace(/\n/g, "\\n").replace(/"/g,"\\\"").replace(/'/g,"\\\'")						
				value = "'" + value + "'";*/
			}
			
			var evalCode = addressExpress + " = value";
			
			var evalArg = 
			{
				"value" : value
			}
			tryEval(evalCode, evalArg);
		}
		
		/*	如果 callFunctionStyle 被指定 那么只有 一个访问器*/
		function callStyleSetter(value) {
			var callFunction = addressExpress;
			callFunction.call(null, value);
		}
		
		defineOption = defineOption || [];
		
		if(defineOption["CallFunctionStyle"] == 1) {
			quickSetter = callStyleSetter;
		}
		
		else {
			if(defineOption["DisableGetter"] == true) {
				quickGetter = null;
			}
			
			if(defineOption["DisableSetter"] == true) {
				quickSetter = null;
			}
		}
		define(propertyName, quickGetter, quickSetter, targetObject, defineOption);
	}
	
	/*	从一个 对象 声明多个属性， 属性共享一个 目标对象， 一个默认选项
	如果 在选项中 PrefixAddress 指定， 那么在 声明之前为 保存 对象地址 的
	键值 加上 前缀 */
	function defineFromMap(sourceMap, target, defineOption) {
		
		if(isDefined(defineOption) == 1) {
			relateFromArray(defineOption, DefaultDefineOption);
		}
		else {
			defineOption = DefaultDefineOption;
		}
		
		var PrefixAddress = defineOption["PrefixAddress"] || "";
		
		for(var propertyName in sourceMap) {
			
			var currentAdress = sourceMap[propertyName];
			
			currentAdress = PrefixAddress + currentAdress;
			quickDefine(propertyName, currentAdress, target, defineOption);
		}
	}
	
	/*	将 HTML 代码中 括号 替换为对应的转义字符 */
	function transferHTMLToEntity(HTMLCode) {
		var returnString = HTMLCode.replace(/</g, "&lt;").replace(/>/g, "&gt;");
		
		return returnString;
	}
	
	/*	一个 对象 到 字符串的函数 */
	function singleCorrespondDisplay(object) {
		
		var resultString;
		
		if(isObject(object) == true) {
			resultString = getConstructorName(object);
			
		}
		else if(isFunction(object)) {
			resultString = "function";
		}
		else {
			resultString = object;
		}
		
		return resultString;
	}
	
	/*	分析一个对象 返回一个 描述字符串  displayOption 指定选项 */
	function resolveObjectCorrespondDisplay(object, displayOption) {
		
		var resultString = "";
		var objectDescribeText = "";
		var detailText = "";
		
		if(isDefined(displayOption) == true) {
			relateFromAny(displayOption, DefaultResolveOption);
		}
		else {
			displayOption = DefaultResolveOption;
		}
		
		eval(raiseScopeFromObject("displayOption", displayOption));
		
		var objectType = typeof(object);
				
		if(isObject(object) == 1) {
			
			objectDescribeText += "{\n";
			
			var memberCounter = 0;
			
			for(var keyName in object) {
				
				if(++memberCounter < MaxMemberCounter) {				
					var currentValue = object[keyName];
					currentValue = singleCorrespondDisplay(currentValue)
					
					if(DisplayKey == 1) {
						objectDescribeText += keyName + " : "
					}
					
					if(DisplayValue == 1) {
						
						if(isString(currentValue) == 1) {
							
							currentValue = currentValue.substr(0, MaxStringLength);
						}
						objectDescribeText += currentValue;
					}
					
					objectDescribeText += "\n";
				}
			}
			
			objectDescribeText += "}\n";
			resultString += objectDescribeText;
			
			if(DisplayDetail == 1) {
				detailText += "total member : " + memberCounter + "\n";
				
				var constructorName = getConstructorName(object);
				detailText += "constructor : " + constructorName + "\n";
			}
		}
		else if(isFunction(object) == 1) {
			var functionString = object.toString();
			
			resultString += functionString.substr(0, MaxCodeLength) + "\n";
			
			if(DisplayDetail == 1) {
				detailText += "function name : " + object.name;
			}
			
		}
		else {
			resultString += object;
		}
		
		resultString += "\ntype : " + objectType + "\n";
		resultString += detailText;
		
		resultString = transferHTMLToEntity(resultString);
		
		return resultString;
	}
	
	/*	删除 字符串中 空白字符 ，deleteOption 指定 空白所处的位置 */
	function deleteSpaceFromString(sourceString, deleteOption) {
		
		deleteOption = argumentFromDefault(deleteOption, DefaultDeleteSpaceOption);
		eval(getArgumentsDefine(deleteOption, "deleteOption"));
		
		var resultString = sourceString;
		var spaceRegExp = new RegExp();
		if(DeleteHead == true) {
			spaceRegExp.compile(/^\s+/);
			resultString = resultString.replace(spaceRegExp, "");
		}
		
		if(DeleteBody == true) {
			var firstSIndex = resultString.search(/\S/);
			var headSpace = resultString.substring(0, firstSIndex);
			
			spaceRegExp.compile(/\s+(?=\S)/g);
			resultString = resultString.replace(spaceRegExp, "");
			resultString = headSpace + resultString;
		}
		
		if(DeleteTail == true) {
			spaceRegExp.compile(/\s+$/);
			resultString = resultString.replace(spaceRegExp, "");
		}
		
		return resultString;
	}
	
	var kepPart4 = [ loopCode, loopFunction, getTryEval, quickDefine, defineFromMap, transferHTMLToEntity, singleCorrespondDisplay, resolveObjectCorrespondDisplay, deleteSpaceFromString ];
	pushMembers(kepPart4);

	/*	eachValue 以每个数组的 值 作为参数依次调用 回调函数 */
	function eachValue(sourceArray, functionMaterial, callbackArguments) {
		
		var processor = decideFunction(functionMaterial);
		callbackArguments = callbackArguments || [];
		
		for(var index = 0; index < sourceArray.length; index++) {
			
			var currentValue = sourceArray[index];
			var generateArgument = [ currentValue ].concat(callbackArguments);
			
			processor.apply(null, generateArgument);
		}
	}	
	/*	数组生成函数， 将 源数组的每一个值 传入 processor 生成一个值， 
	如果 boolReplaceSource 指定为 真， 那么使用 新值 替换源数组索引相同的值
	如果 第三个参数没有指定 则修改另一个数组 */
	function mapArrayToArray(sourceArray, processor, boolReplaceSource) {
		
		if(boolReplaceSource == true) {
			manipulateArray = sourceArray;
		}
		else {
			manipulateArray = new Array();
		}
		
		if( (isString(sourceArray) == true) && ! isNull(processor) ) {
			
			processor = mapArrayStringTestProcessor;
		}
		
		for(var index = 0; index < sourceArray.length; index++) {
			
			var currentValue = sourceArray[index];
			
			var returnValue = processor(currentValue);
			manipulateArray[index] = returnValue;
		}
		
		return manipulateArray;
	}
	
	/*	mapArrayToArray 的 测试处理函数， 这里把 字符串当成一个数组
	返回字符串的每个字符对应的 Ascii 编码 */
	function mapArrayStringTestProcessor(character) {
		
		var returnValue = character.charCodeAt(0);
		return returnValue;
	}
	
	/*	传递 源数组 的每一个值 至 processor ,如果返回真，
	当前值会被保留， 否则丢弃， boolReplace  指定是否操作
	源 */
	function filterArray(source, processor, boolReplace) {
		
		operateArray = new Array();
	
		if(isNull(processor) == true) {
			processor = filterArrayTestNumberProcessor;
		}
		
		var operateCounter = 0;
		for(var counter = 0; counter < source.length; counter++) {
			
			var currentItem = source[counter];
			
			var filterValue = processor(currentItem);
			
			if(filterValue == true) {
				operateArray[operateCounter++] = currentItem;
			}
		}
		
		if(boolReplace == true) {
			source.splice(0);
			
			for(var index = 0; index < operateArray.length; index++) {
				source[index] = operateArray[index];
			}
		}
		
		return operateArray;
	}
	
	/*	filterArray 函数的 测试函数， 该 处理函数 只返回数字类型的值 */
	function filterArrayTestNumberProcessor(value) {
		var returnBool;
		returnBool = isNumber(value);
		
		return returnBool;
	}
	
	/*	如果 value 在指定数组中存在， 那么返回 true 否则 返回 false */
	function checkValueInArray(sourceArray, value) {
		
		var boolResult = false;
		
		for(var index = 0; index < sourceArray.length;index++) {
			var currentValue = sourceArray[index];
			
			if(currentValue == value) {
				boolResult = true;
				break;
			}
		}
		
		return boolResult;
	}
	
	/*	所有的参数均为数组， 执行数组的 与 运算， 返回一个新数组，
	它的每个成员在 为所有参数数组共有 */
	function arrayAndOperate(array1, array2, array3) {
		
		var returnArray = new Array();
		
		arrayCount = arguments.length;
		
		var originalArray = arguments[0];
		for(var counter = 0; counter < originalArray.length; counter++) {
			
			var originalValue = originalArray[counter];
			
			var checkResult = true;
			for(var nestCounter = 1; nestCounter < arrayCount; nestCounter++) {
				
				var currentCheckArray = arguments[nestCounter];
				
				if(checkValueInArray(currentCheckArray, originalValue) == false) {
					checkResult = false;
					break;
				}
			}
			
			if(checkResult == true) {
				returnArray.push(originalValue);
			}
		}
		
		return returnArray;
	}
	
	/*	执行数组的 或运算， 返回的数组在 任意一个数组中存在，
	值不重复 */
	function arrayOrOperate(array1, array2, array3) {
		
		var returnArray = new Array();
		
		var arrayCount = arguments.length;
		
		for(var counter = 0; counter < arrayCount; counter++) {
			
			var currentArray = arguments[counter];
			
			for(var nestCounter = 0; nestCounter < currentArray.length; nestCounter++) {
				
				var currentValue = currentArray[nestCounter];
				
				if(checkValueInArray(returnArray, currentValue) == false) {
					returnArray.push(currentValue);
				}
			}
		}
		
		return returnArray;
	}
	var kepPart5 = [ eachValue, mapArrayToArray, mapArrayStringTestProcessor, filterArray, filterArrayTestNumberProcessor, checkValueInArray, arrayAndOperate, arrayOrOperate ];
	
	pushMembers(kepPart5);
	
	//	kepPart6
	
	function installArrayExtend(targetObject) {
		
		relateFromMap(targetObject, ArrayExtension);
		
		return targetObject;
	}
	
	function extendArrayProto() {
		
		var ArrayProto = Array.prototype;
		
		var result = installArrayExtend(ArrayProto);
		
		return result;
	}
	
/*	function returnShortArrayFunction(functionName) {
		
		var ArrayProto = Array.prototype;
		
		function NormalShortArrayFunction() {
			
			var Argument = getArgumentsArray();
			Argument.unshift(this);
			
			var result = ArrayProto.apply(null, Argument);
			
			return result;
		}
	}*/
	
	function optimizeArrayProto() {
		
		var nameMap = ArrayOptimizeMap;
		
		var ArrayProto = Array.prototype;
		
		for(var shortName in nameMap) {
			
			var currentName = nameMap[shortName];
			
			ArrayProto[shortName] = ArrayProto[currentName];
		}
	}
	
	function getRepeatCount(sourceString,findStr) {
		
		var reg = new RegExp(findStr, "g");
		
		var result = sourceString.match(reg);
		
		if(result !== null) {
			result = result.length;
		}
		else {
			result = 0;
		}
		
		return result;
	}
	
	function stringToEsse(sourceStr) {
		
		var result = sourceStr.replace(/\n/g, "\\n");
		
		return result;
	}
	var kepPart6 = [ installArrayExtend, extendArrayProto, optimizeArrayProto, getRepeatCount ];
	
	pushMembers(kepPart6);
	
	//
	relateFromMap(window, PublicObjects);
	return mapManager;
}