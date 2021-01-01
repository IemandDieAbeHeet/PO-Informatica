<?php

session_start();

require 'dbh.inc.php';

$klasId = $_POST['klasId'];
$userId = $_SESSION['userId'];
$unlockData = $_POST["unlockData"];
$itemsData = json_decode(file_get_contents("itemsData.json"), true);

$itemPrice = $itemsData[$unlockData['id']]['itemPrice'];

var_dump($_SESSION['userScore']);
if(empty($userId)) {
    header('HTTP/1.1 400 Je bent niet ingelogd!');
} else if($_SESSION['klasId'] != $klasId) {
    header('HTTP/1.1 400 Dit is niet jouw klas!');
} else if($_SESSION['userType'] != "Leraar") {
    header('HTTP/1.1 400 Alleen leerlingen mogen dingen ontgrendelen!');
} else if(empty($unlockData)) {
    header('HTTP/1.1 400 Geen item unlock data verzonden!');
} else if(empty($klasId)) {
    header('HTTP/1.1 400 Je zit niet in een klas!');
} else if($unlockData['unlocked'] == 'true') {
    header('HTTP/1.1 400 Dit item is al ontgrendeld!');
} else if($_SESSION["userScore"] < $itemPrice) {
    header('HTTP/1.1 400 Je hebt niet genoeg score om dit item te ontgrendelen!');
} else {
    $sql1 = "UPDATE users SET userScore=userScore+? WHERE userId=?";
    $sql2 = "UPDATE klassen SET klasScore=klasScore+? WHERE klasId=?";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql1)) {
        header('HTTP/1.1 400 SQL error!');
        exit();
    }
    else {
        $negativeItemPrice = -$itemPrice;
        mysqli_stmt_bind_param($stmt, "ii", $negativeItemPrice, $userId);
        $result = mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);

        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql2)) {
            header('HTTP/1.1 400 SQL error!');
            exit();
        } else {
            mysqli_stmt_bind_param($stmt, "ii", $negativeItemPrice, $klasId);
            $result = mysqli_stmt_execute($stmt);
    
            $_SESSION["userScore"] -= $itemPrice;
        }
    }

    mysqli_stmt_close($stmt);

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