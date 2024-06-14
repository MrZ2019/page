

var example;

var nexus = html.tNexus;
var xpath = html.evaluateXPath;
bind(function() {
	
	quick.extendArrayProto();
	quick.optimizeArrayProto();
		

	wicketPage = html.nodeByID("wicket-page");
	wicket = html.nodeByID("mainwicket");
	wicket.depend(wicketPage);
	example = html.createExampleDocument();
	example.depend(wicketPage);
	
	childs = example.childs;
	child1 = example.childs[0];
	child2 = example.childs[1];
	
	son1 = child1.childs[1];
	son2 = child1.childs[2];
	html.randomAnimate();
	
	//	border
	divs = html.selectHTMLElements("#ExampleDocument div");
	
	divs.each(function(node) {
		node.css("borderColor", "hsl(240,50%,98%)");
	})
	
	//
	zcode = z.toString();
	code = zcode.match(/{[^]*}/g)[0];
	
	//
	var uibox = document.getElementById("uibox");
	uibox.display("none");
	
	wicket = document.getElementById("mainwicket");
	
	
	codeInput = document.getElementById("codeInput");
	
	//codeInput.value = "/" + analyzeCode() + "/g";
	//var describe = analyzeCode(defineHTMLThings);
	//treeView = html.createTreeView(describe, "objectTree");
	
	
},"load");

