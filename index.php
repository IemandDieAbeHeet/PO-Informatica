<?php
include 'header.php';
?>
<html>
    <body>
        <main>
        <div class="wrapper">
            <form id="woorden">
                <div id="woordentotaal">
                    <div id="woordendiv">
                        <input class="woord" id="woord1" placeholder="Woord" type="text" value="">
                        <input class="woord" id="woord2" placeholder="Woord vertaling" type="text" value="">
                    </div>
                </div>
                <input type="number" id="hoeveelheid" name="hoeveelheid" min="1" max="100">
                <input type="button" value="Voeg 5 woorden toe" onclick="woordenToevoegen()">
                <input type="submit" value="Klaar">
            </form>
        </div>
        </main>
    </body>
</html>
<?php
include 'footer.php';
?>