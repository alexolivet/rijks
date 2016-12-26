//variable to build url to rijksmuseum
var baseURL = "https://www.rijksmuseum.nl/api/en/collection/"
var apiKey = "?key=r4nzV2tL&imgonly=True&format=json&ps=1"
var apiKey1 = "?key=r4nzV2tL&imgonly=True&format=json&ps=1&p=2"
var apiKey2 = "?key=r4nzV2tL&imgonly=True&format=json&ps=1&p=3"
    //this is the search button on htnl page
var searchBtn = document.getElementById("search");
//add event on button
searchBtn.addEventListener("click", doSearch);
//these are the containers where my data will be spread out
var resultDiv = document.getElementById("result");
var resultDiv1 = document.getElementById("result1");
var resultDiv2 = document.getElementById("result2");
var resultDiv3 = document.getElementById("result3");
var resultDiv4 = document.getElementById("result4"); // will display text if no image returned
//this is the search value added to url
var searchField = document.getElementById("query");
//get time so to return adequate url depending on time
var time = new Date().getHours();
// search the collection using a JSON call
//included if else statement to make it returned different results
function search(query) {
        if (time < 10) {
            return $.getJSON(baseURL + apiKey + "&q=Q".replace("Q", query));
        } else if (time < 20) {
            return $.getJSON(baseURL + apiKey1 + "&q=Q".replace("Q", query));
        } else {
            return $.getJSON(baseURL + apiKey2 + "&q=Q".replace("Q", query));
        }
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
        search(searchString).done(function(data) { //.done is similar to the success callback 
            for (var artObj in data.artObjects) { //Loops are handy, if you want to run the same code over and over again, each time with a different value.
                var rImg = document.createElement("img"); //create an image element
                rImg.setAttribute("id", "drawing"); //set id attribute
                //rImg.setAttribute("width", "400"); //set image width
                //rImg.setAttribute("height", "300"); //set image height
                rImg.setAttribute("crossOrigin", "Anonymous"); //needed so I can actually copy the image for later use
                setTimeout(function() { //timeout for image load to canvas - start
                    var c = document.getElementById("myCanvas"); //declare the canvas
                    //c.width = 500; // set canvas width
                    // c.height = 320; // set canvas height
                    var ctx = c.getContext("2d"); //this is needed for canvas  
                    var img = document.getElementById("drawing"); //this is the source image
                    if (img===null){ //if no images are returned then display alert
                        resultDiv4.innerHTML += "<p>No images for this search. Please Try again.</p>"
                    }
                    ctx.drawImage(img, 0, 0, 500, 320); //border and canvas size
                }, 1000); //timeout for image load to canvas - ends
                rImg.src = data.artObjects[artObj].webImage.url; //rijksmuseum image source
                //resultDiv.appendChild(rImg);
                document.getElementById('drawing1').appendChild(rImg); //append image to paragraph id drawing1
                resultDiv.innerHTML += data.artObjects[artObj].title; //object title
                resultDiv1.innerHTML += data.artObjects[artObj].principalOrFirstMaker; //object maker
                resultDiv2.innerHTML += data.artObjects[artObj].longTitle; //object long title
                //returns link of selected objects to rijksstudio
                resultDiv3.innerHTML += "<p id='link-p'>Check it in <a href=" + data.artObjects[artObj].links.web + " target='_blank'><img src='images/rijkslogo.jpg' id='rijks-logo'></a></p>";
                //resultDiv.innerHTML += "<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>";
            };
        });
    };
}

// //reload page to clear results
// function reLoad() {
//     location.reload();
// };

//this is the canvas drawing
//link to code https://codepen.io/makzan/pen/jWeWBJ
var canvas = document.getElementById('myCanvas'); // canvas declaration
var context = canvas.getContext('2d'); // canvas context declaration

//starting variable
var isDrawing = false;
var startX = 0; //sets the starting position within the canvas - x axis
var startY = 0; //sets the starting position within the canvas - y axis

var points = [];


//The mousedown fires when the user depresses the mouse button.
//you may start drawing
canvas.addEventListener('mousedown', function(e) {
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    isDrawing = true;
    startX = x;
    startY = y;
    points.push({
        x: x,
        y: y
    });
});

//the mousemove event is fired when a pointing device (usually a mouse) is moved while over an element
canvas.addEventListener('mousemove', function(e) {
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    //variable for the gradient color
    var gradient = context.createLinearGradient(0, 0, 190, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");

    if (isDrawing) {
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(x, y);
        //line width
        context.lineWidth = 2;
        //A rounded end cap is added to each end of the line
        context.lineCap = 'round';
        // Fill with gradient
        context.strokeStyle = gradient;
        context.stroke();

        startX = x;
        startY = y;

        points.push({
            x: x,
            y: y
        });
    }

});

//The mouseup event is fired when a pointing device button (usually a mouse button) is released over an element
//so when mouse not on canvas: do not draw
document.addEventListener('mouseup', function(e) {
    isDrawing = false;
    if (points.length > 0) {
        localStorage['points'] = JSON.stringify(points);
    }
});


// reset button reload pages
var resetCanvasButton = document.querySelector('button#reset-canvas');
resetCanvasButton.onclick = function() {
    location.reload();
};

//save image to paragraph element for later use(email communication)
var saveImage = document.querySelector('button#save-image');
saveImage.onclick = function() {
    var dataURL = canvas.toDataURL();
    var img = document.getElementById('canvas-image');
    img.src = dataURL;
};

//replay button
//not my own code but could be usefull
var replay = document.querySelector('button#replay');
replay.onclick = function() {
    canvas.width = canvas.width;

    // load localStorage
    if (points.length === 0) {
        if (localStorage["points"] !== undefined) {
            points = JSON.parse(localStorage["points"]);
        }
    }

    var point = 1;
    setInterval(function() {
        drawNextPoint(point);
        point += 1;
    }, 10);

    function drawNextPoint(index) {
        if (index > points.length) {
            return;
        }
        var startX = points[index - 1].x;
        var startY = points[index - 1].y;
        var x = points[index].x;
        var y = points[index].y;

        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(x, y);
        context.lineWidth = 2;
        context.lineCap = 'round';
        context.strokeStyle = "rgba(0,0,0,1)";
        context.stroke();

    }

};