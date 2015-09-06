
/*=============================================================
    Authour URL: www.designbootstrap.com

    http://www.designbootstrap.com/

    License: MIT

    http://opensource.org/licenses/MIT

    100% Free To use For Personal And Commercial Use.

    IN EXCHANGE JUST TELL PEOPLE ABOUT THIS WEBSITE
    Modified:AtsumaShu
========================================================  */

$(document).ready(function () {
			  $(".navbar-toggle").on("click", function () {
				    $(this).toggleClass("active");
			  });
    // SCROLL SCRIPTS 
        $('.scroll-me a').bind('click', function (event) { //just pass scroll-me class and start scrolling
        var $anchor = $(this);
			//	console.log($anchor.attr('href'));
				//	console.log($($anchor.attr('href')).length);


		if($($anchor.attr('href')).length===1)
				{
				//console.log($($anchor.attr('href')).offset().top);
					        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000, 'easeInOutQuad')
		}
		else
		{

		 $('body').stop().animate({
            scrollTop: 0
        }, '1000', 'easeInOutQuad');
		}
        event.preventDefault();
        });
    // BACKGROUND VIDEO SCRIPTS
        /*$(function () {
            $(".player").mb_YTPlayer(); // .player - class to add for playing video ( see the div above to understand)
        });*/

});
