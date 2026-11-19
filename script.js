
let expenseChart = null;
let total = 0;


// ==============================
// ADD EXPENSE
// ==============================

function addExpense() {

    let expenseName =
        document.getElementById("expenseName").value;

    let amount =
        Number(document.getElementById("amount").value);

    let category =
        document.getElementById("category").value;

    let date =
        document.getElementById("date").value;


    if (expenseName === "" || amount <= 0 || date === "") {

        alert("Please fill all the details");
        return;
    }


    createExpense(
        expenseName,
        amount,
        category,
        date
    );


    // Clear form
    document.getElementById("expenseName").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("category").selectedIndex = 0;
    document.getElementById("date").value = "";
}


// ==============================
// CREATE EXPENSE
// ==============================

function createExpense(
    expenseName,
    amount,
    category,
    date
) {

    let expenseList =
        document.getElementById("expenseList");


    let newExpense =
        document.createElement("li");


    newExpense.innerHTML = `

        <div class="expense-info">

            <div class="expense-icon">
                ${getCategoryIcon(category)}
            </div>

            <div>

                <strong>${expenseName}</strong>

                <p>${category} • ${date}</p>

            </div>

        </div>


        <div class="expense-right">

            <strong>₹${amount}</strong>

            <button onclick="editExpense(this)">
                Edit
            </button>

            <button onclick="deleteExpense(this)">
                Delete
            </button>

        </div>

    `;


    expenseList.appendChild(newExpense);

    // Save first so Monthly Overview gets latest data
    saveExpenses();

    // Then update everything
    updateAll();
}


// ==============================
// CATEGORY ICON
// ==============================

function getCategoryIcon(category) {

    if (category === "Food") {
        return "🍔";
    }

    if (category === "Transport") {
        return "🚌";
    }

    if (category === "Education") {
        return "📚";
    }

    if (category === "Entertainment") {
        return "🎮";
    }

    return "💰";
}


// ==============================
// EDIT EXPENSE
// ==============================

function editExpense(button) {

    let expenseCard =
        button.closest("li");


    let oldAmount =
        Number(
            expenseCard
                .querySelector(".expense-right strong")
                .innerText
                .replace("₹", "")
        );


    let newAmount =
        prompt(
            "Enter new amount:",
            oldAmount
        );


    if (
        newAmount === null ||
        newAmount === "" ||
        Number(newAmount) <= 0
    ) {

        return;
    }


    newAmount =
        Number(newAmount);


    expenseCard
        .querySelector(".expense-right strong")
        .innerText =
        "₹" + newAmount;


    // Save first
    saveExpenses();

    // Then update everything
    updateAll();
}


// ==============================
// DELETE EXPENSE
// ==============================

function deleteExpense(button) {

    let expenseCard =
        button.closest("li");


    expenseCard.remove();


    // Save first
    saveExpenses();

    // Then update everything
    updateAll();
}


// ==============================
// UPDATE EVERYTHING
// ==============================

function updateAll() {

    calculateTotal();

    updateExpenseCount();

    updateTodayTotal();

    updateBreakdown();

    updateChart();

    updateBudget();

    updateInsight();

    updateMonthlySummary();

    updateEmptyState();
}


// ==============================
// CALCULATE TOTAL
// ==============================

function calculateTotal() {

    total = 0;


    let expenses =
        document.getElementById("expenseList").children;


    for (let expense of expenses) {

        let amount =
            Number(
                expense
                    .querySelector(".expense-right strong")
                    .innerText
                    .replace("₹", "")
            );


        total =
            total + amount;
    }


    document.getElementById("total").innerText =
        total;
}


// ==============================
// EXPENSE COUNT
// ==============================

function updateExpenseCount() {

    let count =
        document.getElementById("expenseList")
        .children.length;


    document.getElementById("expenseCount")
        .innerText = count;
}


// ==============================
// TODAY'S TOTAL
// ==============================

function updateTodayTotal() {

    let today =
        new Date()
            .toISOString()
            .split("T")[0];


    let todayTotal = 0;


    let expenses =
        document.getElementById("expenseList").children;


    for (let expense of expenses) {

        let dateText =
            expense
                .querySelector(".expense-info p")
                .innerText;


        let date =
            dateText.split(" • ")[1];


        if (date === today) {

            let amount =
                Number(
                    expense
                        .querySelector(".expense-right strong")
                        .innerText
                        .replace("₹", "")
                );


            todayTotal =
                todayTotal + amount;
        }
    }


    document.getElementById("todayTotal")
        .innerText = todayTotal;
}


