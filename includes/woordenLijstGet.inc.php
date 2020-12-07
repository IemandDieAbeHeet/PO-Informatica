<?php

session_start();

require 'dbh.inc.php';

$userId = $_SESSION["userId"];
$woordenLijstId = $_GET['id'];

if(empty($userId)) {
    header('HTTP/1.1 400 Je bent niet ingelogd!');
} else if(!empty($woordenLijstId)) {
    $sql = "SELECT * FROM woordjes WHERE woordenLijstId=?";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)) {
        header('HTTP/1.1 400 SQL error!');
        exit();
    }
    else {
        mysqli_stmt_bind_param($stmt, "i", $woordenLijstId);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        $row = mysqli_fetch_assoc($result);
        $woorden2 = array_pop($row);
        $woorden1 = array_pop($row);

        $woorden1array = explode(",", $woorden1);
        $woorden2array = explode(",", $woorden2);

        $woordenLijsten = array('woordenOrigineel' => $woorden1array, 'woordenVertaald' => $woorden2array);
        $woordenLijstData = array_merge($row, $woordenLijsten);

        header('Content-type:application/json;charset=utf-8');
        echo json_encode($woordenLijstData, true);

        exit();
    }
}