var slideSpeed = 700;
var slideDelay = 5000;
var slideEasing = 'easeInOutExpo';

var testimonialSpeed = 300;
var testimonialEasing = 'easeInOutCirc';

var flask = false;

$(function(){
	$('html,body').scrollTop(0);

// scrolling effects

	var parallax = $('.parallax');
	var design = $('#design-process');

	var windowHeight = 0;
	var scroll = 0;
	var bottom = 0;

	mediaCheck({
		media: '(max-width: 768px)',
		entry: function() {    
		  // NONE FOR DISABLE PARALLAX SCROLLING IN SMARTHPHONES & TABLET      
		},
		exit: function() {
			scrolled();
		}
	 });
	

	$(window).scroll(scrolled);

	function scrolled(){
		windowHeight = $(window).height();
		scroll = $(this).scrollTop();
		bottom = scroll + windowHeight;

		parallax.each(para);
		design.each(des);
	}

	function para(){
		var top = $(this).offset().top;

		if(top < bottom && top > scroll){
			var pos = 100 - (top - scroll) / windowHeight * 250;
			var quote = $(this).find('.parallax-overlay');
			quote.css({top: -pos + '%'});
		}
	}

	function des(){
		var top = $(this).offset().top;

		if(top < bottom && top > scroll){
			var pos = (top - scroll) / windowHeight * 50;
			$(this).css({'background-position': 'center ' + pos + '%'});
		}		
	}

// end scrolling effects

});