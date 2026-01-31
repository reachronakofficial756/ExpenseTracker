class Transaction {
  constructor(income, description, amount, category, date) {
    this.income = income;
    this.amount = amount;
    this.category = category;
    this.date = date;
    this.description = description;
  }
}

let expenses = [];  

function addTransaction(event) {
  event.preventDefault();   
    const income = Number(document.querySelector('input[name="income"]').value);
    const description = document.querySelector('input[placeholder="Enter your description"]').value;
    const amount = Number(document.querySelector('input[placeholder="0.00"]').value);
    const category = document.getElementById("type").value;
    const date = document.querySelector('input[type="date"]').value;
    console.log(income, description, amount, category, date);    

    

    const transaction = new Transaction(income, description, amount, category, date);
    expenses.push(transaction);

    updateExpenseDisplay();
}
