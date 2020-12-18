<?php

if(isset($_POST["signup-submit"])) {

    require "dbh.inc.php";

    $username = $_POST["username"];
    $volledigenaam = $_POST["volledigenaam"];
    $email = $_POST["mail"];
    $password = $_POST["pwd"];
    $passwordRepeat = $_POST["pwd-repeat"];

    if(empty($username) || empty($email) || empty($password) || empty($volledigenaam) || empty($passwordRepeat)) {
        header("Location: ../signup?error=emptyfields&uid=".$username."&mail=".$email);
        exit();
    }
    elseif(!filter_var($email, FILTER_VALIDATE_EMAIL) && !preg_match("/^[a-zA-Z0-9]*$/", $username)) {
        header("Location: ../signup?error=invalidmailuid");
        exit();
    }
    elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: ../signup?error=invalidmail&uid=".$username);
        exit();
    }
    elseif(!preg_match("/^[a-zA-Z0-9]*$/", $username)) {
        header("Location: ../signup?error=invaliduid&mail=".$email);
        exit();
    }
    elseif(!preg_match("/^[a-zA-Z\s]*$/", $volledigenaam)) {
        header("Location: ../signup?error=invalidname&uid=".$username."&mail=".$email);
    }
    elseif($password !== $passwordRepeat) {
        header("Location: ../signup?error=passwordcheck&uid=".$username."&mail=".$email);
        exit();
    }
    else {

        $sql = "SELECT userUsername FROM users WHERE userUsername=?";
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)) {
            header("Location: ../signup?error=sqlerror");
            exit();
        }
        else {
            mysqli_stmt_bind_param($stmt, "s", $username);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
            $resultCheck = mysqli_stmt_num_rows($stmt);
            if($resultCheck > 0) {
                header("Location: ../signup?error=uidtaken&mail=".$email);
                exit();
            }
            else {
                $sql = "INSERT INTO users (userUsername, userVolledigenaam, userEmail, userPassword) VALUES (?, ?, ?, ?)";
                $stmt = mysqli_stmt_init($conn);
                if(!mysqli_stmt_prepare($stmt, $sql)) {
                    header("Location: ../signup?error=sqlerror");
                    exit();
                }
                else {
                    $hashedPwd = password_hash($password, PASSWORD_DEFAULT);

                    mysqli_stmt_bind_param($stmt, "ssss", $username, $volledigenaam, $email, $hashedPwd);
                    $result = mysqli_stmt_execute($stmt);

                    session_start();

                    $affectedRow = mysqli_info($conn);
                    
                    $_SESSION["userId"] = mysqli_insert_id($conn);
                    $_SESSION["userVolledigenaam"] = $volledigenaam;
                    $_SESSION["userUid"] = $username;
                    $_SESSION["userType"] = "Leerling";
                    $_SESSION["loginTime"] = date("H:i:s");

                    header("Location: ../lijsten?signup=success");
                    exit();
                }
            }
        }
        mysqli_stmt_close($stmt);
        mysqli_close($conn);
    }
}
else {
    header("Location: ../signup");
    exit();
}