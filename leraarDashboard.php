<?php

include 'loginHeader.php';
include 'sidebar.php';

if($_SESSION["userType"] != "Leraar") {
    header('Location: lijsten.php');
}

?>

<main class="main-sidebar">
    <h1 id="paginaType">Dashboard</h1>
    <div class='outerBox' id='leraarDashboardKlassen'>
        <div class='box' id="leraarDashboardKlassenLijst">
            <ul>
                
            </ul>
        </div>
        <div class='box'>
            <div id="addKlasDiv">
                <div id="addKlasInputs">
                    <input type="text" id="klasNaam" name="klasNaam" placeholder="Naam">
                    <select name="klasNiveau" id="klasNiveau">
                        <option value="VWO">VWO</option>
                        <option value="HAVO">HAVO</option>
                    </select>
                    <input type="number" id="klasJaar" name="klasJaar" placeholder="Jaar" min='1' max='6'>
                </div>
                <button id="addKlasSubmit">Toevoegen</button>
                <p style='display:none;' id='response'></p>
            </div>
        </div>
    </div>
</main>

<?php

include 'defaultFooter.php';

?>