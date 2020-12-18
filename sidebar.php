<div class="sidebar">
    <div>
        <button type="button" class="lijstMakenButton">Lijst maken</button>
    </div>
    <nav>
        <a href="lijsten">Lijsten</a>
        <a href="klassen">Klassen</a>
        <?php
        if(isset($_SESSION['klasId'])) {
        ?>
        <a href="klas">Mijn klas</a>
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