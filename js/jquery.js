$(document).ready(function(){  //start document ready
    
    $('.box').mousedown(function(e){ 
        
        var t = $(this);        
        var h2 = $(this).find('h2');
        
        //RIGHT CLICK ADD COLOR
        if( e.button == 0 ) {
           $(this).find('h2').text("This is a color box");
           $(this).css('background-color', getRandomColor());
           t.removeClass('box-img');
           t.css('background-image', '');         
        }
        
    }); 
    

});// end document ready
    


function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}






