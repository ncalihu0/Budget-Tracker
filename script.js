class BudgetTracker {
    constructor() {
        // select elements

        this.balanceTotal = document.querySelector(".balance_total");
        this.incomeTotal = document.querySelector(".income_total");
        this.expensesTotal = document.querySelector(".expenses_total");
        this.tabIncome = document.getElementById("#income");
        this.tabExpense = document.getElementById("#expenses");

        this.incomeList = document.querySelector("#income .list");
        this.expensesList = document.querySelector("#expenses .list");



        //Select input buttons 
        this.addIncome = document.querySelector(".add-income")
        this.incomeTitle = document.getElementById("income_title_input")
        this.incomeAmount = document.getElementById("income_amount_input")

        this.addExpense = document.querySelector(".add-expense")
        this.expenseTitle = document.getElementById("expenses_title_input")
        this.expenseAmount = document.getElementById("expenses_amount_input")

        //variables
        this.entryList = [];
        this.balance = 0;
        this.income = 0;
        this.expenses = 0;

        this.addIncome.addEventListener("click", () => this.handleAddIncome());
        this.addExpense.addEventListener("click", () => this.handleAddExpense());



    }

    handleAddIncome() {
        if (!this.incomeTitle.value || !this.incomeAmount.value) return;

        const income = {
            type: "income",
            title: this.incomeTitle.value,
            amount: parseFloat(this.incomeAmount.value),
        };

        this.entryList.push(income);
        this.updateUI();
        this.clearInput([this.incomeTitle, this.incomeAmount]);
    }

    handleAddExpense() {
        if (!this.expenseTitle.value || !this.expenseAmount.value) return;

        const expense = {
            type: "expense",
            title: this.expenseTitle.value,
            amount: parseFloat(this.expenseAmount.value),
        };

        this.entryList.push(expense);
        this.updateUI();
        this.clearInput([this.expenseTitle, this.expenseAmount]);
    }


    updateUI() {
        this.income = this.calculateTotal("income", this.entryList);
        this.expenses = this.calculateTotal("expense", this.entryList);
        this.balance = Math.abs(this.calculateBalance(this.income, this.expenses));


        //determine the sign of the balance

        let sign = (this.income >= this.expenses) ? "$" : "-$";

        //Updates the UI
        this.balanceTotal.innerHTML = `${sign} ${this.balance}`;
        this.expensesTotal.innerHTML = `$ ${this.expenses}`;
        this.incomeTotal.innerHTML = `$ ${this.income}`;

        this.clearElement([this.expensesList, this.incomeList]);

        this.entryList.forEach((entry, index) => {
            if (entry.type === "income") {
                this.showEntry(this.incomeList, entry.type, entry.title, entry.amount, index)
            } else if (entry.type === "expense") {
                this.showEntry(this.expensesList, entry.type, entry.title, entry.amount, index)
            }

        })
    }

    showEntry(list, type, title, amount, id) {
        this.entry = ` <li id = "${id}" class="${type}">
                        <div class="entry">${title}: $${amount}</div>
                        </li>`;

        this.position = "afterbegin";
        list.insertAdjacentHTML(this.position, this.entry);
    }

    clearElement(elements) {
        elements.forEach(element => {
            element.innerHTML = "";
        })
    }

    calculateTotal(type, list) {
        this.sum = 0;
        list.forEach(entry => {
            if (entry.type == type) {
                this.sum += entry.amount
            }
        })
        return this.sum;
    }

    clearInput(elements) {
        elements.forEach(element => {
            element.value = "";
        });
    }

    calculateBalance(income, expenses) {
        return income - expenses;
    }

}

const budget = new BudgetTracker();

// // select elements

// const balanceTotal = document.querySelector(".balance_total");
// const incomeTotal = document.querySelector(".income_total");
// const expensesTotal = document.querySelector(".expenses_total");
// const tabIncome = document.getElementById("#income");
// const tabExpense = document.getElementById("#expenses");

// const incomeList = document.querySelector("#income .list");
// const expensesList = document.querySelector("#expenses .list");



// //Select input buttons 
// const addIncome = document.querySelector(".add-income")
// const incomeTitle = document.getElementById("income_title_input")
// const incomeAmount = document.getElementById("income_amount_input")

// const addExpense = document.querySelector(".add-expense")
// const expenseTitle = document.getElementById("expenses_title_input")
// const expenseAmount = document.getElementById("expenses_amount_input")

// //variables 
// let entryList = [];
// let balance = 0, income = 0, expenses = 0;


// addIncome.addEventListener("click", function () {
//     // check if inputs are empty
//     if (!incomeTitle.value || !incomeAmount.value) return;

//     let expense = {
//         type: "income",
//         title: incomeTitle.value,
//         amount: parseFloat(incomeAmount.value)
//     }

//     entryList.push(expense);

//     updateUI();
//     clearInput([incomeTitle, incomeAmount]);
// })

// addExpense.addEventListener("click", function () {
//     // check if inputs are empty
//     if (!expenseTitle.value || !expenseAmount.value) return;

//     let expense = {
//         type: "expense",
//         title: expenseTitle.value,
//         amount: parseFloat(expenseAmount.value)
//     }

//     entryList.push(expense);

//     updateUI();
//     clearInput([expenseTitle, expenseAmount]);
// })

// function updateUI() {
//     income = calculateTotal("income", entryList);
//     expenses = calculateTotal("expense", entryList);
//     balance = Math.abs(calculateBalance(income, expenses));


//     //determine the sign of the balance

//     let sign = (income >= expenses) ? "$" : "-$";

//     //Updates the UI
//     balanceTotal.innerHTML = `${sign} ${balance}`;
//     expensesTotal.innerHTML = `$ ${expenses}`;
//     incomeTotal.innerHTML = `$ ${income}`;

//     clearElement([expensesList, incomeList]);

//     entryList.forEach((entry, index) => {
//         if (entry.type === "income") {
//             showEntry(incomeList, entry.type, entry.title, entry.amount, index)
//         } else if (entry.type === "expense") {
//             showEntry(expensesList, entry.type, entry.title, entry.amount, index)
//         }

//     })
// }

// function showEntry(list, type, title, amount, id) {
//     const entry = ` <li id = "${id}" class="${type}">
//                     <div class="entry">${title}: $${amount}</div>
//                     </li>`;

//     const position = "afterbegin";
//     list.insertAdjacentHTML(position, entry);
// }

// function clearElement(elements) {
//     elements.forEach(element => {
//         element.innerHTML = "";
//     })
// }

// function calculateTotal(type, list) {
//     let sum = 0;
//     list.forEach(entry => {
//         if (entry.type == type) {
//             sum += entry.amount
//         }
//     })
//     return sum;
// }

// function clearInput(elements) {
//     elements.forEach(element => {
//         element.value = "";
//     });
// }

// function calculateBalance(income, expenses) {
//     return income - expenses;
// }














