var database;
var firebase;

var drawing = [];

var currentPath = [];

//namespace the functions form html
const colorInput = document.getElementById('color');
const weight = document.getElementById('weight');

function setup() {
  //create the canvas
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.position(100, 0);

  var firebaseConfig = {
    apiKey: "AIzaSyAvC8vS0xUBxzK2mRBIuFuBB7ABw6kMY3g",
    authDomain: "soft-paint.firebaseapp.com",
    databaseURL: "https://soft-paint.firebaseio.com",
    projectId: "soft-paint",
    storageBucket: "soft-paint.appspot.com",
    messagingSenderId: "416609708899",
    appId: "1:416609708899:web:0edaf0279e70adc41c0156"
  };
  firebase.initializeApp(firebaseConfig);
  
  database = firebase.database();
  
  canvas.mousePressed(startPath);

  
 
}

function startPath()
{
  currentPath = [];
  drawing.push(currentPath);
}



function draw() {
  
  background(0);
  
  if(mouseIsPressed){
    var point = {
      x:mouseX,
      y:mouseY,
      color: colorInput.value,
      weight: weight.value
    }
    currentPath.push(point);
  }
  
  for(var i = 0;i < drawing.length;i++){
    beginShape();
    var path = drawing[i];
    for(var j = 0;j < path.length;j++){
      stroke(path[j].color);
      strokeWeight(path[j].weight);
      noFill();
      vertex(path[j].x , path[j].y) 
    }
    endShape();   
  }
}

function saveDrawing(){
   var ref = database.ref('drawings');
   var data = {drawing:drawing}
   ref.push(data);
}

function clearDrawing(){
   drawing = [];
   currentPath = [];
}
