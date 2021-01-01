<?php

session_start();

require 'dbh.inc.php';

$characterData = $_POST["characterData"];
$klasId = $_POST['klasId'];
$userType = $_SESSION['userType'];

if(empty($characterData)) {
    header('HTTP/1.1 400 Geen character data verzonden!');
} else if(empty($klasId)) {
    header('HTTP/1.1 400 Je zit niet in een klas!');
} else if(count(($characterData)) != 5) {
    header('HTTP/1.1 400 Te veel of te weinig kledingstukken opgegeven!');
} else if($userType != "Leraar") {
    header('HTTP/1.1 400 Je bent geen leraar!');
} else {
    $sql = "UPDATE klassen SET klasCharacterData=? WHERE klasId=?";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)) {
        header('HTTP/1.1 500 SQL error!');
        exit();
    }
    else {
        $characterDataEncoded = json_encode($characterData);
        mysqli_stmt_bind_param($stmt, "si", $characterDataEncoded, $klasId);
        mysqli_stmt_execute($stmt);

        header('HTTP/1.1 200 Poppetje opgeslagen!');
        exit();
    }
}