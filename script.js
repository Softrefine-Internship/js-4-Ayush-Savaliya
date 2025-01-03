// write javascript here

const popup = document.querySelector(".addexpense");
    const overlay = document.querySelector(".overlay");
    const btnClosePopup = document.querySelector(".close-popup");
const btnsOpenPopup = document.querySelector(".show-popup");
    const btnExpense = document.querySelector(".btn--expense");

    const openpopup = function () {
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


btnExpense.addEventListener("click", function () {
  // alert("Expense added successfully");  
  closepopup(); 
});
    
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !popup.classList.contains("hidden")) {
    closepopup();
  }
});
    

// /////////////////////////////////////////////////////////////////  

let expenses = {
  expenseName: ["abc", "def", "ghi", "jkl", "mno", "pqr", "stu", "vwx", "yz"],
  amount: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  expenseDate: ['01-01-2021', '02-02-2021',' 03-03-2021', '04-04-2021', '05-05-2021', '06-06-2021', '07-07-2021', '08-08-2021', '09-09-2021'],
  category: ['food', 'bills', 'transportation', 'utilities', 'other', 'food', 'bills', 'transportation', 'utilities'],
};

const form = document.getElementById('form');
const expenseNameInput = document.getElementById('expense-name');
const amountInput = document.getElementById('amount');
const expenseDateInput = document.getElementById('expense-date');
const categoryInput = document.getElementById('category');
const totalExpenseElem = document.getElementById('total-expense');
const expenseTableBody = document.querySelector('.expense-tbody');
const categoryExpense = {
  food: document.querySelector('#food-expense'),
  bills: document.querySelector('#bills-expense'),
  transportation: document.querySelector('#transportation-expense'),
  utilities: document.querySelector('#utilities-expense'),
  other: document.querySelector('#other-expense'),
};
 
function updateTotalExpenses() {
  let total = 0;
  for (let i = 0; i < expenses.amount.length; i++) {
    total += expenses.amount[i]; 
  }
  totalExpenseElem.textContent = `₹ ${total.toFixed(2)}`;

  const categoryTotals = {
    food: 0,
    bills: 0,
    transportation: 0,
    utilities: 0,
    other: 0,
  };

  for (let i = 0; i < expenses.amount.length; i++) {
    const category = expenses.category[i];
    // console.log(expenses.category[i]);
    // console.log(categoryTotals[category]);
    categoryTotals[category] += expenses.amount[i];
  }

  for (let category in categoryTotals) {
    const categoryTotal = categoryTotals[category];

    if (categoryExpense[category]) {
      categoryExpense[category].textContent = `₹ ${categoryTotal.toFixed(2)}`;
    }
  }
  

}

const addExpense = function (expenseName, amount, expenseDate, category) { 
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td >${expenseName}</td>
    <td>₹ ${amount.toFixed(2)}</td>
    <td>${expenseDate}</td>
    <td>${category}</td>
    <td><button class="dlt btn--delete btn">Delete</button></td>
  `;
  
  expenseTableBody.appendChild(newRow);
}

form.addEventListener('submit', function (event) {
  event.preventDefault(); 

  const expenseName = expenseNameInput.value;
  const amount = parseFloat(amountInput.value);
  const expenseDate = expenseDateInput.value;
  const category = categoryInput.value;

  expenses.expenseName.push(expenseName);
  expenses.amount.push(amount);
  expenses.expenseDate.push(expenseDate);
  expenses.category.push(category);

  addExpense(expenseName, amount, expenseDate, category);
  

  form.reset();
  updateTotalExpenses();
});

expenseTableBody.addEventListener('click', function (event) {
  if (event.target.classList.contains('btn--delete')) {
    const row = event.target.parentElement.parentElement;
    const index = Array.from(row.parentElement.children).indexOf(row);

    row.remove();
    expenses.expenseName.splice(index, 1);
    expenses.amount.splice(index, 1);
    expenses.expenseDate.splice(index, 1);
    expenses.category.splice(index, 1);

    updateTotalExpenses();
  }
});

form.addEventListener('reset', function () {
  updateTotalExpenses();
});

updateTotalExpenses();
for(let i = 0; i < expenses.amount.length; i++) {
  addExpense(expenses.expenseName[i], expenses.amount[i], expenses.expenseDate[i], expenses.category[i]);
}

// /////////////////////////////////////////////////////////////////

