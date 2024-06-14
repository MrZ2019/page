
//	状态栏
function createSTATUSBAR() {
	
	var statusBAR = div("bar", "Bar", null);
	body.append(statusBAR);
	
	_UI["status"] = statusBAR;
	return statusBAR;
}

//	消息栏
function createMessageBAR() {
	
	var preClass;
	
	function setClass(className) {	
		if(_und(preClass) == 1) {
			messageBAR.className += " " + className;
		}
		else {
			var msgClass = messageBAR.className;
			msgClass = msgClass.replace(preClass, className);	
			messageBAR.className = msgClass;	
		}
		
		preClass = className;	

	}
	var now = new Date();
	
	var messageBAR = div(now, "BAR BOTTOM", "MessageBAR");
	body.append(messageBAR);
	
	/*	添加类名	*/
	messageBAR.setClass = setClass;
	
	_UI["message"] = messageBAR;
	return messageBAR;
}

function createBox(id, titleText, parent) {
	
	function SETUPBox() {
				
		function box_mousedown() {
			isHold = true;
			
			if(Box.rig() == "auto") {
				
				titleStartX = titleDIV.x(true);
				BoxStartX = Box.x(true);
			}
			else {
				
				bRight = true;
				
				titleStartX = titleDIV.rig(true);
		
				BoxStartX = Box.rig(true);
			}
			
			if(Box.bot(true) == "auto") {
				titleStartY = titleDIV.y(true);
				BoxStartY = Box.y(true);
		
			}
			else {
				bBottom = true;
				titleStartY = titleDIV.bot(true);
				BoxStartY = Box.bot(true);
			}
			
			startEventX = event.x;
			startEventY = event.y;
		}
		
		function box_mousemove() {
			
			if(isHold) {
				
				var cx = event.x - startEventX;
				var cy = event.y - startEventY;
				
				if(bRight) {
					cx = -cx;
				}
				if(bBottom) {
					cy = -cy;
				}
				var XTitle = titleStartX + cx;
				var YTitle = titleStartY + cy;				

				var XBox = BoxStartX  + cx;
				var YBox = BoxStartY + cy;
								
				if(bRight == true) {
					
					titleDIV.rig(XTitle);
					
					Box.rig(XBox);
				}
				else {
					
					titleDIV.x(XTitle);
					
					Box.x(XBox);
				}	
				
				if(bBottom == true) {
					titleDIV.bot(YTitle);
					Box.bot(YBox);							
				}
				else {
					titleDIV.y(YTitle);
					Box.y(YBox);
				}
				
			}
		}
		
		function box_mouseup() {
			
			isHold = false;
			
			unbind(box_mousemove, "mousemove");
		}
		
		var isHold = false;
		var bRight = false;
		var bBottom = false;
		var startEventX, startEventY;
		var titleStartX, titleStartY;
		var BoxStartX, BoxStartY;
		
		
		Box._TITLE = titleDIV;
		
		titleDIV.mousedown(box_mousedown);
		bind(box_mousemove, "mousemove");
		titleDIV.mouseup(box_mouseup);
		
	}
	
	parent = parent || body;
	titleText = titleText || "title";
	
	var Box = div(null, "BOX", id);
	
	parent.append(Box);
	
	var titleDIVid= id + "Title";
	var titleDIV = div(titleText, "TitleBAR", titleDIVid);
	parent.insert(titleDIV, Box);
	parent.insert(br(), Box);
	
	SETUPBox();
	return Box;
}

function createRecordBox() {
	
	var recordBox = createBox("recordBOX", "record");
	
	_UI["record"] = recordBOX;
	return recordBox;
}