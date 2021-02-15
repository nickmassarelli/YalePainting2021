let imgNumber = 0
const imgs = [
    {
        srcset: './assets/1.jpg 2x',
        caption: `Dala Nasser, <i>Untitled</i>`
    },
    {
        srcset: './assets/2.jpg 2x',
        caption: `text2, <i>Test</i>`
    },
    {
        srcset: './assets/3.jpg 2x',
        caption: `text3, <i>Test3</i>`

    },
    {
        srcset: './assets/4.jpg 2x',
        caption: `text4, <i>Test4</i>`
    },
    {
        srcset: './assets/5.jpg 2x',
        caption: `text5, <i>Test5</i>`
    },
]

const mainTag = document.querySelector('main')
const imgTag = document.querySelector('img')
const captionTag = document.querySelector('div.caption')
const navTag = document.querySelector('nav')
const blankTag = document.querySelector('div.blank')
const artistsTag = document.querySelector('nav span.artists')
const infoTag = document.querySelector('nav span.info')
const bodyTag = document.querySelector('body')

const next = function () {
    imgNumber = imgNumber + 1
    if (imgNumber > imgs.length - 1) {
        imgNumber = 0
    }
    updateSection()
}

const prev = function () {
    imgNumber = imgNumber - 1
    if (imgNumber < 0) {
        imgNumber = imgs.length - 1
    }
    updateSection()
}

const updateSection = function () {
    imgTag.classList.add('is-scrolled')
    imgTag.srcset = imgs[imgNumber].srcset
    captionTag.innerHTML = imgs[imgNumber].caption
}

var position = $(window).scrollTop();
// should start at 0
$(window).scroll(function () {
    const pixels = window.pageYOffset
    const num = Math.floor((pixels % 400) / 10)

    var scroll = $(window).scrollTop()

    if (scroll > position) {
        console.log('scrollDown')
        navTag.classList.remove('is-shown')

        console.log(num)
        if (num == 9) {
            next()
        }
        if (num == 0) {
            imgTag.classList.remove('is-scrolled')
        }
    }
    else {
        console.log('scrollUp')
        navTag.classList.add('is-shown')

        if (num == 19) {
            prev()
        }
        if (num == 39) {
            imgTag.classList.remove('is-scrolled')
        }
    }
    position = scroll
})


artistsTag.addEventListener('click', function () {
    mainTag.classList.toggle('open')
    navTag.classList.toggle('open')
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
// ListTag.addEventListener('mouseover', function(){
//     nameLists.forEach(() => {
//         thumbnailTag.style.backgroundImage = thumbnails[2]
//     })
// })

console.log(nameLists)

nameLists.forEach(function (item, index){
    item.addEventListener('mouseover', function(){
        thumbnailTag.style.backgroundImage = thumbnails[index]
    })
    item.addEventListener('mouseout', function(){
        thumbnailTag.style.backgroundImage = ''
    })
})