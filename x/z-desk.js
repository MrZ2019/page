
function buildDESK() {

	var views;
	createUI();
	
	SETUP_DESK();
	
	return DESK;
	//
	function createUI() {
		
		DESK = div(null, null, "DESK");
		view = div(null, null, "DESK_VIEW");
		view.appendTo(DESK);
		create_DESK_NAV();
		
		DESK.appendTo();	
		//		create navigator
		function create_DESK_NAV() {
			
			var NAV_ITEM_MAP = 
			{
				"execute" : "EXECUTE_VIEW",
				"resources" : "RESOURCES_VIEW",
				"page" : "PAGE_VIEW",
				"network" : "NETWORK_VIEW",
				"help" : "HELP_VIEW",
				"test" : "TEST_VIEW"
			}
				
			var NAV_opt = 
			{
				"parent" : DESK,
				"id" : "DESK_NAV",
				"Container" : view,
				"default" : 5
			}
	
		var NAV = createNAV(NAV_ITEM_MAP, NAV_opt);
		views = DESK.views = NAV.views;		
		}
		
	}
	
	function SETUP_DESK() {
		
		bind(HANDLE_KEY, "keydown")
		
		var _execute = views[0];
		
		_execute.loadCode("#EXECUTE_VIEW");
	}
	
	function HANDLE_KEY() {
		
		var keyCode = event.keyCode;
		
		switch(keyCode) {
			
			case 192:
			{
				DESK.toggle();
			}
			break;
		}
	}
	
	var DESK_KEY = 
	{
		"~" : 192
	}
}

//
var DESK;