/*	创建 BaseTool */

function createBaseTool() {
	
	var BaseTool = new Object();
	startObjectCounter(BaseTool);

	//	define 基本工具函数 默认使用的选项
	var DefaultDefineOption = 
	{
		"enumerable" : true,
		"configurable" : true
	}
	/*	基本颜色组成的数组 */
	var baseColorArray = 
	[ "aqua", "black", "blue", "fuchsia", "gray", "green", "lime", "maroon",
	  "navy", "olive", "purple", "red", "silver", "teal", "yellow", "white" ];
	
	/*	resolve 函数使用的选项 */
	var DefaultResolveOption = 
	{
		"MaxStringLength" : 24,
		"MaxCodeLength" : 64,
		"DisplayDetail" : true,
		"DisplayKey" : 1,
		"MaxMemberCounter" : 24,
		"DisplayValue" : 1
	}

	//	clone 函数的默认选项
	var DefaultCloneOption =
	{
		"SelectFunction" : 0,
		"SelectObject" : true,
		"SelectString" : true,
		"SelectNumber" : true,
		"SelectBoolean" : true,
		"SelectNull" : false,
		"MaxCloneCount" : 24
	}
	
	var DefaultDeleteSpaceOption =
	{
		"DeleteHead" : 1,
		"DeleteBody" : 1,
		"DeleteTail" : 1
	}
	
	var PublicQuickFunction =
	{
		"explain" : resolveObjectToString
	}
	
	var ObjectSource1 = 
	{
		"DefaultDefineOption" : DefaultDefineOption,
		
		"BaseColorArray" : baseColorArray,
		
		"DefaultResolveOption" : DefaultResolveOption,
		
		"DefaultCloneOption" : DefaultCloneOption,
		
		"DefaultDeleteSpaceOption" : DefaultDeleteSpaceOption
	}
	relateFromMap(BaseTool, ObjectSource1);
	
	/*	开始为一个对象 计算成员数量 */
	function startObjectCounter(object) {	
		object.totalSize = 0;
		object.EnableCounter = true;
		
		return object;
	}
	
	/*	停止为一个对象的 成员计算 */
	function endObjectCounter(object) {
		object.EnabelCounter = false;
		
		return object;
	}
	
	/*	获得 一个默认参数 */
	function argumentFromDefault(sourceArgument, DefaultArgument) {
		
		if(isExsit(sourceArgument) == false) {
			sourceArgument = new Object();
		}
		
		for(var keyName in DefaultArgument) {
			
			var currentInSource = sourceArgument[keyName];
			var currentInDefault = DefaultArgument[keyName];
			
			if(isExsit(currentInSource) == false) {
				sourceArgument[keyName] = currentInDefault;
			}
		}

		return sourceArgument;
	}
	
	/*	这里假设 存在一个 参数对象， 然后返回一条 声明文本 */
	function getArgumentsDefine(Arguments, ArgumentsName, argumentIndex) {
		
		var defineCode;
		var _thisFunction = getArgumentsDefine;
		
		if(isExsit(Arguments) == false) {			
			var _thisCaller = _thisFunction.caller;
			
			argumentIndex = argumentIndex || 1;
			Arguments = _thisCaller.arguments[argumentIndex];
		}
		
		defineCode = raiseScopeFromObject(ArgumentsName, Arguments);
		
		return defineCode;
	}
	
	/*	根据 cloneOption 复制一个对象 选择包括 成员类型
	筛选器 */
	function clone(sourceObject, cloneOption) {
		
		cloneOption = argumentFromDefault(cloneOption, DefaultCloneOption);
		
		var newObject = new Object();
		
		var memberCounter = 0;
		for(var keyName in sourceObject) {
			
			var currentMember = sourceObject[keyName];
			var memberType = typeof(currentMember);
			
			var filterResult;
			
			switch(memberType) {
				
				case "function":
				filterResult = cloneOption["SelectFunction"];
				break;
				
				case "object":
				{
					if(currentMember == null) {
						filterResult == cloneOption["SelectNull"];
					}
					else {
						filterResult = cloneOption["SelectObject"];
					}
				}
				break;
				
				case "Number":
				filterResult = cloneOption["SelectNumber"];
				break;
				
				case "Boolean":
				filterResult = cloneOption["SelectBoolean"];
				break;
				
				case "undefined":
				filterResult = cloneOption["SelectNull"];
				
			}
			
			if(filterResult == true) {
				newObject[keyName] = currentMember;
				
				var MaxMemberCount = cloneOption["MaxCloneCount"];
				if(++memberCounter >= MaxMemberCount) {
					break;
				}			
			}
			
		}
		
		return newObject;
	}
	/*	inherit 修改 baseClass 的原型链， 它的 prototype 为 superClass
	的一个实例 */
	function inherit(baseClass,superClass) {
		
		function getClassName() {
			return superClass.name;
		}

		relate(seed,getClassName);
		
		superClass.prototype = new baseClass();
		define("ClassName",getClassName,null,superClass.prototype);
		
		return superClass;
	}
	
	/*	让一个对象或函数成为另一个对象的成员, target 是目标对象， source
	是源对象，如果 sign 以一个字符串被传递，那么 新成员的名字为 sign 表示
	的字符串，或者当 sign 没有指定，那么新成员的名字为 源对象或源函数的 
	name 参数指定 */
	function relate(target,source,sign) {
		
		sign = sign || source.name;
		target[sign] = source;
		
		if(target.EnableCounter == true) {
			target.totalSize++;
		}
		return target;
	}
	
	/*	把 souceArray 中包含的所有对象成员 target 目标对象的成员 */
	function relateFromArray(target, sourceArray) {
		
		for(var index = 0; index < sourceArray.length; index++) {
			
			var currentObject = sourceArray[index];
			var memberName = currentObject.name;
			
			relate(target, currentObject, memberName);
		}
		
		return target;
	}
	
	/*	sourceMap 每个成员的键名指定 新成员在 target对象中的名字 */
	function relateFromMap(target, sourceMap) {
		
		for(var keyName in sourceMap) {
			
			var currentValue = sourceMap[keyName];
			
			relate(target, currentValue, keyName);
		}
		
		return target;
	}
	
	/*	sourcesArray 的每个函数成员都会成员顶层对象 */
	function exposeFunctionFromArray(sourcesArray) {
		
		for(var index = 0; index < sourcesArray.length; index++) {
			
			var currentFunction = sourcesArray[index];
			var functionName = currentFunction.name;
			
			if(functionName) {
				window[functionName] = currentFunction;
			}
		}
		
		return sourcesArray;
	}
	
	/*	exposeObject 让 sourceObject 的每个成员成为 window的顶层对象 */
	function exposeObject(sourceObject) {
		
		for(var memberName in sourceObject) {
			
			var currentMember = sourceObject[memberName];
			window[memberName] = currentMember;
		}
		
		return sourceObject;
	}
	
	var BaseSources1 = [ startObjectCounter, endObjectCounter, argumentFromDefault, getArgumentsDefine,
	clone, inherit, relate, 
	relateFromArray, relateFromMap,exposeFunctionFromArray, exposeObject ];
	
	relateFromArray(BaseTool, BaseSources1);
	
	/*	BaseSources2 */
	/*	得到一个对象所有成员的 键名 */
	function getObjectKeyArray(sourceObject) {
		
		var resultArray = new Array();
		
		for(var keyName in sourceObject) {
			
			currentMember = sourceObject[keyName];
			resultArray.push(currentMember);
		}
		
		return resultArray;
	}
	
	/*	获得一个 对象的 字符串描述， 第二个参数 指定是否 返回 构造函数名 */
	function getTab(number) {
		
		var result = "";
		for(var index = 0; index < number; index++)
		result += "\t";
		
		return result;
	}
	
	function resolveObjectToString(sourceObject, boolReturnConstructor, level) {
		var maxLevel = 2;
		if(level >= maxLevel) {
			return sourceObject;
		}
		var _this = resolveObjectToString;
		
		level = level || 1;		
		var resultString = "";
		
		if(boolReturnConstructor == true) {
			var constructorString = "Constructor = ";
			
			constructorString += sourceObject.constructor.name;
			
			resultString += constructorString;
		}
		//resultString += "\n{"
		var memberStr;
		for(var keyName in sourceObject) {
			
			var currentMember = sourceObject[keyName];
			var currentValue;
			var memberType = typeof(currentMember);
			
			if(memberType == "function") {
				currentValue = currentMember.name;
			}
			else if(memberType == "object") {
				currentValue = _this(currentMember, null,level+1)
			}
			else {
				currentValue = currentMember;
			}
			
			memberStr += "\n\t" +keyName + ": " + currentValue;
		}
		if(isDefined(memberStr)) {
			resultString += "\n{" + memberStr + "}\n";
		}
		else {
			resultString += "{ }\n";
		}
		
		
		resultString = resultString.replace(/\n/g,"\n" + getTab(level-1));
		
		return resultString;
	}
	
	/*	返回一个包含声明语句的 字符串， 声明的值来自数组 */
	function raiseScopeFromArray(sourceArray) {
		
		var defineString = "";
		
		for(var index = 0; index < sourceArray.length; index ++) {
			var currentValue = sourceArray[index];
			
			var baseName = currentValue.replace(/.*\./g,"");
			defineString += "var " + baseName + "=";
			defineString += currentValue + ";";
			
		}
		
		return defineString;
	}
	
	/*	创建一个 声明字符串， 从 传入的对象名字 得到 对象值
	接着遍历对象连接 对象的键名 */
	function raiseScopeFromObject(ObjectName, object) {
		
		var sourceObject = object || eval(ObjectName);
		var defineString = "";
		for(var keyName in sourceObject) {
			
			defineString += "var " + keyName + "=";
			defineString += ObjectName + "['" + keyName + "'];";
		}
		
		return defineString;
	}
	
	/*	raiseScopeOptional 返回一个包含声明语句的字符串，通过传递字符串到 eval
	函数， 可以影响 作用域, 每个声明子句都是 sourceName 和 members 成员的连接 */
	function raiseScopeOptional(sourceName,members) {
		
		var string = "";
		
		for(var i = 0;i < members.length;i++) {
			var currentValue = members[i];
			var levelArray = currentValue.split(".");
			var sign = levelArray[levelArray.length-1];
			
			string += "var " + sign + "=";
			string +=sourceName;
			
			for(var j = 0;j < levelArray.length;j++) {
				string += "['" + levelArray[j] + "']";
			}
			
			string += ";";
		}
		return string;
	}
	
	/*	解释 传入的 对象名，如果 对象包含一个 名字是
	_openlist 的成员，那么 _openlist 指定的成员会被
	包含进 声明字符串 */
	function openObject(sourceObjectName) {
		
		var sourceObject = eval(sourceObjectName);
		var openList;
		var openCondition;
		
		var openObjectString = "";
		
		if(isObject(sourceObject) == true) {
			
			openList = sourceObject._openlist;
			
			if(isObject(openList) == true) {
				openCondition = true;
			}
			else {
				openCondition = false;
			}
		}
		else {
			openCondition = false;
		}
		
		if(openCondition == true) {
			
			
			openObjectString = raiseScopeOptional(sourceObjectName, openList);
		}
		
		return openObjectString;
	}
	
	/*	define 函数使用 Object 对象的defineProperty 为 targetObject
	建立一个属性， 属性可以指定 get方法 或者 set方法 */
	function define(propertyName,getter,setter,targetObject,option) {
		
		var option = DefaultDefineOption || {};
		
		relateFromMap(option, DefaultDefineOption);
		targetObject = targetObject || window;
		
		if(getter) {
			option["get"] = getter;
		}
		if(setter) {
			option["set"] = setter;
		}
		
		Object.defineProperty(targetObject,propertyName,option);
		
		return targetObject;
	}
	
	/*	创建一个声明字符串， 字符串包含 BaseTool 的所有成员 */
	function baseSupport() {
		
		return raiseScopeFromObject("BaseTool");
	}	
	
	var BaseSources2 = [ getObjectKeyArray, resolveObjectToString, raiseScopeFromArray, raiseScopeFromObject, raiseScopeOptional, openObject, define, baseSupport];
	relateFromArray(BaseTool, BaseSources2);
	
	/*	BaseSources3 */

	
	/*	判断 一个传入对象 是不是 一个字符串 */
	function isString(object) {
		return (typeof(object) == "string");
	}
	
	/* 如果传入对象的类型是一个数字， isNumber 返回真 */
	function isNumber(object) {
		return (typeof(object) == "number");
	}
	
	/*	检测对象是不是一个 布尔值 */
	function isBoolean(object) {
		return (typeof(object) == "boolean");
	}
	
	/*	如果传入参数 object 是一个函数，那么函数返回 true */
	function isFunction(object) {
		return (typeof(object) == "function");
	}
	
	/*	对 对象作类型测试， 如果是 object 类型，返回 true,
	如果 object 为 null, 返回 false */
	function isObject(object) {
		return ( (typeof(object) == "object") && (object !== null) );
	}
	
	/*	如果 对象未声明 返回 true */
	function isUndefined(object) {
		return (typeof(object) == "undefined");
	}
	
	/*	如果对象已声明 返回 真 */
	function isDefined(object) {
		return (typeof(object) !== "undefined");
	}
	
	/*	如果传入参数 有 constructor 成员 返回 true */
	function isConstructable(object) {
		return ( isObject(object) || isFunction(object) );
	}
	
	/*	如果 对象已经声明 而且不等于 null, 返回 true */
	function isExsit(object) {
		return ( isDefined(object) && (object !== null) );
	}
	
	/*	如果对象未声明 或者为 null, 返回 真 */
	function isNull(object) {
		return ! isExsit(object);
	}
	
	/*	使用 instanceof 确定 object 是否是 Class 的子类 */
	function testBaseClass(object, Class) {
		Class = Class || Object;
		
		return (object instanceof Class);
	}
	
	/* 检测 object 是不是 一个数组 */
	function isArray(object) {
		
		return testBaseClass(object, Array);
	}
	
	function isNumberString(string) {
		
		var returnResult;
		
		if(string !== "") {
			var matchResult = string.match(/[^0-9\.]+/);
			
			if(matchResult !== null) {
				returnResult = false;
			}
			else {
				returnResult = true;
			}
		}
		else {
			returnResult = false;
		}
		
		return returnResult;
	}
	var BaseSources3 = [ isString, isNumber, isBoolean, isFunction, isObject, isUndefined,
	isDefined, isConstructable, isNull, isExsit, testBaseClass, isArray, isNumberString ];
	relateFromArray(BaseTool, BaseSources3);
	
	/*	BaseSources4 */
	/* 创建 一个范围从 minValue 到 maxValue 的随机整数 */
	function createRandomInteger(maxValue, minValue) {
		
		minValue = minValue || 0;
		
		var value = Math.round( Math.random() * (maxValue-minValue) + minValue);
		
		
		return value;
	}
	
	/*	write 向文档写入字符串， 可以传递多个参数用于 源字符串的替换
	源字符串的 占位符 用 {0} 的形式表示 */
	function write(message) {
		
		for(var index = 1; index < arguments.length; index++) {
			
			var currentArgument = arguments[index];
			message.replace("{" + (i-1) + "}", currentArgument);
		}
		
		document.write(message);
	}
	
	/*	从 Arguments 数组通过指定的 开始索引 创建新 数组
	如果 Arguments 未指定， 那么它的默认值 是 sliceArguments
	调用函数的 参数 , endIndex 指定结束位置 */
	function sliceArguments(startIndex, endIndex, Arguments) {
		
		startIndex = startIndex || 0;
		Arguments = Arguments || sliceArguments.caller.arguments;
		endIndex = endIndex || Arguments.length;
		
		var returnArguments = new Array();
		
		var index = startIndex;
		while( (index < Arguments.length) && (index < endIndex)) {
			var currentArgument = Arguments[index];
			
			returnArguments.push(currentArgument);
			
			index++;
		}

		return returnArguments;
		
	}
	
	/*	字符串替换函数， 函数参数不固定，比如 参数1 替换 
	源字符串 的 "{0}" 字串 */
	function joinStringInPlaceholder(string) {
		
		for(var index = 1; index < arguments.length; index++) {
			
			var currentArgument = arguments[index];
			var searchText = "{" + (index-1) + "}";
			
			string = string.replace(searchText, currentArgument);
		}
		
		return string;
	}
	
	/*	判定一个源 如果源类型是 object, 则直接返回它
	如果是字符串，那么 假设它是一个 被分割的字符串
	调用 getObjectFromEqualString 创建一个对象并返回 */
	function decideObject(source) {
		
		var returnObject;
		
		if(isObject(source) == true) {
			returnObject = source;
		}
		else if(isString(source)) {
			returnObject = getObjectFromEqualString(source);
		}
		
		returnObject = returnObject || {};
		
		return returnObject;
	}
	
	/* functionDescribe 指定一个 描述对象 ， 它可以选择一个属性去描述一个函数 
	成员 ArgumentDefine 指定函数的 参数声明 部份， 它有一个默认值 ，声明三个参数 
	成员 functionName 指定函数名 */ 	
	function makeFunction(functionCode, functionDescribe) {
		var returnFunction;
		
		functionDescribe = decideObject(functionDescribe);
		
		var argumentDefineString = functionDescribe["ArgumentDefine"] || "arg1, arg2, arg3";
		var functionName = functionDescribe["FunctionName"] || "";
		
		var defineCode = "(function {2}({0}) { {1} })";
		functionCode = joinStringInPlaceholder(defineCode, argumentDefineString, functionCode, functionName);
		returnFunction = eval(functionCode);
		
		return returnFunction;
	}
	/*	返回一个函数， 如果 material 已经是一个函数了，那么直接
	返回它，如果 material 是一个字符串，那么 调用 makeFunction */
	function decideFunction(source, addition1) {
		
		var returnFunction;
		
		if(isFunction(source) == true) {
			
			returnFunction = source;
		}
		else if(isString(source) == true) {
			
			returnFunction = makeFunction(source, addition1);
		}
		else {
			returnFunction = null;
		}
		
		return returnFunction;
	}
	
	var BaseSources4 = [  createRandomInteger, write, sliceArguments, joinStringInPlaceholder, decideObject, decideFunction, makeFunction];
	relateFromArray(BaseTool, BaseSources4);
	
	/* 	BaseSources5 */
	/*	以 sourceObject 每个成员的值为参数 传递至 回调函数， 可以指定 回调函数
	回调函数 可以是 字符串， makeFunction 处理字符串 */
	function perValue(sourceObject, functionMaterial, callbackArguments) {
		
		var computeFunction = decideFunction(functionMaterial);
		callbackArguments = callbackArguments || [];
		
		for(var keyName in sourceObject) {
			
			var currentValue = sourceObject[keyName];
			currentArguments = [ currentValue ].concat(callbackArguments);		
			computeFunction.apply(null, currentArguments);
		}
	}
	
	/*	和 perValue 不同的是， 回调函数接收 每个成员的 键名 */
	function perKey(sourceObject, functionMaterial, callbackArguments) {
		
		var callbackFunction = decideFunction(functionMaterial);
		callbackArguments = callbackArguments || [];
		
		for(var keyName in sourceObject) {
			var currentArg = [ keyName ].concat(callbackArguments);
			
			callbackFunction.apply(null, currentArg);
		}
	}
	
	

	//	得到当前 浏览器的名字，函数使用 navigator对象的 appVersion 进行判断
	function getBrowserName() {
		var browserName;
		var version = navigator.appVersion;
		
		var browserMap = 
		{
			"dreamweaver" : "Dreamweaver",
			"chrome" : "Chrome"
		}
		
		for(var key in browserMap) {
			var currentValue = browserMap[key];
			
			var regExp = new RegExp(key,"i");
			if(regExp.test(version)) {
				browserName = currentValue;
				break;
			}
		}
		
		if(browserName == undefined) {
			browserName = version;
		}
		
		return browserName;
	}

	/* worse 使用 throw 扔出异常 */
	function worse(string) {
		
		var caller = worse.caller;
		
		var message = "";
		
		var condition = ( (caller !== false) && (caller.name !== false) );
		if(condition == true) {
			
			message = "luckly, you know what caller: " + caller.name + " \n";
		}
		
		
		if(string !== undefined) {
			message += "message: " + string;
		}
		else {
			
			message += "you throw an exception\n";
		}
		
		throw(message);
	}
	
	/*	返回对象 构造器 的名字 , 函数进行了 浏览器 检测 */	
	function getConstructorName(object) {
		var ConstructName;
		
		if(isConstructable(object) == true) {
			
			var BrowserName = getBrowserName();
			var constructor = object.constructor;
			/*	Dreamweaver 浏览器下 本地对象 的 Constructor可能是一个对象 它没有 name 属性 */
			if(BrowserName == "Dreamweaver") {
				
				var isNativeObject = isObject(constructor);
				
				if(isNativeObject == true) {
					
					var NameRegExp = new RegExp("\\w+(?=constructor)","i");
					ConstructorName = NameRegExp.exec(constructor)
				}
				else {
					ConstructorName = constructor.name;
				}
			}
			else {
				ConstructorName = constructor.name;
			}
		}
		else {
			worse("type exception at getConstructorName");
		}
		
		return ConstructorName;
	}
	
	/* 测试使用 eval 解释一段代码 如果执行正常 它会返回一个匹配对象
	否则返回一个 包含错误信息的对象 */
	function tryEval(codeString, Argument) {
		
		function tryEvalFunction() {
			return eval(codeString);
		}
		
		var result;
		
		if(isDefined(Argument) == 1) {
			eval(raiseScopeFromObject("Argument",Argument));
		}
		
		result = traceCodeReturnObject(tryEvalFunction);	
		return result;
	}
	
	/*	另一个 测试代码的函数， 它会返回一个保存信息的对象 */
	function traceCodeReturnObject(codeFunction, functionArguments) {
		
		var result;
		try {
			result = codeFunction.apply(null, functionArguments);
			
			result = 
			{ 
			"finished" : 1,
			"returnValue" : result
			}
			
		}
		catch(exception) {
			
			var message;
			if(isString(exception) == 1) {
				message = exception;
			}
			else {
				message = exception.message;
			}
			
			result = {
				"finished" : 0,
				"message" : message
			}
		}
		
		return result;
	}
	
	var BaseSources5 = [  perValue, perKey,  getBrowserName, worse, getConstructorName, tryEval ];
	relateFromArray(BaseTool, BaseSources5);
	
	/*	将一个对象转变为数组， boolIntegerMode 是适应 arguments 对象的选项 */
	function convertObjectToArray(sourceObject, boolIntegerMode) {
		
		var resultArray = new Array();
		
		if(boolIntegerMode == 1) {
			
			for(var index = 0; index < sourceObject.length; index++) {
				
				var currentValue = sourceObject[index];
				
				resultArray.push(currentValue);
			}
		}
		else {
			
			for(var keyName in sourceObject) {
				
				var currentMember = sourceObject[keyName];
				
				resultArray.push(currentMember);
			}
		}
		
		return resultArray;
	}
	
	/*	将 Arguments 参数对象 转化为一个数组，
	如果 参数未指定， 那么指定 函数调用方 的 arguments
	 对象为 默认值 */
	function getArgumentsArray(Arguments) {
		
		var returnArray = new Array();
		
		if(isUndefined(Arguments) == true) {
			
			var _thisCaller = getArgumentsArray.caller;
			Arguments = _thisCaller.arguments;
		}
		
		returnArray = convertObjectToArray(Arguments, 1);
		
		return returnArray;
	}
	
	function decide(number) {
		
		var randomNumber = createRandomInteger(1, number);
		
		return (number == 1)
	}
	var baseSources6 = [ convertObjectToArray ,getArgumentsArray, decide];
	relateFromArray(BaseTool, baseSources6);
	
	//
	function initialBase() {
		
		relateFromMap(window, PublicQuickFunction);
	}
	
	initialBase();
	
	return BaseTool;
}
