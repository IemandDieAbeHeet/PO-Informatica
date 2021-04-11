<?php
include 'defaultHeader.php';
include 'sidebar.php';
require "loginRequired.php";

require "includes/dbh.inc.php";

if(!empty($_GET['woordenLijst'])) {
    $sql = "SELECT * FROM woordjes WHERE woordenLijstId=? ORDER BY woordenLijstId ASC";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)) {
        header("Location: ../?error=sqlerror");
        exit();
    } else {
        mysqli_stmt_bind_param($stmt, "i", $_GET['woordenLijst']);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $resultId = mysqli_fetch_assoc($result)['userId'];
        if($resultId != $_SESSION['userId']) {
            header("Location: lijst.php?woordenLijst=" . $_GET['woordenLijst']);
        }
    }
}
?>
<main class="main-sidebar">
    <h1 id='paginaType'>Lijst-editor</h1>
    <div class="wrapper">
        <div id="woordenEditorDiv" class='outerBox'>
            <div class='box' id="editorNaamTaalDiv">
                <input id="lijstEditorNaam" placeholder="Naam woordenlijst">
                <div id='editorTaalSelectie'>
                    <select name="taal1" id="taal1">
                        <option value="Nederlands">Nederlands</option>
                        <option value="Duits">Duits</option>
                    </select>
                    <select name="taal2" id="taal2">
                        <option value="Duits">Duits</option>
                        <option value="Nederlands">Nederlands</option>
                    </select>
                </div>
            </div>
            <div class='box' id="woordenTotaal">
                <div class="woordenDiv">
                    <p id="woordnummer">1</p>
                    <input class="woord" id="woord1" name="woord1" placeholder="Woord" type="text" value="">
                    <input class="woord" id="woord2" name="woord2" placeholder="Woord vertaling" type="text" value="">
                    <button>X</button>
                </div>
            </div>
            <div id='editorButtonsDiv'>
                <div>
                    <input type="number" id="hoeveelheid" name="hoeveelheid" value="1" min="1" max="100">
                    <button onclick="woordenToevoegen()">Voeg woorden toe</button>
                    <button id="woordenSubmit">Klaar</button>
                </div>
                <p style='margin:15px'>Of</p>
                <div>
                    <input id="bestandInput" type="file" style="display:none;">
                    <button id="bestandButton">Importeer woordenlijst</button>
                </div>
                <p id="response"></p>
            </div>
        </div>
    </div>
</main>
<?php
include 'defaultFooter.php';
?>