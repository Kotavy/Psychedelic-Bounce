/* Psychedelic Bounce created 10-3-16 by Tavius Koktavy for David Rios' "Creative Computing" - NYU Tisch Fall 2016.
   This program is still technically a work in progress of a wallpaper generator, but the current version
   functions as a simple game. < / > arrow keys change the tolerence which the colors will randomly change between
   whenever the ball hits the wall. The ^ / v arrow keys affect the speed and sometimes direction of the ball.
*/


// tolerance
var t = 20;

// Color var
//var c = 200;
var r = 200;
var g = 200;
var b = 200;

// Ellipse vars
var eX = 50;
var eY = 50;
var xspeed = 0;
var yspeed = 0;

// Block array declaration
var blocks;

///// Function in progress
// function newColor(n) {
//   this.n = n;
//   if (this.n >= 255 || this.n <= 0) {
//     this.n = 128;
//   } else {
//     this.n = random(this.n-7,this.n+7);
//   }
// }


///// Block constructor:
function Block(x, y) {
  this.x = x * 60;
  this.y = y * 60;
  
///// Function test in progress
  // this.newColor = function(c) {
  //   if (c >= 255 || c <= 0) {
  //     c = 128;
  //   } else {
  //     c = random(c-7,c+7);
  //   }
  // }
  
  this.makeOne = function() {
    noStroke();
    fill(random(),random(),random()); // Stand-in until newColor is working
  // fill(this.newColor(a),this.newColor(a),this.newColor(a));   //  <- this will be the tricky bit
    rect(this.x, this.y, 60, 60);
  }
  
}

// Controls (could be tweaked, but they're kinda fun how they are)
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    if (t < 25) {
      t -= 2;
    } else {
      t -= 5;
    }
  } else if (keyCode === RIGHT_ARROW) {
    if (t < 25) {
      t += 2;
    } else {
      t += 5;
    }
  } else if (keyCode === UP_ARROW) {
    xspeed += 2;
    yspeed += 2;
  } else if (keyCode === DOWN_ARROW) {
    xspeed -= 2;
    yspeed -= 2;    
  } else if (keyCode === ENTER) {
    if (xspeed !== 0 || yspeed !== 0) {
      return false;
    } else {
      xspeed = 10;
      yspeed = 5;
    }
  }
}




function setup() {
  
  createCanvas(960,540); // Half of 1920 x 1080 ratio
  background(225,225,225);
  var columns = width/60;
  var rows = height/60;

  // Blank block array intitialization
  blocks = new Array(columns);        // Make an array over the width (columns)
  for (var i = 0; i < columns; i++) { // Loop over those columns
    blocks[i] = new Array(rows);      // And make a block for every row of every column
  }
  for (var co = 0; co < columns; co++) { // Loop over each column
    for (var ro = 0; ro < rows; ro++) {  // Loop over each row of the current column
      blocks[co][ro] = new Block(co,ro);  // Initialize a Block at that (x,y) position
      blocks[co][ro].makeOne();
    }
  }
  
  // Player startpage/info:
  if (xspeed == 0) {
    fill(255,255,255);
    textSize(24);
    text("Here is a program gone wonderfully wrong,",200,height/2-140);
    text("originally intended to become a wallpaper generator.",200,height/2-110);
    text("Use the arrow keys to play:",250,height/2-70);
    text("< / > adjusts the color tolerance",250,height/2-42);
    text("^ / v shifts the speed of the ball",250,height/2-20);
    text("ENTER to begin",200,height/2+10);
  }  

}



function draw() {
  
  // Console output
  println("Color tolerance at +/-" + t);
  println("Speed:  " + xspeed + "x, " + yspeed + "y.");

  // Draw the ellipse
  fill(random(15,60),random(150,195),random(125,170));
  ellipse(eX,eY,40,40); // (x,y,l,h); draws from center.
  
  // Make it move
  eY = eY + yspeed;
  eX = eX + xspeed;
  
  // Make it bounce off walls
  if (eY > height - 15 || eY < 15) {
    yspeed = -yspeed;
  }
  if (eX > width - 15 || eX < 15) {
    xspeed = -(xspeed);
  }
  
  // If it bounces, change the color based on current tolerance  //  This should be made to work with the functions...
  if (eY > height - 15 || eY < 15 || eX > width - 15 || eX < 15) {
    for (var x = 0; x < width; x += 60) {
      for (var y = 0; y < height; y += 60) {
//      fill(c,c,c);
        fill(r,g,b);
        noStroke();
        rect(x,y,60,60);
        
        // if (c >= 255 || c <= 0) {
        //   c = 128;
        // } else {
        //   c = random(c-7,c+7);
        // }
        
        if (r >= 255 || r <= 0) {
          r = 128;
        } else {
          r = random(r-t,r+t);
        }
        
        if (g >= 255 || g <= 0) {
          g = 128;
        } else {
          g = random(g-t,g+t);
        }
        
        if (b >= 255 || b <= 0) {
          b = 128;
        } else {
          b = random(b-t,b+t);
        }
      }
    }
  }
}


/*       vvvvvvvvv                                   vvvvvvvvvv
    vvvvvvvvvvvvvv CODE GRAVEYARD / IN-PROGRESS ZONE vvvvvvvvvvvvvvv
*/

  /* Notes:
     - shapes overlap each other when drawn later
     - p5 uses "var" not "int"
     - 1920 and 1080 both divisible by 60
     - triangle(x1, y1, x2, y2, x3, y3) x and y of each point
     - rect(x, y, w, h) x, y of top left corner
     - random(min,max);
  */

//  // Here you should draw the blocks as they are, with the update colors if a click happened last loop (to be first in draw loop)
  // for (var co = 0; co < width/60; co++) { // Loop over each column
  //   for (var ro = 0; ro < height/60; ro++) {  // Loop over each row of the current column
      
  //   }
  // }
  

//  // Then IF a click happens, update the colors
  //mouseClicked = function() {
    // for (var co = 0; co < width/60; co++) { // Loop over each column
    //   for (var ro = 0; ro < height/60; ro++) {  // Loop over each row of the current column
    //     blocks[co][ro] = new Block(co,ro);  // Initialize a Block at that (x,y) position
    //   }
    // }


// Use saveCanvas(canvas,filename,extension) to save the image out.
  

 // triangle(0, 0, 50, 0, 0, 50);
 // triangle(100, 100, 50, 0, 0, 50);
 

/* Wallpaper generator
1.) Create a grid of shapes   (CHECK)
  - Input to determine the shape
  - Input to determine the size/density of the shapes
2.) Color the shapes
  - Randomly at first   (CHECK)
    - then with near-color variation    (CHECK)
    - color skew affected by input (slider?)
    - How to avoid gross color combos?
  - Fun: random colors on click, to add a localized splash of your own
  - Transparent objects? Main color background?

*/