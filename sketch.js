let facemesh;
let video;
let predictions = [];
// 指定要連接的點的編號
const indices = [
  409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,314,405,321,375,291
];

function setup() {
  let cnv = createCanvas(640, 480);
  cnv.style('display', 'block');
  cnv.parent(document.body);
  // 讓 body 滿版並置中
  document.body.style.display = 'flex';
  document.body.style.justifyContent = 'center';
  document.body.style.alignItems = 'center';
  document.body.style.height = '100vh';
  document.body.style.margin = '0';
  // 取得視訊
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // 載入facemesh模型
  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on('predict', gotResults);
}

function modelReady() {
  // 模型載入完成
}

function gotResults(results) {
  predictions = results;
}

function draw() {
  background(220);
  // 將視訊畫面鏡像顯示
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  pop();

  drawFaceMesh();
}

function drawFaceMesh() {
  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;
    // 原本紅線外框
    stroke(255, 0, 0);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < indices.length; i++) {
      let idx = indices[i];
      if (keypoints[idx]) {
        let x = width - keypoints[idx][0];
        let y = keypoints[idx][1];
        vertex(x, y);
      }
    }
    endShape();

    // 新增黃色填充區域
    const fillIndices = [
      76,77,90,180,85,16,315,404,320,307,306,408,304,303,302,11,72,73,74,184
    ];
    fill(255, 255, 0, 180); // 半透明黃色
    stroke(255, 0, 0);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < fillIndices.length; i++) {
      let idx = fillIndices[i];
      if (keypoints[idx]) {
        let x = width - keypoints[idx][0];
        let y = keypoints[idx][1];
        vertex(x, y);
      }
    }
    endShape(CLOSE);

    // 利用 line 指令連接指定點
    const lineIndices = [
      243,190,56,28,27,29,30,247,130,25,110,24,23,22,26,112
    ];
    stroke(0, 0, 255); // 藍色線條
    strokeWeight(2);
    for (let i = 0; i < lineIndices.length - 1; i++) {
      let idxA = lineIndices[i];
      let idxB = lineIndices[i + 1];
      if (keypoints[idxA] && keypoints[idxB]) {
        let x1 = width - keypoints[idxA][0];
        let y1 = keypoints[idxA][1];
        let x2 = width - keypoints[idxB][0];
        let y2 = keypoints[idxB][1];
        line(x1, y1, x2, y2);
      }
    }

    // 利用 line 指令連接淡藍色區域的點並填充
    const blueFillIndices = [
      133,173,157,158,159,160,161,246,33,7,163,144,145,153,154,155
    ];
    fill(100, 200, 255, 120); // 淡藍色，帶透明度
    stroke(0, 150, 255); // 藍色線條
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < blueFillIndices.length; i++) {
      let idx = blueFillIndices[i];
      if (keypoints[idx]) {
        let x = width - keypoints[idx][0];
        let y = keypoints[idx][1];
        vertex(x, y);
      }
    }
    endShape(CLOSE);

    // 用 line 指令連接淡藍色區域的點
    for (let i = 0; i < blueFillIndices.length - 1; i++) {
      let idxA = blueFillIndices[i];
      let idxB = blueFillIndices[i + 1];
      if (keypoints[idxA] && keypoints[idxB]) {
        let x1 = width - keypoints[idxA][0];
        let y1 = keypoints[idxA][1];
        let x2 = width - keypoints[idxB][0];
        let y2 = keypoints[idxB][1];
        line(x1, y1, x2, y2);
      }
    }

    // 利用 line 指令連接指定的新區域
    const newLineIndices = [
      359,467,260,259,257,258,286,414,463,341,256,252,253,254,339,255
    ];
    stroke(0, 200, 100); // 綠色線條
    strokeWeight(2);
    for (let i = 0; i < newLineIndices.length - 1; i++) {
      let idxA = newLineIndices[i];
      let idxB = newLineIndices[i + 1];
      if (keypoints[idxA] && keypoints[idxB]) {
        let x1 = width - keypoints[idxA][0];
        let y1 = keypoints[idxA][1];
        let x2 = width - keypoints[idxB][0];
        let y2 = keypoints[idxB][1];
        line(x1, y1, x2, y2);
      }
    }

    // 利用 line 指令連接新的紫色區域
    const purpleLineIndices = [
      263,466,388,387,386,385,384,398,362,382,381,380,374,373,390,249
    ];

    // 先填充黃色
    fill(255, 255, 0, 180); // 半透明黃色
    stroke(150, 0, 200); // 紫色線條
    strokeWeight(1);
    beginShape();
    for (let i = 0; i < purpleLineIndices.length; i++) {
      let idx = purpleLineIndices[i];
      if (keypoints[idx]) {
        let x = width - keypoints[idx][0];
        let y = keypoints[idx][1];
        vertex(x, y);
      }
    }
    endShape(CLOSE);

    // 再用 line 指令描邊
    for (let i = 0; i < purpleLineIndices.length - 1; i++) {
      let idxA = purpleLineIndices[i];
      let idxB = purpleLineIndices[i + 1];
      if (keypoints[idxA] && keypoints[idxB]) {
        let x1 = width - keypoints[idxA][0];
        let y1 = keypoints[idxA][1];
        let x2 = width - keypoints[idxB][0];
        let y2 = keypoints[idxB][1];
        line(x1, y1, x2, y2);
      }
    }
  }
  
}
