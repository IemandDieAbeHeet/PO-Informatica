<?php

if (isset($_SESSION['userId'])) {
    session_start();
    session_unset();
    session_destroy();
    header("Location: ../");
    exit();
}