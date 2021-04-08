<div class="sidebar">
    <div id="sidebarLogoDiv">
        <img id="sidebarLogoImg" src="img/Logo.png">
    </div>
    <nav>
        <button type="button" class="lijstMakenButton">Lijst maken</button>
        <button onclick="window.location.href='lijsten.php'">Lijsten</button>
        <button onclick="window.location.href='klassen.php'">Klassen</button>
        <?php
        if(isset($_SESSION['klasId']) && $_SESSION['userType'] != "Leraar") {
        ?>
        <button onclick="window.location.href='leraarDashboard.php?klasId=<?php echo $_SESSION['klasId'] ?>'">Mijn klas</button>
        <?php
        }
        ?>
        <?php
        if($_SESSION['userType'] === "Leraar") {
        ?>
        <button onclick="window.location.href='leraarDashboard.php'">Dashboard</button>
        <?php
        }
        ?>
        <button id="logoutButton" onclick="window.location.href='includes/logout.inc.php'">Uitloggen</button>
    </nav>
</div>