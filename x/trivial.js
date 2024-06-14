		function a1(x) {
			{};
		}
function z(a,b) {
	function a(c) {
		a = "'\"";
		var x;	
		var x = /\n"/g;
		var y;
		{};
	}
	{};
	function b(x) {
	}
	
	function c(xx) {};	
	function d(d, f) {
	}
}



var $$ = function(str) {
	return document.getElementById(str)
}

$$.create = function(tag,className,innerHTML,id) {
	var e = document.createElement(tag)
	
	if(className) e.className = className;
	
	if(innerHTML) {
		e.innerHTML = innerHTML;
	}
	if(id) e.id = id;
	return e
}
$$.append = function(out,pin) {
	return out.appendChild(pin)
}
/*	这里保存着一些函数和代码，这些函数的特点是通用性太小 */

function ouputManagerSize() {
	
	eval(seed.reviseScope("seed",["ouput", "currentManager"]));
	
	var string = "i have a manager,now test its size"
	ouput(string);
	
	string = "its size equal " + currentManager.getTotalSize();
	ouput(string);
}

/*	向文档输出 HTML 数据 ， 在这里用于改变 页面的背景和打印信息 */
function fascinateMe() {


	var	colorArray = BaseTool.BaseColorArray;
	var createRandom = BaseTool.createRandomInteger;
	
	var colorIndex = createRandom(colorArray.length -1);
	var colorName = colorArray[colorIndex];
	
	var styleString = "<style>body { background: [color] }</style>";
	styleString = styleString.replace("[color]", colorName);
	
	var someText = "<br/>you get a wonderful color ";
	var colorSpan = "<span class='colorName'>" + colorName + "</span>";
	
	var HTMLCode = styleString + someText + colorSpan;
	if(pageLoaded == false) {
		document.write(HTMLCode);
	}
	else {
		document.body.innerHTML += HTMLCode;
	}
}