<?php

$db_server = "localhost";
$db_user = preg_replace("/\s+/", "", file_get_contents(__DIR__ . "/../username.txt"));
$db_pass = preg_replace("/\s+/", "", file_get_contents(__DIR__ . "/../wachtwoord.txt"));
$db_database = preg_replace("/\s+/", "", file_get_contents(__DIR__ . "/../database.txt"));

$conn = mysqli_connect($db_server, $db_user, $db_pass, $db_database);

if(!$conn) {
    die("Connection failed: ".mysqli_connect_error());
}