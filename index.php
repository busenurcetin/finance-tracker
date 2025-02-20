<?php
session_start();

// Eğer gelir ve giderler daha önce kaydedildiyse, onları alalım
$incomes = isset($_SESSION['incomes']) ? $_SESSION['incomes'] : [];
$expenses = isset($_SESSION['expenses']) ? $_SESSION['expenses'] : [];
$totalIncome = 0;
$totalExpense = 0;
$total = 0;

// Gelir ve gider ekleme işlemi
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Gelir Ekleme
    if (isset($_POST['submit-income'])) {
        if (!empty($_POST['income-description']) && !empty($_POST['income-amount'])) {
            $incomeDescription = $_POST['income-description'];
            $incomeAmount = $_POST['income-amount'];
            $incomes[] = ['description' => $incomeDescription, 'amount' => $incomeAmount];
            $_SESSION['incomes'] = $incomes;
        }
    }

    // Gider Ekleme
    if (isset($_POST['submit-expense'])) {
        if (!empty($_POST['expense-description']) && !empty($_POST['expense-amount'])) {
            $expenseDescription = $_POST['expense-description'];
            $expenseAmount = $_POST['expense-amount'];
            $expenses[] = ['description' => $expenseDescription, 'amount' => $expenseAmount];
            $_SESSION['expenses'] = $expenses;
        }
    }

    // Toplam gelir ve gider hesaplaması
    foreach ($incomes as $income) {
        $totalIncome += $income['amount'];
    }
    foreach ($expenses as $expense) {
        $totalExpense += $expense['amount'];
    }

    $total = $totalIncome - $totalExpense;
}
?>





<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Finans Takip Uygulaması</title>
    <link rel="stylesheet" href="style.css">
    <!-- Chart.js kütüphanesini dahil ediyoruz -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>

<body>
    <div class="container">
        <h1>Finans Takip Uygulaması</h1>

        <!-- Gelir ve Gider Ekleme Formları -->
        <div class="input-sections">
            <!-- Gelir Ekleme Formu -->
            <div class="input-section">
                <h2>Gelir Ekle 📈</h2>
                <form method="POST" action="">
                    <input type="text" name="income-description" placeholder="Gelir Açıklaması" required />
                    <input type="number" name="income-amount" placeholder="Gelir Tutarı" required />
                    <button class="income-btn" type="submit" name="submit-income">Gelir Ekle</button>
                </form>
            </div>

            <!-- Gider -->
            <div class="input-section">
                <h2>Gider Ekle 📉</h2>
                <form method="POST" action="">
                    <input type="text" name="expense-description" placeholder="Gider Açıklaması" required />
                    <input type="number" name="expense-amount" placeholder="Gider Tutarı" required />
                    <button class="expense-btn" type="submit" name="submit-expense">Gider Ekle</button>
                </form>
            </div>
        </div>

        <!-- Gelir Tablosu -->
        <h3 class="incomes">Gelirler</h3>
        <table id="income-table">
            <thead>
                <tr>
                    <th>Açıklama</th>
                    <th>Tutar</th>
                    <th>Sil</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($incomes as $index => $income): ?>
                    <tr>
                        <td><?php echo $income['description']; ?></td>
                        <td><?php echo $income['amount']; ?> ₺</td>
                        <td><a href="?delete-income=<?php echo $index; ?>" class="delete-btn">🗑️</a></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>

        <!-- Gider Tablosu -->
        <h3 class="expenses">Giderler</h3>
        <table id="expense-table">
            <thead>
                <tr>
                    <th>Açıklama</th>
                    <th>Tutar</th>
                    <th>Sil</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($expenses as $index => $expense): ?>
                    <tr>
                        <td><?php echo $expense['description']; ?></td>
                        <td><?php echo $expense['amount']; ?> ₺</td>
                        <td><a href="?delete-expense=<?php echo $index; ?>" class="delete-btn">🗑️</a></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>

        <!-- Sonuç Tablosu -->
        <h3 class="result">Sonuç</h3>
        <table id="result-table">
            <thead>
                <tr>
                    <th>Toplam Gelir</th>
                    <th>Toplam Gider</th>
                    <th>Net Toplam</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><?php echo $totalIncome; ?> ₺</td>
                    <td><?php echo $totalExpense; ?> ₺</td>
                    <td><?php echo $total; ?> ₺</td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Grafik Alanı -->
    <h3 class="financeHeader">Gelir ve Gider Grafik</h3>
    <canvas id="financeChart" width="400" height="200"></canvas>

    <script>
        const ctx = document.getElementById('financeChart').getContext('2d');
        const financeChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Gelir', 'Gider'],
                datasets: [{
                    label: 'Gelir ve Gider',
                    data: [<?php echo $totalIncome; ?>, <?php echo $totalExpense; ?>],
                    backgroundColor: ['#FF9800', '#FFB74D'],
                    borderColor: ['#FF9800', '#FFB74D'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    </script>

</body>

</html>