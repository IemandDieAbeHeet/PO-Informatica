<?php

if(!isset($_SESSION['userId'])) {
    header('Location: /PO-Informatica/');
}