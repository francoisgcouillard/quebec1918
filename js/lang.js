var lang = {
	langs : ['fr', 'en', 'es'],
	langCode : '',
	langJS : {},
	langSet : 'en' //default language;
	
	
};

var translate = function (jsdata)
{	
	lang.langJS = jsdata;
	
	$("[tkey]").each (function () {
		var strTr = jsdata [$(this).attr ('tkey')];
		
	    $(this).html (strTr);
	});
}

function getText(key) {
	return (lang.langJS[key] == undefined ? key : lang.langJS[key] );
}


lang.langCode = navigator.language.substr (0, 2);

if (lang.langCode in lang.langs)
	lang.langSet = lang.langCode;

$.getJSON('lang/'+lang.langSet+'.json', translate);

