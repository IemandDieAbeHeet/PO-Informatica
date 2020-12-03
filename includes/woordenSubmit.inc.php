<?php

if(isset($_POST["woordjes-submit"])) {
    require 'dbh.inc.php';

    $userId = $_SESSION["userId"];
    $woordenLijstId = $_POST["woordenlijstId"];
    $woordenLijst1 = $_POST["woorden1"];
    $woordenLijst2 = $_POST["woorden2"];
} else {
    header('HTTP/1.1 419 Form not submitted');
}