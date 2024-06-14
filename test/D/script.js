
var styleEditer;

bind(function() {
	
	styleEditer = $("#styleEditer");
	
	styleEditer.bind(style_blur, "blur");
	
	_notify(resolve(window));
})

function style_blur() {
	
	$("#dynamicSTYLE").txt(styleEditer.txt());
	
}

