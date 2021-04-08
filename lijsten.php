<?php
include 'loginHeader.php';
include 'sidebar.php';
require "loginRequired.php";
?>

<main class="main-sidebar">
    <h1 id='paginaType'>Lijsten</h1>
    <?php
    require "includes/dbh.inc.php";

    $sql = "SELECT * FROM woordjes WHERE userId=? ORDER BY woordenLijstId ASC";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)) {
        header("Location: /?error=sqlerror");
        exit();
    } else {
        mysqli_stmt_bind_param($stmt, "i", $_SESSION['userId']);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        if(mysqli_num_rows($result) > 0) {
            ?>

            
            <div class="searchDiv">
                <input id="woordenLijstZoekenInput">
                <button id="woordenLijstZoekenButton">Zoeken</button>
                <p id="searchError"></p>
            </div>
            <div class="lijstenDiv">
            <?php
            while($lijst = mysqli_fetch_assoc($result)) {
    ?>

        <div>
            <p class="hidden lijstId"><?php echo $lijst['woordenLijstId']?></p>
            <p><?php echo 'Naam: ' . $lijst['woordenLijstNaam'] ?></p>
            <p><?php echo 'Aantal woorden: ' . $lijst['woordenAantal'] ?></p>
            <button class="bewerkButton">Bewerken</button>
            <button class="bekijkButton">Bekijken</button>
            <button class="verwijderWoordenlijstButton">Verwijderen</button>
        </div>

    <?php
            }

            ?>
            </div>
            <?php
        } else {
            ?>
            <p>Geen lijsten gevonden, klik <a href="lijst-editor.php">hier</a> om er een aan te maken</p>
            <?php
        }
    }
    ?>
</main>

<?php
include 'defaultFooter.php';
?>