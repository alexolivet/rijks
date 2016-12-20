//variable to build url to rijksmuseum
var baseURL = "https://www.rijksmuseum.nl/api/en/collection/"
var apiKey = "?key=r4nzV2tL&imgonly=true&format=json&ps=1"
var apiKey2 = "?key=r4nzV2tL&imgonly=true&format=json&ps=2"
var apiKey3 = "?key=r4nzV2tL&imgonly=true&format=json&ps=3"
    //this is the search button on htnl page
var searchBtn = document.getElementById("search");
//add event on button
searchBtn.addEventListener("click", doSearch);
//this is the container for my results
var resultDiv = document.getElementById("result");
//this is the search value added to url
var searchField = document.getElementById("query");
//get time
var time = new Date().getHours();
// search the collection using a JSON call
function search(query) {
        if (time < 10) {
            return $.getJSON(baseURL + apiKey + "&q=Q".replace("Q", query));
        } else if (time < 20) {
            return $.getJSON(baseURL + apiKey2 + "&q=Q".replace("Q", query));
        } else {
            return $.getJSON(baseURL + apiKey3 + "&q=Q".replace("Q", query));
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
                rImg.setAttribute("id", "drawing"); //set attributes
                rImg.setAttribute("width", "400"); //set width
                rImg.setAttribute("height", "400"); //set height
                rImg.setAttribute("crossOrigin", "Anonymous"); //needed so I can actually copy the image for later use
                setTimeout(function() { //timeout for image load to canvas - start
                    var c = document.getElementById("myCanvas"); //declare the canvas
                    var ctx = c.getContext("2d"); //this is needed for canvas  
                    var img = document.getElementById("drawing"); //this is the source image
                    ctx.drawImage(img, 1, 1, 640, 480); //border and canvas size
                }, 1000); //timeout for image load to canvas - ends
                rImg.src = data.artObjects[artObj].webImage.url; //rijksmuseum image source
                //resultDiv.appendChild(rImg);
                document.getElementById('drawing1').appendChild(rImg); //append image to paragraph id drawing1
                resultDiv.innerHTML += data.artObjects[artObj].title;
                //resultDiv.innerHTML += "<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>";
            };
        });
    };
}

//reload page to clear results
function reLoad() {
    location.reload();
};

//canvas drawing
//please see url for deatils: http://stackoverflow.com/questions/2368784/draw-on-html5-canvas-using-a-mouse
var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

var x = "black",
    y = 2;

function init() {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    canvas.addEventListener("mousemove", function(e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function(e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function(e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function(e) {
        findxy('out', e)
    }, false);
}

function color(obj) {
    switch (obj.id) {
        case "green":
            x = "green";
            break;
        case "blue":
            x = "blue";
            break;
        case "red":
            x = "red";
            break;
        case "yellow":
            x = "yellow";
            break;
        case "orange":
            x = "orange";
            break;
        case "black":
            x = "black";
            break;
        case "white":
            x = "white";
            break;
    }
    if (x == "white") y = 14;
    else y = 2;

}

function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

function erase() {
    var m = confirm("Want to clear");
    if (m) {
        ctx.clearRect(0, 0, w, h);
        document.getElementById("drawing1").style.display = "none";
    }
}

function save() {
    document.getElementById("canvasimg").style.border = "2px solid";
    var dataURL = canvas.toDataURL();
    document.getElementById("canvasimg").src = dataURL;
    document.getElementById("canvasimg").style.display = "inline";
}

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}