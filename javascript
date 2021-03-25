var ogimage = null; //our original image
var image2 = null; //make grayscale
var image3 = null; //make red
var image4 = null; //make rainbow
var image5 = null; //make blur
var canvas = null;
var windowimg = null; //add window??


function loadImage() {
  var filein = document.getElementById("finput");
  ogimage = new SimpleImage(filein);
  image2 = new SimpleImage(filein);
  image3 = new SimpleImage(filein);
  image4 = new SimpleImage(filein);
  image5 = new SimpleImage(filein);
  windowimg = new SimpleImage(filein);
  
  canvas = document.getElementById("can");
  ogimage.drawTo(canvas);
}


//function tht checks if image is loaded, returns true if so
function imageisloaded(image) {
  if (image == null || ! image.complete()) {
    alert("image not loaded :(");
    return false;
  }
  else {
   return true; 
  }
}

//function that performs graying of pic

function filterGray() {  
  for (var pixel of image2.values()) {
    var avg = (pixel.getRed() + 
    pixel.getGreen() + pixel.getBlue())/3;
    
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg); 
    }
}

function makeGray() {
if (imageisloaded(image2)) {
  filterGray();
  }
  image2.drawTo(canvas);
}

//reset button, if imageisloaded() is true, clear
//reset all GV for filter to ogimage (so if you run another filter after resetting, it performs on ogimage)

function resetImage() {
  loadImage();
}

//function that clears canvas
function clearCanvas() {
var ctx = canvas.getContext("2d");
ctx.clearRect(0,0, canvas.width, canvas.height);
}

function imageisloaded2(image) {
  if (image != null || image.complete()) {
    return true;
    }
}

function filterRed (image) {
  for (var pixel of image.values()) {
var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3

    if (pixel.avg < 101) {
        pixel.setRed(2*avg);
        pixel.setGreen(102);
        pixel.setBlue(102);
    }
    
    else {
      pixel.setRed(255);
      pixel.setGreen(2*avg - 202);
      pixel.setBlue(2*avg - 202);
    }
  }
}


//make red checks if image is loaded (calls IIL(i3)) and if it returns true, call filter image to red

function makeRed() {
  if (imageisloaded(image3)) {
    filterRed(image3);
  }
  image3.drawTo(canvas);
}

//my surprise filter! (rose-colored glass)
function makeWindow() { 
  var butt = document.getElementById("windbut");
  if (butt.value == "Surprise") {
    
    butt.value = "Rose-Colored Glass";
  }
  else {
    butt.value = "Surprise";
  }
  
  if (imageisloaded(windowimg)) {

    
    filterPink(windowimg);
    addWindow();     
  }
  windowimg.drawTo(canvas);

}

//rose color filter
function filterPink(image) {
  for (var px of image.values()) {
    var avg= (px.getRed() + px.getGreen()+ px.getBlue())/3
    if (avg < 128) {
      px.setRed(1.92*avg);
      px.setGreen(1.23*avg);
      px.setBlue(1.80*avg);
    }
    else {
      px.setRed(.08*avg + 235);
      px.setGreen(.77*avg + 59);
      px.setBlue(1.80*avg + 205);
    }
  }
}


//add dark blue window to image
function addWindow () {
  
for (var pixel of windowimg.values()) {
    var w = windowimg.getWidth();
    var h = windowimg.getHeight();
    
  if (pixel.getX()< 16 || pixel.getY() < 16){
      pixel.setRed(13);
      pixel.setGreen(99);
      pixel.setBlue(165);
    }
  if (pixel.getX() > (w-16) || pixel.getY() > (h-16)) {
    
        pixel.setRed(13);
        pixel.setGreen(99);
        pixel.setBlue(165);
      }
  
  if (pixel.getX() >= ((w/2)-5) && pixel.getX() <= ((w/2)+5)) {
       pixel.setRed(13);
       pixel.setGreen(99);
       pixel.setBlue(165);
      }
  if (pixel.getY() >= ((h/2)-5) && pixel.getY() <= ((h/2)+5)) {
       pixel.setRed(13);
       pixel.setGreen(99);
       pixel.setBlue(165);
      }
   }
}

/*
a filter tht turns the top left window red?
function roseGlasses() {
  for (var pixel of windowimg.values()) {
    
    var w = windowimg.getWidth();
    var h = windowimg.getHeight();
   if ( 16 < pixel.getX() < ((w/2)-5) && 16 < pixel.getY()<((h/2)-5) ) {
       filterRed(windowimg);
      }
    }
  }
*/

