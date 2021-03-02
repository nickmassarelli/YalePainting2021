// IN ORDER TO USE THIS CODE:
//
// paste the following script tags in your html right before
// the script tag for your own js file
//
// <script src="https://unpkg.co/gsap@3/dist/gsap.min.js"></script>
// <script src="https://unpkg.com/gsap@3/dist/ScrollTrigger.min.js"></script>

window.onload = async() => {

// play with these settings to get the desired effect!
let settings = {
  // Change the duration/distance one needs to scroll to get through
  // all images (this value is dynamic based on # of images)
  scrollDuration: 3,
  // Change the duration/distance that an image is paused after fading in before
  // it fades out
  imagePauseDuration: 1,
  // Set how much the fade in/out overlap
  // (should be a value between 0 - 1)
  imageOverlapDuration: 1,
  // Change the amount of blur
  blurAmount: 5
};


// select our elements
let vh = window.innerHeight;
let land = document.querySelector('.land');
let container = document.querySelector('.container');
let images = document.querySelectorAll('.image');
const navTag = document.querySelector('nav');
const groupTag = document.querySelector('.groups');
const artistTag = document.querySelector('span.artistsButton')
const infoTag = document.querySelector('span.infoButton')
const rightPageTag = document.querySelector('div.right-page')
const leftPageTag = document.querySelector('div.left-page')
const bodyTag = document.querySelector('body')
const closingLeft = document.querySelector('div.closing-left')
const leftArea = document.querySelector('#closeList')

// set height of contain dynamically using # of
// images and our scroll duration setting
container.style.height = `${images.length * settings.scrollDuration * 100}vh`;
var containerHeight = `${images.length * settings.scrollDuration}` * vh;
var imageHeight = `${settings.scrollDuration}` * vh;

// Use GSAP + GSAP ScrollTrigger plugin to more easily animate the images
// on scroll
let timeline = gsap.
  timeline({
    scrollTrigger: {
      // these settings basically say:
      // Start scrubbing through the animation timeline when
      // the TOP of '.container' reaches the TOP of the window
      // and end timeline when the BOTTOM of '.container'
      // reaches the BOTTOM of the window
      trigger: '.container',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true
    },

    defaults: { duration: 1, ease: 'none' }
  });

// Loop over all images
images.forEach((image, index) => {
  // this block of code "pins" the image
  ScrollTrigger.create({
    trigger: '.container',
    start: 'top top',
    end: 'bottom bottom',
    pin: image
  });


  // this block of code sets the fade in and out of each image
  timeline.fromTo(image, {
    zIndex: 1,
    autoAlpha: 0,
    filter: `blur(${settings.blurAmount}px)`
  },
    {
      zIndex: 2,
      autoAlpha: 1,
      filter: 'blur(0px)'
    },
    `image_${index}${index > 0 ? `-=${settings.imageOverlapDuration}` : ''}`).
    to(image, {
      zIndex: 1,
      pointerEvents: 'none',
      autoAlpha: 0,
      filter: `blur(${settings.blurAmount}px)`
    },
      `image_${index}+=${1 + settings.imagePauseDuration}`);
});


// nav codes
let position = $(window).scrollTop();
navTag.classList.add('is-shown');
// should start at 0
$(window).scroll(function () {
  var scroll = $(window).scrollTop()

  if (scroll > position && scroll > 0) {
    // console.log('scrollDown')
    navTag.classList.remove('is-shown')
  }
  else {
    // console.log('scrollUp')
    navTag.classList.add('is-shown')
  }
  position = scroll
})

artistTag.addEventListener('click', function () {
  land.classList.toggle('open');
  container.classList.toggle('open');
  rightPageTag.classList.toggle('open');
  navTag.classList.toggle('open');
  groupTag.classList.toggle('open');

  leftArea.classList.add('tab-is-shown')
})

infoTag.addEventListener('click', function () {
  land.classList.toggle('open');
  container.classList.toggle('open');
  leftPageTag.classList.toggle('open');
  leftPageTag.style.opacity = "1";  
  setTimeout(function(){ leftPageTag.style.overflow = "scroll";}, 400);
})

leftPageTag.style.cursor = `url('./assets/close.png'), auto`

leftPageTag.addEventListener('click', function () {
  land.classList.remove('open');
  container.classList.remove('open');
  leftPageTag.classList.remove('open')
  setTimeout(function(){ leftPageTag.style.opacity = "0";}, 500);
  leftPageTag.style.overflow = "hidden";
  // navTag.classList.remove('left-open')
})

closingLeft.addEventListener('click', function () {
  land.classList.remove('open');
  container.classList.remove('open');
  leftPageTag.classList.remove('open')
  setTimeout(function(){ leftPageTag.style.opacity = "0";}, 500);
  leftPageTag.style.overflow = "hidden";
  // navTag.classList.remove('left-open')
})

land.addEventListener('click', function () {
  navTag.classList.remove('open');
  container.classList.remove('open');
  rightPageTag.classList.remove('open');
  land.classList.remove('open');
  groupTag.classList.remove('open');
})

leftArea.addEventListener('click', function () {
  navTag.classList.remove('open');
  container.classList.remove('open');
  rightPageTag.classList.remove('open');
  land.classList.remove('open');
  groupTag.classList.remove('open');

  leftArea.classList.remove('tab-is-shown')
})


const ListTag = document.querySelector('ul');
const thumbnailTag = document.querySelector('div.thumbnail');
const nameLists = document.querySelectorAll('li');
const closingRight = document.querySelector('div.closing-right');
const thumbnails = [
  `url(assets/thumbnails/Kate-Meissner_01.jpg)`,
  `url(assets/thumbnails/Mich-Miller_09.jpg)`,
  `url(assets/thumbnails/Gabriel-Mills_01.jpg)`,
  `url(assets/thumbnails/Alina-Perez_01.jpg)`,
  `url(assets/thumbnails/Tamen-Perez_08.jpg)`,
  `url(assets/thumbnails/Sara-Rahmanian_08.jpg)`,
  `url(assets/thumbnails/Emma-Safir_02.jpg)`,
  `url(assets/thumbnails/Chibụike-Ụzọma_02.jpg)`,
  `url(assets/thumbnails/Curtis-Welteroth_02.jpg)`,
  `url(assets/thumbnails/Vamba-Bility_08.jpg)`,
  `url(assets/thumbnails/Brianna-Rose-Brooks_01.jpg)`,
  `url(assets/thumbnails/David-Craig_02.jpg)`,
  `url(assets/thumbnails/Danielle-DeJesus_02.jpg)`,
  `url(assets/thumbnails/Nathaniel-Donnett_08.jpg)`,
  `url(assets/thumbnails/Leyla-Faye_01.jpg)`,
  `url(assets/thumbnails/Dala-Nasser_01.jpg)`,
  `url(assets/thumbnails/Jonathan-Rajewski_02.jpg)`,
]
// console.log(nameLists)

const indiPages = [
  './kate-meissner.html',
  './mich-miller.html',
  './gabriel-mills.html',
  './alina-perez.html',
  './tamen-perez.html',
  './sara-rahmanian.html',
  './emma-safir.html',
  './chibuike-uzoma.html',
  './curtis-welteroth.html',
  './vamba-bility.html',
  './brianna-rose-brooks.html',
  './david-craig.html',
  './danielle-dejesus.html',
  './nathaniel-donnett.html',
  './leyla-faye.html',
  './dala-nasser.html',
  './jonathan-rajewski.html'
]

nameLists.forEach(function (item, index) {
  item.addEventListener('mouseover', function () {
    thumbnailTag.style.backgroundImage = thumbnails[index]
  })
  item.addEventListener('mouseout', function () {
    thumbnailTag.style.backgroundImage = ''
  })
  item.addEventListener('click', function() {
    location.href = indiPages[index]
  })
})

closingRight.addEventListener('click', function() {
  navTag.classList.remove('open');
  container.classList.remove('open');
  rightPageTag.classList.remove('open');
  land.classList.remove('open');
  groupTag.classList.remove('open');

  leftArea.classList.remove('tab-is-shown')
})


const groupNameTag = document.querySelector('.groupName');
const group1Click = document.querySelector('a.group1')
const group2Click = document.querySelector('a.group2')
const imgFiles = document.querySelectorAll('img')
const descriptions = document.querySelectorAll('div.description')

console.log(descriptions)

const group2Img = [
  {
    srcset: './assets/Group2/1.jpg 1.5x',
    description: `<a href="#0">Nathaniel Donnett</a>`
  }, {
    srcset: './assets/Group2/2.jpg 1.5x',
    description: `<a href="#0">Nathaniel Donnett</a>`
  }, {
    srcset: './assets/Group2/3.jpg 1.5x',
    description: `<a href="#0">Nathaniel Donnett</a>`
  }, {
    srcset: './assets/Group2/4.jpg 1.5x',
    description: `<a href="#0">Brianna Rose Brooks</a>`
  }, {
    srcset: './assets/Group2/5.jpg 1.5x',
    description: `<a href="#0">Danielle DeJesus</a>`
  }, {
    srcset: './assets/Group2/6.jpg 1.5x',
    description: `<a href="#0">Danielle DeJesus</a>`
  }, {
    srcset: './assets/Group2/7.jpg 1.5x',
    description: `<a href="#0">David Craig</a>`
  }, {
    srcset: './assets/Group2/8.jpg 1.5x',
    description: `<a href="#0">David Craig</a>`
  }, {
    srcset: './assets/Group2/9.jpg 1.5x',
    description: `<a href="#0">David Craig</a>`
  }, {
    srcset: './assets/Group2/10.jpg 1.5x',
    description: `<a href="#0">Leyla Faye</a>`
  }, {
    srcset: './assets/Group2/11.jpg 1.5x',
    description: `<a href="#0">Leyla Faye</a>, <a href="#0">Jonathan Rajewski</a>, <a href="#0">Vamba Bility</a>`
  }, {
    srcset: './assets/Group2/12.jpg 1.5x',
    description: `<a href="#0">Jonathan Rajewski</a>`
  }, {
    srcset: './assets/Group2/13.jpg 1.5x',
    description: `<a href="#0">Jonathan Rajewski</a>`
  }, {
    srcset: './assets/Group2/14.jpg 1.5x',
    description: `<a href="#0">Jonathan Rajewski</a>, <a href="#0">Leyla Faye</a>, <a href="#0">Vamba Bility</a>`
  }, {
    srcset: './assets/Group2/15.jpg 1.5x',
    description: `<a href="#0">Vamba Bility</a>`
  }, {
    srcset: './assets/Group2/16.jpg 1.5x',
    description: `<a href="#0">Vamba Bility</a>`
  }, {
    srcset: './assets/Group2/17.jpg 1.5x',
    description: `<a href="#0">Vamba Bility</a>`
  }
]
const group1Img = [
  {
    srcset: './assets/Group1/1.jpg 1.5x',
    description: `<a href="./chibuike-uzoma.html">Chibuike Uzoma</a>`
  }, {
    srcset: './assets/Group1/2.jpg 1.5x',
    description: `<a href="./kate-meissner.html">Kate Meissner</a>, <a href="./chibuike-uzoma.html">Chibuike Uzoma</a>`
  }, {
    srcset: './assets/Group1/3.jpg 1.5x',
    description: `<a href="./kate-meissner.html">Kate Meissner</a>`
  }, {
    srcset: './assets/Group1/4.jpg 1.5x',
    description: `<a href="./kate-meissner.html">Kate Meissner</a>`
  }, {
    srcset: './assets/Group1/5.jpg 1.5x',
    description: `<a href="./gabriel-mills.html">Gabriel Mills</a>, <a href="./alina-perez.html">Alina Perez</a>`
  }, {
    srcset: './assets/Group1/6.jpg 1.5x',
    description: `<a href="./gabriel-mills.html">Gabriel Mills</a>, <a href="./alina-perez.html">Alina Perez</a>`
  }, {
    srcset: './assets/Group1/7.jpg 1.5x',
    description: `<a href="./alina-perez.html">Alina Perez</a>`
  }, {
    srcset: './assets/Group1/8.jpg 1.5x',
    description: `<a href="./alina-perez.html">Alina Perez</a>, <a href="./gabriel-mills.html">Gabriel Mills</a>`
  }, {
    srcset: './assets/Group1/13.jpg 1.5x',
    description: `<a href="./sara-rahmanian.html">Sara Rahmanian</a>`
  }, {
    srcset: './assets/Group1/10.jpg 1.5x',
    description: `<a href="./sara-rahmanian.html">Sara Rahmanian</a>`
  }, {
    srcset: './assets/Group1/11.jpg 1.5x',
    description: `<a href="./sara-rahmanian.html">Sara Rahmanian</a>`
  }, {
    srcset: './assets/Group1/12.jpg 1.5x',
    description: `<a href="./sara-rahmanian.html">Sara Rahmanian</a>`
  }, {
    srcset: './assets/Group1/18.jpg 1.5x',
    description: `<a href="./emma-safir.html">Emma Safir</a>, <a href="./mich-miller.html">Mich Miller</a>`
  }, {
    srcset: './assets/Group1/15.jpg 1.5x',
    description: `<a href="./emma-safir.html">Emma Safir</a>`
  }, {
    srcset: './assets/Group1/16.jpg 1.5x',
    description: `<a href="./tamen-pérez.html">Tamen Perez</a>, <a href="./emma-safir.html">Emma Safir</a>`
  }, {
    srcset: './assets/Group1/20.jpg 1.5x',
    description: `<a href="./curtis-welteroth.html">Curtis Welteroth</a>`
  }, {
    srcset: './assets/Group1/21.jpg 1.5x',
    description: `<a href="./curtis-welteroth.html">Curtis Welteroth</a>`
  }
]
// by default show Group 1
// group2Click.style.opacity = '.2'
// group1Click.style.opacity = '1'
var checkingGroup = 1;
for (i = 0; i < imgFiles.length; i++) {
  imgFiles[i].srcset = group1Img[i].srcset
  descriptions[i].innerHTML = group1Img[i].description
}

// click group 1
group1Click.addEventListener('click', function (i) {
  updateGroup1(i);
});
// click group 2
group2Click.addEventListener('click', function (i) {
  updateGroup2(i);
})

// const progressTag = document.querySelector('#progress-bar')
// progress bar
document.addEventListener('scroll', function() {
  const windowScroll = document.documentElement.scrollTop;
  // const pixels = window.pageYOffset;
  // const pageHeight = bodyTag.getBoundingClientRect().height;
  // const totalScrollableDistance = pageHeight - window.innerHeight;
  // const percentage = pixels / totalScrollableDistance
  // progressTag.style.height = `${100 * percentage}%`

  // move to the other group
  if ( containerHeight - vh <= windowScroll ) {
    if (checkingGroup == 1){
    updateGroup2(i);
    // console.log("checkingGroup = " + checkingGroup);
  } else if (checkingGroup == 2) {
    updateGroup1(i);
    // console.log("checkingGroup = " + checkingGroup);
  }
  };

})

// in case of resizing the window
window.addEventListener('resize', function() {
  containerHeight = `${images.length * settings.scrollDuration}` * vh;
})

function updateGroup1(i) {
  for (i = 0; i < imgFiles.length; i++) {
    imgFiles[i].srcset = group1Img[i].srcset
    descriptions[i].innerHTML = group1Img[i].description
  }
  group2Click.classList.remove('active');
  group2Click.classList.add('inactive');
  group1Click.classList.remove('inactive');
  group1Click.classList.add('active');

  // go to group 1 title
  groupNameTag.innerHTML = "Group 1";
  document.documentElement.scrollTop = imageHeight;
  groupNameTag.animate(
  [{ filter: 'blur(3px)', opacity: '0'},{ filter: 'blur(0px)', opacity: '1'}],
  {duration: 500, easing: 'ease-in-out'});
  navTag.classList.add('is-shown');

  //update the containerHeight
  containerHeight = `${images.length * settings.scrollDuration}` * vh;

  //update status
  checkingGroup = 1;
};

function updateGroup2() {
  for (i = 0; i < imgFiles.length; i++) {
    imgFiles[i].srcset = group2Img[i].srcset
    descriptions[i].innerHTML = group2Img[i].description
  }
  group1Click.classList.remove('active');
  group1Click.classList.add('inactive');
  group2Click.classList.remove('inactive');
  group2Click.classList.add('active');

  // go to group 2 title
  groupNameTag.innerHTML = "Group 2";
  document.documentElement.scrollTop = imageHeight;
  groupNameTag.animate(
  [{ filter: 'blur(3px)', opacity: '0'},{ filter: 'blur(0px)', opacity: '1'}],
  {duration: 500, easing: 'ease-in-out'});
  navTag.classList.add('is-shown');

  //update the containerHeight
  containerHeight = `${images.length * settings.scrollDuration}` * vh;

  //update status
  checkingGroup = 2;
};




}
