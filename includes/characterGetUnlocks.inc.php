<?php

session_start();

require 'dbh.inc.php';

$userId = $_SESSION["userId"];
$klasId = $_GET['klasId'];

if(empty($userId)) {
    header('HTTP/1.1 400 Je bent niet ingelogd!');
}
if(empty($klasId)) {
    header('HTTP/1.1 400 Geen klas aangegeven!');
} else {
    $sql = "SELECT klasCharacterUnlocksData FROM klassen WHERE klasId=?";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)) {
        header('HTTP/1.1 500 SQL error!');
        exit();
    }
    else {
        mysqli_stmt_bind_param($stmt, "i", $klasId);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        $assoc = mysqli_fetch_assoc($result);
        $characterUnlocksData = json_decode($assoc['klasCharacterUnlocksData'], true);
        header('Content-type:application/json;charset=utf-8');
        echo json_encode($characterUnlocksData);

        exit();
    }
}