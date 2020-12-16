<?php

$servername = "localhost";
$dBUsername = "root";
$dBPassword = file_get_contents("C:/wachtwoord.txt");
$dBName = "poinformatica";

$conn = mysqli_connect($servername, $dBUsername, $dBPassword, $dBName);

if(!$conn) {
    die("Connection failed: ".mysqli_connect_error());
}