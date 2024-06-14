
function ADDIntegerMark(maxIndex) {
	
	maxIndex = maxIndex || 10;
	
	function GENERAL_Mark_API(index) {
		
		_ouputln(index);
	}
	
	for(var iMark = 1; iMark <= maxIndex; iMark++) {
		
		var Params = [ GENERAL_Mark_API, iMark ];
		
		window["_" + iMark] = returnGENERALFunction(Params, "INTEGER_MARK");
	}
}

function resolve(object, bDisplay) {
	
	if(_und(bDisplay) == true) {
		
		bDisplay = true;
	}

	var identify, value;
	var desc;
	
	if(_fun(object) == true) {
		identify = object.name;
	}
	else {
		identify = typeof(object);
	}
	
	if(_fun(object) || _obj(object)) {
		
		value = "\n{\n";
		
		for(var kName in object) {
			
			var curVal = object[kName];
			
			if(_fun(curVal) == true) {
				curVal = "function";
			}
			else {
				value += kName + ":" + curVal + "\n";
			}
		}
		
		value += "}";
	}
	else {
		value = object;
	}
	
	desc = identify + " " + value;
	
	if(bDisplay == true) {
		
		_UI["record"].TXT += desc + "\n";
	}
	
	
	return desc;
}