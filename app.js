'use strict';

// html 가져오기 
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("js_color");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const clear = document.getElementById("jsclear");

// 기본값 설정
const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = "500";

// 캔버스 기초 세팅
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;


//함수 모음 

//페인팅 시작, 멈춤 
function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}

//캔버스에 그리기 
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

//색 채우기 
function handleCanvasClick(event) {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

//모드 변경 함수 
function handleModeClick() {
  if (filling == true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

//컬러 변경 함수 
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

//사이즈 변경 함수 
function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

//오른쪽 마우스 사용 금지 함수 
function handleCM(event) {
  event.preventDefault();
}

//이미지 저장 함수 
function handleSaveClick(event) {
  const image = canvas.toDataURL("image/png")
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJs";
  link.click();
}
//이미지 삭제 함수 
function handleClear(event) {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}


if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

//컬러 선택 
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

//레인지 변경시 함수실행 
if (range) {
  range.addEventListener("input", handleRangeChange);
}
//모드 변경시 함수 실행
if (mode) {
  mode.addEventListener("click", handleModeClick);
}
//버튼 클릭 시 삭제 함수 실행 
if (clear) {
  clear.addEventListener("click", handleClear);
}
//저장 버튼 누를 시 함수 실행 
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
