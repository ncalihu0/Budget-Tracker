// a class allows us to encapsulate our data and create our objects 
class BudgetTracker {
    // creates our blueprint and allow us to put our elements that are grabbed by the this
    constructor() {
        // select elements using this. this is binding our elements to what we declaring them to. our clase we binding it to the selected elements in out html

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

        //variables that handles our array of objects, balance, income, and expenses
        this.entryList = [];
        this.balance = 0;
        this.income = 0;
        this.expenses = 0;


        // grabs our buttons and gives it an even listener. when clicked it executes a function
        this.addIncome.addEventListener("click", () => this.handleAddIncome());
        this.addExpense.addEventListener("click", () => this.handleAddExpense());



    }

    // handles the button add income. 
    handleAddIncome() {
        // if the value of our input title or the input amount is nothing, it doesn't run the code because of our return statement
        if (!this.incomeTitle.value || !this.incomeAmount.value) return;
        // we declare an object which holds our income. our income has key valus of the type, title, and amount
        const income = {
            type: "income",
            title: this.incomeTitle.value,
            amount: parseFloat(this.incomeAmount.value),
        };

        // we have 3 different methods we created 
        //first one pushes our income object onto our empty array
        this.entryList.push(income);
        //method that updates our UI. more info down below
        this.updateUI();
        // method so the input fields clear and show as empty
        this.clearInput([this.incomeTitle, this.incomeAmount]);
    }

    //same with the income, but this handles our expenses when clicked 
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

    //method to update the UI
    updateUI() {
        //takes our variables and give them functions to evaluate the total
        this.income = this.calculateTotal("income", this.entryList);
        this.expenses = this.calculateTotal("expense", this.entryList);
        this.balance = Math.abs(this.calculateBalance(this.income, this.expenses));


        //determine the sign of the balance

        let sign = (this.income >= this.expenses) ? "$" : "-$";

        //Updates the UI
        this.balanceTotal.innerHTML = `${sign} ${this.balance}`;
        this.expensesTotal.innerHTML = `$ ${this.expenses}`;
        this.incomeTotal.innerHTML = `$ ${this.income}`;

        // allows us to not have duplicates of out list show up
        this.clearElement([this.expensesList, this.incomeList]);

        // what ends up showing up, depending on the type of entry is shows on our html due to our method
        this.entryList.forEach((entry, index) => {
            if (entry.type === "income") {
                this.showEntry(this.incomeList, entry.type, entry.title, entry.amount, index)
            } else if (entry.type === "expense") {
                this.showEntry(this.expensesList, entry.type, entry.title, entry.amount, index)
            }

        })
    }


    // in our entry, we manipulate our html to showcase a list with what the user has input
    showEntry(list, type, title, amount, id) {
        this.entry = ` <li id = "${id}" class="${type}">
                        <div class="entry">${title}: $${amount}</div>
                        </li>`;
        // afterbegin is when we have one entry, the nest entry goes below that entry
        this.position = "afterbegin";
        list.insertAdjacentHTML(this.position, this.entry);
    }

    // the elements selected will be cleared based on the parameters
    clearElement(elements) {
        elements.forEach(element => {
            element.innerHTML = "";
        })
    }

    // we calculate out total for either the income or the expenses. we create a variable and based on the entry it only takes the same entries and add those together. Then in our method above we set it equal either to income or expenses varibles we declared
    calculateTotal(type, list) {
        this.sum = 0;
        list.forEach(entry => {
            if (entry.type == type) {
                this.sum += entry.amount
            }
        })
        return this.sum;
    }

    // makes it so our input box doesn't show what was typed
    clearInput(elements) {
        elements.forEach(element => {
            element.value = "";
        });
    }

    // our balance is based on the income minus the expenses
    calculateBalance(income, expenses) {
        return income - expenses;
    }

}


// intantiating our object or creating an instance of a class 
const budget = new BudgetTracker();

//CODE BEFORE IT WAS IN A CLASS
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














