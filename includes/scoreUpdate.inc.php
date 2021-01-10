<?php

session_start();

require 'dbh.inc.php';

$userId = $_SESSION["userId"];
$klasId = $_SESSION["klasId"];
if(isset($_POST['score'])) {
    $score = $_POST['score'];
}

if(empty($userId)) {
    header('HTTP/1.1 400 Je bent niet ingelogd!');
} else if(empty($score)) {
    header('HTTP/1.1 400 Geen score aangegeven!');
} else if($score > 100 || $score < 100) {
    header('HTTP/1.1 400 Foute score!');
} else {
    $sql1 = "UPDATE users SET userScore=userScore+? WHERE userId=?";
    $sql2 = "UPDATE klassen SET klasScore=(SELECT SUM(userScore) FROM users WHERE klasId=?) WHERE klasId=?";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql1)) {
        header('HTTP/1.1 400 SQL error!');
        exit();
    }
    else {
        mysqli_stmt_bind_param($stmt, "ii", $score, $userId);
        $result = mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);

        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql2)) {
            header('HTTP/1.1 400 SQL error!');
            exit();
        } else {
            mysqli_stmt_bind_param($stmt, "ii", $score, $klasId);
            $result = mysqli_stmt_execute($stmt);
    
            $_SESSION["userScore"] += $score;
            header('HTTP/1.1 200 Score geupdatet!');
            exit();
        }
    }
}