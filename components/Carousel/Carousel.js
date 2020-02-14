/* If You've gotten this far, you're on your own! Although we will give you some hints:
    1. You will need to write a function that creates the carousel component, you will find the HTML below.
    2. You will need to grab a reference to all of the images
    3. Create a current index
    4. Those buttons are gonna need some click handlers.
    5. Think of how you would animate this component. Make the cards slide in and out, or fade. It's up to you!
    6. Have fun!
*/

/* HTML:
  <div class="carousel">
    <div class="left-button"> < </div>
    <img src="./assets/carousel/mountains.jpeg" />
    <img src="./assets/carousel/computer.jpeg" />
    <img src="./assets/carousel/trees.jpeg" />
    <img src="./assets/carousel/turntable.jpeg" />
    <div class="right-button"> > </div>
  </div>
*/

const imgPaths = ['./assets/carousel/mountains.jpeg', './assets/carousel/computer.jpeg', './assets/carousel/trees.jpeg', './assets/carousel/turntable.jpeg'];
let carouselImages = [];
let interval = 10000;
let currentIndex = 0;

let intervalID;

function Carousel() {
  const carousel = document.createElement('div');
  carousel.classList.add('carousel');

  carousel.appendChild(createBtnElement('left'));

  for (path of imgPaths) {
    carousel.appendChild(createImageElement(path));
  }
  
  carousel.appendChild(createBtnElement('right'));

  carouselImages[currentIndex].style.display = 'block';
  
  return carousel;
}

function createBtnElement(direction) {
  const btn = document.createElement('div');
  btn.classList.add(`${direction}-button`);
  btn.textContent = (direction === 'left') ? '<' : '>';

  btn.addEventListener('click', event => {
    changeImg(event.target.textContent);
  });

  return btn;
}

function createImageElement(path) {
  const img = document.createElement('img');
  img.setAttribute('src', path);
  carouselImages.push(img);

  return img;
}

function changeImg(arrow) {
  window.clearInterval(intervalID);
  hideImg();
  if (arrow === '<') {
    currentIndex--;
    if (currentIndex === -1) {
      currentIndex = 3;
    }
  } else {
    currentIndex = ++currentIndex % 4;
  }
  showImg();
  intervalID = window.setInterval(changeImg, interval, ['>']);
}

function hideImg() {
  carouselImages[currentIndex].style.display = 'none';
}

function showImg() {
  carouselImages[currentIndex].style.display = 'block';
  carouselImages[currentIndex].style['z-index'] = -1;
  TweenMax.from(carouselImages[currentIndex], 2, {
    opacity: 0
  });
}

document.querySelector('.carousel-container').appendChild(Carousel());
intervalID = window.setInterval(changeImg, interval, ['>']);
