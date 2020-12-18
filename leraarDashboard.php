<?php

session_start();

if($_SESSION["userType"] != "Leraar") {
    header('Location: lijsten');
}