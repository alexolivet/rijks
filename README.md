## Synopsis
This project is a final project for a web developer course. The idea is to develop an API using the rijksmuseum collection API and
mix it with a canvas. This makes it a tool that joins art(history) and fun.
It allows visitors to search the rijksmuseum collection. Users can then decide to keep the image ( a PHP file would then allow for some
details such Image URL, short and long description and maker info ).


## Code Example

Project has been written in: 

##HTML5 for the framework. The site uses two different grid system. 

landing page is a 1 page website with top menu brining visitors to each page individually.
On page size change,the id="mainNav" becomes a id="mySidenav" which covers the entire page showing the different chapters.

APP page uses a grid system that is slightly more playfull. It is inspired on mansonry. Boxes do not have the same width and height.
I choose this layout has it made me think of a room in a museum.

##SASS

I have tried to keep SASS as tidy as possible. I am using Bourbon mixin. Always useful.
I have grouped all of my fonts onto a separate partial file. Same thing for the 2 different grid system. This way it is easy
to fix issues or simply enhance layout.


##PHP for email communication

For the email communication, PHP mail() function is used. It may be harder to setup but I beleive it is safer.
The PHP files are setup for each page individually.
On the landing page, a simple "contact" form is build. Emails will be sent to the webmaster of the site. 
The script contains the usual parameters, please see http://www.w3schools.com/php/func_mail_mail.asp for full details.
The script also contains an email body(with subject field, headers and son on ).

On the APP page, the script gets value from the users interaction. When an image is saved, it will automatically send
details on the image to the user.


##JAVASCRIPT & JQUERY
 SCRIPT.JS contains the code for the API. Variables are setup to obtain value from input field. 
 I have also setup variables which are directly send to the form. 
 I have created a SEARCH function that fires requests to different URL( all linked to the API ). Based on the time of the day,
 a different url is used.
 
 The DOSEARCH function places the data received from the json request and set it in the different div. 
 I am using a loader to give a visual indication of the searchh progress.
 It is important to note that I am only working with 1 image at the time. This means search results are for one picture at the time.
 
 A canvas is then build and images from the json response are automtically placed in the canvas. 
 The canvas itself is simple. I am not using div for multiple colors but instead use a multicolor simple stroke.
 
 INDEX.JS contains the code for the slider. It also contains solution with the z-index and the buttons located on the landing
 page. This script also contains the smooth scrolling code. The popup on the landing page ( a sort of modal box ) is also set on 
 this script.
 
 JQUERY.JS is just a file that contains the random color functions and the code to change box color on each page load ( APP Page).


## API Reference

Direct link to the API: https://www.rijksmuseum.nl/en/api . The rijksmuseum offers a absolutely great API.
Super easy to setup.


## License

The draw-like-masters APP was not developed by, for, through the intercession of, or with the support of the Rijksmuseum.
