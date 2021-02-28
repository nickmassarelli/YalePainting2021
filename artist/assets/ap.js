let vh = window.innerHeight;
var scrollPos;
var txtPos;
var txtDetect;
var currentImg = 0;
var previousCaption;
var nextImg;
var nextCaption;
var imgTop = [];
var materials;
var checkHover = false;

$( document ).ready(function() {

  //JS library setting
  window.sr = ScrollReveal({reset: true, duration: 500, delay:0, scale: 1, distance: '0px'});
  sr.reveal('img', { scale: 1 });
  sr.reveal('.txt', { scale: 1 });

  //initial caption setting
  scrollPos = $(document).scrollTop();
  settingCaption();
  detectingImgNum();

  // In case of resizing the browser
  window.addEventListener('resize', function() {
    settingCaption();
    detectingImgNum();
  });

  //when scrolling
  document.addEventListener('scroll', function() {
    scrollPos = $(document).scrollTop();

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
      var imgTopValue = $(imgNum).offset().top  - vh/4;
      imgTop.push(imgTopValue);
  };
}

function detectingImgNum() {
  for (var i = 0; i < captionArray.length; i++){
        if(imgTop[i] <= scrollPos){
          currentImg = i;
        };
      };
  $('.caption').html(captionArray[currentImg]);
}

function updateCaption() {
  nextImg = currentImg + 1;
  previousCaption = imgTop[currentImg] - vh/2;
  nextCaption = imgTop[nextImg] - vh/4;
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
  txtPos = $('.txt').offset().top;
  txtDetect = scrollPos + vh - vh/10;
  if(txtPos <= txtDetect){
    $('.caption').css('display', 'none');
  } else {
    $('.caption').css('display', 'block');
  }
}
