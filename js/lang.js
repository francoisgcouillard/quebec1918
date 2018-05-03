class Lang {
	constructor () {
		this.langs = ['fr', 'en', 'it'];
		this.langBrowser = '';
		this.library = {}; //every words of the good lang
		this.langSet = '';
		
		if (navigator.language.substr (0, 2) != undefined) {
			this.langBrowser = navigator.language.substr (0, 2);
			if (this.langs.includes(this.langBrowser)) 
				this.langSet = this.langBrowser;
		}
	};
	loadAndSet () {
		$.getJSON('lang/'+this.langSet+'.json', function (jsdata) {
			this.library = jsdata;
		
			$("[tkey]").each (function (index) {
				if ( $(this).attr ('tkey').length )
					var strTr = jsdata [$(this).attr ('tkey')];
				else {
					var strTr = jsdata [$(this).html()];
					$(this).attr( 'tkey', $(this).html() );
				}
				
				$(this).attr("lang", $("html").attr("lang"));
				$(this).html (strTr);
			});
		}.bind(this));
	};
	//Get a div with translated text with all infos for future translate
	getTextContainer (str) {
		return ( $("<div/>").attr("tkey", str).attr("lang", this.langSet).html(this.getText(str)) );
	};
	getText(key) {
		if (this.library[key] == undefined)
			console.log ("Clé introuvable=" + key);
		
		return (this.library[key] == undefined ? key : this.library[key] );
	};
	setLang (lang) {
		if (lang == undefined)
			lang = 'fr';
		
		//If we have a library with this language
		if (this.langs.includes(lang)) {
			$("html").attr("lang", lang);
			this.langSet = lang;
			this.loadAndSet();
		}
	};
}

var lang = new Lang();
lang.setLang();
