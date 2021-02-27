let vh = window.innerHeight;
var scrollPos;
var txtPos;
var txtDetect;
var currentImg;
var nextImg;
var currentCaption;
var nextCaption;
var imgTop = [];
var checkHover;

$( document ).ready(function() {

  window.sr = ScrollReveal({reset: true, duration: 500, delay:0, scale: 1, distance: '0px'});
  sr.reveal('img', { scale: 1 });
  sr.reveal('.txt', { scale: 1 });


  scrollPos = $(document).scrollTop();
  // console.log('current scroll position = ' + scrollPos);

  settingCaption();

  // In case of resizing the browser
  window.addEventListener('resize', function() {
    settingCaption();
  });

  // console.log('imgTop[0] = ' + imgTop[0]);
  // console.log('imgTop[1] = ' + imgTop[1]);
  // console.log('imgTop[2] = ' + imgTop[2]);
  // console.log('vh = ' + vh);
  // console.log('captionArray = ' + captionArray.length);

  document.addEventListener('scroll', function() {
    scrollPos = $(document).scrollTop();
    nextImg = currentImg + 1;
    currentCaption = imgTop[currentImg];
    previousCaption = imgTop[currentImg];
    nextCaption = imgTop[nextImg];

    // console.log('scrollPos =' + scrollPos);
    // console.log('imgTop array =' + imgTop);
    // console.log('current img =' + currentImg);
    // console.log('current img position =' + currentCaption);
    // console.log('next img =' + nextImg);
    // console.log('next img position =' + nextCaption);


    if(nextCaption <= scrollPos){
      // console.log('Next caption!');
      currentImg++;
      // $('.caption').html(captionArray[currentImg]);
    } else if(scrollPos < currentCaption){
      // console.log('Previous caption!');
      currentImg--;
      // $('.caption').html(captionArray[currentImg]);
    };

    // scroll debug
    if (currentImg > captionArray.length) {
      currentImg = captionArray.length;
      nextImg = currentImg + 1;
    };

    settingCaption();

    // check hover
    if (checkHover == true) {
      $( ".info" ).css( "display", "none" );
      $( ".materials" ).css( "display", "inline" );
    }

  });

  $("img").hover(
    function() {
      $( ".info" ).css( "display", "none" );
      $( ".materials" ).css( "display", "inline" );
      checkHover = true;
    }, function() {
      $( ".info" ).css( "display", "inline-block" );
      $( ".materials" ).css( "display", "none" );
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
  // detect what the number of image is
        if(imgTop[i] <= scrollPos){
          currentImg = i;
          // console.log('current image = ' + currentImg);
        };
    };

    $('.caption').html(captionArray[currentImg]);



    txtPos = $('.txt').offset().top;
    txtDetect = scrollPos + vh;
    // console.log('txtPos = ' + txtPos);
    // console.log('txtDetect = ' + txtDetect);
    if(txtPos <= txtDetect){
      $('.caption').css('display', 'none');
      // console.log('Txt!');
    } else {
      $('.caption').css('display', 'block');
    }
    // console.log('Txt!');

}
