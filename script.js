const popup = document.querySelector(".addexpense");
const overlay = document.querySelector(".overlay");
const btnClosePopup = document.querySelector(".close-popup");
const btnsOpenPopup = document.querySelector(".show-popup");
const btnExpense = document.querySelector(".btn--expense");
const category = document.querySelector(".category-expense");

const form = document.getElementById('form');
const expenseNameInput = document.getElementById('expense-name');
const amountInput = document.getElementById('amount');
const expenseDateInput = document.getElementById('expense-date');
const categoryInput = document.getElementById('category');
const totalExpenseElem = document.querySelectorAll('#total-expense')[1];
const totalExpenseElem1 = document.querySelectorAll('#total-expense')[0];
const expenseTableBody = document.querySelector('.expense-tbody');
// const categoryExpense = {
//   // food: document.querySelector('#food-expense'),
//   // bills: document.querySelector('#bills-expense'),
//   // transportation: document.querySelector('#transportation-expense'),
//   // utilities: document.querySelector('#utilities-expense'),
//   // other: document.querySelector('#other-expense'),
// };

const addCategory = document.querySelector('.btn--category');
const categoryIp = document.querySelector('.category-name');
const analysis = document.querySelector('.analysis');

const categorylist = JSON.parse(localStorage.getItem('categorylist')) || ['food', 'bills', 'transportation', 'utilities', 'other'];
// console.log(categoryExpense);

// categorylist.forEach(function (category) { 
//   const id = `#${category}-expense`;  
//   categoryExpense[category] = `document.querySelector('${id}')`;
//   // console.log(categoryExpense[category]);
// });
const categoryTbody = document.querySelector('.category-tbody');


let expenses = JSON.parse(localStorage.getItem('expenses')) || {
  expenseName: ['Gloves', 'Mask', 'Sanitizer', 'Vaccine',],
  amount: [ 100, 200, 300, 400,],
  expenseDate: [ '2021-01-01', '2021-02-02', '2021-03-03', '2021-04-04',],
  category: [ 'food', 'bills', 'transportation', 'utilities',],
};

function updateLocalStorage() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
  localStorage.setItem('categorylist', JSON.stringify(categorylist));
}

function updateTotalExpenses() {
  let total = 0;
  let i = 0;
  while (i<expenses.amount.length) {
    total += expenses.amount[i];
    i++;
  }
  totalExpenseElem.textContent = `₹ ${total.toFixed(2)}`;
  totalExpenseElem1.textContent = `₹ ${total.toFixed(2)}`;

  const categoryTotals ={
    food: 0,
    bills: 0,
    transportation: 0,
    utilities: 0,
    other: 0,
  };
  categorylist.forEach(function (category) { 
    categoryTotals[category] = 0; 
  });
  for (let i = 0; i < expenses.amount.length; i++) {
    const category = expenses.category[i];
    categoryTotals[category] += expenses.amount[i];
  }
  for (let category in categoryTotals) {
    const categoryTotal = categoryTotals[category];
    // console.log(categoryTotal);
    if (categoryTotal > 0) {
      const id = `#${category}-expense`;  
      // console.log(id);
      document.querySelector(id).textContent = `₹ ${categoryTotal.toFixed(2)}`;
    }
  }
}

