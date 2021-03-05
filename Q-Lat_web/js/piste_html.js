/*
var pisteWindows = new Array();

function PisteWindow(id,x,y) {
	this.id = id;
	this.x = x;
	this.y = y;
}

function addWindowFromElement(id,x,y,borderStyle,width) {
	//var element = document.getElementById(id);
	addContainerToElement(borderStyle, id, width);
	var pisteWindow = new PisteWindow(id,x,y); 
	pisteWindows.push(pisteWindow);
}
*/
function addContainerToElement(borderStyle, id, width) {
	addContainerToElement(borderStyle, id, width, false);
}

function addContainerToElement(borderStyle, id, width, closeButton) {
	
	var element = document.getElementById(id);
	
	if (element == null || element == undefined)
		return;
		
	var newHtml = '';
	newHtml += '	<table style=\"empty-cells:show\" width=\"'+width+'\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">';
	newHtml += '		<tr><td class=\"'+borderStyle+'_vasen_yla\"></td><td class=\"'+borderStyle+'_keski_yla\"></td><td class=\"'+borderStyle+'_oikea_yla\"></td></tr>';
	newHtml += '		<tr><td class=\"'+borderStyle+'_vasen_keski\"></td>';
	newHtml += '			<td class=\"'+borderStyle+'_keski\">';
	newHtml += '				<div style=\"position:relative;left:0;top:0;\">'+element.innerHTML+'</div>';
	
	if (closeButton) {
		newHtml += '				<div style=\"position:absolute;right:10;top:8;\" onclick=\"document.getElementById(\''+id+'\').style.visibility=\'hidden\';\" title=\"Close\"><img src=\"img/button_close.png\"/></div>';
	}
	
	newHtml += '			</td>';
	newHtml += '			<td class=\"'+borderStyle+'_oikea_keski\"></td>';
	newHtml += '		</tr>';
	newHtml += '		<tr><td class=\"'+borderStyle+'_vasen_ala\"></td><td class=\"'+borderStyle+'_keski_ala\"></td><td class=\"'+borderStyle+'_oikea_ala\"></td></tr>';
	newHtml += '	</table>';
	element.innerHTML = newHtml;
}


function addContainerToHTML(borderStyle, originalHtml, width) {
	var newHtml = '';
	newHtml += '	<table style=\"empty-cells:show\" width=\"'+width+'\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">';
	newHtml += '		<tr><td class=\"'+borderStyle+'_vasen_yla\"></td><td class=\"'+borderStyle+'_keski_yla\"></td><td class=\"'+borderStyle+'_oikea_yla\"></td></tr>';
	newHtml += '		<tr><td class=\"'+borderStyle+'_vasen_keski\"></td>';
	newHtml += '			<td class=\"'+borderStyle+'_keski\">';
	newHtml += '<div style=\"position:relative;\">'+originalHtml+'</div>';
	newHtml += '			</td>';
	newHtml += '			<td class=\"'+borderStyle+'_oikea_keski\"></td>';
	newHtml += '		</tr>';
	newHtml += '		<tr><td class=\"'+borderStyle+'_vasen_ala\"></td><td class=\"'+borderStyle+'_keski_ala\"></td><td class=\"'+borderStyle+'_oikea_ala\"></td></tr>';
	newHtml += '	</table>';
	return newHtml;
}



