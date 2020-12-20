<?php

session_start();

require 'dbh.inc.php';

$userId = $_SESSION["userId"];
$woordenlijstNaam = $_POST['title'];
$woordenLijstId = $_POST['id'];
$taalOrigineel = $_POST['taalOrigineel'];
$taalVertaald = $_POST['taalVertaald'];
$woordenAantal = $_POST['woordenAantal'];
$woordenArray = json_encode($_POST['woordenArray']);

var_dump($woordenArray);

if(empty($userId)) {
    header('HTTP/1.1 400 Je bent niet ingelogd!');
} else if(empty($woordenlijstNaam) || empty($_POST["woordenArray"][0]) || empty($woordenArray) || empty($taalOrigineel) || empty($taalVertaald)) {
    header('HTTP/1.1 400 Velden niet ingevuld!');
} else if(empty($woordenLijstId)) {
    $sql = "INSERT INTO woordjes (userId, woordenLijstNaam, taalOrigineel, taalVertaald, woordenAantal, woordenArray) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)) {
        header('HTTP/1.1 400 SQL error!');
        exit();
    }
    else {
        mysqli_stmt_bind_param($stmt, "isssss", $userId, $woordenlijstNaam, $taalOrigineel, $taalVertaald, $woordenAantal, $woordenArray);
        $result = mysqli_stmt_execute($stmt);

        $affectedRow = mysqli_info($conn);

        header('HTTP/1.1 200 Woordenlijst succesvol opgeslagen!');
        exit();
    }
} else {
    $sql = "UPDATE woordjes SET woordenLijstNaam=?, taalOrigineel=?, taalVertaald=?, woordenAantal=?, woordenArray=? WHERE woordenLijstId=?";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)) {
        header('HTTP/1.1 400 SQL error!');
        exit();
    }
    else {
        mysqli_stmt_bind_param($stmt, "sssssi", $woordenlijstNaam, $taalOrigineel, $taalVertaald, $woordenAantal, $woordenArray, $woordenLijstId);
        $result = mysqli_stmt_execute($stmt);

        $affectedRow = mysqli_info($conn);

        header('HTTP/1.1 200 Woordenlijst succesvol opgeslagen!');
        exit();
    }
}