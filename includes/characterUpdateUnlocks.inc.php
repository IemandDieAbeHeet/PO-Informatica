<?php

session_start();

require 'dbh.inc.php';

$klasId = $_POST['klasId'];
$userId = $_SESSION['userId'];
$unlockData = $_POST["unlockData"];
$itemsData = json_decode(file_get_contents("itemsData.json"), true);

$itemPrice = $itemsData[$unlockData['id']]['itemPrice'];

if(empty($userId)) {
    header('HTTP/1.1 400 Je bent niet ingelogd!');
} else if(empty($unlockData)) {
    header('HTTP/1.1 400 Geen item unlock data verzonden!');
} else if(empty($klasId)) {
    header('HTTP/1.1 400 Je zit niet in een klas!');
} else if($_SESSION['userScore'] < $itemPrice) {
    header('HTTP/1.1 400 Je hebt niet genoeg score om dit item te ontgrendelen!');
} else {
    $score = -$itemPrice;
    include('scoreUpdate.inc.php');

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

        $i = 0;
        foreach($characterUnlocksData as $unlockItem) {
            if(intval($unlockItem['id']) === intval($unlockData['id'])) {
                $characterUnlocksData[$i]['unlocked'] = true;
            }

            $i++;
        }

        mysqli_stmt_close($stmt);

        $sql = "UPDATE klassen SET klasCharacterUnlocksData=? WHERE klasId=?";
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)) {
            header('HTTP/1.1 500 SQL error!');
            exit();
        }
        else {
            $characterUnlocksDataEncoded = json_encode($characterUnlocksData);
            mysqli_stmt_bind_param($stmt, "si", $characterUnlocksDataEncoded, $klasId);
            mysqli_stmt_execute($stmt);

            header('HTTP/1.1 200 Nieuw item ontgrendeld!');
            exit();
        }
    }
}