/* ====================================
 * adjector.js
 * ====================================
 * Copyright 2014 Arsh Shah Dilbagi.
 * http://robo.im
 *
 * ================================= */
! function ($) {

    var no_input = {
        sep: "|",
        stay: 2600,
        trans: 1550,
        arm: 0
    };
	var textbr = Has3DSupport();
	//alert(textbr);
    $.fn.adjector = function (input) {
        var options_input = $.extend({}, no_input, input);

		if(textbr == false)
		{
			var front_css = "style='-webkit-transform: translate(0," + options_input.arm + "px); " +
            "-moz-transform: translate(0," + options_input.arm + "px); " +
            "-ms-transform: translate(0," + options_input.arm + "px); " +
            "-o-transform: translate(0," + options_input.arm + "px); " +
            "transform: translate(0," + options_input.arm + "px); ";
		}
		else
		{
        var front_css = "style='-webkit-transform: translate3d(0,0," + options_input.arm + "px); " +
            "-moz-transform: translate3d(0,0," + options_input.arm + "px); " +
            "-ms-transform: translate3d(0,0," + options_input.arm + "px); " +
            "-o-transform: translate3d(0,0," + options_input.arm + "px); " +
            "transform: translate3d(0,0," + options_input.arm + "px); ";
		}
		
        return this.each(function () {
            var flip_container = $(this)
            var array = [];
            $.each(flip_container.text().split(options_input.sep), function (key, value) {
                array.push(value);
            });
            flip_container.text(array[0]);

            var adject = function () {
                if (flip_container.find(".back-face").length > 0) {
                    flip_container.html(flip_container.find(".back-face").html())
                }

                var front_text = flip_container.text()
                var back_text_index = $.inArray(front_text, array)
                if ((back_text_index + 1) == array.length) back_text_index = -1

                flip_container.html("");
                
				if(textbr == false)
				{
					$("<span class='front-face'>" + front_text + "</span>").appendTo(flip_container);
					$(".front-face").css({
						"-webkit-transform": "translate(0," + options_input.arm + "px)",
						"-moz-transform": "translate(0," + options_input.arm + "px)",
						"-o-transform": "translate(0," + options_input.arm + "px)",
						"transform": "translate(0," + options_input.arm + "px)",
						"-ms-transform": "translate(0," + options_input.arm + "px)",
						
					})
					if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
						$(".front-face").css({"opacity": "0",})
					}
					if (/Opera/.test (navigator.userAgent)) {$(".front-face").css({"opacity": "0",})}
					$("<span class='back-face'>" + array[back_text_index + 1] + "</span>").appendTo(flip_container);
					$(".back-face").css({
						"-webkit-transform": "translate(0," + options_input.arm + "px) rotateY(180deg)",
						"-moz-transform": "translate(0," + options_input.arm + "px) rotateY(180deg)",
						"-o-transform": "translate(0," + options_input.arm + "px) rotateY(180deg)",
						"transform": "translate(0," + options_input.arm + "px) rotateY(180deg)",
						"-ms-transform": "translate(0," + options_input.arm + "px) rotateY(180deg)",
						
						
					})

					flip_container.wrapInner("<span class='adjecting' />").find(".adjecting").hide().show().css({
						"-webkit-transform": " rotateY(180deg)",
						"-moz-transform": " rotateY(180deg)",
						"-o-transform": " rotateY(180deg)",
						"transform": " rotateY(180deg)",
						"-ms-transform": " rotateY(180deg)",
						"-webkit-transition": " " + options_input.trans + "ms",
						"-moz-transition": " " + options_input.trans + "ms",
						"-o-transition": " " + options_input.trans + "ms",
						"transition": " " + options_input.trans + "ms",
						"-ms-transition": " " + options_input.trans + "ms",
					})
				}
				else
				{
					$("<span class='front-face'>" + front_text + "</span>").appendTo(flip_container);
					$(".front-face").css({
						"-webkit-transform": "translate3d(0,0," + options_input.arm + "px)",
						"-moz-transform": "translate3d(0,0," + options_input.arm + "px)",
						"-o-transform": "translate3d(0,0," + options_input.arm + "px)",
						"transform": "translate3d(0,0," + options_input.arm + "px)",
					})

					$("<span class='back-face'>" + array[back_text_index + 1] + "</span>").appendTo(flip_container);
					$(".back-face").css({
						"-webkit-transform": "translate3d(0,0," + options_input.arm + "px) rotateY(180deg)",
						"-moz-transform": "translate3d(0,0," + options_input.arm + "px) rotateY(180deg)",
						"-o-transform": "translate3d(0,0," + options_input.arm + "px) rotateY(180deg)",
						"transform": "translate3d(0,0," + options_input.arm + "px) rotateY(180deg)",
						
					})

					flip_container.wrapInner("<span class='adjecting' />").find(".adjecting").hide().show().css({
						"-webkit-transform": " rotateY(180deg)",
						"-moz-transform": " rotateY(180deg)",
						"-o-transform": " rotateY(180deg)",
						"transform": " rotateY(180deg)",
						"-webkit-transition": " " + options_input.trans + "ms",
						"-moz-transition": " " + options_input.trans + "ms",
						"-o-transition": " " + options_input.trans + "ms",
						"transition": " " + options_input.trans + "ms",
					})
				}
				
            };
            setInterval(adject, options_input.stay + options_input.trans);
        });
    }

	function Has3DSupport()
	{
		var sTranslate3D = "translate3d(0px, 0px, 0px)";

		var eTemp = document.createElement("div");

		eTemp.style.cssText = "  -moz-transform:"    + sTranslate3D +
							  "; -ms-transform:"     + sTranslate3D +
							  "; -o-transform:"      + sTranslate3D +
							  "; -webkit-transform:" + sTranslate3D +
							  "; transform:"         + sTranslate3D;
		var rxTranslate = /translate3d\(0px, 0px, 0px\)/g;
		var asSupport = eTemp.style.cssText.match(rxTranslate);
		var bHasSupport = (asSupport !== null && asSupport.length == 1);

		return bHasSupport;
	} // Has3DSupport
}(window.jQuery);