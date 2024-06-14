/*
	Shape 
	Rope {
		*erope,eline,espot,enum
		*value
		
		*drawui()
		*addnexus()
		getValue()
		setValue()
		setNotice()
*/

(function irope() {
function Rope(pparent) {
	var _this = this
	var erope,eline,espot,evalue

	var spotstyle,numstyle
	var bnum
	var minn,maxn,k
	var value,maxx
	
	var notices = []
	
	bnum = true;
	isdrag = false;
	value = 0;
	
	parent = pparent || $.body
	drawui()
	compute()
	addNexus()
	function drawui() {
		erope = $.create("div","rope")
		evalue = $.create("div","ropenum")
		eline = $.create("div","ropeline")
		espot = $.create("div","ropespot")
		$.append(erope,eline)
		$.append(erope,espot)
		$.append(erope,evalue)
		$.append(parent,erope)
	}
	
	this.shownum = shownum
	function shownum(toggle) {
		if(toggle == undefined) bnum = !bnum
		bnum ? evalue.style["opacity"] = 1 : evalue.style["opacity"] = 0
		return evalue
	}
		
	function compute() {
		var wline,wspot
				
		spotstyle = getComputedStyle(espot)
		numstyle = evalue.style
		offsetx = eline.offsetLeft
		wline = eline.clientWidth 
		wspot = espot.clientWidth
		maxx = wline - espot.clientWidth
		
		setRange()
		this.setRange = setRange
		function setRange(pminn,pmaxn) {
			maxn = pmaxn || 100
			minn = pminn || 0
			k = (maxn - minn) / (wline - wspot)
		}
	
		bnum = bnum || false
		shownum(bnum)
		evalue.innerText = value;
	}
	function addNexus() {
		
		var isdrag
		var x	
		var sx
		
		$.tie(function(e) {
			e.preventDefault();
		},'dragstart')
		$.tie(function() {
			var pstart
			var left
			isdrag = true
			x = event.x
			left = spotstyle.left
			if(left == "auto")
			sx = 0
			else
			sx = left.replace("px","") - 0	
			pstart = notices["dragstart"]
			if(pstart) pstart(value,_this)
		},"mousedown",espot)
		
		var onmove = $.tie(function() {
			var cx
			var pdrag
			if(isdrag) {
				cx = event.x - x
				curx = cx + sx
				if(curx < 0)
				curx = 0
				if(curx > maxx)
				curx = maxx
				espot.style.left = curx + "px"
				value = Math.round(minn + k*curx)
				
				pdrag = notices["drag"]
				if(pdrag) pdrag(value,_this)
				
				evalue.innerText = value
			}
		},"mousemove")
		
		$.tie(function() {
			var pend
			isdrag = false
			$.untie(onmove,"mousemove",espot)
			
			pend = notices["dragend"]
			if(pend) pend(value,_this)
		},"mouseup")
	}
	
	this.setNotice = function(callback,etype) {
		etype = etype || "drag"
		notices[etype] = callback
	}
	
	this.setValue = function(v) {
		var left
		value = v
		left = Math.round(v / k)
		espot.style.left = left + "px"
		evalue.innerText = value
	}
	
	this.getValue = function() { return value }			
}

if(window["x"]) {
	x.ui.rope = Rope;
	x.ui.charge(Rope);
}
else {
	window.Rope = Rope;
}
}) ();

