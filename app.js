// Veritabanı yerine localStorage kullanacağız
let incomeTransactions =
  JSON.parse(localStorage.getItem("incomeTransactions")) || [];
let expenseTransactions =
  JSON.parse(localStorage.getItem("expenseTransactions")) || [];

// DOM elemanları
const incomeTable = document
  .getElementById("income-table")
  .getElementsByTagName("tbody")[0];
const expenseTable = document
  .getElementById("expense-table")
  .getElementsByTagName("tbody")[0];
const totalIncomeElement = document.getElementById("total-income");
const totalExpenseElement = document.getElementById("total-expense");
const totalElement = document.getElementById("total");

// Sayfa yüklendiğinde verileri göster
window.onload = () => {
  renderIncomeTransactions();
  renderExpenseTransactions();
  calculateTotal();
};

// Gelir Ekleme Fonksiyonu
function addIncome() {
  const description = document.getElementById("income-description").value;
  const amount = parseFloat(document.getElementById("income-amount").value);

  if (!description || isNaN(amount)) {
    alert("Lütfen geçerli bir açıklama ve tutar girin.");
    return;
  }

  const transaction = {
    description: description,
    amount: amount,
  };

  incomeTransactions.push(transaction);
  localStorage.setItem(
    "incomeTransactions",
    JSON.stringify(incomeTransactions)
  );

  renderIncomeTransactions();
  calculateTotal();

  document.getElementById("income-description").value = "";
  document.getElementById("income-amount").value = "";
}

// Gider Ekleme Fonksiyonu
function addExpense() {
  const description = document.getElementById("expense-description").value;
  const amount = parseFloat(document.getElementById("expense-amount").value);

  if (!description || isNaN(amount)) {
    alert("Lütfen geçerli bir açıklama ve tutar girin.");
    return;
  }

  const transaction = {
    description: description,
    amount: amount,
  };

  expenseTransactions.push(transaction);
  localStorage.setItem(
    "expenseTransactions",
    JSON.stringify(expenseTransactions)
  );

  renderExpenseTransactions();
  calculateTotal();

  document.getElementById("expense-description").value = "";
  document.getElementById("expense-amount").value = "";
}

// Gelirleri Listeleme
function renderIncomeTransactions() {
  incomeTable.innerHTML = "";
  incomeTransactions.forEach((transaction, index) => {
    const row = incomeTable.insertRow();
    row.insertCell(0).textContent = transaction.description;
    row.insertCell(1).textContent = transaction.amount.toFixed(2) + " ₺";
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Sil";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = () => deleteIncomeTransaction(index);
    row.insertCell(2).appendChild(deleteButton);
  });
}

// Giderleri Listeleme
function renderExpenseTransactions() {
  expenseTable.innerHTML = "";
  expenseTransactions.forEach((transaction, index) => {
    const row = expenseTable.insertRow();
    row.insertCell(0).textContent = transaction.description;
    row.insertCell(1).textContent = transaction.amount.toFixed(2) + " ₺";
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Sil";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = () => deleteExpenseTransaction(index);
    row.insertCell(2).appendChild(deleteButton);
  });
}

// Toplam hesaplama
function calculateTotal() {
  let income = 0;
  let expense = 0;

  incomeTransactions.forEach((transaction) => (income += transaction.amount));
  expenseTransactions.forEach((transaction) => (expense += transaction.amount));

  totalIncomeElement.textContent = income.toFixed(2) + " ₺";
  totalExpenseElement.textContent = expense.toFixed(2) + " ₺";
  totalElement.textContent = (income - expense).toFixed(2) + " ₺";
}

// Gelir Silme
function deleteIncomeTransaction(index) {
  incomeTransactions.splice(index, 1);
  localStorage.setItem(
    "incomeTransactions",
    JSON.stringify(incomeTransactions)
  );
  renderIncomeTransactions();
  calculateTotal();
}