const addExpense = function (expenseName, amount, expenseDate, category) {
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${expenseName}</td>
    <td>₹ ${amount.toFixed(2)}</td>
    <td>${expenseDate}</td>
    <td>${category}</td>
    <td><button class="dlt">Delete</button></td>
    <td><button class="edit">Edit</button></td>
  `;
  
  expenseTableBody.appendChild(newRow);
};

const checkFormInputs = function (expenseName, amount, expenseDate, category) {
  let isValid = true;

  if (!expenseName || !amount || isNaN(amount) || parseFloat(amount) <= 0 || !expenseDate || category === "") {
    isValid = false;
  }
  return isValid;
};

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const expenseName = expenseNameInput.value;
  const amount = parseFloat(amountInput.value);
  const expenseDate = expenseDateInput.value;
  const category = categoryInput.value;

  if (checkFormInputs(expenseName, amount, expenseDate, category)) {
    addExpense(expenseName, amount, expenseDate, category);
    expenses.expenseName.push(expenseName);
    expenses.amount.push(amount);
    expenses.expenseDate.push(expenseDate);
    expenses.category.push(category);
    updateLocalStorage();
    updateTotalExpenses();
  } else {
    alert("Invalid input");
  }
});

expenseTableBody.addEventListener('click', function (event) {
  if (event.target.classList.contains('dlt')) {
    const row = event.target.closest('tr');
    const expenseName = row.children[0].textContent;
    const amount = parseFloat(row.children[1].textContent.slice(2));
    const expenseDate = row.children[2].textContent;
    const category = row.children[3].textContent;
    const index = expenses.expenseName.indexOf(expenseName);

    expenses.expenseName.splice(index, 1);
    expenses.amount.splice(index, 1);
    expenses.expenseDate.splice(index, 1);
    expenses.category.splice(index, 1);

    row.remove();
    updateLocalStorage();
    updateTotalExpenses();
  }

  if (event.target.classList.contains('edit')) {
    const row = event.target.closest('tr');
    const expenseName = row.children[0].textContent;
    const amount = parseFloat(row.children[1].textContent.slice(2));
    const expenseDate = row.children[2].textContent;
    const category = row.children[3].textContent;
    const index = expenses.expenseName.indexOf(expenseName);
    expenseNameInput.value = expenseName;
    amountInput.value = amount;
    expenseDateInput.value = expenseDate;
    categoryInput.value = category;
    openpopup();

    form.onsubmit = function (event) {
      event.preventDefault();

      const updatedExpenseName = expenseNameInput.value;
      const updatedAmount = parseFloat(amountInput.value);
      const updatedExpenseDate = expenseDateInput.value;
      const updatedCategory = categoryInput.value;

      if (checkFormInputs(updatedExpenseName, updatedAmount, updatedExpenseDate, updatedCategory)) {
        expenses.expenseName[index] = updatedExpenseName;
        expenses.amount[index] = updatedAmount;
        expenses.expenseDate[index] = updatedExpenseDate;
        expenses.category[index] = updatedCategory;

        row.children[0].textContent = updatedExpenseName;
        row.children[1].textContent = `₹ ${updatedAmount.toFixed(2)}`;
        row.children[2].textContent = updatedExpenseDate;
        row.children[3].textContent = updatedCategory;

        closepopup();
        const i = expenses.amount.length -1 ;
        expenses.expenseName.splice(i, 1);
        expenses.amount.splice(i, 1);
        expenses.expenseDate.splice(i, 1);
        expenses.category.splice(i, 1);
        updateLocalStorage();
        updateTotalExpenses();
        expenseTableBody.innerHTML = '';
        for(let i = 0; i < expenses.amount.length; i++) {
          addExpense(expenses.expenseName[i], expenses.amount[i], expenses.expenseDate[i], expenses.category[i]);
        }

      }
    };
  }
});

form.addEventListener('reset', function () {
  updateTotalExpenses();
});

// updateTotalExpenses();

for (let i = 0; i < expenses.amount.length; i++) {
  addExpense(expenses.expenseName[i], expenses.amount[i], expenses.expenseDate[i], expenses.category[i]);
}

const openpopup = function () {
  form.reset();
  popup.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closepopup = function () {
  popup.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenPopup.addEventListener("click", openpopup);
btnClosePopup.addEventListener("click", closepopup);
overlay.addEventListener("click", closepopup);
btnExpense.addEventListener("click", closepopup);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !popup.classList.contains("hidden")) {
    closepopup();
  }
});

const openCategory = function () {
  category.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeCategory = function () {
  category.classList.add("hidden");
  overlay.classList.add("hidden");
};

overlay.addEventListener("click", closeCategory);
document.querySelector(".btn-close").addEventListener("click", closeCategory);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !category.classList.contains("hidden")) {
    closeCategory();
  }
});



const categorytable = function (box) {
  openCategory();
  categoryTbody.innerHTML = '';
  if (expenses.category.includes(box.children[0].textContent.toLowerCase())) {
    for (let j = 0; j < expenses.amount.length; j++) {
      if (expenses.category[j] === box.children[0].textContent.toLowerCase()) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td>${expenses.expenseName[j]}</td>
          <td>₹ ${expenses.amount[j].toFixed(2)}</td>
          <td>${expenses.expenseDate[j]}</td>
          <td>${expenses.category[j]}</td>
        `;
        categoryTbody.appendChild(newRow);
      }
    }
  } else {
    const newRow = document.createElement('tr');
    categoryhead.classList.add('hidden');
    newRow.innerHTML = `<td>No expenses found</td>`;
    categoryTbody.appendChild(newRow);
  }
};

