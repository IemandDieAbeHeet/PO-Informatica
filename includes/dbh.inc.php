<?php
//
$servername = "localhost";
$dBUsername = file_get_contents(__DIR__ . "/../username.txt");
$dBPassword = file_get_contents(__DIR__ . "/../wachtwoord.txt");
$dBName = file_get_contents(__DIR__ . "/../database.txt");

$conn = mysqli_connect($servername, $dBUsername, $dBPassword, $dBName);

if(!$conn) {
    die("Connection failed: ".mysqli_connect_error());
}