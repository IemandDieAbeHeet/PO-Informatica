<?php
include 'header.php';
include 'sidebar.php';
?>

<main class="main">
    <?php
    require "includes/dbh.inc.php";

    $sql = "SELECT * FROM woordjes WHERE woordenLijstId=?";
    $stmt = mysqli_stmt_init($conn);
    if(empty($_GET['woordenLijst'])) {
        header("Location: lijsten");
        exit();
    } else {
        if(!mysqli_stmt_prepare($stmt, $sql)) {
            header("Location: ../index.php?error=sqlerror");
            exit();
        } else {
            $woordenLijstId = intval($_GET['woordenLijst']);
            mysqli_stmt_bind_param($stmt, "i", $woordenLijstId);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            if(mysqli_num_rows($result) > 0) {
                while($lijst = mysqli_fetch_assoc($result)) {
    ?>

        <div>
            <p class="hidden lijstId"><?php echo $lijst['woordenLijstId']?></p>
            <h1><?php echo 'Naam: ' . $lijst['woordenLijstNaam'] ?></h1>
            <?php
            $woordenLijst1array = explode(",", $lijst['woordOrigineel']);
            $woordenLijst2array = explode(",", $lijst['woordVertaling']);

            foreach($woordenLijst1array as $woord) {
                ?>
                <p><?php echo $woord; ?></p>
            <?php    
                }
            ?>
            <?php
            foreach($woordenLijst2array as $woord) {
                ?>
                <p><?php echo $woord; ?></p>
            <?php    
                }
            ?>
        </div>

    <?php
                }
            }
        }
    }
    ?>
</main>

<?php
include 'footer.php';
?>