// ////// add category


addCategory.addEventListener('click', function () {
  const newCategory = categoryIp.value.toLowerCase();
  if (!categorylist.includes(newCategory) && newCategory !== '') {
    categorylist.push(newCategory);
    var boxDiv = document.createElement('div');
    boxDiv.classList.add('box');

    var pElement = document.createElement('p');
    pElement.textContent = categoryIp.value;

    var expenseDiv = document.createElement('div');
    expenseDiv.id = `${categoryIp.value.toLowerCase()}-expense`;
    console.log(expenseDiv.id);
    expenseDiv.textContent = '₹ 0.00';

    boxDiv.appendChild(pElement);
    boxDiv.appendChild(expenseDiv);

    analysis.appendChild(boxDiv);

    var liElement = document.createElement('li');
    var aElement = document.createElement('a');
    aElement.href = '#'; 
    aElement.classList.add('category');  
    aElement.textContent = categoryIp.value; 
    liElement.appendChild(aElement);
    document.querySelector('.sub-menu').appendChild(liElement);


    
    var optionElement = document.createElement('option');
    optionElement.value = categoryIp.value.toLowerCase();
    optionElement.textContent = categoryIp.value; 

    var selectElement = document.getElementById('category');
    selectElement.appendChild(optionElement);  
    updateLocalStorage();
    updateTotalExpenses();

  }
  else {
    alert('Category already exists');
  }
  
  closeCategory2();
});

updateLocalStorage();
const addCategory1 = function () { 
  for (let i = 0; i < categorylist.length; i++) {
    const boxDiv = document.createElement('div');
    boxDiv.classList.add('box');

    const pElement = document.createElement('p');
    pElement.textContent = categorylist[i];

    const expenseDiv = document.createElement('div');
    expenseDiv.id = `${categorylist[i]}-expense`;
    expenseDiv.textContent = '₹ 0.00';

    boxDiv.appendChild(pElement);
    boxDiv.appendChild(expenseDiv);

    analysis.appendChild(boxDiv);

    const liElement = document.createElement('li');
    const aElement = document.createElement('a');
    aElement.href = '#';
    aElement.classList.add('category');
    aElement.textContent = categorylist[i];
    liElement.appendChild(aElement);
    document.querySelector('.sub-menu').appendChild(liElement);

    const optionElement = document.createElement('option');
    optionElement.value = categorylist[i];
    optionElement.textContent = categorylist[i];

    const selectElement = document.getElementById('category');
    selectElement.appendChild(optionElement);
  }
  updateLocalStorage();
  updateTotalExpenses();
}
// updateTotalExpenses();
addCategory1();

const addCategory2 = document.querySelector('.add-category');
const addcategorypopup = document.querySelector('.addcategorypopup');
addCategory2.addEventListener('click', function () {
  openCategory2();
});
const closeCategory1 = document.querySelector('.close');
closeCategory1.addEventListener('click', function () {
  closeCategory2();
});
// const overlay = document.querySelector('.overlay');
overlay.addEventListener('click', function () {
  closeCategory2();
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !category.classList.contains('hidden')) {
    closeCategory2();
  }
});
const closeCategory2 = function () { 
  addcategorypopup.classList.add('hidden');
  overlay.classList.add('hidden');
}
const openCategory2 = function () {
  addcategorypopup.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

const box = document.querySelectorAll('.box');
const box1 = document.querySelectorAll('.category');
const categoryhead = document.querySelector('.category-thead');

for (let i = 0; i < box.length; i++) {
  box[i].addEventListener('click', function () {
    categorytable(box[i]);
  });
  box1[i].addEventListener('click', function () {
    categorytable(box[i]);
  });
}