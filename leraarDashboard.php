<?php

include 'loginHeader.php';
include 'sidebar.php';

if($_SESSION["userType"] != "Leraar") {
    header('Location: lijsten.php');
}

?>

<main class="main-sidebar">
    <h1 id="paginaType">Dashboard</h1>
    <div id='leraarDashboardKlassen'>
        <div id="klassenLijst">
            <ul>
                
            </ul>
        </div>
        <button id="addKlasOpenButton">Klas toevoegen</button>
        <div id="addKlasDiv">
            <input type="text" id="klasNaam" name="klasNaam" placeholder="Naam">
            <select name="klasNiveau" id="klasNiveau">
                <option value="VWO">VWO</option>
                <option value="HAVO">HAVO</option>
            </select>
            <input type="number" id="klasJaar" name="klasJaar" placeholder="Jaar" min='1' max='6'>
            <button id="addKlasSubmit">Toevoegen</button>
            <button id="addKlasCollapseButton">X</button>
            <p style='display:none;' id='response'></p>
        </div>
    </div>
</main>

<?php

include 'defaultFooter.php';

?>