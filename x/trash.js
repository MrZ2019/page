	//	创建两个Map A 和 B
	function createMap() {
		var TypeMap = seed.type.Map;
		
		seed.MapList = new TypeMap();
		
		seed.MapList.A = new TypeMap();
		seed.MapList.B = new TypeMap();
	}
	
	
	
	/* 将 sourceObject 放入 MapList, MapList 保存一些函数 
	letterName 如果没有指定， 其默认值为 A, 指 MapList 成员 A */
	function pushToMap(sourceObject, letterName) {
		
		letterName = letterName || "A";
		var sourceName = sourceObject.name;
		
		var specifyMap = seed.MapList[letterName];
		
		specifyMap[sourceName] = sourceObject;
	}
	
	function pushAnyToMap(sources, mapName) {

		mapName = mapName || "A";
		var specifyMap = seed.MapList[mapName];

		var sourceIsArray = sources instanceof Array;

		if(sourceIsArray) {
			
			for(var index=0; index < sources.length; index++) {
				
				var currentMember = sources[index];
				var memberName = currentMember.name;
				
				specifyMap[memberName] = currentMember;
			}
		}
		else {
			
			for(var keyName in sources) {
				
				var currentValue = sources[keyName];
				
				specifyMap[keyName] = currentValue;
			}
		}

		return specifyMap;
	}