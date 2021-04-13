<?php
include 'loginHeader.php';
include 'sidebar.php';
require "loginRequired.php";
?>

<main class="main-sidebar">
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
        $klas = mysqli_fetch_assoc($result);
        $klasNaam = $klas['klasNaam'];
    ?>
    <h1 id='paginaType'><?php echo $klasNaam?></h1>
    <?php
        }
    ?>
    <div id='totaalKlasDiv'>
        <div class='outerBox' id="klasDiv">
            <div class='box' id='klasScoreDocentInformatie'>
                <p id="klasScore">Klassenscore: <?php echo $klas['klasScore'] ?></p>
                <p id="klasDocent">Docent: <?php echo $klas['klasDocentNaam'] ?></p>
            </div>
            <div class='box' id='klasLeerlingenTotaalDiv'>
                <p>Leerlingen:</p>
                <div id='klasLeerlingenDiv'>
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
                    $leerlingResult = mysqli_stmt_get_result($stmt);
                    $index = 1;
                    if(mysqli_num_rows($leerlingResult) > 0) {
                        while($leerling = mysqli_fetch_assoc($leerlingResult)) {
                        ?>
                        <div class="box leerlingDiv <?php if($leerling['userId'] == $_SESSION['userId']) { echo('self'); } ?>">
                            <p><?php echo $index ?>. <?php echo $leerling['userVolledigenaam'] ?></p><p>&nbsp;-&nbsp;</p><p class="leerlingScore"><?php echo $leerling['userScore'] ?></p>
                        </div>
                    <?php
                            $index++;
                        }
                    } else {
                    ?>
                        <p>Er zitten nog geen leerlingen in deze klas.</p>
                    <?php
                    }
                }
                ?>
                </div>
            </div>
        </div>
        <div class='outerBox' id="poppetjeTotaalDiv">
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

                <div class="box" id='poppetjeDiv'>
                    <div class="character">
                    <?php
                    if($_SESSION['userType'] === "Leraar") {
                    ?>
                        <div draggable='false' id='delete'></div>
                    <?php
                    }
                    ?>
                    </div>

                    <div id='poppetjeButtonsDiv'>
                        <button id="characterResetButton">Reset</button>
                        <?php
                        if($_SESSION['userType'] === "Leraar") {
                        ?>
                        <button id="characterOpslaanButton">Opslaan</button>
                        <?php
                        }
                        ?>
                        <p id="response"></p>
                    </div>
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
            </div>
    </div>
</main>

<?php
include 'defaultFooter.php';
?>