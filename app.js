'use strict';

const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
const control = document.querySelector('.control'); // 모든 버튼에 각각 따로 걸기 번거로우니까 '이벤트 위임'을 해줄 것
const saveBtn = document.querySelector('.save-btn');
const resultImage = document.querySelector('.result-image');
let drawingMode; // true일 때만 그리기
let brush = 'color'; // 이 변수의 값은 'color'/'image' 둘중에 하나로 할 거임.
let colorVal = 'black' // 색상

const imgElem = new Image();
imgElem.src = './images/ilbuni2.png';
// 참고로 여기서는 load event를 기다릴 필요가 없음.
// 이미지 버튼을 누르기 전에 이미 해당 이미지의 로드가 끝날 것이기 떄문임.
// 사실 정석대로 하면 load event를 받고 나서 canvas에 그리는 게 맞지만, 이런 경우에는 굳이 그럴 필요없음.

function downHandler(){
  drawingMode = true;
}

function upHandler(){
  drawingMode = false;
}

function moveHandler(e){
  // console.log(e);
  /**
   * clientX, offsetX, pageX, screenX, layerX의 차이
   * 
   * clientX : 브라우저 페이지에서의 X좌표 위치를 반환. 스크롤 무시하고 해당 페이지 상단을 0으로 측정.
   * pageX : 브라우저 페이지에서의 x좌표 위치를 반환. 스크롤해서 넘어간 화면을 포함해서 측정.
   * screenX : 전체 모니터 스크린에서의 x좌표 위치를 반환.
   * offsetX : 이벤트 대상 객체에서의 상대적 마우스 x좌표 위치를 반환. (여기서 이벤트 대상은 canvas지?)
   * layerX : offsetX와 비슷함. 현재 레이어에서의 X좌표 위치를 반환.
   */

  if (!drawingMode) return; // drawingMode가 flase면 해당 함수블록을 벗어나라는 뜻. 즉 그리지 말라는 거

  switch (brush){
    case 'color':
      context.beginPath();
      context.arc(e.layerX, e.layerY, 10, 0, Math.PI * 2, false);
      context.fill();
      break;
    case 'image':
      context.drawImage(imgElem, e.layerX, e.layerY, 50, 50);
      break;
  }
  
}

function setColor(e){
  // event.target은 이벤트 버블링의 최하위 요소(= 직접적으로 클릭된 요소)를 반환함. 
  // 이벤트 위임을 했기 때문에 control에 이벤트가 걸리긴 했지만 최하위 요소(= 직접 클릭한 요소)인 각 버튼들이 반환되겠지?
  // console.log(e.target.getAttribute('data-color'));
  brush = e.target.getAttribute('data-type');
  colorVal = e.target.getAttribute('data-color');

  // 색깔 바꿀때는 fillStyle 사용한다고 했지?
  context.fillStyle = colorVal;

  console.log(brush);
}

function createImage(){
  /**
   * canvas.toDataURL(type, encoderOptions) 
   * canvas에 그린 이미지를 base64 문자열로 변환해서 return하는 메소드
   * (콘솔창에 찍어보면 장문의 url이 나옴. 예전에 노마드 그림판 했을때 배웠던거임.)
   * 
   * 첫번째 parameter: 이미지 파일 형식을 DOMString 형태로 입력함. 기본값은 'image/png'
   * 두번째 parameter: 이미지 퀄리티 지정. 0부터 1사이 값 입력. 
   * 
   * 참고로toDataURL() 메서드는 웹 소스와 같은 서버에 위치한 이미지만 적용됨.
   */
  const url = canvas.toDataURL('image/png');
  console.log(url); // 이제 이미지 url을 얻었으니까 이거로 js내에서 img태그를 만들어 html에 뿌려보자 
  const imgElem = new Image(); 
  // 참고로 const, let은 block scope. 즉, 안에서는 밖을 볼 수 있지만, 밖에서는 안을 못봄.
  // 블록 안에서 똑같은 변수명을 새로 만들더라도, 블록 바깥에 먼저 만들어놓은 똑같은 변수명에는 아무런 영향을 주지 않음. 참고할 것.
  imgElem.src = url;
  resultImage.appendChild(imgElem); // 이렇게 하면 html 문서 내에 이미지 요소가 추가된거임. 이거를 우클릭해서 다운받거나 뭐 이것저것 하면 되겠지.
}

// 이미 정의한 함수를 이벤트 리스너에 콜백함수로 호출할 때는 parameter가 들어갈 자리도, parameter를 받는다고 할지라도 쓰지 말 것. only 함수명만 써서 호출할 것!
// 드래그한 상태에서만 그릴 수 있으려면 mousedown(마우스가 움직일 때), mousedown(마우스를 눌렀을 때), mouseup(마우스를 뗏을 때) 세 가지 이벤트 리스너를 모두 걸어야 함. 
canvas.addEventListener('mousedown', downHandler);
canvas.addEventListener('mousemove', moveHandler); 
canvas.addEventListener('mouseup', upHandler);
control.addEventListener('click', setColor);
saveBtn.addEventListener('click', createImage);

// 참고로 addEventListener가 너무 많으면 걔가 메모리를 많이 점유해서 페이지 성능에 악영향을 미침. 
// 그래서 너무 많으면 안좋기 때문에 가급적 '한 컨테이너에 묶어서' '이벤트 위임' 처리하는 것이 좋다. (버튼같은 거..)
