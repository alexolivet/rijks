
//variable to build url to rijksmuseum
var baseURL ="https://www.rijksmuseum.nl/api/en/collection/"
var apiKey = "?key=r4nzV2tL&imgonly=true&format=json&ps=1"
//this is the search button on htnl page
var searchBtn = document.getElementById("search");
//add event on button
searchBtn.addEventListener("click", doSearch);
//this is the container for my results
var resultDiv = document.getElementById("result");
//this is the search value added to url
var searchField = document.getElementById("query");
// search the collection using a JSON call
function search(query) {
  return $.getJSON(baseURL + apiKey + "&q=Q".replace("Q", query));
}
//search function
function doSearch() {
    //The innerHTML property sets or returns the HTML content (inner HTML) of an element.
    //in this case it is empty on each new search
    resultDiv.innerHTML = "";
    //variable for the search string
    var searchString = searchField.value;
    if (!searchString) {
      resultDiv.innerHTML = "<p>Please submit at least a letter</p>";
    } else {
        //invoke search function
        search(searchString).done(function(data) {//.done is similar to the success callback 
            for (let artObj in data.artObjects) {//Loops are handy, if you want to run the same code over and over again, each time with a different value.
                //The let statement declares a block scope local variable, optionally initializing it to a value.
                var rImg = document.createElement("img");
                rImg.setAttribute("id", "drawing");
                rImg.setAttribute("width", "400");
                rImg.setAttribute("height", "400");
                setTimeout(function() { //timeout for image load to canvas - start
                  var c = document.getElementById("myCanvas"); //declare the canvas
                  var ctx = c.getContext("2d");//this is needed for canvas
                  var img = document.getElementById("drawing");//this is the source image
                  ctx.drawImage(img, 10, 10, 379, 500);//border and canvas size
                }, 1000);//timeout for image load to canvas - ends
                rImg.src = data.artObjects[artObj].webImage.url;//rijksmuseum image source
                //resultDiv.appendChild(rImg);
                document.getElementById('drawing1').appendChild(rImg);
                resultDiv.innerHTML += data.artObjects[artObj].title;
                resultDiv.innerHTML += "<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>";
              }
            });
};
}

