var gildotcom = {
	
	currentIndex: 0,
	cartoonSteps: ["start","developer","hotwife","homerepair","bbq","workout","workoutfat","end"],
	flipping: false,
	doItAgain: [],
	container: $("#intro"),
	
	showNextPage: function() {
		if (this.doItAgain.length > 3) {
			this.settleDown();
			return;
		}
		
		this.currentIndex++;
		if (this.currentIndex === this.cartoonSteps.length) this.currentIndex = 0;
		
		var nextName = this.cartoonSteps[this.currentIndex]
			nextPage = $("div." + nextName,this.container);
			
		if (nextPage.length < 1) {
			this.tmplFromUrl(("pages/" + nextName + ".html"),null,function(tmpl) {
				nextPage = tmpl.appendTo(gildotcom.container);
				gildotcom.flipPages(nextPage);
			});
		} else {
			this.flipPages(nextPage);
		}
	},
	
	tmplFromUrl: function( url, data, callback, options, parentItem ) {
		$.get(url,function(response) {
			var tmpl = $.tmpl(response, data, options, parentItem);
			callback(tmpl);
		});
	},
	
	flip: function(page, l) {
		var dfd = new $.Deferred();
		page.animate({left:l},1500,dfd.resolve);
		return dfd.promise();
	},
	
	flipPages: function (nextPage) {
		if (this.flipping) {
			this.doItAgain.push(nextPage);
			return;
		}
		this.flipping = true;
		
		$.when(gildotcom.flip($("div.current",this.container),"-800px"))
		.then(gildotcom.flip(nextPage, "0px"))
		.then(function(){
			$("div.current",this.container).removeClass("current").css("left","800px");
			nextPage.addClass("current");
			gildotcom.flipping = false;
			if (gildotcom.doItAgain.length) {
				gildotcom.flipPages(gildotcom.doItAgain.shift());
			}
		});
		
	},
	
	settleDown: function() {
		this.tmplFromUrl(("../pages/settle.html"),null,function(tmpl) {
			$("#content").append(tmpl);
			$("div.settle").delay(2000).fadeOut(1500);
		});
	},
	
	init: function() {
		$("a.next").bind("click",function(e) {
			e.preventDefault();
			gildotcom.showNextPage();
		});
		$(document).bind("keypress",function(e) {
			if (e.keyCode == 39) {
				gildotcom.showNextPage();
			}
		});
		$("<img/>")[0].src = "images/arrow-h.png";
	} 
};