function getSize() {
  if (imageisloaded(ogimage)) {
  var text = document.getElementById("stuff");
  var x = ogimage.getWidth();
  var y = ogimage.getHeight();
  //innerHTML lets you change content w/i html element
  //toString returns the value of an object to string
   text.innerHTML = x.toString() +"x"+ y.toString();
  }
}


function makeRainbow() {
  if (imageisloaded(image4)) {
    
    rainbowfilter(); 
 
  }
  image4.drawTo(canvas);
    
}
  
  
  
  function rainbowfilter() {
    for (var px of image4.values()) {
     var y = px.getY()
     var bar = (image4.getHeight())/7;
     var avg = (px.getRed() + px.getGreen() + px.getBlue())/3;
     
     //for red
     if (y < bar){
       
    if (px.avg < 127) {
        px.setRed(2*avg);
        px.setGreen(0);
        px.setBlue(0);
    }
    
    else {
      px.setRed(255);
      px.setGreen(2*avg - 255);
      px.setBlue(2*avg - 255);
    }
     }
     
     //for orange
     if (y > bar && y< 2*bar) {
       if (px.avg < 128) {
         px.setRed(2*avg);
         px.setGreen(0.8*avg);
         px.setBlue(0);
       }
       else {
         px.setRed(255);
         px.setGreen(1.2*avg - 51);
         px.setBlue(2*avg-255);
       }
     }
      
      //yellow
      if (y >2*bar && y< 3*bar) {
        if (px.avg < 128) {
         px.setRed(2*avg);
         px.setGreen(2*avg);
         px.setBlue(2*avg); 
        }
        else {
          px.setRed(255);
          px.setGreen(255);
          px.setBlue(2*avg-255);
        }
      }
      
      //green babe
      if(y>3*bar && y<4*bar) {
        if(px.avg < 128){
          px.setRed(0);
          px.setGreen(2*avg);
          px.setBlue(0);
        }
        else{
          px.setRed(2*avg-255);
          px.setGreen(255);
          px.setBlue(2*avg-255);
        }
      }
      
     //blue
      if(y>4*bar && y<5*bar) {
        if (px.avg <128) {
          px.setRed(0);
          px.setGreen(0);
          px.setBlue(2*avg);
        }
        else {
          px.setRed(2*avg-255);
          px.setGreen(2*avg-255);
          px.setBlue(255);
        }
      }
      
      //indigo
      if(y>5*bar && y<6*bar) {
        if(px.avg <128) {
          px.setRed(0.8*avg);
          px.setGreen(0);
          px.setBlue(2*avg);
        }
        else {
          px.setRed(1.2*avg-51);
          px.setGreen(2*avg-255);
          px.setBlue(255);
     
        }
      }
      
      //violet
     if(y>6*bar && y<=image4.getWidth()) {
       if(px.avg <128) {
         px.setRed(1.6*avg);
         px.setGreen(0);
         px.setBlue(1.6*avg);
       }
       else {
         px.setRed(0.4*avg + 153);
         px.setGreen(2*avg-255);
         px.setBlue(0.4*avg+153);
       }
     } 
    
   }
    
 }



//function for gray button (piece de resistance)

  //Blur time! Check if coordinate is in size
 function Check(coord,size){
        if (coord < 0){
          return 0;
        }
        if (coord >= size) {
          return size-1;
        }
      return coord;
}


//find and return a new pixel in the image put in
function getnewPixel(image5,x,y){
  var distance = 2*Math.floor(Math.random()*10 - 10/2);
     var dx = x + distance;
      var dy = y + distance;
      var newinpix = image5.getPixel(Check(dx,image5.getWidth()), Check(dy,image5.getHeight()));
      return newinpix;
}


//loop over the image we put in, if R iss <0.5, set pixel from input image to new image. 
function makeitBlur() {
  if (imageisloaded(image5)){
  output=new SimpleImage(image5.getWidth(),image5.getHeight());
  for (var px of image5.values()) {
    var x = px.getX();
    var y = px.getY();
    
    if(Math.random()<0.5){
      output.setPixel(x,y,px);
    }
   //if not, call getnewPixel() (does math, returns new pixel), call it newpix, set that new pixel to output 
    else{
     newinpix = getnewPixel(image5,x,y);
      output.setPixel(x,y,newinpix);
    }
    output.drawTo(canvas);
    }
  }   
}    
 

