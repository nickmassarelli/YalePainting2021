const DEBUG = true;

function log(str) {
  if (DEBUG) {
    console.log(str);
  }
}


// The list of painters and their videos.
const painterVideoDict = {
  'Vamba Bility': '503219177',
  'Brianna Rose Brooks': '',
  'David Craig': '503306710',
  'Danielle De Jesus': '503314093',
  'Nathaniel Donnett': '503307474',
  'Leyla Faye': '503307928',
  'Kate Meissner': '',
  'Mich Miller': '503308625',
  'Gabriel Mills': '503311373',
  'Dala Nasser': '503196192',
  'Alina Perez': '',
  'Tamen Pérez': '503302531',
  'Sara Rahmanian': '503313466',
  'Jonathan Rajewski': '503312134',
  'Emma Safir': '503316662',
  'Chibuike Uzoma': '503315619',
  'Curtis Welteroth': '503170693',
}

// Building a new array with just the video IDs from the painters.
const videoIds = $.map(painterVideoDict, function(value, key) { return value });
const horizontalVideos = ['503306710','503314093','503307474','503307928','503308625','503196192','503311373','503313466','503316662','503315619'];

// jQuery stuff

// For every painter in the list of painters, add a list item to the HTML
$.each(Object.keys(painterVideoDict), function(idx, painter) {
  // Create a new list item with the class `painter`, and the text of
  // the painter's name.
  var li = $('<li/>').addClass('painter').text(painter);

  // If this is the first painter in the list (index == 0), then while
  // want to make it "active" (apply styling) because the video is playing.
  if (idx == 0) {
    li.addClass('active');
  }

  if (painterVideoDict[painter].length == 0) {
    li.addClass('no-media');
  }

  // Add the list item we just created to this list of painters in the HTML.
  $('#painters').append(li);
})

// Takes in an index of which painter to highlight, and then does so
function activatePainterName(index) {
  // Remove the styling from all of the other names.
  $('.painter').removeClass('active');
  // Add the styling to just the name at the index.
  $('.painter').eq(index).addClass('active');

  if (horizontalVideos.includes(videoIds[index])) {
    $('iframe').addClass('horizontal');
  } else {
    $('iframe').removeClass('horizontal');
  }
}

function VimVids(el, options) {
  options = options || {};
  Object.assign(this, VimVids.options, options);
  //this.playlist = Object.assign({}, VimVids.options.playlist, options.playlist);

  this.currentVidIdx = 0
  this.vidCount = this.playlist.length,

  this.player = new Vimeo.Player(el, {
    id: this.playlist[this.currentVidIdx],
    width: this.width,
    title: this.title,
    muted: this.muted,
    controls: this.controls,
    autoplay: this.autoplay
  });
}

VimVids.prototype = {
  constructor: VimVids,

  init() {
    // add ended event inside init
    this.player.on('ended', () => {
      log("Video ended...")
      this.next()
    })
  },

  loadVid(id) {
    this.player.loadVideo(id)
    this.player.play()
  },

  next() {
    log("Next video...")
    this.currentVidIdx++;
    if (this.currentVidIdx < this.vidCount){
      this.currentVidIdx+1;
    } else {
      this.currentVidIdx = 0;
    }

    var videoId = this.playlist[this.currentVidIdx]

    if (videoId.length === 0) {
      this.next()
      return
    }

    this.loadVid(videoId)

    activatePainterName(this.currentVidIdx);
  },

  playAtIndex(index) {
    if (index < this.vidCount) {
      this.currentVidIdx = index;
    } else {
      this.currentVidIdx = 0;
    }

    this.loadVid(this.playlist[this.currentVidIdx]);
  }
}

VimVids.options = {
  loop: false,
  title: false,
  muted: false,
  controls: false,
  fullScreenToggle: false,
  autoplay: true,
  playlist: videoIds
}

var vimeo = new VimVids('js-player')
vimeo.init()

var buttonLeft = $('button#left')
var buttonRight = $('button#right')

buttonLeft.click(function () {
  infoToHome()
})

buttonRight.click(function () {
  vdToHome()
})

function infoToHome() {
  $('body').toggleClass('is-info-active')

  if (buttonLeft.html() === 'Info') {
    buttonLeft.html('&#8595;')
    buttonRight.html('')
  } else {
    buttonLeft.html('Info')
    buttonRight.html('Artists')
  }
}

function vdToHome() {
  $('body').toggleClass('is-vd-active')

  if (buttonRight.html() === 'Artists') {
    buttonRight.html('	&#8592;')

    // going to artists screen from home so we need to play the first video
    activatePainterName(vimeo.currentVidIdx)
    vimeo.playAtIndex(vimeo.currentVidIdx)
  } else {
    buttonRight.html('Artists')

    // pause vimeo player when going back to Home
    vimeo.player.pause()
  }
}

$('.painter').on('click', function() {
  let index = $(this).index();
  if (videoIds[index].length == 0) {
    return;
  }

  activatePainterName(index)
  vimeo.playAtIndex(index)
})