// ==============================
// SPENDING BREAKDOWN
// ==============================

function updateBreakdown() {

    let food = 0;
    let transport = 0;
    let education = 0;
    let entertainment = 0;
    let other = 0;


    let expenses =
        document.getElementById("expenseList").children;


    for (let expense of expenses) {

        let text =
            expense
                .querySelector(".expense-info p")
                .innerText;


        let category =
            text.split(" • ")[0];


        let amount =
            Number(
                expense
                    .querySelector(".expense-right strong")
                    .innerText
                    .replace("₹", "")
            );


        if (category === "Food") {

            food += amount;

        } else if (category === "Transport") {

            transport += amount;

        } else if (category === "Education") {

            education += amount;

        } else if (category === "Entertainment") {

            entertainment += amount;

        } else {

            other += amount;
        }
    }


    document.getElementById("foodTotal")
        .innerText = "₹" + food;


    document.getElementById("transportTotal")
        .innerText = "₹" + transport;


    document.getElementById("educationTotal")
        .innerText = "₹" + education;


    document.getElementById("entertainmentTotal")
        .innerText = "₹" + entertainment;


    document.getElementById("otherTotal")
        .innerText = "₹" + other;
}


// ==============================
// CHART
// ==============================

function updateChart() {

    let food = 0;
    let transport = 0;
    let education = 0;
    let entertainment = 0;
    let other = 0;


    let expenses =
        document.getElementById("expenseList").children;


    for (let expense of expenses) {

        let text =
            expense
                .querySelector(".expense-info p")
                .innerText;


        let category =
            text.split(" • ")[0];


        let amount =
            Number(
                expense
                    .querySelector(".expense-right strong")
                    .innerText
                    .replace("₹", "")
            );


        if (category === "Food") {

            food += amount;

        } else if (category === "Transport") {

            transport += amount;

        } else if (category === "Education") {

            education += amount;

        } else if (category === "Entertainment") {

            entertainment += amount;

        } else {

            other += amount;
        }
    }


    let ctx =
        document.getElementById("expenseChart");


    if (!ctx || typeof Chart === "undefined") {
        return;
    }


    if (expenseChart) {
        expenseChart.destroy();
    }


    expenseChart =
        new Chart(ctx, {

            type: "doughnut",

            data: {

                labels: [
                    "Food",
                    "Transport",
                    "Education",
                    "Entertainment",
                    "Other"
                ],

                datasets: [{

                    data: [
                        food,
                        transport,
                        education,
                        entertainment,
                        other
                    ]

                }]
            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        position: "bottom"
                    }

                }

            }

        });
}


// ==============================
// SAVE EXPENSES
// ==============================

function saveExpenses() {

    let expenses = [];


    let expenseCards =
        document.getElementById("expenseList").children;


    for (let expense of expenseCards) {

        let name =
            expense
                .querySelector(".expense-info strong")
                .innerText;


        let text =
            expense
                .querySelector(".expense-info p")
                .innerText;


        let parts =
            text.split(" • ");


        let category =
            parts[0];


        let date =
            parts[1];


        let amount =
            Number(
                expense
                    .querySelector(".expense-right strong")
                    .innerText
                    .replace("₹", "")
            );


        expenses.push({

            name: name,

            amount: amount,

            category: category,

            date: date

        });
    }


    localStorage.setItem(
        "studentExpenses",
        JSON.stringify(expenses)
    );
}


// ==============================
// LOAD EXPENSES
// ==============================

function loadExpenses() {

    let savedExpenses =
        localStorage.getItem("studentExpenses");


    if (!savedExpenses) {
        return;
    }


    let expenses =
        JSON.parse(savedExpenses);


    for (let expense of expenses) {

        createExpenseWithoutSaving(
            expense.name,
            expense.amount,
            expense.category,
            expense.date
        );
    }


    updateAll();
}


// ==============================
// CREATE SAVED EXPENSE
// ==============================

function createExpenseWithoutSaving(
    expenseName,
    amount,
    category,
    date
) {

    let expenseList =
        document.getElementById("expenseList");


    let newExpense =
        document.createElement("li");


    newExpense.innerHTML = `

        <div class="expense-info">

            <div class="expense-icon">
                ${getCategoryIcon(category)}
            </div>

            <div>

                <strong>${expenseName}</strong>

                <p>${category} • ${date}</p>

            </div>

        </div>


        <div class="expense-right">

            <strong>₹${amount}</strong>

            <button onclick="editExpense(this)">
                Edit
            </button>

            <button onclick="deleteExpense(this)">
                Delete
            </button>

        </div>

    `;


    expenseList.appendChild(newExpense);
}


