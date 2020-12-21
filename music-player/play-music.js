'use strict'

const musicInfo = document.querySelectorAll('.music-info') //제목과 가수 이름
const musicItems = document.querySelectorAll('audio') //음원

function handleMusic() {
  musicInfo.forEach(function (item, i) {
    item.addEventListener('click', function () {
      musicItems.forEach((i) => i.pause())

      if (musicItems[i]) {
        musicItems[i].currentTime = 0
        musicItems[i].play()
      }
    })
  })
}
handleMusic()