// Gider Silme
function deleteExpenseTransaction(index) {
  expenseTransactions.splice(index, 1);
  localStorage.setItem(
    "expenseTransactions",
    JSON.stringify(expenseTransactions)
  );
  renderExpenseTransactions();
  calculateTotal();
}

// Grafik

// Varsayılan Gelir ve Gider Verileri
let incomeData = [];
let expenseData = [];

// Gelir Ekleme Fonksiyonu
function addIncome() {
  const description = document.getElementById("income-description").value;
  const amount = parseFloat(document.getElementById("income-amount").value);

  if (description && amount) {
    const row = incomeTable.insertRow();
    row.innerHTML = `
            <td>${description}</td>
            <td>${amount} ₺</td>
            <td><button class="delete-btn" onclick="deleteIncome(this)">Sil</button></td>
        `;

    incomeData.push(amount);
    updateChart();
    updateTotal();
  }
}

// Gider Ekleme Fonksiyonu
function addExpense() {
  const description = document.getElementById("expense-description").value;
  const amount = parseFloat(document.getElementById("expense-amount").value);

  if (description && amount) {
    const row = expenseTable.insertRow();
    row.innerHTML = `
            <td>${description}</td>
            <td>${amount} ₺</td>
            <td><button class="delete-btn" onclick="deleteExpense(this)">Sil</button></td>
        `;

    expenseData.push(amount);
    updateChart();
    updateTotal();
  }
}

// Gelir Silme Fonksiyonu
function deleteIncome(button) {
  const row = button.closest("tr");
  const amount = parseFloat(row.cells[1].textContent);
  incomeData = incomeData.filter((item) => item !== amount);
  row.remove();
  updateChart();
  updateTotal();
}

// Gider Silme Fonksiyonu
function deleteExpense(button) {
  const row = button.closest("tr");
  const amount = parseFloat(row.cells[1].textContent);
  expenseData = expenseData.filter((item) => item !== amount);
  row.remove();
  updateChart();
  updateTotal();
}

// Grafik Güncelleme Fonksiyonu
// Grafik Güncelleme Fonksiyonu
// Grafik Güncelleme Fonksiyonu
// Grafik Güncelleme Fonksiyonu
// Flag to track if the chart is initialized
let isChartInitialized = false;

// Grafik Güncelleme Fonksiyonu
function updateChart() {
  const ctx = document.getElementById("financeChart").getContext("2d");

  // If a chart already exists, destroy it
  if (isChartInitialized) {
    console.log("Destroying existing chart...");
    window.financeChart.destroy(); // Destroy the previous chart if it exists
  }

  // Create a new chart
  window.financeChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Gelir", "Gider"],
      datasets: [
        {
          label: "Gelir ve Gider",
          data: [
            incomeData.reduce((a, b) => a + b, 0),
            expenseData.reduce((a, b) => a + b, 0),
          ],
          backgroundColor: ["#4CAF50", "#f44336"],
          borderColor: ["#388E3C", "#D32F2F"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // Mark the chart as initialized
  isChartInitialized = true;
}

// Sayfa yüklendiğinde verileri göster
window.onload = () => {
  renderIncomeTransactions();
  renderExpenseTransactions();
  calculateTotal();
  updateChart(); // Initialize the chart on page load
};

// Toplam Gelir ve Gideri Güncelleme Fonksiyonu
function updateTotal() {
  const totalIncome = incomeData.reduce((a, b) => a + b, 0);
  const totalExpense = expenseData.reduce((a, b) => a + b, 0);
  const total = totalIncome - totalExpense;

  document.getElementById("total-income").textContent = `${totalIncome} ₺`;
  document.getElementById("total-expense").textContent = `${totalExpense} ₺`;
  document.getElementById("total").textContent = `${total} ₺`;
}

// Before destroying or creating the chart, log the current state of window.financeChart
console.log(window.financeChart);

if (window.financeChart instanceof Chart) {
  window.financeChart.destroy();
} else {
  console.log("No chart found to destroy.");
}
