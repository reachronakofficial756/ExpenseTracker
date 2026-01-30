class Transaction {
  constructor(type, amount, category, date, description) {
    this.type = type; 
    this.amount = amount;
    this.category = category;
    this.date = date;
    this.description = description;
  }
}

class ExpenseTracker {
  constructor() {
    this.transactions = [];
  }
}  

