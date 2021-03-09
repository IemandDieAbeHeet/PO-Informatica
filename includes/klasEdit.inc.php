<?php

session_start();

require 'dbh.inc.php';

$userId = $_SESSION["userId"];
$klasId = $_POST['klasId'];

if(empty($userId)) {
    header('HTTP/1.1 400 Je bent niet ingelogd!');
} else if(empty($klasId)) {
    header('HTTP/1.1 400 Geen klas aangegeven!');
} else {
    $sql = "UPDATE klassen SET klasNaam=?, klas WHERE userId=?";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)) {
        header('HTTP/1.1 500 SQL error!');
        exit();
    }
    else {
        mysqli_stmt_bind_param($stmt, "ii", $klasId, $userId);
        $result = mysqli_stmt_execute($stmt);

        $affectedRow = mysqli_info($conn);

        $_SESSION['klasId'] = $klasId;

        header('Content-type:application/json;charset=utf-8');
        echo json_encode($klasId, true);
        exit();
    }
}