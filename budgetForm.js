let budgetArray = [
        { name: "เงินค่าขนม", amount: 1000, date: "2026-03-01", type: "รายรับ" },
        { name: "ค่าอาหาร", amount: 80, date: "2026-03-01", type: "รายจ่าย" },

];

const budgetForm = document.getElementById("budgetform");
const incomeList = document.getElementById("incomeList");
const expenseList = document.getElementById("expenseList");




budgetForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#item").value;
    const amount = document.querySelector("#amount").value;
    const date = document.querySelector("#date").value;
    const type = document.querySelector("#select").value;

    if (Number(amount) <= 0) {
        alert("กรุณากรอกจำนวนเงินที่มากกว่า 0");
        return;
    }

    const budgetData = {
        name: name,
        amount: Number(amount),
        date: date,
        type: type
    };

    budgetArray.push(budgetData);
    console.log("Form submitted");
    renderTransactions();
    updateSummary();
    budgetForm.reset();
});
const deleteAllBtn = document.getElementById("deleteAllBtn");

deleteAllBtn.addEventListener("click", function () {
    budgetArray.length = 0;

    renderTransactions();
    updateSummary();
});

function renderTransactions() {
    const transactions = budgetArray;

    incomeList.innerHTML = "";
    expenseList.innerHTML = "";

    transactions.forEach(function (transaction, index) {
        const listItem = document.createElement("li");
        listItem.textContent = `${transaction.date} - ${transaction.name}: ${transaction.amount} บาท `;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "ลบ";
        deleteBtn.style.marginLeft = "10px";

        deleteBtn.addEventListener("click", function () {
            deleteTransaction(index);
        });
        
        listItem.appendChild(deleteBtn);

        if (transaction.type === "รายรับ") {
            listItem.style.color = "green";
            incomeList.appendChild(listItem);
        } else if (transaction.type === "รายจ่าย") {
            listItem.style.color = "red";
            expenseList.appendChild(listItem);
        }
    });
}

function deleteTransaction(index) {
    budgetArray.splice(index, 1);
    renderTransactions();
    updateSummary();
}

function updateSummary() {
    const totalIncome = budgetArray
        .filter(transaction => transaction.type === "รายรับ")
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const totalExpense = budgetArray
        .filter(transaction => transaction.type === "รายจ่าย")
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const balance = totalIncome - totalExpense;

    const totalIncomeEl = document.getElementById("totalIncome");
    const totalExpenseEl = document.getElementById("totalExpense");
    const totalBalanceEl = document.getElementById("totalBalance");

    if (totalIncomeEl) totalIncomeEl.textContent = `ยอดรวมรายรับ: ${totalIncome} บาท`;
    if (totalExpenseEl) totalExpenseEl.textContent = `ยอดรวมรายจ่าย: ${totalExpense} บาท`;
    if (totalBalanceEl) totalBalanceEl.textContent = `ยอดคงเหลือ: ${balance} บาท`;
}


