"use strict";

const musicInfo = document.querySelectorAll(".music-info"); //제목과 가수 이름
const musicItems = document.querySelectorAll("audio");

function handleMusic() {
  musicInfo.forEach(function (item, i) {
    item.addEventListener("click", function () {
      //제목이 클릭되면
      musicItems.forEach((i) => i.pause()); //모든 요소들을 일시정지 시킨다.

      //해당 요소를 처음부터 재생한다.
      if (musicItems[i]) {
        musicItems[i].currentTime = 0;
        musicItems[i].play();
      }
    });
  });
}
handleMusic();
