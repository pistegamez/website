var debugEnabled = false;
var showDebugElement = false;

function debug(text) {

	if (debugEnabled) {

		var debugElement = document.getElementById('debug');

		if (debugElement == null || debugElement == undefined)
			return;	

		if (!showDebugElement) {
			showDebugElement = true;
			//debugElement.style.visibility = 'visible';
			document.getElementById('console').style.visibility = 'visible';
		}
		debugElement.innerHTML+='<div>'+text+'</div>';
	}
}