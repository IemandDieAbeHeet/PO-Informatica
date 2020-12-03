<?php
include 'header.php';
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
                    <select name="taal2" id="taal1">
                        <option value="Nederlands">Nederlands</option>
                        <option value="Engels">Engels</option>
                    </select>
                </div>
                <div id="woordentotaal">
                    <div id="woordendiv">
                        <input class="woord" id="woord1" name="woord1" placeholder="Woord" type="text" value="">
                        <input class="woord" id="woord2" name="woord2" placeholder="Woord vertaling" type="text" value="">
                    </div>
                </div>
                <input type="number" id="hoeveelheid" name="hoeveelheid" min="1" max="100">
                <input type="button" value="Voeg woorden toe" onclick="woordenToevoegen()">
                <input type="submit" value="Klaar">
                <p id="error"></p>
            </form>
        </div>
        </main>
    </body>
</html>
<?php
include 'footer.php';
?>