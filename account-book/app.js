'use strict';

const form = document.querySelector('form');
const incomeBtn = document.querySelector('.button-income');
const expenseBtn = document.querySelector('.button-expense');
const formDate = document.querySelector('input[id="date"]');
const formPrice = document.querySelector('input[id="price"]');
const formContent = document.querySelector('input[id="content"]');
const recordLists = document.querySelector('.record-lists');

let allRecords = [];

function saveRecord() {
  localStorage.setItem('all', JSON.stringify(allRecords));
}

function onSum() {
  const sumIncome = document.querySelector('.sum-income');
  const sumExpense = document.querySelector('.sum-expense');
  const totalPrice = allRecords.map((a) => a.price);
  const incomes = totalPrice
    .filter((item) => item > 0)
    .reduce((acc, cur) => acc + cur, 0);
  sumIncome.innerText = `${incomes.toLocaleString('ko-KR')}원`;
  const expenses = totalPrice
    .filter((item) => item < 0)
    .reduce((acc, cur) => acc + cur, 0);
  sumExpense.innerText = `${Math.abs(expenses).toLocaleString('ko-KR')}원`;
}

function createRecord(order, date, price, content) {
  const sign = price > 0 ? '+' : '-';
  const li = document.createElement('li');
  const recordDate = document.createElement('span');
  const recordBox = document.createElement('div');
  const recordTitle = document.createElement('strong');
  const recordPrice = document.createElement('strong');
  const editBtns = document.createElement('div');
  const modiBtn = document.createElement('button');
  const delBtn = document.createElement('button');
  li.id = order;
  editBtns.id = order;

  li.classList.add('record-item');
  recordDate.classList.add('record-date');
  recordBox.classList.add('record-detail');
  recordTitle.classList.add('record-title');
  recordPrice.classList.add('record-price');
  modiBtn.classList.add('button-modification');
  delBtn.classList.add('button-deletion');
  editBtns.classList.add('buttons-edit');
  recordDate.innerText = date;
  recordTitle.innerText = content;
  recordPrice.innerText = `${sign}${Math.abs(price).toLocaleString('ko-KR')}`;
  modiBtn.innerText = '수정';
  delBtn.innerText = '삭제';
  li.appendChild(recordDate);
  li.appendChild(recordBox);
  recordBox.appendChild(recordTitle);
  recordBox.appendChild(recordPrice);
  recordPrice.prepend(editBtns);
  editBtns.appendChild(modiBtn);
  editBtns.appendChild(delBtn);
  recordLists.appendChild(li);

  li.scrollIntoView({ block: 'center' });

  recordBox.addEventListener('mouseover', () => {
    editBtns.style.visibility = 'visible';
  });

  recordBox.addEventListener('mouseout', () => {
    editBtns.style.visibility = 'hidden';
  });

  editBtns.addEventListener('click', (event) => {
    if (event.target.className === 'button-modification') {
      if (editBtns.id === li.id) {
        sign === '+' ? (incomeBtn.checked = true) : (expenseBtn.checked = true);
        formDate.value = recordDate.innerText;
        formPrice.value = Math.abs(price);
        formContent.value = recordTitle.innerText;
        li.remove();
        const filteredAll = allRecords.filter(
          (item) => parseInt(li.id) !== item.id
        );
        allRecords = filteredAll;
        allRecords.forEach((item, index) => {
          item.id = index;
        });
        saveRecord();
        onSum();
      }
    }

    if (event.target.className === 'button-deletion') {
      if (editBtns.id === li.id) {
        li.remove();
        const filteredAll = allRecords.filter(
          (item) => parseInt(li.id) !== item.id
        );
        allRecords = filteredAll;
        allRecords.forEach((item, index) => {
          item.id = index;
        });
        saveRecord();
        onSum();
      }
    }
  });
}

function onSort() {
  const sortBtns = document.querySelector('select');
  sortBtns.addEventListener('click', (event) => {
    if (event.target.value === 'price-low') {
      allRecords.sort((a, b) => Math.abs(a.price) - Math.abs(b.price));
      recordLists.innerHTML = '';
      allRecords.forEach((item) => {
        createRecord(item.id, item.date, item.price, item.content);
      });
    }

    if (event.target.value === 'price-high') {
      allRecords.sort((a, b) => Math.abs(b.price) - Math.abs(a.price));
      recordLists.innerHTML = '';
      allRecords.forEach((item) => {
        createRecord(item.id, item.date, item.price, item.content);
      });
    }

    if (event.target.value === 'date-past') {
      allRecords.sort((a, b) => new Date(a.date) - new Date(b.date));
      recordLists.innerHTML = '';
      allRecords.forEach((item) => {
        createRecord(item.id, item.date, item.price, item.content);
      });
    }

    if (event.target.value === 'date-latest') {
      allRecords.sort((a, b) => new Date(b.date) - new Date(a.date));
      recordLists.innerHTML = '';
      allRecords.forEach((item) => {
        createRecord(item.id, item.date, item.price, item.content);
      });
    }
  });
}

function onFilter() {
  const filterBtns = document.querySelector('.button-filter');
  filterBtns.addEventListener('click', (event) => {
    if (event.target.className === 'filter-all') {
      recordLists.innerHTML = '';
      parseRecord();
    }

    if (event.target.className === 'filter-income') {
      recordLists.innerHTML = '';
      const filteredPlus = allRecords.filter((item) => item.price > 0);
      filteredPlus.forEach((item) => {
        createRecord(item.id, item.date, item.price, item.content);
      });
    }

    if (event.target.className === 'filter-expense') {
      recordLists.innerHTML = '';
      const filteredMinus = allRecords.filter((item) => item.price < 0);
      filteredMinus.forEach((item) => {
        createRecord(item.id, item.date, item.price, item.content);
      });
    }
  });
}

function handleSubmit() {
  const order = allRecords.length;
  const sign = incomeBtn.checked === true ? '+' : '-';
  const currentDate = formDate.value;
  const currentPrice = parseInt(`${sign}${formPrice.value}`);
  const currentContent = formContent.value;
  const recordObj = {
    id: order,
    date: currentDate,
    price: currentPrice,
    content: currentContent,
  };
  allRecords.push(recordObj);
  saveRecord();
  createRecord(order, currentDate, currentPrice, currentContent);
  onSum();
  incomeBtn.checked = false;
  expenseBtn.checked = false;
  formDate.value = '';
  formPrice.value = '';
  formContent.value = '';
}

function checkForm() {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (
      (incomeBtn.checked === false && expenseBtn.checked === false) ||
      formDate.value === '' ||
      formPrice.value === '' ||
      formContent.value === ''
    ) {
      alert('내역을 빠짐없이 입력하세요.');
    } else {
      handleSubmit();
    }
  });
}

function parseRecord() {
  const loadedAll = localStorage.getItem('all');
  if (loadedAll !== null) {
    const parsedAll = JSON.parse(loadedAll);
    allRecords = parsedAll;
    allRecords.forEach((item, index) => {
      item.id = index;
      createRecord(item.id, item.date, item.price, item.content);
    });
    onSum();
  }
}

function init() {
  parseRecord();
  onFilter();
  onSort();
  checkForm();
}

init();
