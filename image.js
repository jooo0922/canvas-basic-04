'use strict';

// 캔버스에서 이미지를 사용하는 방법
// 그리기 API로 많은 데이터들을 시각적으로 보여주는 작업이 아니라 애플 웹사이트처럼 
// 비쥬얼 이미지를 표현할 때는 이미지를 불러다가 사용하는 경우가 많음.
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

// 이미지 사용할 때는 html 태그에 이미지 src를 넣는 게 아니고
// 자바스크립트에서 이미지 객체를 만든 다음 그걸 캔버스에서 불러오면 됨.
// const imgElem = document.createElement('img'); 이렇게 만들어도 되고.
const imgElem = new Image(); // Image 생성자를 이용해서 만들어도 됨! 
// 이렇게 하면 메모리상에는 이미지 객체가 만들어진 것.

imgElem.src = './images/ilbuni1.png';
// 그리고 나서 img의 src에 이미지 경로를 할당하면 됨.
// 근데 지금 이거는 외부 데이터잖아? 외부데이터라는 말은 '로딩될 시간이 필요하다'는 말
// 캔버스에 그리려면 이 실제 png 이미지 로드가 끝난 다음에 캔버스에 그릴 수 있는 것.

// 그래서 그냥 바로 그리는 게 아니라, 이미지가 로드될 때까지 기다렸다가 로드가 끝나면 그릴 수 있도록 해야함.
// load 이벤트는 리소스와 그것에 의존하는 리소스들의 로딩이 완료되면 콜백함수를 실행하는 것.
imgElem.addEventListener('load', () => {
  // 여기다가 이제 load가 되기를 기다렸다가, 로드가 끝나면 canvas에 drawImage()라는 메소드로 그리는 것.
  // 얘도 parameter가 좀 많음. drawImage(imgElement, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  // 참고로 dx, dy는 '내가 캔버스 상에 그릴 위치'. dWidth, dHeight는 '내가 임의로 그리고자 하는 width와 height' 를 의미함.
  // sx, sy, sWidth, sHeight 는 원래 소스로 사용한 원본 이미지 자체에서 특정 부분만 crop해서 가져올 때 사용함.
  context.drawImage(imgElem, 50, 50);
  context.drawImage(imgElem, 50, 50, 70, 120);
  context.drawImage(imgElem, 100, 100, 200, 200, 0, 0, 100, 100);
});