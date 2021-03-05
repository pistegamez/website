var cookieData;
var cookieExpires = 10;

function newCookieData() {
	document.getElementById('debug').innerHTML += '<div>newCookieData()</div>'; 
	var d = new Object();
	d.read = readCookie;
	d.erase = eraseCookie;
	d.save = createCookie;
	return d;
}

function createCookie(name,value) {

	if (cookieExpires) {
		var date = new Date();
		date.setTime(date.getTime()+(cookieExpires*24*60*60*1000));
		var expires = ''+date.toGMTString();
	}
	else 
		var expires = "";
		
	document.cookie = name+"="+value+'; expires'+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) 
			return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}