<?php

if(isset($_POST["login-submit"])) {

    require "dbh.inc.php";

    $mailuid = $_POST["mailuid"];
    $password = $_POST["pwd"];

    if(empty($mailuid) || empty($password)) {
        header("Location: ../login.php?error=emptyfields&mailuid=".$mailuid);
        exit();
    }
    else {
        $sql = "SELECT * FROM users WHERE userUsername=? OR userEmail=?;";
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)) {
            header("Location: ../login.php?error=sqlerror");
            exit();
        }
        else {
            mysqli_stmt_bind_param($stmt, "ss", $mailuid, $mailuid);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            if($row = mysqli_fetch_assoc($result)) {
                $pwdCheck = password_verify($password, $row["userPassword"]);
                if($pwdCheck == false) {
                    header("Location: ../login.php?error=wrongpwd");
                    exit();
                }
                elseif($pwdCheck == true) {
                    session_start();
                    $_SESSION["userId"] = $row["userId"];
                    $_SESSION["username"] = $row["userUsername"];
                    $_SESSION["userVolledigenaam"] = $row["userVolledigenaam"];
                    $_SESSION["klasId"] = $row["klasId"];
                    $_SESSION["userType"] = $row["userType"];
                    $_SESSION["loginTime"] = date("H:i:s");
                    $_SESSION["userScore"] = $row["userScore"];

                    header("Location: ../lijsten.php?login=success");
                    exit();
                }
                else {
                    header("Location: ../login.php?error=wrongpwd");
                    exit();
                }
            }
            else {
                header("Location: ../login.php?error=nouser");
                exit();
            }
        }
    }
}

else {
    header("Location: ../");
    exit();
}
