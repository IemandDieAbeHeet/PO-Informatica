<?php

session_start();

require 'dbh.inc.php';

$userId = $_SESSION["userId"];
$woordenLijstSearch = "%{$_GET['woordenLijstSearch']}%";

if(empty($woordenLijstSearch)) {
    $woordenLijstSearch = "*";
}

if(empty($userId)) {
    header('HTTP/1.1 400 Je bent niet ingelogd!');
} else {
    $sql = "SELECT * FROM woordjes WHERE woordenLijstNaam LIKE ? AND userId=?";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)) {
        header('HTTP/1.1 500 SQL error!');
        exit();
    }
    else {
        mysqli_stmt_bind_param($stmt, "si", $woordenLijstSearch, $userId);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if(mysqli_num_rows($result) < 1) {
            header('HTTP/1.1 400 Geen woordenlijsten gevonden!');
        }

        $lijsten = [];

        while($woordenLijstData = mysqli_fetch_assoc($result)) {
            $woordenLijst = array("woordenArray" => json_decode(array_pop($woordenLijstData)));
            $data = array_merge($woordenLijstData, $woordenLijst);
            array_push($lijsten, $data);
        }

        header('Content-type:application/json;charset=utf-8');
        echo json_encode($lijsten, true);

        exit();
    }
}