"use strict";

const albumCover = document.querySelectorAll(".album-cover");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");

function loadInfo() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.details);
}

//html에 동적으로 할당한다
function createHTMLString(detail) {
  return `
  <div class="modal-content">
    <div class="pop-up-img">
      <img src="${detail.cover}" alt="" />
      <img src="${detail.image}" alt="" />
    </div>
    <span class="pop-up-title">앨범명: ${detail.title}</span>
    <span class="pop-up-artist">아티스트: ${detail.artist}</span>

    <dl class="description-list">
      <div class="dl-division">
        <dt>발매일</dt>
        <dd>${detail.date}</dd>
        <dt>장르</dt>
        <dd>${detail.genre}</dd>
      </div>
      <div class="dl-division">
        <dt>발매사</dt>
        <dd>${detail.publisher}</dd>
        <dt>기획사</dt>
        <dd>${detail.agency}</dd>
      </div>
    </dl>
  </div>`;
}

function toggleModal() {
  modal.classList.toggle("show-modal");
  closeButton.classList.toggle("show-close-btn");
}

//html요소를 만든다
function displayDetail(details) {
  toggleModal();
  modal.innerHTML = details.map((detail) => createHTMLString(detail));
  closeButton.addEventListener("click", toggleModal);
}

//해당하는 정보를 필터한다
function onButtonClick(event, details) {
  const dataset = event.target.dataset; //버튼 중 하나를 누르면 그 버튼의 태그 정보가 전달된다
  const key = dataset.key; //data-key가 dataset.key로 바뀐다
  const value = dataset.value;
  if (key == null || value == null) {
    return;
  }
  const filtered = details.filter((detail) => detail[key] === value);
  displayDetail(filtered);
}

function handleButton(details) {
  albumCover.forEach((cover) =>
    cover.addEventListener("click", function (event) {
      onButtonClick(event, details);
    })
  );
}

loadInfo()
  .then((details) => {
    handleButton(details);
  })
  .catch(console.log);
