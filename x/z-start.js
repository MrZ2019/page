
function _ONSTART() {
	
	_ENV = {
		"dreamweaver" : 0,
		"chrome" : 0,
		"ie" : 0,
		"firefox" : 0
	}
	
	_CODE = {
		"error" : 0
	}
	
	_PAGE = 
	{
		"load" : false
	}
	
	_DOM = 
	{
		"extended" : false
	}
	
	_UI = 
	{
	}
	
	_LOG =
	{
		"END_LOG" : false
	}
	
	_NERVE = 
	{
	}
	
	SETUPTypeCheckAPI();
	SETUPEnvironment();
	
	bind(SETUP_ONLOAD);
	
	extendBasic();
	
	addHTMLQuickCreator();
	extendHTMLDOM();
}

function SETUP_ONLOAD() {
	
	_emit("LOADSTART");
	
	_PAGE["load"] = true;
	//	Global Variation
	body = document.body;
	head = document.tags("head")[0];
	
	ADDIntegerMark();
	//
	createSTATUSBAR();
	createMessageBAR();
	createRecordBox();
	
	buildDESK();
	//
	_emit("LOADED");
}


function relate(source, target, arg3) {
	
	var curAPI, apiName;
	
	target = target || window;
	if(_ARR(source) == true) {
		
		for(var iSrc = 0; iSrc < source.length; iSrc++) {
			curAPI = source[iSrc];
			apiName = curAPI.name;
			
			target[apiName] = curAPI;
		}
		
	}
	else if(_obj(source) == true) {
		
		if(_und(arg3) == true) {
			
			for(var kSrc in source) {
				
				curAPI = source[kSrc];
				
				target[kSrc] = curAPI;
				
			}
		}
		else {
			
			for(var iSrc = 0; iSrc < source.length; iSrc++) {
				
				apiName = arg3[iSrc];
				
				target[apiName] = source[apiName];
			}
		}
	}
	else if(_fun(source) == true) {
		
		apiName = arg3 || source.name;
		
		target[apiName] = source;
	}
}

function define(propName, getter, setter, target, option) {
	
	var DEFAULTDefineOption =
	{
		"enumerable" : 0
	}
	
	target = target || window;
	
	if(_obj(option) == 1) {
		for(var key in option) {
			
			var curValue = option[key];
			
			DEFAULTDefineOption[key] = curValue;
		}
	}
	
	if(getter) {
		DEFAULTDefineOption["get"] = getter;
	}
	
	if(setter) {
		DEFAULTDefineOption["set"] = setter;
	}
	
	Object.defineProperty(target, propName, DEFAULTDefineOption);
}

function quickDefine(propName, address, target, opt) {
	
	function QUICK_Getter() {
		
		return eval(address);
	}
	
	function QUICK_Setter(value) {
		
		eval(address) = value;
	}
	
	define(propName, QUICK_Getter, QUICK_Setter, target, opt);
}

/*	向 document 写入文本 */
function _write(text) {
	document.write(text);
	
	return document;
}


function _notify(text, flag) {
	
	if(_CODE["error"] || _LOG["END_LOG"]) {
		return;
	}
	
	var msgBAR = _UI["message"];
	
	if(_und(msgBAR) == 1) {
		_write(text);
	}
	else {
		msgBAR.setClass("notify");
		msgBAR.innerHTML = text;
	}
	
	if(_und(flag) == false) {
		
		switch(flag) {
		
			case "END":
			{
				_LOG["END_LOG"] = true;
			}
			break;
		}
		
	}
}

//	输出文本至 record 元素
function _ouput(txt) {
	
	var record = _UI["record"];
	
	if(txt == false) {
		
		record.HTML = "";
	}
	else {
		record.HTML += txt;
	}
	
	return record;
}

function _ouputln(txt) {
	
	return _ouput(txt + "\n");
}

/*	添加事件处理函数 */
function bind(callback, type, target, useCapture) {
	
	function NORMALCallback() {
		_guard(callback);
	}
	
	function DEFAULTCallback() {
		
		var eventDesc = "";
		
		var eventType = event.type;
		var eventTarget = event.target;
		
		eventDesc = "event " + eventType + " on " + eventTarget + "\n";
		
		var msgBAR = _UI["message"];
		if(msgBAR) {
			msgBAR.innerHTML = eventDesc;
			msgBAR.setClass("event");
		}
		else {
			_write(eventDesc);
		}
		
		return true;
	}
	
	useCapture = useCapture || false;
	target = target || window;
	
	if(type == undefined) {
		if(target == window) {
			type = "load";
		}
		else {
			type = "click";
		}
	}
	
	callback = callback || DEFAULTCallback;
	
	target.addEventListener(type, NORMALCallback, useCapture);
}

function unbind(callback, type, object, useCapture) {
	
	useCapture = useCapture || false;
	object = object || window;
	
	if(object == window) {
		type = "load";
	}
	else {
		type = "click";
	}
	
	var reVal = object.removeEventListener(type, callback, useCapture);
	
	return reVal;
}

function _guard(code, Argument) {
	
	function setMessage() {
		
		var msgText;
		
		if(_ENV["Dreamweaver"] == 1) {
			msgText = error.name + " at line " + error.line + ": " + error.message;
		}
		else if(_ENV["chrome"] == 1) {
			var stack = error.stack;
			
			var lineNumber = stack.search(/\d+(?=:\d+)/)[0];
			
			var fileName = stack.match(/[^\/]+(?=:\d+:\d+)/g)[0];
			
			
			msgText = "[" + fileName + "]" + 
			error.name + " at line " + 
			lineNumber + ": " +  error.message ;

		}
		else {
		}
		
		var msgBAR = _UI["message"];	
		msgBAR.setClass("error");		
		
		msgBAR.innerHTML = msgText;
	}
	
	function handleError() {
		var message = error.message;
		
		if(_PAGE["load"] == 1) {	
			setMessage();
		}
		else {
			_write(message);
		}	
	}
	
	try {
		var error;
		
		code.apply(null, Argument);
	}
	catch(exception) {
		error = exception;
		
		handleError();
		_CODE["error"] = 1;
	}
}

//	初始化代码
_guard(_ONSTART);