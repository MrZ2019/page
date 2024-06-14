
/*
我希望这些代码可以帮助设计师

修改1	原来线程一旦进入脚本，那么它将被 try..catch 包围

修改2	变量和函数标识变长了

修改3	建立集合管理器

*/

var x = {};
var seed;

var disableOuput = false;
var buildStage = "original";

/* 运行在 最外层 的函数，测试函数 */
function traceCode(entryFunction, functionArguments) {
	
	try {
		return entryFunction.apply(null, functionArguments);
		
	}
	catch(exception) {
		
		var message = exception.message;
		
		document.write(message);
	}
}

/* 如果 参数未指定，那么 返回由 BaseTool 成员组成的声明文本
如果 指定了数组，那么连接 每一个由数组成员的 _openlist 成员生成的声明字符串 */	
function _support(SourceNameArray, option) {
	
	var defineString = "";
	SourceNameArray = SourceNameArray || [];
	//	如果 BaseTool 未创建，那么会出现异常
	defineString += BaseTool.baseSupport();
	
	for(var index = 0; index < SourceNameArray.length; index++) {
		var currentObjectName = SourceNameArray[index];
		
		defineString += BaseTool.openObject(currentObjectName);
	}
	
	option = option || {};
	
	if(option["PrimaryManagerSupport"] == true) {
		
		defineString += x.PrimaryManager.makeAllElementDefine();
	}
	
	return defineString;
}

var stageObject = { "amout" : 0, "index" : 1 };

/*	enterStage 指明某个事件已完成 */
function enterStage(stageName) {
			
	stageObject[stageName] = stageObject.index++;
	stageObject.amount++;
	
	//document.write(stageName + "\n");
}
var BaseTool = traceCode(createBaseTool);
enterStage["BaseToolInitialed"];

var Monitor = constructMonitor();

Monitor.traceCode(createSeed);

/*	创建一个名为 seed 的对象， 这个对象会在 入口函数使用 */
function createSeed() {
	
	eval(_support([ "Monitor" ]));
	//	“种子”
	seed = {};
	buildStage = "createSeed";
	
	/*	createType 创建类型,Set 是集合， Map 是键值对象， Module 是模块 */
	function createType() {
		
		/*	Set 表示一个集合 ，使用数字索引 */
		function Set() {
			
			var size = 0;
			var embedArray = [];
			
			function addMember(member) {
				
				embedArray.push(member);
			}
			
			function extendFromArray(sourceArray) {
				
				var previousArray = embedArray;
				
				embedArray = embedArray.concat(sourceArray);
				
				return previousArray;
			}
			
			function getArray() {
				
				return embedArray;
			}
			
			var thisMember = [ addMember, extendFromArray, getArray]
			relateFromArray(this, thisMember);
		}
		
		/*	Map 的成员都拥有一个名字 */
		function Map() {
			var size = 0;
			var embedMap = new Object();
			
			function addMember(member, memberName) {
				
				var result;
				memberName = memberName || member.name;
				
				if(memberName) {
					result = true;
					
					this[memberName] = member;
					embedMap[memberName] = member;
					size++;
				}
				else {
					result = false;
				}
				
				return result;	
			}
			
			function getSize() {
				
				return size;
			}
			
			/*	复制一个对象的成员 */
			function extendFromObject(sourceObject, optionalMember) {
				
				if(optionalMember !== undefined) {
					
					for(var memberIndex = 0; memberIndex < optionalMember; memberIndex++) {
						var currentMemberName = optionalMember[memberIndex];
						
						var currentMember = sourceObject[currentMemberName];
						
						if(currentMember !== undefined) {
							
							this[currentMemberName] = currentMember;
							embedMap[keyName] = currentMember;
							
							size++;
						}
					}
				}
				else {
					
					for(var keyName in sourceObject) {
						
						var currentMember = sourceObject[keyName];
						
						this[keyName] = currentMember;
						embedMap[keyName] = currentMember;
						
						size++;
					}
				}
				
				return sourceObject;
			}
			
			function getMap() {
				
				return embedMap;
			}
			
			var newObjectMember = [ addMember, getSize, extendFromObject, getMap];
			relateFromArray(this, newObjectMember);
		}
		
		/*	Module 表示一个 模块 */
		function Module() {};
		
		/*  MapManager 用于操作成员， 成员以存储在多个 Map */
		function MapManager() {
			
			var perMapSize = 10;
			var initialMapCount = 5;
			var orderStyleName = "bigLetter";
			var MapStorage = new Object();
			var objectHeap = new Object();
			
			var currentMap;
			var totalSize = 0;
			var initialCharCode;
			
			createMaps(initialMapCount, 0);
			
			/*	向 集合管理对象 添加 元素 */
			function addElement(element, elementName) {
				
				elementName = elementName || element.name;
				if(elementName == undefined) {
				}
				else {
					
					currentMap.addMember(element, elementName);
					var currentMapSize = currentMap.getSize();
					
					if(currentMapSize == perMapSize) {
												
						var currentMapIndex = ( (totalSize + 1) / perMapSize );
						var extendCondition = currentMapIndex > initialMapCount-1;
						
						if(extendCondition) {
							createMap(initialMapCount,currentMapIndex);
						}
						
						var nextMapKey = String.fromCharCode(initialCharCode + currentMapIndex);
						
						currentMap = MapStorage[nextMapKey];
					}
				}
				
				objectHeap[elementName] = element;
				totalSize++;
			}
			
			function setPerMapSize(size) {
			}
			
			function setMapOrderStyle(styleName) {
				
			}
			
			/*	创建 多个 Map 存储元素 */
			function createMaps(mapCount,mapIndex) {
				
				mapIndex = mapIndex || 0;
				
				if(orderStyleName == "bigLetter") {
					initialCharCode = 65;
				}
				else if(orderStyleName == "smallLetter")
				{
					initialCharCode = 97;
				}
				else if(orderStyleName == "number") {
					initialCharCode = 48;
				}
				
				for(var counter = mapIndex; counter < initialMapCount; counter++) {
					var currentCode = initialCharCode + counter;
					
					keyName = String.fromCharCode(currentCode);
					MapStorage[keyName] = new Map();
				}
				
				var firstMapKeyCode = initialCharCode + mapIndex;
				var firstMapKey = String.fromCharCode(firstMapKeyCode);
				currentMap = MapStorage[firstMapKey];

			}
			
			function getTotalSize() {
				
				return totalSize;
			}
			
			/*	返回 MapStorage */
			function getStorage() {
				
				return MapStorage;
			}
			
			/*	得到 对象堆 */
			function getHeap() {
				return objectHeap;
			}
			
			/*	以 遍历的方法寻找一个函数， functionName 指定函数名 */
			function getFunction(functionName) {
				
				var result = false;
				
				mapLabel:for(var mapIndex in MapStorage) {
					
					var currentMap = MapStorage[mapIndex];
					
					for(var functionIndex in currentMap) {
						
						var currentObject = currentMap[functionIndex];
						var isFunction = typeof(currentObject) == "function";
						
						if(isFunction == true) {
							
							currentFunction = currentObject;
							
							if(functionName == currentFunction.name) {
								result = currentFunction;
								break mapLabel;
							}
						}
					}
				}				
				return result;
			}
			
			/*	和 getFunction 不一样，这里使用对象名从 objectHep
			得到 对象 */
			function getObject(objectName) {
				
				var result;
				var object = objectHeap[objectName];
				
				if(object == undefined) {
					
					result = false;
				}
				else {
					result = object;
				}
				return result;
					
			}
			
			/*	返回一个很长的 包括所有 元素 的声明字符串 */
			function makeAllElementDefine() {
				
				var relateObjectName = this.managerDirectAddress + ".getHeap()"
				var defineString = raiseScopeFromObject(relateObjectName, objectHeap);
				
				return defineString;
			}

			var ManagerMembers = [ addElement, getStorage, getHeap, getFunction, getObject,getTotalSize, makeAllElementDefine ];
			
			relateFromArray(this, ManagerMembers);
		}
		
		var typeObject = {
			"Set" : Set,
			
			"Map" : Map,
			
			"Module" : Module,
			
			"MapManager" : MapManager
		}
		
		seed.type = typeObject;
		
		return seed;
	}
	
	/*	relateType 为类型建立关系，比如 Module 继承于 Set */
	function relateType() {
		
		inherit(seed.type.Set,seed.type.Module);
		
		return seed;
	}
	
	/*	使用 seed.type 中的 类型对象 生成一条 字符串 */
	function exposeType() {
		
		var resultString = "";
		
		resultString = reviseScope("seed.type", ["Set", "Map", "Module", "MapManager"]);
		
		return resultString;
	}
	
	/*	向 Manager 对象添加一个成员 */
	function pushToSeedManager(member, memberName) {
		
		var mapManager = seed.seedManager;
		
		mapManager.addElement(member, memberName);
	}
	
	/*	从 source 对象向 Manager 添加多个元素， 
	source 的每个成员的名字是 元素的名字 */
	function pushToSeedManagerFromAny(sources) {
		
		var mapManager = seed.currentManager;
		var sourceIsArray = sources instanceof Array;

		if(sourceIsArray) {
			
			for(var index=0; index < sources.length; index++) {
				
				var currentMember = sources[index];
				var memberName = currentMember.name;
				
				mapManager.addElement(currentMember, memberName);
			}
		}
		else {
			
			for(var keyName in sources) {
				
				var currentValue = sources[keyName];
				
				mapManager.addElement(currentValue, keyName);
			}
		}
		
		return mapManager;
	}
	
	/*	创建一个 地图管理对象 */
	function createMapManager() {
		
		var mapManager = new seed.type.MapManager();
		
		startObjectCounter(mapManager);
		
		return mapManager;
	}
	/*	利用 seed 对象中一些常用的对象 创建一条声明 字符串 */
	function seedIntoScope() {
		
		var seedObjectList = [ "type.Set", "type.Map", "type.Module", "createMapManager" ];
		
		var seedDefineString = raiseScopeOptional("seed", seedObjectList);
		
		return seedDefineString;
	}
	/*	初始化函数, 在入口函数 entryCode 中调用  */
	function initial() {
		
		/*	给 window 对象新建一个名为 out 的属性， 如果向其写入值，
		那么 会以当前值为参数 调用 document.write() , 这是替代 alert 函数
		的一个步骤 ，可以用来输出错误信息 */
		function createShortOuput() {
			
			function outSetter(value) {
				document.write(value);
			}
			
			var option = {
				"set" : outSetter
			}
			
			Object.defineProperty(window,"out",option);	
			
			return this;
		}
			
		seed.createType();	
		seed.relateType();
		
		/*	创建一个 MapManager 对象 ，保存当前 代码阶段 的一些函数 , 并且把 seed 对象的 currentManager 成员指向该 集合管理对象*/
		var seedManager = createMapManager();
		seed.seedManager = seedManager;
			
		pushToSeedManager(createShortOuput);
		createShortOuput();
		
		seed._openlist = [ "type.Set", "type.Map" , "type.Module", 
		"type.MapManager", "createMapManager" ];
	}
	
	var SeedSources = [ createType, relateType, exposeType, pushToSeedManager, pushToSeedManagerFromAny, 
	createMapManager, seedIntoScope, initial]
		
	relateFromArray(seed, SeedSources);
	
	//	代码入口
	Monitor.traceCode(codeEntry);
	
};

