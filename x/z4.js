
//	对象转化至数组
function objToArr(object, bKey) {
	
	var array = [];
	
	var objStr = object.toString();
	
	if(objStr.match(/Arguments/g)) {
		
		for(var iArg = 0; iArg < object.length; iArg++) {
			
			var curVal = object[iArg];
			
			array.push(curVal);
		}
	}
	else {
		for(var key in object) {
			
			var value = object[key];
			
			if(bKey == true) {
				array.push(key);
			}
			else {
				array.push(value);
			}
		}
	}
	return array;
}

function argToArr(arg) {
	
	arg = arg || argToArr.caller.arguments;
	
	var argArr = objToArr(arg);
	return argArr;
}

//	计算成员数量
function count(object) {
	
	var total = 0;
	
	for(var kName in object){
		total++;
	}
	
	return total;
}