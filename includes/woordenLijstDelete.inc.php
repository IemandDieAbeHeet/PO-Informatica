<?php

session_start();

require 'dbh.inc.php';

$userId = $_SESSION["userId"];
$woordenLijstId = $_POST['woordenLijstId'];

if(empty($userId)) {
    header('HTTP/1.1 400 Je bent niet ingelogd!');
} else if(empty($woordenLijstId)) {
    header('HTTP/1.1 400 Geen woordenlijst opgegeven!');
} else {
    $sql = "DELETE FROM woordjes WHERE woordenLijstId=? AND userId=?";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)) {
        header('HTTP/1.1 500 SQL error!');
        exit();
    }
    else {
        mysqli_stmt_bind_param($stmt, "ii", $woordenLijstId, $userId);
        $result = mysqli_stmt_execute($stmt);

        header('HTTP/1.1 200 Woordenlijst verwijderd!');
        exit();
    }
}