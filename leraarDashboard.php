<?php

include 'loginHeader.php';
include 'sidebar.php';

if($_SESSION["userType"] != "Leraar") {
    header('Location: lijsten');
}

?>

<main class="main-sidebar">
    <div id="klassenLijst">
        <ul>
            
        </ul>
    </div>
    <button id="addKlasOpenButton">Klas toevoegen</button>
    <div id="addKlasDiv">
        <form id="addKlasForm">
            <input type="text" id="klasNaam" name="klasNaam" placeholder="Naam">
            <select name="klasNiveau" id="klasNiveau">
                <option value="VWO">VWO</option>
                <option value="HAVO">HAVO</option>
            </select>
            <input type="text" id="klasJaar" name="klasJaar" placeholder="Jaar">
            <input type="submit" name="addKlasSubmit" value="Toevoegen">
        </form>
        <button id="addKlasCollapseButton">X</button>
    </div>
</main>

<?php

include 'defaultFooter.php';

?>