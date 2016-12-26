$(document).ready(function(){  //start document ready
    
     verticalText();
    
    //CREATE THE IMAGES
    $('.box-img').each(function(){
        var t = $(this);
        createImg(t);
    }); 
    
    
    //RE-GENERATE IMAGES WHEN WINDOW RESIZED
    $(window).resize(function() {
        $('.box-img').each(function(){
            var t = $(this);
            createImg(t);
        }); 
    });
    
    

    
    //ADD A COLOR BOX OR IMAGE BOX
    document.oncontextmenu = function() {return false;};
    
    $('.box').mousedown(function(e){ 
        
        var t = $(this);        
        var h2 = $(this).find('h2');
            
        if(h2.length){          
        }else{
            var h2t = document.createElement('h2');
            this.appendChild(h2t);
            
            var span = document.createElement('span');
            span.innerHTML = "This is a description of the box";
            this.appendChild(span);
        }
        
        //LEFT CLICK ADD IMG
        if( e.button == 2) { 
            $(this).addClass('box-img');
            $(this).find('h2').text("This is an image box");
            createImg(t);           
        }
        
        //RIGHT CLICK ADD COLOR
        if( e.button == 0 ) {
           $(this).find('h2').text("This is a color box");
           $(this).css('background-color', getRandomColor());
           t.removeClass('box-img');
           t.css('background-image', '');         
        }
        
        verticalText(); 
                
        
    }); 
    

});// end document ready
    


function createImg(t){
    //get ths size of the box
    var w = t.width();
    var h = t.height();
    
    //make the image to be the same size of the box
    var src = "url(http://lorempixel.com/" + w + "/" + h + ")";
    
    t.css('background-image', src);     
}



function verticalText(){
    //vertically center the text
    $('.box').each(function(){
        
        //let's vertically center the text
        var h2 = $(this).find('h2');
        
        if(h2.length){
            //found a <h2> tag
            var boxHeight = $(this).height()/2;
            var textHeight = h2.height()/2;
            var spanHeight = $(this).find('span').height()/2;
            
            var height = boxHeight - textHeight - spanHeight - 2; 
            
            h2.css('margin-top', height + 'px');
            
        }else{
            //didnt find a <h2>
        }       
        
    });
        
}



function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}






