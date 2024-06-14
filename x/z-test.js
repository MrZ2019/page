
bind(z_test);

function z_test() {
	
	bind(page_keydown, "keydown");
	
	_(head);	
}

function page_keydown() {
	
	_notify(event.keyCode);
	return false;
}