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
				//Get the key and set the text
				
				//If there's a value in the key attribute
				if ( $(this).attr ('data-tkey').length ) { 
					var strTr = classLang.getText( $(this).attr ('data-tkey') );
					
					( $(this)[0].tagName == "META" ? $(this).attr( 'content', strTr) : $(this).html (strTr) );
				}
				//if there is something inside the tag (html) then the tag is here
				else if ( $(this).html().length ) { 
					$(this).attr ( 'data-tkey', $(this).html() );
					var strTr = classLang.getText( $(this).html() );
					$(this).html ( strTr );
				}
				//if there is a content attribute
				else if ( $(this).attr('content') ) { 
					$(this).attr ( 'data-tkey', $(this).attr('content') );
					var strTr = classLang.getText( $(this).attr('content') );
					$(this).attr ( 'content', strTr );
				}
				
				$(this).attr ("lang", $("html").attr("lang"));
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
