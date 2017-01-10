      $(document).ready(function() { //start document ready

          //on page load, chnage color of boxes
          $('.box').each(function(e) {
              $(this).css('background-color', getRandomColorLight());
          });


          // var animationName = 'animated shake'
          // var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
          // $('a.button').on('click', funtion(){
          //     $('input[name=firstname]').addClass(animationName).one(animationEnd,
          //         function(){
          //             $(this).removeClass(animationName)
          //         });

          // });


      }); // end document ready


      //ways to generate random colors

      //all colors
      function getRandomColor() {
          var letters = '0123456789ABCDEF'.split('');
          var color = '#';
          for (var i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
      }

      //cutting the string off forcing the random to be high number in HEX
      //will only generate light colors
      function getRandomColorLight() {
          var letters = 'BCDEF'.split('');
          var color = '#';
          for (var i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * letters.length)];
          }
          return color;
      }


      //RGB version
      function getRandomColorRgb() {
          return 'rgb(' +
              (Math.floor(Math.random() * 56) + 200) + ', ' +
              (Math.floor(Math.random() * 56) + 200) + ', ' +
              (Math.floor(Math.random() * 56) + 200) +
              ')';
      }