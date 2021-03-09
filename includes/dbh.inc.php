<?php
//
define("DB_SERVER", "localhost");
define("DB_USER", file_get_contents(__DIR__ . "/../username.txt"));
define("DB_PASSWORD", file_get_contents(__DIR__ . "/../wachtwoord.txt"));
define("DB_DATABASE", file_get_contents(__DIR__ . "/../database.txt"));

$conn = mysqli_connect(DB_SERVER , DB_USER, DB_PASSWORD, DB_DATABASE);

if(!$conn) {
    die("Connection failed: ".mysqli_connect_error());
}