function codeEntry() {
	eval(_support( [ "Monitor" ]));

	/*	创建模块 */
	function createModules() {
		
		x.Modules = {};
		x.Modules.AnyThing = new Module();
		x.Modules.Information = new Module();
		x.Modules.Builder = new Module();
		x.Modules.CodeData = new Module();
		x.Modules.Component = new Module();
		
		return x.Modules;
	}
	
	function initialModules() {
		
		var Information = x.Modules.Information;
		
		var PageInformation = new Object();
		Information.PageInformation = PageInformation;
		
		var Builder = x.Modules.Builder;
		
		var CodeBuilder = new Object();
		Builder.CodeBuilder = CodeBuilder;
		
	}
	
	/*	创建模块管理器 */
	function createModuleManager() {
		
		function registerModule(moduleName,object) {
			ModuleNameMap[moduleName] = object;
		}
		
		function loadModule(moduleName) {
			return ModuleNameMap[moduleName];
		}
		
		function addToModule(moduleName,anything,memberName) {
			
			var module = Module[moduleName];
			module[memberName] = anything;
			
			return module;
		}
		
		function initialNameMap() {
			
			var Modules = x.Modules;
			
			for(var moduleKey in Modules) {
				
				var currentModule = Modules[moduleKey];
				
				ModuleNameMap[moduleKey] = currentModule;
			}
		}
		
		var ModuleNameMap = new Map();
		
		x.ModuleManager = new Object();
		
		initialNameMap();
		
		relate(x.ModuleManager,registerModule);
		relate(x.ModuleManager,loadModule);
		relate(x.ModuleManager,addToModule);
		
		return x.ModuleManager;
	}
	
	/* 参数是数组 是由函数组成 */
	function pushToPrimaryManager(sourceArray) {
		
		for(var index = 0; index < sourceArray.length; index++) {
			
			var currentFunction = sourceArray[index];
			PrimaryManager.addElement(currentFunction);
		}
	}
	/*	填充 PrimaryManager, 以传入对象储存 元素列表 */
	function pushToPrimaryManagerFromAny(sourceObject) {
		
		for(var keyName in sourceObject) {
			
			var currentMember = sourceObject[keyName];
			PrimaryManager.addElement(currentMember, keyName);
			print(keyName);
		}
	}
		
	var xSources1 = [ createModules, createModuleManager, pushToPrimaryManager, pushToPrimaryManagerFromAny ];
	relateFromArray(x, xSources1);
	//	完全导入 BastTool， 使用 openObject 导入 Monitor */
	eval(openObject("Monitor"));
	enterStage("createChunking");
		
	/* 执行初始化 ，并且新建一个 MapManager 对象 */	
	seed.initial();
	eval(seed.seedIntoScope());
	
	var PrimaryManager = createMapManager();
	relate(x, PrimaryManager,"PrimaryManager");
	
	PrimaryManager["managerDirectAddress"] = "x.PrimaryManager";
			
	//	创建模块和模块管理器
	createModules();
	initialModules();
	var ModulesManager = createModuleManager();
	
	var loadModule = ModulesManager.loadModule;
	var manager = x.PrimaryManager;
	
	defineObjects();
	defineFunctions();
	
	
	x.HTMLThings = defineHTMLThings();
	
	var set = Set;
	
	x.info = loadModule("Information");
	var any = x.any = x.Modules.AnyThing;
	
	
	var info = x.info;	
	
	var arg;
	
	var gen = loadModule("Component");
	
	x.code = loadModule("Builder").CodeBuilder;
	var code = x.code;
	(function() {	//	code
		
		code.carry = manager.getObject("carryObject");
		code.uncarry = manager.getObject("deleteObjectInAnother");
		
		code.test = traceCode;
	
		code.perValue = BaseTool.perValue;
		code.perKey = BaseTool.perKey;
	}) ();
		
	var build = loadModule("Builder");
	x.build = build;
	(function ibuild() {
		
		build.fun = makeFunction;
		
		any.con_f = decideFunction;
	}) ();
	var fun = build.fun;
	var con_f = any.con_f;
	x.type = new set();
	var type = x.type;
	(function itype() {
		type.define = define;
		
		any.sdef = manager.getObject("quickDefine");
		
		any.sdef_arr = manager.getObject("defineFromMap");
		
		type.inherit = inherit;
	})();	//

	x.syntax = new set();
	var syntax = x.syntax;
	
	x.array = new set();
	var array = x.array;
	(function iarray() {
		
		array.each = perKey;
		
		array.map = manager.getObject("mapArrayToArray")
		
	}) ();
	
	var _arg = sliceArguments;

	x.nexus = new set();
	(function() {
		var code = x.code;
		var nexus = x.nexus;
		
	}) ();
	
	x.xml = new set();
	var xml = x.xml;
	(function ixml() {
		var pdoc = document;
		xml.selector = function selector(arg) {
			arg = arg || "";
			var t = typeof(arg);
			var re;
			if(t == "string") {
				var path,step;
				step = arg.split(/\s+/);
				path = "";
				for(var i = 0;i < step.length;i++) {
					var cur = step[i];
					var tag = cur.match(/^[\w]\w+(?![\w])/);
					path += "\/\/";
					tag ? path += tag : path += "*";
					id = cur.match(/#[A-z0-9]+/);
					if(id) {
						id = id[0].replace("#","");
						path += "[@id='" + id + "']";
					}
				}
				re = selector.path(path);

				if(re.length == 1) {
					re = re[0];
					re.length = 1;
				}
			}
			else if(t == "function") {
				re = nexus.tie(arg)
			}
			return re;
		}
		var selector = xml.selector;
		var _map = function(arr2) { 
			var _f2 = function(n) {
				var re;
				if(n instanceof HTMLElement) 
				re = new element(n);
				else
				re = new node(n); 
				return re;
			}
			return array.map(arr2,_f2);
		};
		(function iselector() {
		//var $ = selector;
		/*selector.Class = function(str) { 
		return suck(_map(pdoc.getElementsByClassName(str))); }
		selector.path = function(str) {
			var result;
			var node,list;
			list = [];
			result = pdoc.evaluate(str,pdoc,null,XPathResult.ANY_TYPE, null);
			while(node = result.iterateNext())
			list.push(node)
			list = _map(list);
			array.suck(list);
			xml.suck(list);
			return list;
		}
		selector.ctext = function(txt) {
			return pdoc.createTextNode(txt);
		}
		selector.create = function(tag,id,html) {
			id = id || "";
			var e = pdoc.createElement(tag)
			e = new element(e);
			e.id = id || "";
			e.html = html || "";
			return e
		}
		selector.hasClass = function(node,str) {
			node = c_node(node,true);
			var Class = node.Class
			if(Class) {
				var arr = Class.split(/\s+/);
				re = array.check(arr,str);
			}
			else
			re = false;
			return re;
		}
		selector.addClass = function(node,str) {
			node = c_node(node,true);
			if(!selector.hasClass(str))
			node.Class += " " + str;
			return node;
		}
		selector.cutClass = function(node,str) {
			node = c_node(node,true);
			var reg = "((\\s+{0})|(^{0}))((?=\\s+)|({0}$))";
			reg = brace(reg,str);
			reg = new RegExp(reg);
			node.Class = node.Class.replace(reg,"");
			dl += "7";
			return node;
		}*/
		var tag = x.PrimaryManager.getObject("ShortTagNameMap").getMap();
		
		$$.ul = function(arr,id,Class) {
			var ul = $$.create("ul",id);
			ul.Class = Class || "";
			array.each(arr,"arg2.add($$.li(arg1))",ul);
			return ul;
		}
		})()
		//xml.$ = selector;	//	JQuery
		xml.attr = function(node,arg1,arg2) {
			var re;
			node = c_node(node,1);
			if(isobj(arg1)) {
				for(var k in arg1)
				node._node.setAttribute(k,arg1[k]);
				re = node;
			}
			else {
				isund(arg2) ? re = node.getAttribute(arg1) : re.setAttribute(arg1,arg2);
			}
			return re;
		}
		
		function element(e) {
			this._node = e;
			var e;
			any.sdef_arr(
			{
				"id":"id",
				"Class":"className",
				"html" : "innerHTML",
				"text" : "innerText",
				"style" : "style"
			},"this._node",this);
			any.sdef("cstyle","css.compute(this)",this);
			this.attr = function(arg1,arg2) { return xml.attr(this,arg1,arg2) }
			this.css = function(arg1,arg2) {
				var re;
				if(isobj(arg1)) {
					for(var k in arg1)
					this.style[k] = arg1[k];
					re = this;
				}
				else {
					if(isund(arg2))
					re = css.get(arg1,arg2)
					else
					re = css.set(this,arg1,arg2);
				}
				return re;
			}
			this.animate = function(to,duration,times,src) {
				return css.animate(this,to,duration,times,src);
			}
			this.addC = function(str) { return selector.addClass(this,str) }
			this.cutC = function(str) { return selector.cutClass(this,str);}
			
				var scss = x.primaryManager.getObject("shortCSSPropertyNameSet").getArray();
				any.sdef_arr(scss,"this._node.style",this,{ "shortcss" : true});
			this.tie = function(f,etype,capture) {
				return nexus.tie(f,etype,this,capture);
			}
			this.untie = function(f,etype,capture) {
				return nexus.tie(f,etype,this,capture);
			}
			evlist = x.primaryManager.getObject("shortEventNameList").getArray();
				var _re = function(o,a2) {
					a2[o] = fun("target.tie(arg1,etype,arg2)",
					{"target":a2,"etype":o})
				}
				array.each(evlist,_re,this);
		}
		any.element = element;
		any.c_node = function(o,bHigh) {
			var re;
			var isNode = o instanceof Node;
			if(!bHigh) 
				isNode ? re=o : re=o._node;
			else
				isNode ? re=new element(o) : re=o;
			return re;
		}
		//type.inherit(node, element);
		xml.suck = function(list) {
			var _set = "this.each('arg1.' + cur + ' = arg2',arg1)";
			any.sdef_arr(info.list.scss,"",list,{ "_set" : _set });
			return code.carry(gen.node,list);
		}
	}) ();
	(function() {
		var map = ["css","animate","attr","addClass","cutClass",
		"clear","depend"];
		var obj = new set();
		var _re = function(k) {
			return (function() { 
				//return this.each("arg1[arg2].apply(arg1,arg3)",k,arguments);
			})
		}
		//array.each(map,"arg2[arg1] = arg3(arg1)",obj,_re);
		gen.node = obj;
	}) ();
	//tox(xml,["$"]);
	var c_node = any.c_node;
	x.ui = new set();
	(function() {
		var $ = xml.selector;	//	import
		var ui = x.ui;
		var _re_w = function(w) {
			return (function(pbox) {
				var arg = _arg(1);
				var _case = new w;
				pbox = pbox || body;
				if(pbox) _case.on(pbox);
				return _case;
			})
		}
		function widget() {
			any.sdef("code","this.node.html",this);
			this.on = function(pbox) {
				if(pbox) {
					pbox = c_node(pbox,true);
					pbox.add(this.node);
					this.box = pbox;
				}
				return pbox;
			}
		}
		ui.charge = function(w) {
			type.inherit(w,widget);
			ui[w.name] = _re_w(w);
		}
		function frame() {
			var node;
			node = $$.create("div");
			this.node = node;
			node.Class = "frame";
		}
		frame.prototype = new widget;
		ui.frame = function(pbox) {
			var f;
			f = new frame();
			pbox = pbox || xml.body;
			f.on(pbox);
			return f;
		}
		ui.dock = function(widget,hori,vert) {
			var node = widget.node;
			var style = node.style;
			var pad = 4;
			var value = pad + "px";
			if(hori) {
				if(hori == "left")
				style.left = value;
				else if(hori == "center") {
					var wnode,wbody;
					var left;
					wnode = node.clientHeight;
					wbody = body.clientWidth;
					left = (wbody - wnode)/2;
					style.left = left + "px";
				}
				else if(hori == "right")
				style.right = value;
			}
			if(vert) {
				if(vert == "top")
				style.top = value;
				else if(vert == "center") {
					var hnode,hbody;
					var top;
					hnode= node.clientHeight;
					hbody = body.clientHeight;
					top = (hbody - hnode)/2;
					style.top = top + "px";
				}
				else if(vert == "bottom")
				style.bottom = value;
			}
			return widget;
		}
		ui.show = function(widget) {
			var node = widget.node;
			node.display = "block"
			return widget;
		}
		ui.hide = function(widget) {
			var node = widget.node;
			node.display = "none";
			return widget;
		}
	
	}) ();	
	x.css = new set();
	var css = x.css;
	(function icss() {
		var css = x.css;
		css.compute = function(node) {
			node = c_node(node);
			return getComputedStyle(node);
		}
		css.set = function(node,prop,value) {
			node = c_node(node,1);
			node.style[prop] = value;
			return node;
		}
		css.get = function(node,prop) {
			node = c_node(node);
			return css.compute(node)[prop];
		}
		css.correct = function(str) {
			var re;
			str += "";
			re = str.replace(/px/,"");
			if(!re.match(/[\D\.]/)) {
				re = re - 0
			}
			return re;
		}
		css.animate = function(node,to,duration,times,src) {
			duration = duration || 0.5;
			times = times || 64*duration
			var correct = css.correct;
			node = c_node(node,1);
			if(! src) {
				src = {};
				code.per(to,"a2[a1] = a4(a3.cstyle[a1])",true,src,node,correct);
			}
			var offset = {};
			code.per(src,"a4[a1] =( a5(a3[a1])-a5(a2[a1]))/a6",true,src,to,offset,correct,times);
			var count = 1;
			var _f = function() {
				for(var k in src)
				node.css(k,src[k]+offset[k]*count+ "px");
				if(++count > times)
				clearInterval(timer);
				//dl += "fontSize=" + src["fontSize"]+offset["fontSize"];
			}
			var timer = setInterval(_f,duration/times*1000);		
			//dl += explain(offset);
		}
	}) ();//
}
	
(function() {
	x.cover = function() { x.code.carry(x,window);}
	x.uncover = function() { x.code.uncarry(window,x);}
	x.debug = true;	//	enter debug
	x.info.bugstr = "";
	x.cover();	//
	/*tie(function() {
		var body = new any.element(document.body);
		xml.body = body;
		any.tox({
			xml : ["body","create","ctext"]},null,1);
		info.loaded = true;
		if(x.debug) {
			var dview, dview2;
			dview = ui.frame();
			dview2 = ui.frame();
			dview2.node.Class = dview.node.Class += " debug";/
			info.dview = dview;
			info.dview2 = dview2;
			
			var manager = x.primaryManager;
			var setPage = manager.getObject("setPageinfo");
			
			setPage("DebugViewIsCreated", true);
		}
		(function() {
			var hview,hbody,hwin;
			var maxn;
			hbody = body.clientHeight;
			hview = dview.node.clientHeight;
			hwin = window.innerHeight;
			maxn = Math.max(hbody,hview,hwin);
			body.style.minHeight = maxn + "px";
		}) ();	//	
		ui.dock(dview,"right","bottom");
		ui.dock(dview2,"right","top");
		any.sdef("d2", "info.dview2.code");
	
		x.debug = x.debug;	//	show frame
		d = info.bugstr;
		x.cover();	//recover
	});*/
	info.setload = true;
})();



(function() {
	var _request = function(url,bAsy,data,method,callback) {
		method = method || "get";
		if(isund(bAsy)) bAsy = true;
	
		var str = "?";
		var request;
		if(! isund(data)) {
			for(var k in data)
			str +=k + "=" + data[k] + "&";
		}
		if(method == "get") {
			url += str;
			str = null;
		}
		request = new XMLHttpRequest();
		request.open(method,url,bAsy);
		if(bAsy) {
			callback = callback || fun("dl += 'response:' + x0.responseText",[request]);
			request.onreadystatechange = callback;
		}
		request.send(str);
		return request;
	}
	
	window.ajax = function(url,callback,data,method) {
		return _request(url,true,data,method,callback);
	}
	
	window.request = function(url,data,method) {
		return _request(url,false,data,method);
	}
})();



function constructMonitor() {
	
	var Monitor = new Object();
	var enterNextTraceCode;
	
	eval(_support());
	
	function createWatcherManager() {
		
		var VariationMap;
		
		function VariationEntry(variation, variationName) {
			
			var variationType;
			var watchType;
			if(variation == null) {
				watchType = "prepareEval";
				
				var tryResult = tryEval(variationName);
				
				if(tryResult == "ErrorOccured") {		
					variationType = "[parseError]";
				}
				else {
					variation = tryResult;
					variationType = typeof(variation);
				}
			}
			else {
				watchType = "isValue";
				
				variationName = variationName || variation.name;
				variationType = typeof(variation);
			}
			this.watchType = watchType;
			this.variationName = variationName || null;
			
			this.variationValue = variation || null;
			
			this.variationType = variationType || null;
			
		}
		
		/*	返回一个保存在 变量地图 中成员的名字组成的数组 */
		function getVariationList() {
			
			var VariationList = new Array();
			
			for(var keyName in VariationMap) {
				
				VariationList.push(keyName);
			}
			
			return VariationList;
		}
		
		/*	更新 变量地图中的值 ，只处理 prepareEval 观察类型的变量*/
		function refreshMap() {
			
			for(var keyName in VariationMap) {
				
				var currentVariationEntry = VariationMap[keyName];
				if(currentVariationEntry.watchType == "prepareEval") {
					var evalObject = tryEval(keyName);
					
					if(evalObject.finished = 0) {
						analyseValue = "[parseError]";
					}
					else {
						analyseValue = evalObject.returnValue;
					}
					currentVariationEntry.variationValue = analyseValue;
				}
			}
		}
		
		/*	更新完 变量地图 之后，返回 变量地图 */
		function getVariationMap() {
			refreshMap();
			
			return VariationMap;
		}
		
		/*	variation 指明变量值， variationName 是变量在 变量地图 中的名字
		如果 variation 为 null, 那么 在创建 VariationEntry 之后， 调用 tryEval
		解释 variationName */
		function addVariation(variation, variationName) {
			var newVariationEntry = new VariationEntry(variation, variationName);
			
			variationName = newVariationEntry.variationName;
			VariationMap[variationName] = newVariationEntry;
			
			if(MainWicket) {
				MainWicket.arrangeWatcher();
			}
		}
		
		/*	删除 变量地图中的一个成员  如果它是一个函数，那么 它的名字 
		从该 函数的 name 成员中获得 */
		function deleteVariation(variation, variationName) {
			
			variationName = variationName || variation.name;
			if(variationName == true) {
				delete variationMap[variationName];
			}
		}
		
		/*	从传入的数组向  变量地图 添加变量 ，成员可以是 
		一个字符串，也可以是一个函数对象 */
		function addVariationFromArray(variationArray) {
			
			if(isArray(variationArray) == false) {
				worse("must be an Array");
			}
			for(var index = 0; index < variationArray.length; index++) {
				
				var currentObject = variationArray[index];
				
				if(isString(currentObject) == true) {
					addVariation(null, currentObject);
				}
				else {
					addVariation(currentObject, null);
				}
			}
			
			return variationArray;
		}
		
		/*	从一个对象添加变量， 变量名字是成员的键名 ，变量是成员的值 */
		function addVariationFromObject(sourceObject) {
			
			for(var keyName in sourceObject) {
				
				var currentMember = sourceObject[keyName];
				
				addVariation(currentMember, keyName);
			}
			
			return sourceObject;
		}
		
		/*	直接 替换变量地图 */
		function setVariationMap(sources) {
			
			clearAllVariation();
			if(isArray(sources) == true) {
				addVariationFromArray(sources);
			}
			else if(isObject(sources)) {
				addVariationFromObject(sources);
			}
		}
		
		/*	清除 Map 中所有的变量 */
		function clearAllVariation() {
			
			var previousMap = VariationMap;
			VariationMap = new Object();
			
			MainWicket.arrangeWatcher();
			return previousMap;
		}
		
		VariationMap = new Object();
		
		var WatcherManager = new Object();
		
		var WatcherSources = [ addVariation, deleteVariation, addVariationFromArray, addVariationFromObject ,
		getVariationMap, clearAllVariation, setVariationMap];
		
		var watcherExposeObject = 
		{
			"addvar" : addVariation,
			
			"addArray" : addVariationFromArray,
			
			"delvar" : deleteVariation,
			
			"addObject" : addVariationFromObject,
			
			"setvar" : setVariationMap,
			
			"getvar" : getVariationMap,
			
			"clearvars" : clearAllVariation		
		}
		
		exposeObject(watcherExposeObject);
		relateFromArray(WatcherManager, WatcherSources);
		return WatcherManager;
		
	}
	/*	声明一些输出函数 */
	function createOuputObject() {
				
		/*	参数会是一段 HTML 代码 ,如果 MainWicket 已经创建
		那么 HTML 代码会输入进 MainWicket,否则 写入当前文档 */
		function ouputHTML(htmlCode) {
			
			htmlCode = joinStringInPlaceholder.apply(null, arguments);
			if(disableOuput == false) {
				if(isAllowDisplay()) {
					putHTMLToWicket(htmlCode);				
				}
				else {
					write(htmlCode);
				}
			}
		}
		
		function ouputBoldText(text) {
			
			var boldHTMLCode = "<b>" + text + "</b>";
			
			ouputHTML(boldHTMLCode);
		}
		/*	ouput 向文件输出 文本信息 */
		function ouputText(string) {
			
			string = joinStringInPlaceholder.apply(null, arguments);
			
			if(disableOuput == false) {
				if(stageObject["MainWicketCreated"]) {
					
					MainWicket.ouputTextContent(string);
				}
				else {
					write(string);
				}
			}
			
		}
		
		/*	首先给 text 加上换行，接着使用 ouput 输出 */
		function ouputTextLine(text) {
			
			ouputText(text + "\n");
		}
		
		/*	输出以 "before" 开始的文本，用于显示信息 */
		function ouputBefore(string) {
			
			string = string || "";
			ouputBoldText("before:")
			ouputTextLine(string);
		}
		
		/*	打印从 "after" 单词开始的一串文本 */
		function ouputAfter(text) {
			
			text = text || "";
			
			ouputBoldText("after:");
			ouputTextLine(text);
		}
		
		/*	显示一个包含 "step" 的文本，表示一个步骤 */
		function ouputStep(information) {
			
			information = information || "";
			ouputBoldText("step:");
			ouputTextLine(information);
		}
		
		/*	输出 对象描述 */
		function ouputResolveObject(object) {
			var objectString = resolveObjectToString(object);
			
			ouputBoldText("resolve:");
			ouputText(objectString);
			
			return OuputObject;
		}
		
		/*	输出 一条信息， ouputType 指定类型 */
		function quickOuput(text, ouputType) {
			
			ouputType = ouputType || "Text";
			
			switch(ouputType) {
				
				case "Text":
				{
					ouputText(text);
				}
				break;
				
				case "Error":
				{
					MainWicket.printErrorMessage(text);
				}
				break;
				
				case "Building":
				{
					MainWicket.ouputBuildMessage(text);
				}
				break;
				
				case "Event" :
				{
					MainWicket.appendParagraph(text, "EventMessage");
				}
				break;
			}
		}
		
		/*	在 文本 之后 加上一个换行符 */
		function quickOuputLine(text, ouputType) {
			text += "\n";
			quickOuput(text, ouputType);
		}
		
		function initialFontColor() {
			
			var HTMLTagString = "<style>.Wicket { color: [color] }</style>";
			
			var maxColorValue = 256*256*256-1;
			var colorValue = Math.round( Math.random() * maxColorValue);
			
			HTMLTagString = HTMLTagString.replace("[color]", "#" + colorValue.toString(16));
			
			document.write(HTMLTagString);
		}
		
		function exposeForOuput() {
			
			var exposeOuputObject =
			{
				"print" : quickOuput,
				"println" : quickOuputLine,
				"before" : ouputBefore,
				"after" : ouputAfter,
				"step" : ouputStep,
				"resolve" : ouputResolveObject
			}
			
			exposeObject(exposeOuputObject);			
		}
		
		var OuputObject = new Object();
		Monitor.OuputObject = OuputObject;
		
		var OuputSource = [ ouputText, ouputTextLine, ouputBefore, ouputStep, ouputAfter ,
		ouputResolveObject, initialFontColor, exposeForOuput ]
		relateFromArray(OuputObject, OuputSource );
		
		return OuputObject;
	}
	
	function createDepictFetcher() {
		
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
		
		var DepictFetcher = new Object();
		
		DepictFetcher.getBrowserName = getBrowserName;
		
		Monitor.DepictFetcher = DepictFetcher;
		
		return DepictFetcher;
	}
	
	/*	创建一个异常处理对象 */
	function createExceptionProcessor() {

		/*	Google Chrome 浏览器下 异常信息 输出函数 */ 
		function printErrorInChrome(exception) {
			
			var errorString = "";
			
			errorString = exception.stack;
			
			return errorString;
		}	
	/*	如果发生错误， 而且 当前浏览器是著名网页开发工具 Dreamweaver, 那么
		此函数可能会调用 */
		function printErrorInDreamweaver(exception) {
			
			var errorName = exception.name;
			var errorLineNumber = exception.line;
			var errorMessage = exception.message;
			
			var errorText = "Dreamweaver discover " + errorName;
			errorText += " at line " + errorLineNumber + ".\n";
			errorText += errorMessage;
			
			return errorText;
		}
		
		/*	一个回调函数，发生错误时被调用 */
		function testCodeErrorCallback(exception, eventInfo) {
			
			var errorMessage = exception.message;
			
			var currentBrowser = DepictFetcher.getBrowserName();
			
			switch(currentBrowser) {
				case "Chrome":
				errorMessage = printErrorInChrome(exception);
				break;
				
				case "Dreamweaver" :
				errorMessage = printErrorInDreamweaver(exception);
				break;
				
				default :
				errorMessage = exception.message;
			}
			
			if(isObject(eventInfo) == true) {
				
				errorMessage += "\nEvent Target: " + eventInfo.targetObject;
				errorMessage += "\nEvent Type: " + eventInfo.eventType;
			}				
			
			if(stageObject["MainWicketCreated"]) {
				
				MainWicket.printErrorMessage(errorMessage);
								
				fascinateMe();
				MainWicket.arrangeWatcher();
			}
			else {
				document.write(errorMessage);
			}
		}
		
		var ExceptionProcessor = new Object();
		
		ExceptionProcessor.testCodeErrorCallback = testCodeErrorCallback;
		
		return ExceptionProcessor;
	}
	
	/*	创建一个 Wicket ,包含 多个HTML 元素，用于打印信息 或者对象观察*/
	function createHTMLWicket() {
		
		function Wicket() {};
		
		var rootElement = document.documentElement;
		var WicketDIV, ScreenDIV, WatcherDIV;
		var WatcherTable, ObjectDisplayDIV, CodeevaluateInput;
		
		/*	 创建一个 类名是 Wicket 的 DIV 对象 */
		function createWicketDIV() {
			var WicketDIV = $$.create("div")	
			WicketDIV.className = "Wicket";
			WicketDIV.id = "mainwicket";
			
			$$.append(rootElement, WicketDIV);
			
			return WicketDIV;
		}
		
		/*	建立 DisplayScreen 的 HTML　对象，可以显示信息*/
		function createScreenDIV() {
			
			var ScreenDIV = $$.create("div");
			ScreenDIV.className = "DisplayScreen";
						
			return ScreenDIV;
		}
		
		/*	创造一个 Input 对象，功能是接收 代码输入 */
		function createCodeEvaluateInput() {
			var CodeEvaluateInput = $$.create("input", "CodeEvaluateInput",null, "codeInput");
			
			CodeEvaluateInput.type = "text";
			
			return CodeEvaluateInput;
		}
		
		/*	建立一个 HTML 对象，作用是查看变量 */
		function createWatcherDIV() {
			
			var WatcherDIV = $$.create("div","Watcher");
			
			WatcherTable = $$.create("table",  "WatcherTable");
			
			
			var captionElement = $$.create("caption");
			captionElement.innerHTML = "variation watcher";
			var tableHeadRow = $$.create("tr");
			var nameTH = $$.create("th", null, "name");
			var typeTH = $$.create("th", null, "type");
			var valueTH = $$.create("th", null, "value");
			$$.append(tableHeadRow, nameTH);
			$$.append(tableHeadRow, typeTH);
			$$.append(tableHeadRow, valueTH);
			
			$$.append(WatcherTable, captionElement);
			$$.append(WatcherTable, tableHeadRow);
			$$.append(WatcherDIV, WatcherTable);
			
			return WatcherDIV;
		}
		
		/*	创建一个HTML 对象， 用于显示对象描述 */
		function createObjectDisplayScreen() {
			
			var ObjectDisplayScreen = $$.create("div",
			"ObjectDisplayScreen");
			
			return ObjectDisplayScreen;
		}
		
		/*	侦听 ObjectDisplayScreen 的鼠标事件 */
		function nexusTableForDisplayObject() {
			
			var currentMouseIsOver;
			
			var currentTDElement;
			var waitNextCheck;
			var currentVariationValue;
			
			function mouseoverOnWatcherTable() {
				
				var eventTarget = event.target;
				
				var activeCondition = ( (eventTarget.tagName == "DIV") && (eventTarget.describeRole == "variationValue") && eventTarget.currentValueIsObject);
				if(activeCondition) {
					var eventString = resolveObjectToString(event);
					
					/*	设置 ObjectDisplayDIV 的 top 属性
					以 控制显示位置 */
					var DIVTDParent = eventTarget.parentElement;
					var DisplayRelativeTop = -(WatcherDIV.clientHeight - DIVTDParent.offsetTop + ObjectDisplayDIV.clientHeight) - 6;
					

					ObjectDisplayDIV.style.top = DisplayRelativeTop + "px";
					
					/*	存储相关数据 ， 准备下一次计算 */
					currentMouseIsOver = true;
					currentTDElement = eventTarget;
					currentVariationValue = eventTarget.correspondObject;
					getDescribeToDisplayDIV();
					
					ObjectDisplayDIV.style.visibility = "visible";
					
					window.addEventListener("mouseout",
			mouseleaveOnWatcherTable);
				}
				else if(waitNextCheck) {
					
					var hideCondition = (eventTarget.className !== "valueDIV")
					if((eventTarget !== ObjectDisplayDIV) && hideCondition) {
						hideObjectDisplayDIV();
					}
					else {
					}
				}
			}
			
			function mouseleaveOnWatcherTable() {
				
				var eventTarget = event.target;
				var leaveCondition = ( currentMouseIsOver);
				if(leaveCondition) {
					
					//var leaveCondition = ( eventTarget.className == "
					if(eventTarget == ObjectDisplayDIV) {
						hideObjectDisplayDIV();
					}
					else {
						waitNextCheck = true;
						
					}
					
				}
			}
			
			/*	使用 resolveObjectToString 函数返回一个对象的描述 */
			function getDescribeToDisplayDIV() {
				
				var objectString = resolveObjectToString(currentVariationValue);
				
				ObjectDisplayDIV.innerText = objectString;
			}
			
			/*	隐藏 ObjectDisplayDIV */
			function hideObjectDisplayDIV() {
				waitNextCheck = false;
				currentMouseIsOver = false;
			
				ObjectDisplayDIV.style.visibility = "hidden";
			}
			
			WatcherTable.addEventListener("mouseover",
			mouseoverOnWatcherTable, true);
		}
		
		function nexusWicketElement() {
			
			function keyPressOnCodeInput() {
				
				var keycode = event.keyCode;
				
				if(keycode == 13) { //	回车
					
					var javascriptCode = CodeevaluateInput.value;
					writeCode(javascriptCode);
				}
			}
			
			CodeevaluateInput.addEventListener("keydown", keyPressOnCodeInput);
		}
		/*	使用一个 Map 对象作为数据源 向 WatcherTable 添加 TR 对象 */
		function fillWatcherViaMap(variationMap) {
			
			for(var variationName in variationMap) {
				
				var currentEntry = variationMap[variationName];
				
				var entryTR = $$.create("tr");
				
				var nameTD = $$.create("td");
				nameTD.innerText = currentEntry.variationName;
				
				var typeTD = $$.create("td");
				typeTD.innerText = currentEntry.variationType;
				
				//	创建显示 值的 单元格
				var valueTD = $$.create("td");
				var variationValue = currentEntry.variationValue;
				//
				var valueDIV = $$.create("div", "valueDIV");
				valueDIV.innerText = variationValue;
				$$.append(valueTD, valueDIV);
				
				//valueTD.innerText = variationValue;
				valueDIV.describeRole = "variationValue";
				
				var valueIsObject = isObject(variationValue);
				if(valueIsObject) {
					valueDIV.currentValueIsObject = true;
					valueTD.className = "IsObject";
				}
				valueDIV.correspondObject = variationValue;
				
				$$.append(entryTR, nameTD);
				$$.append(entryTR, typeTD);
				$$.append(entryTR, valueTD);
				
				$$.append(WatcherTable, entryTR);
				
				//ouputLine(WatcherTable.innerHTML);
			}
		}
		
		/*	清空 WatchTable 中保存变量数据 的 TR 对象 */
		function clearWatcherTable() {
			
			var entryTRArray = WatcherTable.getElementsByTagName("tr");
			
			for(var trIndex = entryTRArray.length - 1; trIndex >= 1; trIndex--) {
				var currentTR = entryTRArray[trIndex];
				
				WatcherTable.removeChild(currentTR);
			}
		}
		/* ouput 向 DisplayScreen 输出文本 */
		function ouputTextContent(message) {
			
			ScreenDIV.innerHTML += message;
			scrollDisplayScreenToBottom();
		}
		
		/* 	ouputLine 输出带换行符的文本 */
		function ouputTextLine(message) {
			
			ouputTextContent(message + "\n");
		}
		
		/*	向 DisplayScreen 写入一个 HTML 代码块 */
		function writeHTMLToDisplayScreen(htmlCode) {
			
			ScreenDIV.innerHTML += htmlCode;
			
			scrollDisplayScreenToBottom();
		}
		
		function appendParagraph(paragraphText, className) {
			
			var paragraphElement = $$.create("p", className, paragraphText);
			
			$$.append(ScreenDIV, paragraphElement);
			
			scrollDisplayScreenToBottom();
		}
		
		function ouputBuildMessage(messageText) {
			appendParagraph(messageText, "BuildMessage");
		}
		/*	清空 DisplayScreen */
		function clearDisplayScreen() {
			
			ScreenDIV.innerHTML = "";
		}
		
		/*	向 DisplayScreen 添加一个 类为 ErrorMessage 的
		段落， 表明一条 错误信息 */
		function printErrorMessage(message) {
			appendParagraph(message, "ErrorMessage");
		}
		
		/*	整理 WatcherDIV 的变量列表 */
		function arrangeWatcher() {
			
			var variationMap = WatcherManager.getVariationMap();
			

			clearWatcherTable();
			fillWatcherViaMap(variationMap);		
		}
		
		function scrollDisplayScreenToBottom() {	
			var scrollHeight = ScreenDIV.scrollHeight;
			var clientHeight = ScreenDIV.clientHeight;
			
			var difference = scrollHeight - clientHeight;
		
			if(difference > 0) {
			
				ScreenDIV.scrollTop = difference;
			}
		}
		
		var Wicket = new Wicket();
		
		WicketDIV = createWicketDIV();
		CodeevaluateInput = createCodeEvaluateInput();
		$$.append(WicketDIV, CodeevaluateInput);
		
		ScreenDIV = createScreenDIV();
		WatcherDIV = createWatcherDIV();
		ObjectDisplayDIV = createObjectDisplayScreen();
		
		nexusTableForDisplayObject();
		
		$$.append(WicketDIV, ScreenDIV);
		enterStage("DisplayScreenCreated");
		$$.append(WicketDIV, WatcherDIV);
		enterStage("WatcherDIVCreated");
		
		$$.append(WicketDIV, ObjectDisplayDIV);
		
		nexusWicketElement();
		
		var WicketSources = [ ouputTextContent, ouputTextLine, writeHTMLToDisplayScreen,
		appendParagraph, ouputBuildMessage, clearDisplayScreen, printErrorMessage, arrangeWatcher, scrollDisplayScreenToBottom ];
		relateFromArray(Wicket, WicketSources);
		
		return Wicket;
	}
	
	function relateFunctions() {
	
		var monitorSources = [ openFunctions ];
		relateFromArray(Monitor, monitorSources);
	}
	
	/*	将一些函数变成 全局对象， 方便其它代码的访问 */
	function openFunctions() {
		
		for(var index = 0; index < openFunctionList; index++) {
			
			var currentFunction = openFunctionList[index];
			var functionName = currentFunction.name;
			
			window[functionName] = currentFunction;
		}
	}
	
	function closeFunctions() {
	}
	
	/*	跟踪代码，可以及时发现错误 */
	function traceCode(entryFunction, functionArguments, eventInfo) {
		var result;
		
		function textTest() {
			document.write("some text.");
		}
		try {
			
			result = entryFunction.apply(null, functionArguments);
			
		}
		catch(exception) {
			
			var message;
			
			var ExceptionIsString = isString(exception);
			
			if(ExceptionIsString == true) {
				message = exception;
			}
			else {
				message = exception.message;
			}
			
			var MonitorCreated = stageObject["MonitorCreated"];
			var MainWicketCreated = stageObject["MainWicketCreated"];
			
			
			var ConditionForCallback = ( MonitorCreated );
			var ConditionForDisplay = (MainWicketCreated);
			
			if(ConditionForCallback && !enterNextTraceCode && !ExceptionIsString) {
				var errorCallback = ExceptionProcessor.testCodeErrorCallback;
				
				enterNextTraceCode = true;
				/*	如果 在处理 catch 块时发生异常， 为了不会因为递归而致使
				输出失败 ，这里是为了保证 errorCallback 可以正确执行 */	
				traceCode(errorCallback, [ exception, eventInfo ]);
				
				enterNextTraceCode = false;			
			}
			else if(ConditionForDisplay) {	
				MainWicket.printErrorMessage(message);
			}
			else {
				document.write(message);
			}
			
			result = "ErrorOccured";
		}
		return result;
	}
	
	/*	如果 MainWicket 已经创建完成 返回 true */
	function isAllowDisplay() {
		return stageObject["MainWicketCreated"];
	}
	
	/*	向 MainWicket 写入 HTML 代码 */
	function putHTMLToWicket(HTMLCode) {
		MainWicket.writeHTMLToDisplayScreen(HTMLCode);
		
		return MainWicket;
	}
	
	/*	输出 JavaScript 代码到 Screen */
	function writeCode(codeStr) {
		
		var codeParagraph = "<p class='JavaScriptCode'>" + codeStr + "</p>";
		
		var evaluateResult = tryEval(codeStr);
		var evaluateValue;
		
		MainWicket.writeHTMLToDisplayScreen(codeParagraph);
	
		if(evaluateResult.finished == true) {
			evaluateValue = evaluateResult.returnValue;
			
			if(isDefined(evaluateValue) == true) {
				
				//	测试表达式
				if(evaluateValue instanceof RegExp) {
					evaluateValue = code.match(evaluateValue);
				}
				
				evaluateValue = evaluateValue.toString();
			}
			else {
				evaluateValue = "undefined";
			}
			
			var transfer = x.PrimaryManager.getObject("transferHTMLToEntity");
			evaluateValue = transfer(evaluateValue);
			MainWicket.appendParagraph(evaluateValue, "JavaScriptValue");
		}
		else {	
			var errorMessage = evaluateResult.message;
			
			MainWicket.printErrorMessage(errorMessage);
		}
		
	}
	
	/*	执行 JavaScript 代码， 显示输出信息后 滚动至底部 */
	function executeCodeAndDisplay(codeString) {
		
		writeCode(codeString);
		MainWicket.scrollDisplayScreenToBottom();
	}
	
	/*	使 BaseTool 的所有成员 成为 window 对象的成员 */
	function expandBaseTool() {
		
		relateFromArray(window, BaseTool);
		
		MainWicket.ouputBuildMessage("BaseTool was expended");
	}
	
	/*	计算 BaseTool , 两个 管理对象 , HTMLThings 的成员总和 */
	function computeFunctionCount() {
		
		var managerCount = x.PrimaryManager.getTotalSize() + 
		seed.seedManager.getTotalSize();
		var count = BaseTool.totalSize + managerCount + x.HTMLThings.totalSize;
		
		var countMessage = "you have at least " + count + " function";
		MainWicket.ouputBuildMessage(countMessage);
	}
	
	/*	当 页面加载后执行 显示一些 运行信息 */
	function MonitorOnLoad() {	
		var WelcomeText = "congratulation. your monitor is working and page is loaded";
		
		MainWicket.ouputBuildMessage(WelcomeText);
		 
		expandBaseTool();	
		computeFunctionCount();
	}
	var WatcherManager;
	
	var OuputObject, DepictFetcher;
	var ExceptionProcessor;
	
	var MainWicket;
	
	var openFunctionList;
	
	var currentStage;
	
	function MonitorEntry() {
		
		enterStage("EnterMonitor");		
		
		WatcherManager = createWatcherManager();

		OuputObject = createOuputObject();
		OuputObject.initialFontColor();
		OuputObject.exposeForOuput();
		
		DepictFetcher = createDepictFetcher();
		ExceptionProcessor = createExceptionProcessor();
		
		MainWicket = createHTMLWicket();
		enterStage("MainWicketCreated");
		MainWicket.arrangeWatcher();
			
		openFunctionList = [ "traceCode" ];
		Monitor._openlist = openFunctionList;
		
		var MonitorSource = [ traceCode, writeCode, executeCodeAndDisplay ];
		relateFromArray(Monitor, MonitorSource);
		
		enterStage("MonitorCreated");
		
		window.addEventListener("load", MonitorOnLoad);
	}
	
	
	traceCode(MonitorEntry);
	
	return Monitor;

}