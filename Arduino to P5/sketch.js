/*
References for these codes:
https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/
https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/
*/

var serial;   // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem14101'    // fill in your serial port name here
var inData;   // variable to hold the input data from Arduino

var xPos = 0;
var minWidth = 600;   //set min width and height for canvas
var minHeight = 400;
var width, height;    // actual width and height for the sketch
var inc = 0.02;
var start = 0;
var vhistory = [];
let bg;
let font;

function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  font = loadFont('Montserrat/Montserrat-Bold.ttf');
}

function setup() {
    // set the canvas to match the window size
  if (window.innerWidth > minWidth){
    width = window.innerWidth;
  } else {
    width = minWidth;
  }
  if (window.innerHeight > minHeight) {
    height = window.innerHeight;
  } else {
    height = minHeight;
  }

  textFont(font);
  //set up canvas
  createCanvas(width, height);
  noStroke();
  bg=loadImage('https://i.imgur.com/4kpIB2Z.png');

  //set up communication port
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing

  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
}

//drawing the input data lol
function draw() {
  // set background to black
  background(bg);
  stroke(255);
  strokeWeight(4);
  noFill();

  var vdata = (1-inData/1800) * height;
  vhistory.push(vdata);
  if (vhistory.length >= 390) {
    vhistory.splice(0,1);
  }
  line(120, 390, 120, 520);
  line(115, 390, 120, 390);
  line(115, 520, 120, 520);


  beginShape();
  for (var x=0; x<vhistory.length; x+=1) {
    // point(x, );
    vertex(x+120,vhistory[x]-380);
  }
  endShape();

  // graphData(inData);
  noStroke();

  textSize(16);
  textAlign(RIGHT);
  fill(255);
  text('25', 110, 390);

  textSize(16);
  textAlign(RIGHT);
  fill(255);
  text('0', 110, 525);

  textSize(72);
  textAlign(RIGHT);
  fill(255);
  text(inData/10, 380, 400);

  textSize(24);
  textAlign(RIGHT);
  fill(255);
  text('JOULES', 500, 385);

}

// function draw() {
//   graphData(inData);
// }


// Following functions print the serial communication status to the console for debugging purposes

function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}

// function graphData(newData) {
//   // map the range of the input to the window height:
//   var yPos = map(newData, 0, 255, 0, height);
//   // draw the line in a pretty color:
//   stroke(0xA8, 0xD9, 0xA7);
//   line(xPos, height, xPos, height - yPos);
//   // at the edge of the screen, go back to the beginning:
//   if (xPos >= width) {
//     xPos = 0;
//     // clear the screen by resetting the background:
//     background(0x08, 0x16, 0x40);
//   } else {
//     // increment the horizontal position for the next reading:
//     xPos++;
//   }
// }

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

function serialEvent() {
  inData = Number(serial.read());
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}
