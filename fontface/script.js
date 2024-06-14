


$.any.submeter = function(str) {
	return str.replace("px","")
}

$.any.getStyle = function(node) {
	return window.getComputedStyle(node)
}

$.tie(function() {
	var eh1,epara
	var h1box,parabox
	
	pdoc = document
	
	eh1 = $("title")
	epara = $("para")
	
	h1box = $("h1box")
	parabox = $("pbox")
	
	
	setInp()
	setRope()
	
	function setInp() {	
		var h1font,parafont
		var inph1,inppara
		
		inph1 = $("h1font")
		inppara = $("pfont")


		getFont()
			
		$.tie(function() {
			h1font = inph1.value
			setFont()	
		},"change",inph1)
		
		$.tie(function() {
			parafont = inppara.value
			setFont()	
		},"change",inppara)
		
		function getFont() {
			if(! $.dream) {
				h1font = localStorage.getItem("h1font")
				parafont = localStorage.getItem("parafont")
			}
			var h1style,parastyle
			var psub,pstyle
			pstyle = $.any.getStyle
			if(!h1font) {
				h1style = pstyle(eh1)
				h1font = h1style.fontFamily
			}
			if(! parafont) {
				parastyle = pstyle(epara)
				parafont = parastyle.fontFamily
			}
			inph1.value = h1font
			inppara.value = parafont
			setFont()
		}
		function setFont() {	
			if(! $.dream) {
				localStorage.setItem("h1font",h1font)
				localStorage.setItem("parafont",parafont)
			}
			
			_nodefont()
		}
		
		function _nodefont() {
			eh1.style.fontFamily = h1font
			epara.style.fontFamily = parafont					
		}
	}
	function setRope() {
		var h1rope,pararope
		var h1size,parasize
		var h1style,parastyle
	
		getSize()

		h1rope = new Rope(h1box)
		h1rope.shownum(true)
		h1rope.setNotice(function(v) {
			h1size = v
			setSize()
		})
		h1rope.setValue(h1size)
		
		pararope = new Rope(parabox)
		pararope.setNotice(function(v) {
			parasize = v
			setSize()
		})
		pararope.setValue(parasize)
		
		function getSize() {
			if($.dream) {
				h1size = 24
				parasize = 16
			}
			else {
				h1size = localStorage["h1size"] || 24
				parasize = localStorage["parasize"] || 16
			}
			_nodesize()
		}
		function setSize() {
			if(! $.dream) {
				localStorage.setItem("h1size",h1size)
				localStorage.setItem("parasize",parasize)		
			}
			_nodesize()
		}
		
		function _nodesize() {
			eh1.style.fontSize = h1size + "px"
			epara.style.fontSize = parasize + "px"			
		}
	}
})