// ==============================
// SEARCH & FILTER
// ==============================

function filterExpenses() {

    let searchText =
        document
            .getElementById("searchExpense")
            .value
            .toLowerCase();


    let selectedCategory =
        document
            .getElementById("filterCategory")
            .value;


    let expenses =
        document
            .getElementById("expenseList")
            .children;


    for (let expense of expenses) {

        let expenseText =
            expense.innerText.toLowerCase();


        let categoryMatch =
            selectedCategory === "All" ||
            expenseText.includes(
                selectedCategory.toLowerCase()
            );


        let searchMatch =
            expenseText.includes(searchText);


        if (
            categoryMatch &&
            searchMatch
        ) {

            expense.style.display = "flex";

        } else {

            expense.style.display = "none";
        }
    }
}


// ==============================
// LOAD DATA WHEN PAGE OPENS
// ==============================

window.onload = function () {

    loadExpenses();

};


// ==============================
// BUDGET
// ==============================

function setBudget() {

    let budget = prompt(
        "Enter your monthly budget:"
    );


    if (
        budget === null ||
        budget === "" ||
        Number(budget) <= 0
    ) {

        return;
    }


    budget = Number(budget);

    localStorage.setItem(
        "monthlyBudget",
        budget
    );


    updateBudget();

    updateMonthlySummary();
}


function updateBudget() {

    let budget =
        Number(
            localStorage.getItem("monthlyBudget")
        ) || 0;


    document.getElementById("budgetAmount")
        .innerText = budget;


    let remaining =
        budget - total;


    document.getElementById("remainingBudget")
        .innerText = remaining;
}


// ==============================
// SMART INSIGHTS
// ==============================

function updateInsight() {

    let categories = {

        Food: 0,
        Transport: 0,
        Education: 0,
        Entertainment: 0,
        Other: 0

    };


    let expenses =
        document.getElementById("expenseList").children;


    if (expenses.length === 0) {

        document.getElementById("insightMessage").innerText =
            "💡 Add some expenses to see your spending insights.";

        return;
    }


    for (let expense of expenses) {

        let text =
            expense.querySelector(".expense-info p").innerText;


        let category =
            text.split(" • ")[0];


        let amount =
            Number(
                expense
                    .querySelector(".expense-right strong")
                    .innerText
                    .replace("₹", "")
            );


        if (categories[category] !== undefined) {
            categories[category] += amount;
        }
    }


    let highestCategory = "Food";
    let highestAmount = categories.Food;


    for (let category in categories) {

        if (categories[category] > highestAmount) {

            highestCategory = category;
            highestAmount = categories[category];
        }
    }


    document.getElementById("insightMessage").innerText =
        "💡 You spend the most on " +
        highestCategory +
        " — ₹" +
        highestAmount +
        ".";
}


// ==============================
// EMPTY STATE
// ==============================

function updateEmptyState() {

    let expenseList =
        document.getElementById("expenseList");


    let emptyState =
        document.getElementById("emptyState");


    if (expenseList.children.length === 0) {

        emptyState.style.display = "block";

    } else {

        emptyState.style.display = "none";
    }
}


// ==============================
// MONTHLY SUMMARY
// ==============================

function updateMonthlySummary() {

    let expenses =
        JSON.parse(
            localStorage.getItem("studentExpenses")
        ) || [];


    let monthlyTotal = 0;

    let monthlyCount =
        expenses.length;


    let categoryTotals = {

        Food: 0,
        Transport: 0,
        Education: 0,
        Entertainment: 0,
        Other: 0

    };


    expenses.forEach(expense => {

        let amount =
            Number(expense.amount) || 0;


        monthlyTotal += amount;


        if (
            categoryTotals[expense.category]
            !== undefined
        ) {

            categoryTotals[expense.category] += amount;
        }

    });


    let topCategory = "None";

    let highestAmount = 0;


    for (let category in categoryTotals) {

        if (
            categoryTotals[category]
            > highestAmount
        ) {

            highestAmount =
                categoryTotals[category];

            topCategory =
                category;
        }
    }


    let budget =
        Number(
            localStorage.getItem("monthlyBudget")
        ) || 0;


    let remaining =
        budget - monthlyTotal;


    document.getElementById("monthlyTotal")
        .textContent =
        "₹" + monthlyTotal;


    document.getElementById("monthlyCount")
        .textContent =
        monthlyCount;


    document.getElementById("monthlyCategory")
        .textContent =
        topCategory;


    document.getElementById("monthlyRemaining")
        .textContent =
        "₹" + remaining;
}
