

class Transaction {
  constructor(income, description, price, category, date) {
    this.id = Date.now() + Math.random();
    this.income = income;
    this.price = price;
    this.category = category;
    this.date = date;
    this.description = description;
  }
}

let expenses = [];
let currIncome = 0;
let totalprice = 0;
let categoryExpense = [];
document.getElementById("breakDown").appendChild(document.createElement('h2')).innerHTML = `<h2 class="text-xl font-semibold text-gray-900">BreakDown</h2>`;




document.getElementById("transactionForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const loader = document.getElementById("loader");
  const income = parseFloat(document.getElementById("income").value);
  const description = document.getElementById("description").value;
  const price = parseFloat(document.getElementById("price").value);
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  if (isNaN(income) || income < 0) {
    document.getElementById("incomeError").textContent = "Please enter a valid income price.";
    return;
  }
  document.getElementById("incomeError").textContent = "";
  currIncome += income;

  if (isNaN(price) || price <= 0 || currIncome - price < 0) {
    document.getElementById("priceError").textContent = "Please enter a valid expense price.";
    return;
  }
  document.getElementById("priceError").textContent = "";
  if (category === "select") {
    document.getElementById("categoryError").textContent = "Please select a valid category.";
    return;
  }
  document.getElementById("categoryError").textContent = "";

  //Loader Hidden
  loader.classList.remove("hidden");

  //After 2 seconds loader goes off
  setTimeout(() => {
    loader.classList.add("hidden");
  },2000); 

  totalprice += price;
  currIncome -= price;
  document.getElementById("income").value = '';
  document.getElementById("description").value = '';
  document.getElementById("price").value = '';
  document.getElementById("category").value = 'select';
  document.getElementById("date").value = '';
  document.getElementById("expensetxt").innerHTML = `${totalprice.toFixed(2)}`;
  document.getElementById("incometxt").innerHTML = `${currIncome.toFixed(2)}`;
  const transaction = new Transaction(income, description, price, category, date);
  expenses.push(transaction);
  categoryExpense.push({ id: transaction.id, category: transaction.category, price: transaction.price });
  updateDashboard(expenses);


});


const updateDashboard = (expenseArray) => {
  if (!expenseArray) {
    expenseArray = expenses;
  }

  document.querySelector('tbody').innerHTML = '';
  expenseArray.forEach((expense, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      
              <td class="px-6 py-4 border-b border-gray-200 text-sm text-gray-900">
                ${expense.description}
              </td>
              <td class="px-6 py-4 border-b border-gray-200 text-sm text-gray-900">
                ${expense.category}
              </td>
              <td class="px-6 py-4 border-b border-gray-200 text-sm text-gray-900">
                ${expense.date}
              </td>
              <td class="px-6 py-4 border-b border-gray-200 text-sm text-red-600">
                -₹${expense.price.toFixed(2)}
              </td>
              <td class="px-6 py-4 border-b border-gray-200 text-sm text-green-600">
                +₹${expense.income.toFixed(2)}
              </td>
              <td class="px-6 py-4 border-b border-gray-200 text-sm text-red-600">
                <button onclick="deleteById(${expense.id})" class="cursor-pointer text-white bg-red-500 px-4 py-2 rounded-lg hover:text-red-800">
                  Delete
                </button>
              </td>
            
    `;
    document.querySelector('tbody').appendChild(row);
  });
  // This is for category-wise calculation
  let categoryTotals = calculateCategoryTotals();
  //This is for turing object into array of objects
  let categoryTotalsArray = calculateCategoryArray(categoryTotals);
  document.getElementById("breakDown").innerHTML = ``;
  document.getElementById("breakDown").appendChild(document.createElement('h2')).innerHTML = `<h2 class="text-xl font-semibold text-gray-900">BreakDown</h2>`;
  categoryTotalsArray.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="flex justify-between my-2 mx-9">
        <span class="text-bolder text-lg">${item.category}</span>
        <span class="">₹${item.total.toFixed(2)}</span>
      </div>
    `;
    document.getElementById("breakDown").appendChild(div);
  });


}

const deleteById = (id) => {
  const index = expenses.findIndex(expense => expense.id === id);
  if (index !== -1) {
    const deletedExpense = expenses[index];
    currIncome += deletedExpense.price;
    totalprice -= deletedExpense.price;
    expenses.splice(index, 1);
    categoryExpense.splice(index, 1);
    updateDashboard(expenses);
  }
}

document.getElementById("filterChange").addEventListener("change", (e) => {
  if (e.target.value === "date") {
    const sortedByDate = [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date));
    updateDashboard(sortedByDate);
  } else if (e.target.value === "amount") {
    const sortedByAmount = [...expenses].sort((a, b) => a.price - b.price);
    updateDashboard(sortedByAmount);
  } else {
    updateDashboard(expenses);
  }
});

function calculateCategoryTotals() {
  const categoryTotals = categoryExpense.reduce((acc, item) => {
  const { category, price } = item;
  acc[category] = (acc[category] || 0) + price;
  return acc;
}, {});
  return categoryTotals;
}
function calculateCategoryArray(categoryTotals) {
let categoryTotalsArray = Object.entries(categoryTotals).map(
    ([category, total]) => ({ category, total })
  );
  return categoryTotalsArray;
}

