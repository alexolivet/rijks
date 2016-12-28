$(document).ready(function(){  //start document ready
    
    //on page load, chnage color of boxes
    $('.box').each(function(e){ 
           $(this).css('background-color', getRandomColorLight());      
    }); 
    

});// end document ready
    

//ways to generate random colors

//all colors
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//cutting the string off forcing the random to be high number in HEX
//will only generate light colors
    function getRandomColorLight() {
                var letters = 'BCDEF'.split('');
                var color = '#';
                for (var i = 0; i < 6; i++ ) {
                    color += letters[Math.floor(Math.random() * letters.length)];
                }
                return color;
            }

//HSL stands for hue, saturation, and lightness - and represents a cylindrical-coordinate representation of colors.
//An HSL color value is specified with: hsl(hue, saturation, lightness).
//Hue is a degree on the color wheel (from 0 to 360) - 0 (or 360) is red, 120 is green, 240 is blue. 
//Saturation is a percentage value; 0% means a shade of gray and 100% is the full color. 
//Lightness is also a percentage; 0% is black, 100% is white.
function getRandomColorHsl() {
  color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
  return color;
}

//RGB version
function getRandomColorRgb() {
  return 'rgb(' + 
    (Math.floor(Math.random()*56)+200) + ', ' +
    (Math.floor(Math.random()*56)+200) + ', ' +
    (Math.floor(Math.random()*56)+200) +
    ')';
}





