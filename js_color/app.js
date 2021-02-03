const canvas = document.getElementById("JsCanvas"); 
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("JsColors");
const range = document.getElementById("JsRange");
const mode = document.getElementById("JsMode");
const saveBtn = document.getElementById("JsSave");


const Initial_Color ="##2c2c2c";
const Canvas_Size = 700;
canvas.width = Canvas_Size;
canvas.height = Canvas_Size;

ctx.fillStyle = "white";
ctx.fillRect(0,0,Canvas_Size, Canvas_Size);
ctx.strokeStyle = Initial_Color;
ctx.fillStyle = Initial_Color;
ctx.linewidth = 2.5;




//default 값
let painting = false;
let filling = false;


function stopPainting () {
    painting = false;
}

function startPainting () {
    painting = true;
}


function onMouseEnter (event) {
    const x = event.offsetX;
    const y = event.offsetY;
    // console.log(x,y); -> (545 646) 이런식으로 찍힘
    if(!painting) {
        ctx.beginPath ();
        ctx.moveTo(x , y);
    } else {  
        ctx.lineTo (x , y);
        ctx.stroke();
;    }
}

function onMouseDown (event) {
    painting = true;
}


function handleColorClick (event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;  //strokeStyle 에  color(변수)를 target으로부터 받아 넣음
    ctx.fillStyle = color;
}

function handleRangeChange (event) {
    const size = event.target.value;
    ctx.linewidth = size;
    
}

function handleModeClick () {
    if (filling === true) {         // 클릭한 색상으로 라인이 그어짐
        filling = false;
        mode.innerText = "Fill";
    } else {                        //클릭한 색상이 전부채워짐
        filling = true;
        mode.innerText = "Paint";
        
    }
}
function handleCanvasClick () {
    if (filling) {
        ctx.fillRect(0,0,Canvas_Size, Canvas_Size);
    }
}


function handleCM (event) {
    event.preventDefault();
}

function handleSaveBtn () {

    const image = canvas.toDataURL("images/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS"
    link.click();
}
if(canvas) {
    canvas.addEventListener("mousemove",  onMouseEnter);  //.addEventListener 이벤트를 등록하는 가장 권장방법 
    canvas.addEventListener("mousedown", startPainting);//mousedown : 클릭하고 떼지않은 상태
    canvas.addEventListener("mouseup", startPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM); //사용자가 요소를 마우스오른쪽으로 클릭해 메뉴를 열때 발생
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)) //array.from -> obj로부터 array 만듬


/** 색상변경 정리
 *      array만듬 (array.from(colors)) 
 *      -> foreach에 color을 넣어 addEventListener("click", handleColorClick) 호출
 *      -> color 변수에 event.target 설정
 *      ->strokeStyle에 color를 target 으로부터 받아넣음
 */

 if(range) {
     range.addEventListener("input", handleRangeChange);
 }

 if (mode) {
     mode.addEventListener("click", handleModeClick);
 }

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveBtn);
}