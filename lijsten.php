<?php
include 'header.php';
?>

<main>
    <?php
    require "includes/dbh.inc.php";

    $sql = "SELECT * FROM woordjes WHERE userId=? ORDER BY woordenLijstId ASC";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)) {
        header("Location: ../index.php?error=sqlerror");
        exit();
    } else {
        mysqli_stmt_bind_param($stmt, "i", $_SESSION['userId']);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        if(mysqli_num_rows($result) > 0) {
            while($lijst = mysqli_fetch_assoc($result)) {
    ?>

        <div>
            <p><?php echo 'Naam: ' . $lijst['woordenLijstNaam'] ?></p>
        </div>

    <?php
            }
        }
    }
    ?>
</main>

<?php
include 'footer.php';
?>