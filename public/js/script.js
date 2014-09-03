// Setting some variables
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var windowHeight = jQuery(window).height();	
var windowWidth = jQuery(window).width();
var navHeight = jQuery('header.navbar').height();

var flg=0;
/*=================================================================*/


jQuery(document).ready(function() {

	"use strict";	

	/*=================================================================
		set home section height to fullscreen
	===================================================================*/
	jQuery('.home-wrapper').css('height', windowHeight);
	jQuery('.bg-overlay').css('height', windowHeight);
	
	/*=================================================================
		//Smooth scroll for menu links - index.html
	===================================================================*/	
	 jQuery('#navibar ul li a[href^="#"],.mobile-nav ul.slimmenu li a[href^="#"], ul.nav li a[href^="#"], a#logo, a.down-arrow,a.scrolldown').on('click', function (e) { 
		e.preventDefault(); 
		var jqBH = jQuery('html,body'); 
		jqBH.unbind("scroll mousedown DOMMouseScroll mousewheel keyup"); 
		jqBH.bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(){ jqBH.stop(true); }); 
		jqBH.stop(true).animate({scrollTop: jQuery(this.hash).offset().top}, 1200, function (){ jqBH.unbind("scroll mousedown DOMMouseScroll mousewheel keyup"); });
		
		$("#menu").stop(true,true).animate({opacity:'0'});
		setTimeout(function(){$("#menu").css("display","none")},800);
		$("#navibar").stop(true,true).animate({width:'50px'});
		flg=0;		
		
	 });
	 
	 /*=================================================================
		//Smooth scroll for menu links - index-menu.html
	===================================================================*/	
	 jQuery('ul.nav li a[href^="#"]').on('click', function (e) { 
		e.preventDefault(); 
		var jqBH = jQuery('html,body'); 
		jqBH.unbind("scroll mousedown DOMMouseScroll mousewheel keyup"); 
		jqBH.bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(){ jqBH.stop(true); }); 
		jqBH.stop(true).animate({scrollTop: jQuery(this.hash).offset().top-60}, 1200, function (){ jqBH.unbind("scroll mousedown DOMMouseScroll mousewheel keyup"); });		
	 });
	 
	 /*=================================================================
	Bootstrap Plugins : Navigation - Collapse (for mobile)
	===================================================================*/ 
	jQuery('.navbar .collapse').collapse();
	jQuery(".navbar-nav li a").click(function() {
		jQuery(".navbar .collapse").toggleClass("in");
	});
	/*=================================================================
		goto top button smooth scroll 
	===================================================================*/	
	
	jQuery('.topbutton a[href^="#"]').on('click', function(e) {	
    e.preventDefault();
    jQuery('html,body').animate({scrollTop:jQuery(this.hash).offset().top}, 3000);
	});
	
	/*=================================================================
		Home page background overlay onscroll opacity fade 
	===================================================================*/
	
	$(document).bind('scroll', fader);	
		
	
	/*=================================================================
		Home parallax effect
	===================================================================*/
	if (isMobile == false) {
		$(window).scroll(function() {
			EasyPeasyParallax();
		});
	}
	
	/*=================================================================
		Home text effect
	===================================================================*/
	$(".adject").adjector();
	
	/*==========================================================
		Venobox Responsive Lightbox
	/*==========================================================*/
	$('.venobox').venobox({
		numeratio: true
	}); 
	
	/*=================================================================
		Navigation visibility on off
	===================================================================*/	
	$("#navi").hover(function(){
          $("#navih").stop(true,true).animate({top:'-20%',left:'-20%'},130);
          },
          function(){
          $("#navih").stop(true,true).animate({top:'100%',left:'100%'},130);
        });
	
		$(".grid article").hover(function(){
          $("#abhover").stop(true,true).animate({top:'-20%',left:'-20%'},130);
          },
          function(){
          $("#abhover").stop(true,true).animate({top:'100%',left:'100%'},130);
        });
		
	 $("#navi").click(function(){
		if (flg==0){
			$("#navibar").stop(true,true).animate({width:'850px'});
			$("#menu").stop(true,true).animate({opacity:'0.96'});
			$("#menu").css("display","block");
			flg=1;
		}
		else{
			$("#menu").stop(true,true).animate({opacity:'0'});
			setTimeout(function(){$("#menu").css("display","none")},500);
			$("#navibar").stop(true,true).animate({width:'50px'});
			flg=0;
		}
		
	});
	
	$("#menu").click(function(){
            $("#menu").stop(true,true).animate({opacity:'0'});
            setTimeout(function(){$("#menu").css("display","none")},500);
            $("#navibar").stop(true,true).animate({width:'50px'});
            flg=0;
    });
	
	/*=================================================================
		//Mobile Menu 
	===================================================================*/	
	
    $('ul.slimmenu').slimmenu({
        resizeWidth: '1200',
        collapserTitle: 'Spring',
        easingEffect:'easeInOutQuint',
        animSpeed:'medium',
    });
	/*=================================================================
		Contact form visibility
	===================================================================*/	
	$("#show-contactform").click(function(){		
		setTimeout(function(){$(".contact-form").css("display","block")},500);
		$(".contact-form form").removeClass("wrapform");
	});
	
	/*=================================================================
	Contact form
	===================================================================*/ 	
	$('form#contact-us').submit(function() {
		var formInput = $(this).serialize();
		$.post($(this).attr('action'),formInput, function(data){alert(data);
			$(".mail-message").removeClass("js-hidden");$("#contact-us").addClass("js-hidden");
			return false;
		});
		return false;	
	});		
	

	/*=================================================================
		Service section accordian
	===================================================================*/	
	function toggleChevron(e) {
    $(e.target)
        .prev('.accordion-toggle')
        .find("i.indicator")
        .toggleClass('fa-plus fa-minus');
	}
	$('#accordion').on('hidden.bs.collapse', toggleChevron);
	$('#accordion').on('shown.bs.collapse', toggleChevron);

	/*=================================================================
		Number counter
	===================================================================*/
	
	$('#facts').waypoint(function(){
		$('.increment').counterUp({
			delay: 10,
			time: 1000
		});
	}, {
		offset: function() {
		return $(window).height() - 300;
		},
		triggerOnce: true 
	});
	
	
	/*=================================================================
		placeholder support for IE9
	===================================================================*/
	$('input, textarea').placeholder();

	/*=================================================================
		Parallax setting
	===================================================================*/
	mediaCheck({
		media: '(max-width: 768px)',
		entry: function() {    
		  // NONE FOR DISABLE PARALLAX SCROLLING IN SMARTHPHONES & TABLET      
		},
		exit: function() {
			//.parallax(xPosition, speedFactor, outerHeight) options:
			//xPosition - Horizontal position of the element
			//inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
			//outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
			$('#facts').parallax("50%", 0.6, true);
			$('.parallax-1').parallax("50%", 0.3, true);
			$('#testimonial').parallax("50%",0.6, true);
		}
	 });
  
	/*=================================================================
		About us block hover effect
	===================================================================*/
	$(".grid article").mouseover(function(){return $(this).addClass("lasthover"),$(this).siblings().removeClass("lasthover")})
	
	/*=================================================================
	Header text slider
	===================================================================*/ 
	
	$("#home-text-slider").owlCarousel({
        navigation: false,
        pagination: false,
        items: 1,
        navigationText: false,
		autoPlay:4000,
		itemsDesktop : [1000,1], //5 items between 1000px and 901px
		itemsDesktopSmall : [900,1], // betweem 900px and 601px
		itemsTablet: [600,1], //2 items between 600 and 0
		transitionStyle : "fade"
	});
	/*=================================================================
	Clients slider
	===================================================================*/ 
	$("#client-slider").owlCarousel({
        navigation: false,
        pagination: false,
		autoPlay:5000,
        items: 5,
        navigationText: false
    });

	/*=================================================================
	testimonial slider
	===================================================================*/ 

	$("#testimonial-slider").owlCarousel({
        navigation: true,
        pagination: false,
        items: 1,
        navigationText: false,
		autoPlay:3000,
		itemsDesktop : [1000,1], //5 items between 1000px and 901px
		itemsDesktopSmall : [900,1], // betweem 900px and 601px
		itemsTablet: [600,1], //2 items between 600 and 0
		transitionStyle : "goDown"
    });
}); 

