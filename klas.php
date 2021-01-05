<?php
include 'loginHeader.php';
include 'sidebar.php';
require "loginRequired.php";
?>

<main class="main-sidebar">
    <div>
        <?php
        require "includes/dbh.inc.php";

        $sql = "SELECT klasNaam FROM klassen WHERE klasId=?";

        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)) {
            header("Location: /?error=sqlerror");
            exit();
        } else {
            mysqli_stmt_bind_param($stmt, "i", $_GET['klasId']);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            $klasNaam = mysqli_fetch_assoc($result)['klasNaam'];
        ?>
        <h1><?php echo $klasNaam?></h1>
        <?php
            }
        ?>
    </div>
    <div class="leerlingenDiv">
        <?php
        require "includes/dbh.inc.php";

        $sql = "SELECT t1.* FROM users AS t1 JOIN klassen AS t2 ON t1.klasId = t2.klasId WHERE t1.klasId=? ORDER BY userVolledigenaam ASC";

        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)) {
            header("Location: /?error=sqlerror");
            exit();
        } else {
            mysqli_stmt_bind_param($stmt, "i", $_GET['klasId']);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            if(mysqli_num_rows($result) > 0) {

                ?>
                <p>Leerlingen:</p>
                <?php
                while($leerling = mysqli_fetch_assoc($result)) {
        ?>
                <div class="leerlingDiv <?php if($leerling['userId'] == $_SESSION['userId']) { echo('self'); } ?>">
                    <p><?php echo $leerling['userVolledigenaam'] ?></p><p> - </p><p class="leerlingScore"><?php echo $leerling['userScore'] ?></p>
                </div>

        <?php
                }
            } else {
                ?>
                    <p>Er zitten nog geen leerlingen in deze klas.</p>
                <?php
            }
        }
        ?>
    </div>
    <br>
    <div class="klasDiv">
        <?php
        require "includes/dbh.inc.php";

        $sql = "SELECT * FROM klassen WHERE klasId=?";

        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)) {
            header("Location: /?error=sqlerror");
            exit();
        } else {
            mysqli_stmt_bind_param($stmt, "i", $_GET['klasId']);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            if(mysqli_num_rows($result) > 0) {
                while($klas = mysqli_fetch_assoc($result)) {
        ?>
                <div class="klassenScoreDiv"><p>Klassenscore: </p><p id="klasScore"><?php echo $klas['klasScore'] ?></p></div>
                <p>Docent: <?php echo $klas['klasDocentNaam'] ?></p>
                
                <?php
                if($_SESSION['userType'] === "Leraar") {
                ?>
                <div class="itemSelection">
                    <button id="selectionPreviousItem"><</button>
                    <div class="itemSelect">
                        <p id="selectItemId" class="hidden">0</p>
                        <p id="selectItemType" class="hidden">Hoed</p>
                        <p id="selectItemUnlocked" class="hidden">true</p>
                        <p id="selectItemName">Hoed</p>
                        <img id="selectItemImg" src="img/character/hoed/hoed0.png">
                    </div>
                    <div class="itemSelect">
                        <p id="selectItemId" class="hidden">1</p>
                        <p id="selectItemType" class="hidden">Hoed</p>
                        <p id="selectItemUnlocked" class="hidden">true</p>
                        <p id="selectItemName">Hoed</p>
                        <img id="selectItemImg" src="img/character/hoed/hoed0.png">
                    </div>
                    <div class="itemSelect">
                        <p id="selectItemId" class="hidden">2</p>
                        <p id="selectItemType" class="hidden">Hoed</p>
                        <p id="selectItemUnlocked" class="hidden">true</p>
                        <p id="selectItemName">Hoed</p>
                        <img id="selectItemImg" src="img/character/hoed/hoed0.png">
                    </div>
                    <div class="itemSelect">
                        <p id="selectItemId" class="hidden">3</p>
                        <p id="selectItemType" class="hidden">Hoed</p>
                        <p id="selectItemUnlocked" class="hidden">true</p>
                        <p id="selectItemName">Hoed</p>
                        <img id="selectItemImg" src="img/character/hoed/hoed0.png">
                    </div>
                    <button id="selectionNextItem">></button>
                </div>
                <?php
                }
                ?>

                <div class="character">
                <?php
                if($_SESSION['userType'] === "Leraar") {
                ?>
                    <div draggable='false' id='delete'></div>
                <?php
                }
                ?>
                </div>

                <?php
                if($_SESSION['userType'] === "Leerling") {
                ?>
                <div class="shop">
                    <button id="shopPreviousItem"><</button>
                    <div class="shopItem">
                        <p id="itemId"></p>
                        <img id="itemImg" src="img/character/hoed/hoed0.png">
                        <p id="itemPrice">50 punten</p>
                        <button id="itemUnlockButton">Ontgrendelen</button>
                    </div>
                    <button id="shopNextItem">></button>
                </div>
                <?php
                }
                ?>

                <button id="characterResetButton">Reset</button>
                <?php
                if($_SESSION['userType'] === "Leraar") {
                ?>
                <button id="characterOpslaanButton">Opslaan</button>
                <?php
                }
                ?>

                <p id="response"></p>
        <?php
                }
            }
        }
        ?>
    </div>
</main>

<?php
include 'defaultFooter.php';
?>