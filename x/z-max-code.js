
function SETUP_SHORT() {
	
	var SHORT_MAP =
	{
		"_" : _ouputln,
		"_o" : _ouput
	}
	
	relate(SHORT_MAP);
}

function CREATE_runtime_style() {
	
	var styleCode =
	".SOURCES { display: none; }";
	
	var styleNode = STYLE(styleCode, "runtimeSTYLE");
}
//
_on(SETUP_SHORT, "LOADSTART");
_on(CREATE_runtime_style, "LOADED");