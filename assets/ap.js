let vh = window.innerHeight;
var scrollPos;
var txtPos;
// var txtDetect;
var currentImg = 0;
var previousCaption;
var nextImg;
var nextCaption;
var imgTop = [];
var materials;
var checkHover = false;
var beforeScroll = 0;
const navTag = document.querySelector('nav')

$( document ).ready(function() {

  //JS library setting
  window.sr = ScrollReveal({reset: true, duration: 500, delay:0, scale: 1, distance: '0px'});
  sr.reveal('img', { scale: 1 });
  sr.reveal('.txt', { scale: 1 });

  //initial caption setting
  scrollPos = $(document).scrollTop();
  navTag.classList.add('is-shown');
  settingCaption();
  detectingImgNum();
  textCheck();

  // In case of resizing the browser
  window.addEventListener('resize', function() {
    settingCaption();
    detectingImgNum();
    navTag.classList.add('is-shown');
  });

  //when scrolling
  document.addEventListener('scroll', function() {
    scrollPos = $(document).scrollTop();

    // nav scroll
    if (scrollPos > beforeScroll && scrollPos > 0) {
        navTag.classList.remove('is-shown');
    }
    else {
        navTag.classList.add('is-shown');
    }
    beforeScroll = scrollPos;

    // scroll debug
    if (currentImg > captionArray.length) {
      currentImg = captionArray.length;
      nextImg = currentImg + 1;
    };

    // check hover and setting the caption
    if (checkHover == false) {
      settingCaption();
      updateCaption();
      textCheck();
    } else {
      textCheck();
    };
  });

  $("img").hover(
    function() {
      materials = $(this).attr("alt");
      $('.caption').html(materials);
      checkHover = true;
      textCheck();
    }, function() {
      settingCaption();
      detectingImgNum();
      textCheck();
      checkHover = false;
    }
  );


});


function settingCaption() {
  imgTop = [];
  // making the array of top positions for images
  for (var i = 0; i < captionArray.length; i++){
      var imgNum = '.img' + i;
      var imgTopValue = $(imgNum).offset().top;
      imgTop.push(imgTopValue);
  };
}

function detectingImgNum() {
  for (var i = 0; i < captionArray.length; i++){
        if(imgTop[i] - vh*0.7 <= scrollPos){
          currentImg = i;
        };
      };
  $('.caption').html(captionArray[currentImg]);
}

function updateCaption() {
  nextImg = currentImg + 1;
  previousCaption = imgTop[currentImg] - vh*0.7;
  nextCaption = imgTop[nextImg] - vh*0.7;
  if(nextCaption <= scrollPos){
      currentImg++;
      $('.caption').html(captionArray[currentImg]);
    } else if(scrollPos < previousCaption){
      currentImg--;
      $('.caption').html(captionArray[currentImg]);
    };
  textCheck();
}

function textCheck() {
  txtPos = $('.container').offset().top - vh + vh/10;
  // txtDetect = scrollPos + vh - vh/10;
  var captionAppear = imgTop[0] - vh/4;
  var captionDisappear = imgTop[0] - vh/2
  console.log('scrollPos = ' + scrollPos);
  console.log('txtPos = ' + txtPos);
  console.log('captionDisappear = ' + captionDisappear);
  if(captionAppear <= scrollPos < txtPos) {
    $('.caption').css('display', 'block');
  };
  if (txtPos <= scrollPos || scrollPos <= captionDisappear ){
    $('.caption').css('display', 'none');
  };
}


const rightPageTag = document.querySelector('div.right-page')
const artistTag = document.querySelector('span.artists')

artistTag.addEventListener('click', function () {
  // navTag.classList.toggle('open')
  rightPageTag.classList.toggle('open')
  navTag.style.zIndex = '8'
})

const leftArea = document.querySelector('#closeList')

leftArea.addEventListener('click', ()=>{
  if (rightPageTag.classList.contains('open')) {
  rightPageTag.classList.remove('open')
  // navTag.classList.remove('open')
  }
})

const ListTag = document.querySelector('ul')
const thumbnailTag = document.querySelector('div.thumbnail')
const nameLists = document.querySelectorAll('li')
const thumbnails = [
  `url(assets/thumbnails/Kate-Meissner_01.jpg)`,
  `url(assets/thumbnails/Mich-Miller_09.jpg)`,
  `url(assets/thumbnails/Gabriel-Mills_01.jpg)`,
  `url(assets/thumbnails/Alina-Perez_01.jpg)`,
  `url(assets/thumbnails/Tamen-Perez_08.jpg)`,
  `url(assets/thumbnails/Sara-Rahmanian_08.jpg)`,
  `url(assets/thumbnails/Emma-Safir_02.jpg)`,
  `url(assets/thumbnails/Chibuike-Uzoma_02.jpg)`,
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

const indiPages = [
  './kate-meissner.html',
  './mich-miller.html',
  './gabriel-mills.html',
  './alina-perez.html',
  './tamen-pérez.html',
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
