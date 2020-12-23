<div class="sidebar">
    <div>
        <button type="button" class="lijstMakenButton">Lijst maken</button>
    </div>
    <nav>
        <a href="lijsten">Lijsten</a>
        <a href="klassen">Klassen</a>
        <?php
        if(isset($_SESSION['klasId']) && $_SESSION['userType'] != "Leraar") {
        ?>
        <a href="klas?klasId=<?php echo $_SESSION['klasId'] ?>">Mijn klas</a>
        <?php
        }
        ?>
        <?php
        if($_SESSION['userType'] === "Leraar") {
        ?>
        <a href="leraarDashboard">Dashboard</a>
        <?php
        }
        ?>
    </nav>
</div>