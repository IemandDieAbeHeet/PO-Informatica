<div class="sidebar">
    <div>
        <button type="button" class="lijstMakenButton">Lijst maken</button>
    </div>
    <nav>
        <a href="lijsten.php">Lijsten</a>
        <a href="klassen.php">Klassen</a>
        <?php
        if(isset($_SESSION['klasId']) && $_SESSION['userType'] != "Leraar") {
        ?>
        <a href="klas.php?klasId=<?php echo $_SESSION['klasId'] ?>">Mijn klas</a>
        <?php
        }
        ?>
        <?php
        if($_SESSION['userType'] === "Leraar") {
        ?>
        <a href="leraarDashboard.php">Dashboard</a>
        <?php
        }
        ?>
    </nav>
</div>