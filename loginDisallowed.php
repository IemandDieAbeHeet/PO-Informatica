<?php

if(isset($_SESSION['userId'])) {
    header('Location: lijsten.php');
}