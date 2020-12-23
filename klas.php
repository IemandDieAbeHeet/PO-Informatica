<?php
include 'loginHeader.php';
include 'sidebar.php';
require "loginRequired.php";
?>

<main class="main-sidebar">
    <div class="leerlingDiv">
        <?php
        require "includes/dbh.inc.php";

        $sql = "SELECT t1.* FROM users AS t1 JOIN klassen AS t2 ON t1.klasId = t2.klasId WHERE t1.klasId=? ORDER BY userVolledigenaam ASC";

        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)) {
            header("Location: /?error=sqlerror");
            exit();
        } else {
            mysqli_stmt_bind_param($stmt, "i", $_GET['klasId']);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            if(mysqli_num_rows($result) > 0) {

                ?>
                <p>Leerlingen:</p>
                <?php
                while($leerling = mysqli_fetch_assoc($result)) {
        ?>
                <p><?php echo $leerling['userVolledigenaam'] ?> - <?php echo $leerling['userScore'] ?></p>

        <?php
                }
            } else {
                ?>
                    <p>Er zitten nog geen leerlingen in deze klas.</p>
                <?php
            }
        }
        ?>
    </div>
    <br>
    <div class="klasDiv">
        <?php
        require "includes/dbh.inc.php";

        $sql = "SELECT * FROM klassen WHERE klasId=?";

        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)) {
            header("Location: /?error=sqlerror");
            exit();
        } else {
            mysqli_stmt_bind_param($stmt, "i", $_GET['klasId']);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            if(mysqli_num_rows($result) > 0) {
                while($klas = mysqli_fetch_assoc($result)) {
        ?>
                <p>Klassenscore: <?php echo $klas['klasScore'] ?></p>
                <p>Docent: <?php echo $klas['klasDocent'] ?></p>
                
                <div class="character">
                </div>
                
                <button id="characterResetButton">Reset</button>
                <?php
                if($_SESSION['userType'] === "Leraar") {
                ?>
                <button id="characterOpslaanButton">Opslaan</button>
                <?php
                }
                ?>

                <p id="response"></p>
        <?php
                }
            }
        }
        ?>
    </div>
</main>

<?php
include 'defaultFooter.php';
?>