<?php

session_start();

require 'dbh.inc.php';

$userId = $_SESSION["userId"];
$leraarNaam = $_SESSION["userVolledigenaam"];
$userType = $_SESSION["userType"];
$klasNaam = $_POST['klasNaam'];
$klasNiveau = $_POST['klasNiveau'];
$klasJaar = $_POST['klasJaar'];

if(empty($userId)) {
    header('HTTP/1.1 400 Je bent niet ingelogd!');
} else if($userType != "Leraar") {
    header('HTTP/1.1 400 Je bent geen leraar!');
} else if(empty($klasNaam) || empty($klasNiveau) || empty($klasJaar)) {
    header('HTTP/1.1 400 Velden niet ingevuld!');
} else if(empty($woordenLijstId)) {
    $sql = "INSERT INTO klassen (klasNaam, klasNiveau, klasJaar, klasDocent) VALUES (?, ?, ?, ?)";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)) {
        header('HTTP/1.1 500 SQL error!');
        exit();
    }
    else {
        mysqli_stmt_bind_param($stmt, "ssss", $klasNaam, $klasNiveau, $klasJaar, $leraarNaam);
        $result = mysqli_stmt_execute($stmt);

        $id = mysqli_insert_id($conn);

        header('HTTP/1.1 200 Klas opgeslagen!');
        exit();
    }
}