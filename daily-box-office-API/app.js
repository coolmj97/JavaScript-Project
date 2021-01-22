'use strict';

const selectedGroup = document.querySelector('.box-office-selection');
const selectedYear = document.querySelector('.year-group');
const selectedMonth = document.querySelector('.month-group');
const selectedDate = document.querySelector('.date-group');
const searchBtn = document.querySelector('.search-button');

const listTitle = document.querySelector('.box-office-list-title');
const boxOfficeList = document.querySelector('.box-office-list');
const thead = document.querySelector('thead');
const tbody = document.querySelector('tbody');

let userYear = '';
let userMonth = '';
let userDate = '';
let userChoice = '';

function showData(boxOfficeResult) {
  try {
    const dailyList = boxOfficeResult.dailyBoxOfficeList;
    const row = dailyList
      .map((item) => {
        return `
        <tr>
          <td class="rank-cell">${item.rank}</td>
          <td class="name-cell">${item.movieNm}</td>
          <td class="date-cell">${item.openDt}</td>
        </tr>`;
      })
      .join('');
    thead.style.visibility = 'visible';
    tbody.innerHTML = row;
    boxOfficeList.style.backgroundColor = '#1b264f';
    listTitle.innerText = `${userYear}년 ${userMonth}월 ${userDate}일 박스오피스`;
  } catch {
    alert('해당 정보를 불러올 수 없습니다.');
  }
}

function loadData(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((json) => showData(json.boxOfficeResult))
    .catch(console.log);
}

function assignData() {
  const key = '?key=d28b2d6c120e6d57b2cc970b7628df59';
  let targetDt = `&targetDt=${userChoice}`;
  let url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json${key}${targetDt}`;
  loadData(url);
}

function onSearch() {
  searchBtn.addEventListener('click', () => {
    if (
      selectedYear.value === '' ||
      selectedMonth.value === '' ||
      selectedDate.value === ''
    ) {
      alert('연월일을 선택하세요.');
      return;
    }
    assignData();
  });
}

function selectDate() {
  selectedGroup.addEventListener('input', (event) => {
    const value = event.target.value;

    if (event.target.className === 'year-group') {
      userYear = value;
    }

    if (event.target.className === 'month-group') {
      userMonth = value < 10 ? `0${value}` : value;
    }

    if (event.target.className === 'date-group') {
      userDate = value < 10 ? `0${value}` : value;
    }

    userChoice = userYear + userMonth + userDate;
  });
}

function setDate() {
  selectedMonth.addEventListener('input', (event) => {
    selectedDate.innerHTML = `<option value="">선택하세요</option>`;
    const year = userYear;
    const month = event.target.value;
    let date = new Date(year, month, 0);
    const lastDate = date.getDate();
    for (let i = 1; i <= lastDate; i++) {
      const optionDate = document.createElement('option');
      optionDate.innerText = i;
      optionDate.value = i;
      selectedDate.appendChild(optionDate);
    }
  });
}

function setMonth() {
  selectedYear.addEventListener('input', () => {
    selectedMonth.innerHTML = `<option value="">선택하세요</option>`;
    for (let i = 1; i <= 12; i++) {
      const optionMonth = document.createElement('option');
      optionMonth.innerText = i;
      optionMonth.value = i;
      selectedMonth.appendChild(optionMonth);
    }
  });
}

function setYear() {
  const today = new Date();
  const nowYear = today.getFullYear();
  const startYear = nowYear - 10;
  for (let i = nowYear; i >= startYear; i--) {
    const optionYear = document.createElement('option');
    optionYear.innerText = i;
    optionYear.value = i;
    selectedYear.appendChild(optionYear);
  }
}

function init() {
  setYear();
  setMonth();
  setDate();
  selectDate();
  onSearch();
}

init();
