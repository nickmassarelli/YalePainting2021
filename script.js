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
  blurAmount: 20
};


// select our elements
let container = document.querySelector('.container');
let images = document.querySelectorAll('.image');
const navTag = document.querySelector('nav')
const artistTag = document.querySelector('span.artistsButton')
const infoTag = document.querySelector('span.infoButton')
const mainTag = document.querySelector('main')
const rightPageTag = document.querySelector('div.right-page')
const leftPageTag = document.querySelector('div.left-page')
const bodyTag = document.querySelector('body')

// set height of contain dynamically using # of 
// images and our scroll duration setting
container.style.height = `${images.length * settings.scrollDuration * 100}vh`;

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
// should start at 0
$(window).scroll(function () {
  var scroll = $(window).scrollTop()

  if (scroll > position) {
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
  // mainTag.classList.toggle('open')
  navTag.classList.toggle('open')
  rightPageTag.classList.toggle('open')
  // container.classList.toggle('open')
})

infoTag.addEventListener('click', function () {
  leftPageTag.classList.toggle('open')
  navTag.classList.toggle('left-open')
  navTag.style.zIndex = '8'
})

leftPageTag.addEventListener('click', function () {
  leftPageTag.classList.remove('open')  
  navTag.classList.remove('left-open')

})

const ListTag = document.querySelector('ul')
const thumbnailTag = document.querySelector('div.thumbnail')
const nameLists = document.querySelectorAll('li')
const thumbnails = [
  `url(assets/thumbnails/1.jpg)`,
  `url(assets/thumbnails/2.jpg)`,
  `url(assets/thumbnails/3.jpg)`,
  `url(assets/thumbnails/4.jpg)`,
  `url(assets/thumbnails/5.jpg)`,
  `url(assets/thumbnails/6.jpg)`,
  `url(assets/thumbnails/7.jpg)`,
  `url(assets/thumbnails/8.jpg)`,
  `url(assets/thumbnails/9.jpg)`,
  `url(assets/thumbnails/10.jpg)`,
  `url(assets/thumbnails/11.jpg)`,
  `url(assets/thumbnails/12.jpg)`,
  `url(assets/thumbnails/13.jpg)`,
  `url(assets/thumbnails/14.jpg)`,
  `url(assets/thumbnails/15.jpg)`,
  `url(assets/thumbnails/16.jpg)`,
  `url(assets/thumbnails/17.jpg)`,
]
// console.log(nameLists)

nameLists.forEach(function (item, index) {
  item.addEventListener('mouseover', function () {
    thumbnailTag.style.backgroundImage = thumbnails[index]
  })
  item.addEventListener('mouseout', function () {
    thumbnailTag.style.backgroundImage = ''
  })
})



const group1Click = document.querySelector('a.group1')
const group2Click = document.querySelector('a.group2')
const imgFiles = document.querySelectorAll('img')
const descriptions = document.querySelectorAll('div.description')

console.log(descriptions)

const group2Img = [
  {
    srcset: './assets/Group2/1.jpg 1.5x',
    description: `<a href="#0">Nathaniel Donnett</a>`
  },{
    srcset: './assets/Group2/2.jpg 1.5x',
    description: `<a href="#0">Nathaniel Donnett</a>`
  },{
    srcset: './assets/Group2/3.jpg 1.5x',
    description: `<a href="#0">Nathaniel Donnett</a>`
  },{
    srcset: './assets/Group2/4.jpg 1.5x',
    description: `<a href="#0">Brianna Rose Brooks</a>, <em>Untitled</em>`
  },{
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
    description: `<a href="#0">1-2. Leyla Faye</a>, <a href="#0">3. Jonathan Rajewski</a>, <a href="#0">4-5. Vamba Bility</a>`
  }, {
    srcset: './assets/Group2/12.jpg 1.5x',
    description: `<a href="#0">Jonathan Rajewski</a>`
  }, {
    srcset: './assets/Group2/13.jpg 1.5x',
    description: `<a href="#0">Jonathan Rajewski</a>`
  }, {
    srcset: './assets/Group2/14.jpg 1.5x',
    description: `<a href="#0">1. Jonathan Rajewski</a>, <a href="#0">2. Leyla Faye</a>, <a href="#0">3-5. Vamba Bility</a>`
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
    description: `<a href="#0">Chibuike Uzoma</a>`
  },{
    srcset: './assets/Group1/2.jpg 1.5x',
    description: `<a href="#0">1-4. Kate Meissner</a>, <a href="#0">5. Chibuike Uzoma</a>`
  },{
    srcset: './assets/Group1/3.jpg 1.5x',
    description: `<a href="#0">Kate Meissner</a>, <em>Untitled</em>`
  },{
    srcset: './assets/Group1/4.jpg 1.5x',
    description: `<a href="#0">Kate Meissner</a>, <em>Untitled</em>`
  },{
    srcset: './assets/Group1/5.jpg 1.5x',
    description: `<a href="#0">1. Gabriel Mills</a>, <a href="#0">2-3. Alina Perez</a>`
  }, {
    srcset: './assets/Group1/6.jpg 1.5x',
    description: `<a href="#0">1. Gabriel Mills</a>, <a href="#0">2. Alina Perez</a>`
  }, {
    srcset: './assets/Group1/7.jpg 1.5x',
    description: `<a href="#0">Alina Perez</a>`
  }, {
    srcset: './assets/Group1/8.jpg 1.5x',
    description: `<a href="#0">1. Alina Perez</a>, <a href="#0">2. Gabriel Mills</a>`
  }, {
    srcset: './assets/Group1/13.jpg 1.5x',
    description: `<a href="#0">Sara Rahmanian</a>`
  }, {
    srcset: './assets/Group1/10.jpg 1.5x',
    description: `<a href="#0">Sara Rahmanian</a>`
  }, {
    srcset: './assets/Group1/11.jpg 1.5x',
    description: `<a href="#0">Sara Rahmanian</a>`
  }, {
    srcset: './assets/Group1/12.jpg 1.5x',
    description: `<a href="#0">Sara Rahmanian</a>`
  }, {
    srcset: './assets/Group1/18.jpg 1.5x',
    description: `<a href="#0">1, 2. Emma Safir</a>, <a href="#0">3-5, Mich Miller</a>`
  }, {
    srcset: './assets/Group1/15.jpg 1.5x',
    description: `<a href="#0">Emma Safir</a>`
  }, {
    srcset: './assets/Group1/16.jpg 1.5x',
    description: `<a href="#0">1-6. Tamen Perez</a>, <a href="#0">7. Emma Safir</a>`
  }, {
    srcset: './assets/Group1/20.jpg 1.5x',
    description: `<a href="#0">Curtis Welteroth</a>`
  }, {
    srcset: './assets/Group1/21.jpg 1.5x',
    description: `<a href="#0">Curtis Welteroth</a>`
  }
]

// by default show Group 1
group2Click.style.opacity = '1'
group1Click.style.opacity = '.2'
for (i = 0; i < imgFiles.length; i++) {
  imgFiles[i].srcset = group1Img[i].srcset
  descriptions[i].innerHTML = group1Img[i].description
}

// click group 1 
group1Click.addEventListener('click', function (i) {
  for (i = 0; i < imgFiles.length; i++) {
    imgFiles[i].srcset = group1Img[i].srcset
    descriptions[i].innerHTML = group1Img[i].description
  }
  group2Click.style.opacity = '1'
  group1Click.style.opacity = '.2'
})
// click group 2
group2Click.addEventListener('click', function (i) {
  for (i = 0; i < imgFiles.length; i++) {
    imgFiles[i].srcset = group2Img[i].srcset
    descriptions[i].innerHTML = group2Img[i].description
  }
  group2Click.style.opacity = '.2'
  group1Click.style.opacity = '1'

})

const progressTag = document.querySelector('#progress-bar')
// progress bar
document.addEventListener('scroll', function() {
  const pixels = window.pageYOffset
  const pageHeight = bodyTag.getBoundingClientRect().height
  const totalScrollableDistance = pageHeight - window.innerHeight

  const percentage = pixels / totalScrollableDistance
  progressTag.style.height = `${100 * percentage}%`
})

}