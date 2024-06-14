
var $ = function(str) {
	return document.getElementById(str)
}

$.any = {}

$.any.init = function() {
	var app = navigator.appVersion
	
	if(app.match(/dreamweaver/i))
	$.dream = true
	else
	$.dream = false
}
$.any.init()

$.is = function(o) {
	var re
	if(typeof(o) == "string") {
		re = eval("typeof " + o + " !== 'undefined'")
	}
	else
	re = (o !== undefined)
	
	return re
}
$.any._tie = function(action,block,etype,target) {
	target = target || window
	if(! etype)
	target == window ? etype = "load" : etype = "click"
	block = block || function() { alert(target + " on " + etype)}
	action = action || "tie"
	if(action == "tie") {
		var debug
		if($.is("x")) {
			debug = x._code.debug
		}
		var dblock
		if(debug) {
			dblock = block
			block = function() { debug._try(dblock) }
		}
		target.addEventListener(etype,block)	
	}
	else {
		target.removeEventListener(etype,block)
	}
	return block
}
$.tie = function(block,etype,target) {
	return this.any._tie("tie",block,etype,target)
}

$.untie = function(block,etype,target) {
	return this.any._tie("untie",block,etype,target)
}
$.create = function(tag,id) {
	var e = document.createElement(tag)
	e.id = id
	return e
}
$.append = function(out,pin) {
	return out.appendChild(pin)
}

$.tie(function() {
	$.body = document.body
})

