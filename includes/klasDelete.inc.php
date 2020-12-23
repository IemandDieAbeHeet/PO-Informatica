<?php

session_start();

require 'dbh.inc.php';

$userId = $_SESSION["userId"];
$userType = $_SESSION["userType"];
$klasId = $_POST['klasId'];

if(empty($userId)) {
    header('HTTP/1.1 400 Je bent niet ingelogd!');
} else if(empty($klasId)) {
    header('HTTP/1.1 400 Geen klas opgegeven!');
} else if($userType != "Leraar") {
    header('HTTP/1.1 400 Je bent geen leraar!');
} else {
    $sql = "DELETE FROM klassen WHERE klasId=?";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)) {
        header('HTTP/1.1 500 SQL error!');
        exit();
    }
    else {
        mysqli_stmt_bind_param($stmt, "i", $klasId);
        $result = mysqli_stmt_execute($stmt);

        header('HTTP/1.1 200 Klas verwijderd!');
        exit();
    }
}