// Face Mesh Detection with ml5.js  
// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/facemesh  
// https://youtu.be/R5UZsIwPbJA  

let video;
let faceMesh;
let faces = [];

function preload() {
  // Initialize FaceMesh model with a maximum of one face and flipped video input
  faceMesh = ml5.faceMesh({ maxFaces: 1, flipped: true });
}

function mousePressed() {
  // Log detected face data tothe console
  console.log(faces);
}

function gotFaces(results) {
  faces = results;
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  // Start detecting faces
  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  background(0);
  image(video, 0, 0);

  // Ensure at least one face is detected
  if (faces.length > 0) {
    let face = faces[0];

    // Draw keypoints on the detected face
    for (let i = 0; i < face.keypoints.length; i++) {
      let keypoint = face.keypoints[i];
      stroke(255, 255, 0);
      strokeWeight(2);
      point(keypoint.x, keypoint.y);
    }
  }
}
