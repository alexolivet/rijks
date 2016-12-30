/* ***************************
  Enable Smooth Scrolling
  Author: Chris Coyier
  URL:  CSS-Tricks.com
  ***************************** */
$(document).ready(function() { //start document ready



    //start easy scrolling
    $('a[href*=#]:not([href=#]):not([href=#show]):not([href=#hide])').click(function() {
        if ($(window).width() < 768) {
            $('#mainPage').removeClass('open');
            setTimeout(function() {
                $('#mainPage').removeClass('visible');
            }, 250);
            open = 0;
        }
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    }); //end easy scrolling

}); //end document ready




//open slide menu
//the desired width can be changed here
function openNav() {
        document.getElementById("mySidenav").style.width = "100%";
    }
    //close slide menu
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}



//popup on landing page
function popup() {
    //variable linked to a div
    var overlay = $('<div class="overlay"></div>');
    //append this div to body page
    overlay.appendTo($('body'));
    //css for popup window
    var box = $('<div class="pop"></div>').appendTo(overlay);

    var title = "<h1>draw-like-masters</h1>   <h2>An online drawing App by <a href='http://www.elwebman.nl' target='_blank'><span>elwebman.nl</span></a></h2>";

    var text = "<div><p>- Fun and completely free.</p> <p>- Drawing and learning made easy.</p><p>This is an initiative to get the whole world drawing.</p></div>";
    var text2 = "<div><p>You can access the APP right <a href='drawing.html' target='_blank'><span>here</span></a>.</p></div>";

    box.html(title + text + text2);
    //close icon
    var clos = $('<div id="close">x</div>').appendTo(box);


    //text animation
    var count = 0;
    var number = 10;

    var interval = setInterval(function() {
        count++;
        if (count === number) {
            clearInterval(interval);
            $('.pop h1 ,.pop h2').addClass('animationActive');
        }
    }, 50);

    //close popup function
    clos.click(function() {
        $(this).parent().parent().remove();
    });

}

setTimeout(function() { //timeout for popup on landing page starts
    popup();
}, 100); //timeout for popup on landing page starts - ends