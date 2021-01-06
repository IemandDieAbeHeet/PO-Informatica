<?php

$servername = "localhost";
$dBUsername = file_get_contents("../username.txt");
$dBPassword = file_get_contents("../wachtwoord.txt");
$dBName = file_get_contents("../database.txt");

$conn = mysqli_connect($servername, $dBUsername, $dBPassword, $dBName);

if(!$conn) {
    die("Connection failed: ".mysqli_connect_error());
}