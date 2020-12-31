<?php

session_start();

require 'dbh.inc.php';

$userId = $_SESSION["userId"];
$woordenLijstSearch = $_GET['woordenLijstSearch'];

if(empty($userId)) {
    header('HTTP/1.1 400 Je bent niet ingelogd!');
} else if(empty($woordenLijstSearch)) {
    header('HTTP/1.1 400 Geen query aangegeven!');
} else {
    $sql = "SELECT * FROM woordjes WHERE woordenLijstNaam LIKE '%?%'";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)) {
        header('HTTP/1.1 500 SQL error!');
        exit();
    }
    else {
        mysqli_stmt_bind_param($stmt, "s", $woordenLijstNaam);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        $woordenLijstData = mysqli_fetch_assoc($result);
        $woordenLijst = array("woordenArray" => json_decode(array_pop($woordenLijstData)));
        $data = array_merge($woordenLijstData, $woordenLijst);
        header('Content-type:application/json;charset=utf-8');
        echo json_encode($data, true);

        exit();
    }
}