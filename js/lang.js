class Lang {
	constructor (langs) {
		this.langs = langs;
		this.langBrowser = '';
		this.library = {}; //every words of the good lang
		this.langSet = langs[0]; //default lang
		
		if (navigator.language.substr (0, 2) != undefined) {
			this.langBrowser = navigator.language.substr (0, 2);
			if (this.langs.includes(this.langBrowser)) 
				this.langSet = this.langBrowser;
		}
	};
	//Get a div with translated text with all infos for future translate
	getTextContainer (str) {
		return ( $("<div/>").attr("data-tkey", str).attr("lang", this.langSet).html(this.getText(str)) );
	};
	getText(key) {
		if (this.library[key] == undefined)
			console.log ("Clé introuvable=" + key);
		
		return (this.library[key] == undefined ? key : this.library[key] );
	};
	loadAndSet () {
		var classLang = this;
		
		$.getJSON('lang/'+this.langSet+'.json', function (jsdata) {
			classLang.library = jsdata;
			
			$("[data-tkey]").each (function (index) {
				if ( $(this).attr ('data-tkey').length )
					var strTr = classLang.getText($(this).attr ('data-tkey'));
				else {
					var strTr = classLang.getText($(this).html());
					$(this).attr( 'data-tkey', $(this).html() );
				}
				
				$(this).attr ("lang", $("html").attr("lang"));
				$(this).html (strTr);
			});
		})
		.fail (function() {
			console.log( "error loading " + 'lang/'+this.langSet+'.json' );
		});
	};
	setLang (lang) {
		if (lang == undefined)
			lang = this.langSet;
		
		//If we have a library with this language
		if (this.langs.includes(lang)) {
			$("html").attr("lang", lang);
			this.langSet = lang;
			this.loadAndSet();
		}
	};
}
