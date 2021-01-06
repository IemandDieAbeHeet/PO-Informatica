<?php

$servername = "localhost";
$dBUsername = file_get_contents("username.txt", true);
$dBPassword = file_get_contents("wachtwoord.txt", true);
$dBName = file_get_contents("database.txt", true);

$conn = mysqli_connect($servername, $dBUsername, $dBPassword, $dBName);

if(!$conn) {
    die("Connection failed: ".mysqli_connect_error());
}