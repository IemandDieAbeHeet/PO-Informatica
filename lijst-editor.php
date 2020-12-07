<?php
include 'header.php';

require "includes/dbh.inc.php";

$sql = "SELECT * FROM woordjes WHERE woordenLijstId=? ORDER BY woordenLijstId ASC";
$stmt = mysqli_stmt_init($conn);
if(!mysqli_stmt_prepare($stmt, $sql)) {
    header("Location: ../index.php?error=sqlerror");
    exit();
} else {
    mysqli_stmt_bind_param($stmt, "i", $_GET['woordenLijst']);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $resultId = mysqli_fetch_assoc($result)['userId'];
    if($resultId != $_SESSION['userId']) {
        header("Location: lijst?woordenLijst=" . $_GET['woordenLijst']);
    }
}
?>
<html>
    <body>
        <main>
        <div class="wrapper">
            <form id="woordenForm">
                <input name="lijstNaam" id="lijstNaam" placeholder="Naam woordenlijst" type="text" value="">
                <div>
                    <select name="taal1" id="taal1">
                        <option value="Nederlands">Nederlands</option>
                        <option value="Engels">Engels</option>
                    </select>
                    <select name="taal2" id="taal2">
                        <option value="Nederlands">Nederlands</option>
                        <option value="Engels">Engels</option>
                    </select>
                </div>
                <div id="woordentotaal">
                    <div class="woordendiv">
                        <p id="woordnummer">1</p>
                        <input class="woord" id="woord1" name="woord1" placeholder="Woord" type="text" value="">
                        <input class="woord" id="woord2" name="woord2" placeholder="Woord vertaling" type="text" value="">
                    </div>
                </div>
                <div>
                    <input type="number" id="hoeveelheid" name="hoeveelheid" min="1" max="100">
                    <input type="button" value="Voeg woorden toe" onclick="woordenToevoegen()">
                    <input type="submit" id="woordenSubmit" name="woordenSubmit" value="Klaar">
                </div>
                <p id="response"></p>
            </form>
        </div>
        </main>
    </body>
</html>
<?php
include 'footer.php';
?>