// END jQuery(document).ready()
jQuery(window).load(function() {
	
	"use strict";
	
	/*=================================================================
	Preloader
	===================================================================*/ 
	
	//$('#status').fadeOut();
	//$('#preloader').delay(350).fadeOut('slow');
	
	
	/*=================================================================
	TwitterFeed
	===================================================================*/ 
	
	$('#twitter-box').tweet({
	    modpath: 'js/twitter/',
	    list_id: 'twitter-box',
	    count: 4,
	    avatar_size: 0,
	    loading_text: 'loading twitter feed',
	    username:'contact20twelve'
	});
	
	/*=================================================================
	twitter slider
	===================================================================*/ 
	
	$("#tweet-slider").owlCarousel({
        navigation: true,
        pagination: false,
        items: 1,
        navigationText: false,
		autoPlay:3000,
		itemsDesktop : [1000,1], //5 items between 1000px and 901px
		itemsDesktopSmall : [900,1], // betweem 900px and 601px
		itemsTablet: [600,1], //2 items between 600 and 0
		transitionStyle : "goDown"
    });
});
// END Window.load()

function EasyPeasyParallax() {
	scrollPos = $(this).scrollTop();
	$('.home-wrapper').css({
		'background-position' : '50% ' + (-scrollPos/4)+"px"
	});
	$('.inner .home-text,.home-box').css({
		'margin-top': (scrollPos/4)+"px",
		'opacity': 1-(scrollPos/250)
	});
}

function fader() {
    var b = $('.bg-overlay'),
        wh = $(window).height(),
        dt = $(document).scrollTop(),
        blueView = (wh-100) - dt;
        if (blueView > 0) {
        $('.bg-overlay').css({opacity: 1 - Math.min(1 / wh * blueView, 1)});
		}
}	

/*=================================================================
	mousewheel scroll 
===================================================================*/ 
	$(function(){	
		var $window = $(window);		//Window object
		var scrollTime = 1.2;			//Scroll time
		var scrollDistance = 200;		//Distance. Use smaller value for shorter scroll and greater value for longer scroll
		$window.on("mousewheel DOMMouseScroll", function(event){
			event.preventDefault();			
			var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
			var scrollTop = $window.scrollTop();
			var finalScroll = scrollTop - parseInt(delta*scrollDistance);
		
			TweenMax.to($window, scrollTime, {
				scrollTo : { y: finalScroll, autoKill:false },
				ease: Power1.easeOut,	//For more easing functions see http://api.greensock.com/js/com/greensock/easing/package-detail.html
				autoKill: false,
				overwrite: 5							
			});
		});	
	});