<?php

session_start();

require 'dbh.inc.php';

$userId = $_SESSION["userId"];
$woordenlijstNaam = $_POST['title'];

$woordenLijst1array = array();

foreach($_POST["woordenArray"][0] as $woord) {
    $woord_clean = str_replace(",", "", $woord);
    array_push($woordenLijst1array, $woord_clean);
    $woordenLijst1 = implode(",", $woordenLijst1array);
}

$woordenLijst2 = "";
$woordenLijst2array = array();

foreach($_POST["woordenArray"][1] as $woord) {
    $woord_clean = str_replace(",", "", $woord);
    array_push($woordenLijst2array, $woord_clean);
    $woordenLijst2 = implode(",", $woordenLijst2array);
}

echo $woordenLijst1[0];
echo $woordenLijst2[0];

if(empty($userId)) {
    header('HTTP/1.1 400 Je bent niet ingelogd!');
} else if(empty($woordenlijstNaam) || empty($_POST["woordenArray"][0]) || empty($_POST["woordenArray"][1])) {
    header('HTTP/1.1 400 Velden niet ingevuld!');
} else {
    $sql = "INSERT INTO woordjes (userId, woordenLijstNaam, woordOrigineel, woordVertaling) VALUES (?, ?, ?, ?)";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)) {
        header('HTTP/1.1 400 SQL error!');
        exit();
    }
    else {
        mysqli_stmt_bind_param($stmt, "ssss", $userId, $woordenlijstNaam, $woordenLijst1, $woordenLijst2);
        $result = mysqli_stmt_execute($stmt);

        $affectedRow = mysqli_info($conn);

        header('HTTP/1.1 200 Woordenlijst succesvol opgeslagen!');
        exit();
    }
}