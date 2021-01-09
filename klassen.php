<?php
include 'loginHeader.php';
include 'sidebar.php';
require "loginRequired.php";
?>

<main class="main-sidebar">
    <?php
    require "includes/dbh.inc.php";

    $sql = "SELECT * FROM klassen";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)) {
        header("Location: /?error=sqlerror");
        exit();
    } else {
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        if(mysqli_num_rows($result) > 0) {
            while($lijst = mysqli_fetch_assoc($result)) {
    ?>

        <div class="klasDiv">
            <p class="hidden klasId"><?php echo $lijst['klasId']?></p>
            <p><?php echo 'Klas: ' . $lijst['klasNaam'] ?></p>
            <p><?php echo 'Niveau: ' . $lijst['klasNiveau'] ?></p>
            <p><?php echo 'Jaar: ' . $lijst['klasJaar'] ?></p>
            <p><?php echo 'Klassenscore: ' . $lijst['klasScore'] ?></p>
            <button class="klasBekijkButton">Klas bekijken</button>
            <?php
            if(!isset($_SESSION['klasId']) && $_SESSION['userType'] != "Leraar") {
            ?>
            <button class="klasJoinButton">Dit is mijn klas</button>
        </div>

    <?php
                }
            }
        }
    }
    ?>
</main>

<?php
include 'defaultFooter.php';
?>