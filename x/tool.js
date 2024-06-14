
function analyzeCode(source, maxLevel) {
	
	maxLevel = maxLevel || 1;
	source = source || z;
	
	var expStr = "\\s*function\\s+"
	var expPart = "((\\s*function\\s[^}]+})|({[^}]*})*|[^}])+";
	expP2 = "({[^{]*})*";
	
	var fUnit = "\\s*function\\s+[^{]*{({fUnit}|{block}|([^}]*))+}";
	
	var blockUnit = "({({unit}|[^}])*})";
	var blockStr = blockUnit;
	for(var iBlock = 1; iBlock < 1; iBlock++) {
		blockStr = blockStr.replace("{unit}", blockUnit);
	}
	blockStr = blockStr.replace("{unit}" ,"");
	
	var startStr = fUnit;
	
	var expLong = startStr;
	for(var i = 1;i < 2; i++) {
		expLong = expLong.replace("{fUnit}", fUnit);
		expLong = expLong.replace("{block}", blockStr);
	}
	
	expLong = expLong.replace("{fUnit}", "");
	expLong = expLong.replace("{block}", "");	
	//expStr = startStr + expLong + "}";
	
	return expLong;
	
	var reg = new RegExp(expStr,"g");
	
	var code;
	if(typeof(source) == "function") {
		code = source.toString();
	}
	else {
		code = source;
	}
	
	code = code.match(/{[^]*}/g)[0];
	
	var strArray = code.match(reg);
	
	var describer = new Object();
	
	if(strArray) {
		for(var index = 0; index < strArray.length; index++) {
			var curStr = strArray[index];
			
			var funcName = curStr.match(/[^(\s]+(?=[(])/);
			
			describer[funcName] = analyzeCode(curStr);
		}
	}
	
	return describer;
}

var manager = x.PrimaryManager;
var quick = manager.getHeap();;
var html = x.HTMLThings;

function alarm() {
	var i = 0;
}

var vitalNode = new Object();

function createRemain() {
	var node = div("some text", "Remind", "defaultRemind").depend();
	node.hide();
	vitalNode["Remind"] = node;
	
	var defREOption =
	{
		"CallFunctionStyle" : true
	}
	quickDefine("re", remind, window, defREOption);
}

function remind(text, second) {
	var node = vitalNode["Remind"];
	
	node.html = text;
	node.show();
	function removeRemind() {
		node.hide();
		
		clearInterval(remindTimer);
	}
	
	second = second || 3;
	
	
	var remindTimer = setInterval(removeRemind, second*1000);
}
var codeIsPrepare = false;
var parser;
bind(function() {
	parser =
	{
		"msgNode" : id("msgNode"),
		"codeBox" : id("codeBox"),
		"lineNode" : id("lineNode"),
		"resultNode" : id("resultNode")
	}
	createRemain();
	prepareParseCode();
	
	parseCode(defineFunctions);
}, "load");

function prepareParseCode() {
	
	quickDefine("msg", "parser.msgNode.innerHTML", window);
	quickDefine("bin", "parser.codeBox.innerHTML", window);
	quickDefine("res", "parser.resultNode.innerHTML");
	
	msg += "let me start\n";
}

function createLineNumber() {
	
	var lineNode = parser["lineNode"];
	var codeBox = parser["codeBox"];
	var text = codeBox.txt;
	
	var lineCount = repeat(text,"\n");
	
	lineNode.clear();
	for(var iLine = 0; iLine <= lineCount; iLine++) {
		lineNode.append(li(iLine + 1));
	}
	remind(lineCount);
}

function parseCode(source) {
	
	function charHandle(char) {
		
		switch(char) 
		{
			case "\n":
			
			msg += "break line " + lineNumber++ + "\n";
			iSmall = -1;
			break;
			
			case "{":
			
			msg += "enter block at " + iSmall + "\n";
			break;
			
			case "}":
			msg += "leave block at " + iSmall + "\n";
			break;
		
		}
		
		res = explain(quick);
	}
	
	var code = source.toString();
	
	bin = code;
	createLineNumber();
	var describe = new Object();
	
	var lineNumber = 1;
	var iSmall = 0;
	for(var iChar = 0; iChar < code.length; iChar++, iSmall++) {
		
		var curChar = code[iChar];
		var condition = curChar.match(/\n|{|}/);
		if(condition) {
			charHandle(curChar);
		}
	}
	
}