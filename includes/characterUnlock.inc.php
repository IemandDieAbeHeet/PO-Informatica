<?php

session_start();

require 'dbh.inc.php';

$itemData = $_POST["itemData"];
$klasId = $_SESSION['klasId'];
$userId = $_SESSION['userId'];
$itemsData = json_decode(file_get_contents("itemsData.json"), true);
var_dump($itemsData);

if(empty($userId)) {
    header('HTTP/1.1 400 Je bent niet ingelogd!');
} else if(empty($itemData)) {
    header('HTTP/1.1 400 Geen item data verzonden!');
} else if(empty($klasId)) {
    header('HTTP/1.1 400 Je zit niet in een klas!');
} else if(count(($itemData)) != 3) {
    header('HTTP/1.1 400 Ongeldige item data opgegeven!');
} else {
    $sql = "UPDATE klassen SET klasItemsData=klasItemsData+? WHERE klasId=?";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)) {
        header('HTTP/1.1 500 SQL error!');
        exit();
    }
    else {
        mysqli_stmt_bind_param($stmt, "si", json_encode($characterData), $klasId);
        mysqli_stmt_execute($stmt);

        header('HTTP/1.1 200 Nieuw item ontgrendeld!');
        exit();
    }
}